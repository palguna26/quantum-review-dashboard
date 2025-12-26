import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Workflow, CheckCircle2, GitPullRequest, TrendingUp, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <Workflow className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold tracking-tight">RevFlo</span>
          </div>
          
          <Button asChild size="sm">
            <a href="/auth/github">
              <Github className="mr-2 h-4 w-4" />
              Sign in
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-6 pt-24 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Enterprise Code Review
          </p>
          
          <h1 className="text-4xl sm:text-5xl font-semibold mb-6 leading-tight tracking-tight">
            Streamline your code review workflow
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Intelligent checklists, automated PR validation, and quality metrics. 
            Built for teams that ship quality code.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button asChild size="lg">
              <a href="/auth/github">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            
            <Button asChild size="lg" variant="outline">
              <Link to="/dashboard">
                View demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Smart Checklists"
              description="AI-generated quality checklists for comprehensive coverage of testing requirements."
            />
            <FeatureCard
              icon={<GitPullRequest className="h-5 w-5" />}
              title="PR Validation"
              description="Automated validation against issue checklists with detailed coverage analysis."
            />
            <FeatureCard
              icon={<TrendingUp className="h-5 w-5" />}
              title="Health Metrics"
              description="Real-time code health scores to maintain standards across your codebase."
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Security Analysis"
              description="Identify security issues and code smells with actionable recommendations."
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Test Suggestions"
              description="AI-powered test generation with ready-to-use code snippets."
            />
            <FeatureCard
              icon={<Github className="h-5 w-5" />}
              title="GitHub Integration"
              description="Seamless webhooks for automatic processing of issues and PRs."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-6 pb-24">
        <Card className="mx-auto max-w-2xl border-border/50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-3 tracking-tight">Ready to get started?</h2>
            <p className="text-muted-foreground mb-6">
              Join teams using RevFlo to ship higher quality code.
            </p>
            <Button asChild>
              <a href="/auth/github">
                <Github className="mr-2 h-4 w-4" />
                Sign in with GitHub
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <Card className="border-border/50 transition-colors hover:border-border">
    <CardContent className="p-5">
      <div className="mb-3 text-primary">{icon}</div>
      <h3 className="font-medium mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

export default Landing;
