
import { CVData } from './types';

export const INITIAL_CV_DATA: CVData = {
  personalInfo: {
    fullName: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 012-3456',
    address: 'San Francisco, CA',
    avatarUrl: '',
    bannerUrl: '',
    summary: 'Dedicated Computer Science student with a passion for building scalable web applications. Strong foundation in full-stack development and machine learning.',
    mediaLinks: {
      linkedin: 'linkedin.com/in/alexrivera',
      github: 'github.com/arivera',
      portfolio: 'alexrivera.dev',
      twitter: '',
    }
  },
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'B.S.',
      course: 'Computer Science',
      startDate: '2021-09',
      endDate: '2025-06',
      current: true
    }
  ],
  employment: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      role: 'Software Engineering Intern',
      startDate: '2023-06',
      endDate: '2023-08',
      current: false,
      description: 'Collaborated with the backend team to optimize API performance by 30%. Implemented new features using React and Node.js.'
    }
  ],
  skills: [
    { id: '1', name: 'React', proficiency: 'Expert', description: 'Advanced UI development and state management.' },
    { id: '2', name: 'TypeScript', proficiency: 'Advanced', description: 'Type-safe scalable application development.' }
  ],
  certificates: [
    {
      id: '1',
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      issue_date: '2023-10-12',
      category: 'Certification',
      description: 'Expertise in building and deploying cloud applications on AWS.'
    }
  ],
};
