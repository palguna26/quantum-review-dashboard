import type { User, RepoSummary, Issue, PRDetail, Notification } from '@/types/api';

const API_BASE = '/api';

// Mock data for development
const mockUser: User = {
  id: '1',
  login: 'quantum-dev',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=quantum',
  name: 'Quantum Developer',
  email: 'dev@quantum.io',
  managed_repos: ['quantum/core', 'quantum/ui', 'quantum/api'],
};

const mockRepos: RepoSummary[] = [
  {
    repo_full_name: 'quantum/core',
    owner: 'quantum',
    name: 'core',
    health_score: 92,
    is_installed: true,
    pr_count: 5,
    issue_count: 12,
    last_activity: '2 hours ago',
  },
  {
    repo_full_name: 'quantum/ui',
    owner: 'quantum',
    name: 'ui',
    health_score: 88,
    is_installed: true,
    pr_count: 3,
    issue_count: 8,
    last_activity: '5 hours ago',
  },
  {
    repo_full_name: 'quantum/api',
    owner: 'quantum',
    name: 'api',
    health_score: 85,
    is_installed: false,
    pr_count: 2,
    issue_count: 15,
    last_activity: '1 day ago',
  },
];

export const api = {
  async getMe(): Promise<User> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUser), 300);
    });
  },

  async getRepos(): Promise<RepoSummary[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRepos), 400);
    });
  },

  async getRepo(owner: string, repo: string): Promise<RepoSummary> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = mockRepos.find(r => r.owner === owner && r.name === repo);
        resolve(found || mockRepos[0]);
      }, 300);
    });
  },

  async getIssues(owner: string, repo: string): Promise<Issue[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockIssues: Issue[] = [
          {
            issue_number: 42,
            title: 'Add authentication middleware',
            status: 'completed',
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-01-15T14:30:00Z',
            checklist_summary: { total: 5, passed: 4, failed: 0, pending: 1 },
            github_url: `https://github.com/${owner}/${repo}/issues/42`,
          },
          {
            issue_number: 38,
            title: 'Optimize database queries',
            status: 'processing',
            created_at: '2024-01-14T09:00:00Z',
            updated_at: '2024-01-15T11:00:00Z',
            checklist_summary: { total: 6, passed: 2, failed: 1, pending: 3 },
            github_url: `https://github.com/${owner}/${repo}/issues/38`,
          },
        ];
        resolve(mockIssues);
      }, 400);
    });
  },

  async getIssue(owner: string, repo: string, issueNumber: number): Promise<Issue> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockIssue: Issue = {
          issue_number: issueNumber,
          title: 'Add authentication middleware',
          status: 'completed',
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T14:30:00Z',
          checklist_summary: { total: 5, passed: 4, failed: 0, pending: 1 },
          checklist: [
            { id: 'c1', text: 'Unit tests for auth flow', required: true, status: 'passed', linked_tests: ['test-1', 'test-2'] },
            { id: 'c2', text: 'Integration tests with JWT', required: true, status: 'passed', linked_tests: ['test-3'] },
            { id: 'c3', text: 'Error handling for invalid tokens', required: true, status: 'passed', linked_tests: ['test-4'] },
            { id: 'c4', text: 'Documentation updated', required: false, status: 'pending', linked_tests: [] },
            { id: 'c5', text: 'Security review completed', required: true, status: 'passed', linked_tests: ['test-5'] },
          ],
          github_url: `https://github.com/${owner}/${repo}/issues/${issueNumber}`,
        };
        resolve(mockIssue);
      }, 300);
    });
  },

  async regenerateChecklist(owner: string, repo: string, issueNumber: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  },

  async getPR(owner: string, repo: string, prNumber: number): Promise<PRDetail> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockPR: PRDetail = {
          pr_number: prNumber,
          title: 'Implement user authentication',
          author: 'quantum-dev',
          created_at: '2024-01-15T10:00:00Z',
          health_score: 92,
          validation_status: 'validated',
          manifest: {
            checklist_items: [
              { id: 'c1', text: 'Unit tests for auth', required: true, status: 'passed', linked_tests: ['test-1', 'test-2'] },
              { id: 'c2', text: 'Integration tests', required: true, status: 'passed', linked_tests: ['test-3'] },
              { id: 'c3', text: 'Error handling', required: true, status: 'passed', linked_tests: ['test-4'] },
            ],
          },
          test_results: [
            { test_id: 'test-1', name: 'auth.login.success', status: 'passed', duration_ms: 120, checklist_ids: ['c1'] },
            { test_id: 'test-2', name: 'auth.login.invalid', status: 'passed', duration_ms: 95, checklist_ids: ['c1'] },
            { test_id: 'test-3', name: 'auth.jwt.verify', status: 'passed', duration_ms: 150, checklist_ids: ['c2'] },
            { test_id: 'test-4', name: 'auth.error.handler', status: 'passed', duration_ms: 80, checklist_ids: ['c3'] },
          ],
          code_health: [
            {
              id: 'ch1',
              severity: 'medium',
              category: 'Security',
              message: 'Consider rate limiting on login endpoint',
              file_path: 'src/auth/controller.ts',
              line_number: 45,
              suggestion: 'Add rate limiting middleware to prevent brute force attacks',
            },
            {
              id: 'ch2',
              severity: 'low',
              category: 'Performance',
              message: 'Database query could be optimized',
              file_path: 'src/auth/service.ts',
              line_number: 78,
              suggestion: 'Add index on user email field',
            },
          ],
          coverage_advice: [
            {
              file_path: 'src/auth/middleware.ts',
              lines: [23, 24, 25],
              suggestion: 'Add test for token refresh edge case',
            },
          ],
          suggested_tests: [
            {
              test_id: 'st1',
              name: 'test_token_refresh_edge_case',
              framework: 'jest',
              target: 'src/auth/middleware.ts',
              checklist_ids: ['c1'],
              snippet: `test('should handle token refresh when near expiry', async () => {\n  const token = generateExpiringSoonToken();\n  const result = await middleware.refresh(token);\n  expect(result.success).toBe(true);\n});`,
            },
          ],
          github_url: `https://github.com/${owner}/${repo}/pull/${prNumber}`,
        };
        resolve(mockPR);
      }, 400);
    });
  },

  async revalidatePR(owner: string, repo: string, prNumber: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 600);
    });
  },

  async getNotifications(): Promise<Notification[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockNotifications: Notification[] = [
          {
            id: '1',
            type: 'success',
            message: 'PR #42 validation completed',
            repo_full_name: 'quantum/core',
            created_at: '2024-01-15T14:30:00Z',
            read: false,
          },
          {
            id: '2',
            type: 'info',
            message: 'New issue checklist generated',
            repo_full_name: 'quantum/ui',
            created_at: '2024-01-15T12:00:00Z',
            read: true,
          },
        ];
        resolve(mockNotifications);
      }, 300);
    });
  },
};
