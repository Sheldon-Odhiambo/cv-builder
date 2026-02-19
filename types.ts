
export interface Education {
  id: string;
  institution: string;
  course: string;
  degree: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Employment {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface SkillEntry {
  id: string;
  name: string;
  description: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  category: 'Certificate' | 'Certification' | 'Diploma' | 'Bachelors' | 'Masters' | 'PhD';
  description: string;
  certificate_url?: string;
}

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    avatarUrl: string;
    bannerUrl: string;
    summary: string;
    mediaLinks: {
      linkedin: string;
      github: string;
      portfolio: string;
      twitter: string;
    };
  };
  education: Education[];
  employment: Employment[];
  skills: SkillEntry[];
  certificates: Certificate[];
}

export type TemplateType = 'modern' | 'classic' | 'minimal';
