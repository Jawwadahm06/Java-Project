import { Student } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, Trash2, UserCircle } from 'lucide-react';
import { format } from 'date-fns';

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

export function StudentList({ students, onEdit, onView, onDelete }: StudentListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {students.map((student) => (
        <Card key={student.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{student.fullName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{student.regNo}</p>
                </div>
              </div>
              <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                {student.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{student.email}</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Enrolled Courses</p>
              <p className="font-medium">{student.enrolledCourses.length}</p>
            </div>
            {student.gpa && (
              <div className="text-sm">
                <p className="text-muted-foreground">GPA</p>
                <p className="font-medium">{student.gpa.toFixed(2)}</p>
              </div>
            )}
            <div className="text-sm">
              <p className="text-muted-foreground">Enrolled Since</p>
              <p className="font-medium">{format(new Date(student.enrollmentDate), 'MMM dd, yyyy')}</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => onView(student)}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" onClick={() => onEdit(student)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline" onClick={() => onDelete(student.id)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}