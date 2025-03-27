export interface ResumeData {
  metadata: {
    template: string;
    layout: Array<Array<string>>;
    css: {
      visible: boolean;
      value: string;
    };
  };
  [key: string]: any;
}

export interface Resume {
  id: string;
  title: string;
  slug: string;
  data: ResumeData;
  visibility: 'public' | 'private';
  locked: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  statistics?: Statistics;
}

export interface Statistics {
  id: string;
  views: number;
  downloads: number;
  resumeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  picture?: string;
  username: string;
  email: string;
  locale: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}