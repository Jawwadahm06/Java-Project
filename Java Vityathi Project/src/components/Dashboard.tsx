import { Student, Course, Enrollment, DashboardStats } from '@/types';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, UserPlus, TrendingUp, GraduationCap, Award } from 'lucide-react';
import { calculateGPA } from '@/utils/gradeCalculator';

interface DashboardProps {
  students: Student[];
  courses: Course[];
  enrollments: Enrollment[];
}

export function Dashboard({ students, courses, enrollments }: DashboardProps) {
  const stats: DashboardStats = {
    totalStudents: students.length,
    totalCourses: courses.length,
    totalEnrollments: enrollments.length,
    averageGPA: students.reduce((sum, student) => sum + (student.gpa || 0), 0) / students.length || 0,
  };

  const activeStudents = students.filter(s => s.status === 'active').length;
  const recentEnrollments = enrollments.filter(e => {
    const enrollmentDate = new Date(e.enrollmentDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return enrollmentDate >= thirtyDaysAgo;
  }).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Academic management system overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={BookOpen}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Active Enrollments"
          value={stats.totalEnrollments}
          icon={UserPlus}
          color="orange"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Average GPA"
          value={stats.averageGPA.toFixed(2)}
          icon={TrendingUp}
          color="purple"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">New Enrollments</p>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </div>
                <div className="text-2xl font-bold text-primary">{recentEnrollments}</div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Active Students</p>
                  <p className="text-sm text-muted-foreground">Currently enrolled</p>
                </div>
                <div className="text-2xl font-bold text-academic-green">{activeStudents}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performing Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students
                .filter(s => s.gpa)
                .sort((a, b) => (b.gpa || 0) - (a.gpa || 0))
                .slice(0, 3)
                .map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{student.fullName}</p>
                        <p className="text-sm text-muted-foreground">{student.regNo}</p>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-academic-green">
                      {student.gpa?.toFixed(2)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}