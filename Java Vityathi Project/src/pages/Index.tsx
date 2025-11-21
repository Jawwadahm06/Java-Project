import { useState } from 'react';
import { Student, Course, Enrollment, Semester } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { StudentList } from '@/components/students/StudentList';
import { StudentForm } from '@/components/students/StudentForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { calculateGPA } from '@/utils/gradeCalculator';

const Index = () => {
  const [students, setStudents] = useLocalStorage<Student[]>('ccrm-students', []);
  const [courses, setCourses] = useLocalStorage<Course[]>('ccrm-courses', []);
  const [enrollments, setEnrollments] = useLocalStorage<Enrollment[]>('ccrm-enrollments', []);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showStudentForm, setShowStudentForm] = useState(false);

  // Sample data initialization
  useState(() => {
    if (students.length === 0 && courses.length === 0) {
      const sampleCourses: Course[] = [
        {
          code: 'CS101',
          title: 'Introduction to Computer Science',
          credits: 3,
          instructor: 'Dr. Smith',
          semester: Semester.FALL,
          department: 'Computer Science',
          description: 'Basic concepts of programming and algorithms',
          maxStudents: 50,
          enrolledStudents: []
        },
        {
          code: 'MATH201',
          title: 'Calculus II',
          credits: 4,
          instructor: 'Prof. Johnson',
          semester: Semester.SPRING,
          department: 'Mathematics',
          description: 'Advanced calculus concepts',
          maxStudents: 40,
          enrolledStudents: []
        }
      ];

      const sampleStudents: Student[] = [
        {
          id: '1',
          regNo: 'STU001',
          fullName: 'John Doe',
          email: 'john.doe@university.edu',
          status: 'active',
          enrolledCourses: ['CS101'],
          enrollmentDate: new Date('2024-01-15'),
          dateOfBirth: new Date('2000-05-15'),
          gpa: 8.5
        },
        {
          id: '2',
          regNo: 'STU002',
          fullName: 'Jane Smith',
          email: 'jane.smith@university.edu',
          status: 'active',
          enrolledCourses: ['CS101', 'MATH201'],
          enrollmentDate: new Date('2024-01-20'),
          dateOfBirth: new Date('1999-12-10'),
          gpa: 9.2
        }
      ];

      setCourses(sampleCourses);
      setStudents(sampleStudents);
    }
  });

  const handleSaveStudent = (studentData: Omit<Student, 'id'>) => {
    if (editingStudent) {
      const updatedStudents = students.map(s => 
        s.id === editingStudent.id ? { ...studentData, id: editingStudent.id } : s
      );
      setStudents(updatedStudents);
      toast.success('Student updated successfully');
    } else {
      const newStudent: Student = {
        ...studentData,
        id: Date.now().toString(),
      };
      setStudents([...students, newStudent]);
      toast.success('Student added successfully');
    }
    setShowStudentForm(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId));
    toast.success('Student deleted successfully');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard students={students} courses={courses} enrollments={enrollments} />;
      
      case 'students':
        if (showStudentForm) {
          return (
            <StudentForm
              student={editingStudent}
              onSave={handleSaveStudent}
              onCancel={() => {
                setShowStudentForm(false);
                setEditingStudent(null);
              }}
            />
          );
        }
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Students</h2>
                <p className="text-muted-foreground">Manage student records and profiles</p>
              </div>
              <Button onClick={() => setShowStudentForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>
            <StudentList
              students={students}
              onEdit={(student) => {
                setEditingStudent(student);
                setShowStudentForm(true);
              }}
              onView={(student) => toast.info(`Viewing ${student.fullName}`)}
              onDelete={handleDeleteStudent}
            />
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">This feature is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
