export interface Student {
  id: string;
  regNo: string;
  fullName: string;
  email: string;
  status: 'active' | 'inactive' | 'graduated';
  enrolledCourses: string[];
  enrollmentDate: Date;
  dateOfBirth: Date;
  gpa?: number;
}

export interface Course {
  code: string;
  title: string;
  credits: number;
  instructor: string;
  semester: Semester;
  department: string;
  description?: string;
  maxStudents?: number;
  enrolledStudents: string[];
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseCode: string;
  enrollmentDate: Date;
  grade?: Grade;
  marks?: number;
}

export interface Transcript {
  studentId: string;
  enrollments: Enrollment[];
  gpa: number;
  totalCredits: number;
  generatedDate: Date;
}

export enum Semester {
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  FALL = 'FALL'
}

export enum Grade {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F'
}

export const GRADE_POINTS: Record<Grade, number> = {
  [Grade.S]: 10,
  [Grade.A]: 9,
  [Grade.B]: 8,
  [Grade.C]: 7,
  [Grade.D]: 6,
  [Grade.F]: 0
};

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  averageGPA: number;
}