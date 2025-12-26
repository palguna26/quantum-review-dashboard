import { Link } from 'react-router-dom';
import { Github, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RepoSwitcher } from './RepoSwitcher';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  user?: { login: string; avatar_url: string };
  repos?: Array<{ repo_full_name: string; owner: string; name: string }>;
}

export const Header = ({ user, repos }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5">
            <Workflow className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold tracking-tight">RevFlo</span>
          </Link>
          
          {user && repos && repos.length > 0 && (
            <RepoSwitcher repos={repos} />
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <img 
                src={user.avatar_url} 
                alt={user.login}
                className="h-8 w-8 rounded-full border-2 border-primary/50"
              />
              <span className="text-sm font-medium hidden sm:inline">{user.login}</span>
            </div>
          ) : (
            <Button asChild variant="default" className="btn-hero">
              <a href="/auth/github">
                <Github className="mr-2 h-4 w-4" />
                Sign in with GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
