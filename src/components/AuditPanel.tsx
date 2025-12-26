import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  FileCode,
  GitBranch,
  Lock,
  Zap
} from 'lucide-react';

interface AuditItem {
  id: string;
  category: string;
  title: string;
  status: 'pass' | 'warning' | 'fail';
  description: string;
}

interface AuditPanelProps {
  repoFullName: string;
  healthScore: number;
}

const mockAuditItems: AuditItem[] = [
  {
    id: '1',
    category: 'Security',
    title: 'Dependency Vulnerabilities',
    status: 'pass',
    description: 'No known vulnerabilities in dependencies'
  },
  {
    id: '2',
    category: 'Security',
    title: 'Secret Scanning',
    status: 'pass',
    description: 'No exposed secrets or API keys detected'
  },
  {
    id: '3',
    category: 'Code Quality',
    title: 'Code Coverage',
    status: 'warning',
    description: 'Test coverage is at 68%, recommended minimum is 80%'
  },
  {
    id: '4',
    category: 'Code Quality',
    title: 'Linting Issues',
    status: 'pass',
    description: 'No linting errors or warnings'
  },
  {
    id: '5',
    category: 'Best Practices',
    title: 'Branch Protection',
    status: 'fail',
    description: 'Main branch does not have protection rules enabled'
  },
  {
    id: '6',
    category: 'Best Practices',
    title: 'CI/CD Pipeline',
    status: 'pass',
    description: 'Active CI/CD workflow detected'
  },
  {
    id: '7',
    category: 'Performance',
    title: 'Bundle Size',
    status: 'warning',
    description: 'Bundle size is 2.1MB, consider code splitting'
  },
  {
    id: '8',
    category: 'Performance',
    title: 'Build Time',
    status: 'pass',
    description: 'Average build time is under 2 minutes'
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Security':
      return <Lock className="h-4 w-4" />;
    case 'Code Quality':
      return <FileCode className="h-4 w-4" />;
    case 'Best Practices':
      return <GitBranch className="h-4 w-4" />;
    case 'Performance':
      return <Zap className="h-4 w-4" />;
    default:
      return <ShieldCheck className="h-4 w-4" />;
  }
};

const getStatusIcon = (status: 'pass' | 'warning' | 'fail') => {
  switch (status) {
    case 'pass':
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case 'fail':
      return <XCircle className="h-5 w-5 text-destructive" />;
  }
};

const getStatusBadge = (status: 'pass' | 'warning' | 'fail') => {
  switch (status) {
    case 'pass':
      return <Badge variant="outline" className="border-success/50 text-success bg-success/10">Passed</Badge>;
    case 'warning':
      return <Badge variant="outline" className="border-warning/50 text-warning bg-warning/10">Warning</Badge>;
    case 'fail':
      return <Badge variant="outline" className="border-destructive/50 text-destructive bg-destructive/10">Failed</Badge>;
  }
};

export const AuditPanel = ({ repoFullName, healthScore }: AuditPanelProps) => {
  const passCount = mockAuditItems.filter(i => i.status === 'pass').length;
  const warningCount = mockAuditItems.filter(i => i.status === 'warning').length;
  const failCount = mockAuditItems.filter(i => i.status === 'fail').length;

  const categories = [...new Set(mockAuditItems.map(i => i.category))];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Health Score</p>
            <p className="text-2xl font-bold">{healthScore}</p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-success/10">
            <CheckCircle2 className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Passed</p>
            <p className="text-2xl font-bold">{passCount}</p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-warning/10">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Warnings</p>
            <p className="text-2xl font-bold">{warningCount}</p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-destructive/10">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Failed</p>
            <p className="text-2xl font-bold">{failCount}</p>
          </div>
        </Card>
      </div>

      {/* Audit Items by Category */}
      {categories.map(category => (
        <Card key={category} className="p-6">
          <div className="flex items-center gap-2 mb-4">
            {getCategoryIcon(category)}
            <h3 className="font-semibold">{category}</h3>
          </div>
          
          <div className="space-y-3">
            {mockAuditItems
              .filter(item => item.category === category)
              .map(item => (
                <div 
                  key={item.id} 
                  className="flex items-start justify-between gap-4 p-3 rounded-lg bg-muted/10 border border-border/50"
                >
                  <div className="flex items-start gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
