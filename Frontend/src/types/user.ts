export interface SocialLinks {
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
  codeClubRole: string;
  skills: string[];
  bio: string;
  social: SocialLinks;
  pastEvents: string[];
  yearOfPursuing: string;
  yearOfPassing: string;
  email: string;
} 