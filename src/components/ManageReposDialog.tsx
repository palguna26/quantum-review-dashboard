import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Settings2, 
  Plus, 
  Trash2, 
  Search,
  ExternalLink,
  Check,
  Github
} from 'lucide-react';
import type { RepoSummary } from '@/types/api';

interface ManageReposDialogProps {
  repos: RepoSummary[];
  onAddRepo?: (repoFullName: string) => void;
  onRemoveRepo?: (repoFullName: string) => void;
}

// Mock available repos from GitHub that aren't added yet
const mockAvailableRepos = [
  { full_name: 'quantum/analytics', description: 'Analytics dashboard' },
  { full_name: 'quantum/mobile-app', description: 'React Native mobile application' },
  { full_name: 'quantum/docs', description: 'Documentation site' },
  { full_name: 'quantum/infra', description: 'Infrastructure as code' },
];

export const ManageReposDialog = ({ repos, onAddRepo, onRemoveRepo }: ManageReposDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'connected' | 'add'>('connected');

  const filteredConnectedRepos = repos.filter(repo =>
    repo.repo_full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAvailableRepos = mockAvailableRepos.filter(repo =>
    repo.full_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !repos.some(r => r.repo_full_name === repo.full_name)
  );

  const handleRemoveRepo = (repoFullName: string) => {
    onRemoveRepo?.(repoFullName);
  };

  const handleAddRepo = (repoFullName: string) => {
    onAddRepo?.(repoFullName);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings2 className="h-4 w-4 mr-2" />
          Manage Repositories
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Repositories</DialogTitle>
          <DialogDescription>
            Add or remove repositories from RevFlo. Changes will sync with your GitHub account.
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border pb-3">
          <Button
            variant={activeTab === 'connected' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('connected')}
          >
            Connected ({repos.length})
          </Button>
          <Button
            variant={activeTab === 'add' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('add')}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Repository
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={activeTab === 'connected' ? 'Search connected repos...' : 'Search available repos...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Connected Repositories */}
        {activeTab === 'connected' && (
          <ScrollArea className="h-[300px] pr-4">
            {filteredConnectedRepos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'No repositories match your search.' : 'No repositories connected yet.'}
                </p>
                {!searchQuery && (
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('add')}>
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add Repository
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredConnectedRepos.map((repo) => (
                  <Card key={repo.repo_full_name} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Github className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="font-mono text-sm truncate">{repo.repo_full_name}</span>
                        {repo.is_installed && (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{repo.pr_count} PRs</span>
                        <span>•</span>
                        <span>{repo.issue_count} Issues</span>
                        <span>•</span>
                        <span>Score: {repo.health_score}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                      >
                        <a 
                          href={`https://github.com/${repo.repo_full_name}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveRepo(repo.repo_full_name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        )}

        {/* Add Repository */}
        {activeTab === 'add' && (
          <ScrollArea className="h-[300px] pr-4">
            {filteredAvailableRepos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'No repositories match your search.' : 'All available repositories are already connected.'}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="https://github.com/apps/revflo/installations/new" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-1.5" />
                    Install on More Repos
                  </a>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredAvailableRepos.map((repo) => (
                  <Card key={repo.full_name} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Github className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="font-mono text-sm truncate">{repo.full_name}</span>
                      </div>
                      {repo.description && (
                        <p className="text-xs text-muted-foreground truncate">{repo.description}</p>
                      )}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddRepo(repo.full_name)}
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      Add
                    </Button>
                  </Card>
                ))}

                <Card className="p-4 border-dashed">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Don't see your repository? Install RevFlo on more repositories.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href="https://github.com/apps/revflo/installations/new" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-1.5" />
                        Configure GitHub App
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
