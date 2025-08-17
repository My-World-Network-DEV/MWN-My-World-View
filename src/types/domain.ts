export interface Motion {
  id: string;
  issue_id: string;
  title: string;
  description: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Issue {
  id: string;
  topic_id: string;
  title: string;
  description: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Census5 {
  counts: { 1: number; 2: number; 3: number; 4: number; 5: number };
  total: number;
  percentages?: { 1: number; 2: number; 3: number; 4: number; 5: number };
}

export type MotionWithIssue = Motion & { issue: Pick<Issue, 'id' | 'title'> };
export type IssueWithMotions = Issue & { motions: (Motion & { census: Census5 })[] };


