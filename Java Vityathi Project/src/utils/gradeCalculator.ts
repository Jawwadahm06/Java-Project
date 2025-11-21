import { Grade, GRADE_POINTS, Enrollment } from '@/types';

export function calculateGPA(enrollments: Enrollment[], courses: any[]): number {
  let totalGradePoints = 0;
  let totalCredits = 0;

  enrollments.forEach(enrollment => {
    if (enrollment.grade && enrollment.grade !== Grade.F) {
      const course = courses.find(c => c.code === enrollment.courseCode);
      if (course) {
        totalGradePoints += GRADE_POINTS[enrollment.grade] * course.credits;
        totalCredits += course.credits;
      }
    }
  });

  return totalCredits > 0 ? Number((totalGradePoints / totalCredits).toFixed(2)) : 0;
}

export function getGradeFromMarks(marks: number): Grade {
  if (marks >= 90) return Grade.S;
  if (marks >= 80) return Grade.A;
  if (marks >= 70) return Grade.B;
  if (marks >= 60) return Grade.C;
  if (marks >= 50) return Grade.D;
  return Grade.F;
}

export function getGradeColor(grade: Grade): string {
  switch (grade) {
    case Grade.S: return 'bg-academic-green text-white';
    case Grade.A: return 'bg-academic-blue text-white';
    case Grade.B: return 'bg-academic-purple text-white';
    case Grade.C: return 'bg-academic-orange text-white';
    case Grade.D: return 'bg-academic-red text-white';
    case Grade.F: return 'bg-destructive text-white';
    default: return 'bg-muted text-muted-foreground';
  }
}