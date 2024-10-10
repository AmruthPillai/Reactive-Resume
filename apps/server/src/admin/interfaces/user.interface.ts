export interface UserWithCount {
  name: string;
  email: string;
  _count: {
    resumes: number;
  };
}

export interface UserCountResumes extends Omit<UserWithCount, "_count"> {
  resumes: number;
}
