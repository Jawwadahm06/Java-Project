import { 
  Users, 
  BookOpen, 
  UserPlus, 
  ClipboardList, 
  BarChart3, 
  Download, 
  Upload,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'enrollment', label: 'Enrollment', icon: UserPlus },
  { id: 'grades', label: 'Grades', icon: ClipboardList },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'import-export', label: 'Import/Export', icon: Download },
];

export function Sidebar({ isOpen, activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className={cn(
      "bg-card border-r border-border h-screen transition-all duration-300",
      isOpen ? "w-64" : "w-0 md:w-16"
    )}>
      <div className="p-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  !isOpen && "md:px-2",
                  isActive && "bg-primary text-primary-foreground"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {(isOpen || window.innerWidth < 768) && (
                  <span className="truncate">{item.label}</span>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}