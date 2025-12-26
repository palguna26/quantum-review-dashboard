import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShieldAlert, 
  Bug,
  FileCode,
  Copy,
  Trash2,
  BookOpen,
  Layers,
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  Download
} from 'lucide-react';

type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';
type IssueCategory = 'security' | 'code-quality' | 'anti-patterns' | 'dead-code' | 'documentation' | 'complexity';

interface AuditIssue {
  id: string;
  title: string;
  description: string;
  filePath: string;
  lineNumber: number;
  severity: Severity;
  category: IssueCategory;
  suggestion?: string;
}

interface AuditPanelProps {
  repoFullName: string;
  healthScore: number;
}

const mockIssues: AuditIssue[] = [
  {
    id: '1',
    title: 'SQL Injection Vulnerability',
    description: 'User input is directly concatenated into SQL query without sanitization',
    filePath: 'src/api/users.ts',
    lineNumber: 42,
    severity: 'critical',
    category: 'security',
    suggestion: 'Use parameterized queries or an ORM to prevent SQL injection attacks'
  },
  {
    id: '2',
    title: 'Exposed API Key',
    description: 'Hardcoded API key found in source code',
    filePath: 'src/services/payment.ts',
    lineNumber: 15,
    severity: 'critical',
    category: 'security',
    suggestion: 'Move API keys to environment variables and use secrets management'
  },
  {
    id: '3',
    title: 'Missing Input Validation',
    description: 'User input is not validated before processing',
    filePath: 'src/handlers/form.ts',
    lineNumber: 28,
    severity: 'high',
    category: 'security',
    suggestion: 'Add input validation using a schema validation library like Zod'
  },
  {
    id: '4',
    title: 'Unused Variable',
    description: 'Variable "tempData" is declared but never used',
    filePath: 'src/utils/helpers.ts',
    lineNumber: 156,
    severity: 'low',
    category: 'dead-code',
    suggestion: 'Remove unused variable to improve code clarity'
  },
  {
    id: '5',
    title: 'Duplicate Function',
    description: 'Function "formatDate" is duplicated in multiple files',
    filePath: 'src/components/DatePicker.tsx',
    lineNumber: 23,
    severity: 'medium',
    category: 'dead-code',
    suggestion: 'Extract to a shared utility module'
  },
  {
    id: '6',
    title: 'High Cyclomatic Complexity',
    description: 'Function has cyclomatic complexity of 15 (threshold: 10)',
    filePath: 'src/services/orderProcessor.ts',
    lineNumber: 89,
    severity: 'medium',
    category: 'complexity',
    suggestion: 'Break down into smaller, focused functions'
  },
  {
    id: '7',
    title: 'Missing Function Documentation',
    description: 'Public function lacks JSDoc documentation',
    filePath: 'src/api/auth.ts',
    lineNumber: 34,
    severity: 'info',
    category: 'documentation',
    suggestion: 'Add JSDoc comments describing parameters and return values'
  },
  {
    id: '8',
    title: 'Anti-pattern: God Object',
    description: 'Class has too many responsibilities (23 methods)',
    filePath: 'src/services/UserManager.ts',
    lineNumber: 1,
    severity: 'high',
    category: 'anti-patterns',
    suggestion: 'Split into smaller, single-responsibility classes'
  },
  {
    id: '9',
    title: 'Inefficient Loop',
    description: 'Nested loop causes O(n²) complexity on large dataset',
    filePath: 'src/utils/search.ts',
    lineNumber: 67,
    severity: 'medium',
    category: 'code-quality',
    suggestion: 'Use a Map or Set for O(1) lookups instead of nested iteration'
  },
  {
    id: '10',
    title: 'Missing Error Handling',
    description: 'Async function lacks try-catch block',
    filePath: 'src/api/products.ts',
    lineNumber: 112,
    severity: 'high',
    category: 'code-quality',
    suggestion: 'Wrap async operations in try-catch and handle errors appropriately'
  }
];

const getSeverityConfig = (severity: Severity) => {
  switch (severity) {
    case 'critical':
      return { 
        icon: AlertCircle, 
        color: 'text-destructive', 
        bg: 'bg-destructive/10', 
        border: 'border-destructive/30',
        badge: 'bg-destructive/10 text-destructive border-destructive/30'
      };
    case 'high':
      return { 
        icon: AlertTriangle, 
        color: 'text-warning', 
        bg: 'bg-warning/10', 
        border: 'border-warning/30',
        badge: 'bg-warning/10 text-warning border-warning/30'
      };
    case 'medium':
      return { 
        icon: AlertTriangle, 
        color: 'text-amber-500', 
        bg: 'bg-amber-500/10', 
        border: 'border-amber-500/30',
        badge: 'bg-amber-500/10 text-amber-500 border-amber-500/30'
      };
    case 'low':
      return { 
        icon: Info, 
        color: 'text-muted-foreground', 
        bg: 'bg-muted/10', 
        border: 'border-muted/30',
        badge: 'bg-muted/10 text-muted-foreground border-muted/30'
      };
    case 'info':
      return { 
        icon: Info, 
        color: 'text-primary', 
        bg: 'bg-primary/10', 
        border: 'border-primary/30',
        badge: 'bg-primary/10 text-primary border-primary/30'
      };
  }
};

const getCategoryConfig = (category: IssueCategory) => {
  switch (category) {
    case 'security':
      return { icon: ShieldAlert, label: 'Security', color: 'text-destructive' };
    case 'code-quality':
      return { icon: FileCode, label: 'Code Quality', color: 'text-primary' };
    case 'anti-patterns':
      return { icon: Bug, label: 'Anti-patterns', color: 'text-warning' };
    case 'dead-code':
      return { icon: Trash2, label: 'Dead Code', color: 'text-muted-foreground' };
    case 'documentation':
      return { icon: BookOpen, label: 'Documentation', color: 'text-primary' };
    case 'complexity':
      return { icon: Layers, label: 'Complexity', color: 'text-warning' };
  }
};

const IssueRow = ({ issue }: { issue: AuditIssue }) => {
  const [expanded, setExpanded] = useState(false);
  const severityConfig = getSeverityConfig(issue.severity);
  const categoryConfig = getCategoryConfig(issue.category);
  const SeverityIcon = severityConfig.icon;
  const CategoryIcon = categoryConfig.icon;

  return (
    <div className={`border ${severityConfig.border} rounded-lg overflow-hidden`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full p-4 text-left flex items-start gap-4 hover:bg-muted/5 transition-colors ${severityConfig.bg}`}
      >
        <SeverityIcon className={`h-5 w-5 mt-0.5 ${severityConfig.color} flex-shrink-0`} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-medium">{issue.title}</span>
            <Badge variant="outline" className={severityConfig.badge}>
              {issue.severity}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CategoryIcon className={`h-3.5 w-3.5 ${categoryConfig.color}`} />
            <span>{categoryConfig.label}</span>
            <span>•</span>
            <code className="text-xs bg-muted/20 px-1.5 py-0.5 rounded font-mono">
              {issue.filePath}:{issue.lineNumber}
            </code>
          </div>
        </div>

        <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-border/50 bg-card">
          <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
          
          {issue.suggestion && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
              <p className="text-sm font-medium text-primary mb-1">Suggested Fix</p>
              <p className="text-sm text-foreground">{issue.suggestion}</p>
            </div>
          )}
          
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1.5" />
              View in Editor
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Copy className="h-3 w-3 mr-1.5" />
              Copy Path
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export const AuditPanel = ({ repoFullName, healthScore }: AuditPanelProps) => {
  const linesAnalyzed = 74921;
  
  const totalIssues = mockIssues.length;
  const securityIssues = mockIssues.filter(i => i.category === 'security').length;
  const codeQualityIssues = mockIssues.filter(i => 
    ['code-quality', 'anti-patterns', 'complexity'].includes(i.category)
  ).length;
  const criticalCount = mockIssues.filter(i => i.severity === 'critical').length;
  const highCount = mockIssues.filter(i => i.severity === 'high').length;

  const categoryFilters: { key: IssueCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'All Issues' },
    { key: 'security', label: 'Security' },
    { key: 'code-quality', label: 'Code Quality' },
    { key: 'anti-patterns', label: 'Anti-patterns' },
    { key: 'dead-code', label: 'Dead Code' },
    { key: 'documentation', label: 'Documentation' },
    { key: 'complexity', label: 'Complexity' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | 'all'>('all');

  const filteredIssues = selectedCategory === 'all' 
    ? mockIssues 
    : mockIssues.filter(i => i.category === selectedCategory);

  // Sort by severity
  const severityOrder: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
  const sortedIssues = [...filteredIssues].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Issues</p>
          <p className="text-3xl font-bold">{totalIssues}</p>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Security Issues</p>
          <p className="text-3xl font-bold text-destructive">{securityIssues}</p>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Code Quality Issues</p>
          <p className="text-3xl font-bold text-warning">{codeQualityIssues}</p>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Lines Analyzed</p>
          <p className="text-3xl font-bold text-primary">{linesAnalyzed.toLocaleString()}</p>
        </Card>
      </div>

      {/* Severity Summary */}
      {(criticalCount > 0 || highCount > 0) && (
        <Card className="p-4 border-destructive/30 bg-destructive/5">
          <div className="flex items-center gap-4">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div className="flex-1">
              <p className="font-medium">Attention Required</p>
              <p className="text-sm text-muted-foreground">
                {criticalCount} critical and {highCount} high severity issues need immediate attention
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </Card>
      )}

      {/* Category Tabs & Issues */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Issues</h3>
          <p className="text-sm text-muted-foreground">{sortedIssues.length} issues</p>
        </div>

        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as IssueCategory | 'all')}>
          <TabsList className="mb-4 flex-wrap h-auto gap-1">
            {categoryFilters.map(filter => {
              const count = filter.key === 'all' 
                ? mockIssues.length 
                : mockIssues.filter(i => i.category === filter.key).length;
              
              if (count === 0 && filter.key !== 'all') return null;
              
              return (
                <TabsTrigger key={filter.key} value={filter.key} className="text-xs">
                  {filter.label}
                  <span className="ml-1.5 text-muted-foreground">({count})</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-3 mt-0">
            {sortedIssues.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No issues found in this category
              </div>
            ) : (
              sortedIssues.map(issue => (
                <IssueRow key={issue.id} issue={issue} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
