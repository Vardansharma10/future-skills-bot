import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Award, Target, Flame } from "lucide-react";

interface ProgressTrackerProps {
  className?: string;
}

const skillProgressData = [
  { month: "Jan", React: 70, Python: 45, AWS: 30 },
  { month: "Feb", React: 75, Python: 50, AWS: 35 },
  { month: "Mar", React: 80, Python: 55, AWS: 45 },
  { month: "Apr", React: 82, Python: 65, AWS: 50 },
  { month: "May", React: 85, Python: 70, AWS: 60 },
  { month: "Jun", React: 85, Python: 75, AWS: 65 },
];

const achievementData = [
  { category: "Courses", completed: 12, total: 15 },
  { category: "Projects", completed: 4, total: 6 },
  { category: "Certifications", completed: 2, total: 4 },
];

const badges = [
  { 
    id: 1, 
    title: "React Expert", 
    description: "Completed 5+ React courses", 
    earned: true,
    icon: "🚀"
  },
  { 
    id: 2, 
    title: "Fast Learner", 
    description: "Gained 20+ skill points in a month", 
    earned: true,
    icon: "⚡"
  },
  { 
    id: 3, 
    title: "Project Builder", 
    description: "Built 3+ portfolio projects", 
    earned: false,
    icon: "🏗️"
  },
  { 
    id: 4, 
    title: "AI Pioneer", 
    description: "Complete ML certification", 
    earned: false,
    icon: "🤖"
  }
];

const milestones = [
  { title: "First Certification", completed: true, date: "March 2024" },
  { title: "10 Skills Mastered", completed: true, date: "April 2024" },
  { title: "Portfolio Project", completed: true, date: "May 2024" },
  { title: "Senior Level Skills", completed: false, date: "Target: Aug 2024" },
  { title: "Dream Job Ready", completed: false, date: "Target: Dec 2024" }
];

export function ProgressTracker({ className }: ProgressTrackerProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Skill Growth Chart */}
      <Card className="card-interactive">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-white" />
            </div>
            Skill Growth Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={skillProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="React" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Python" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="AWS" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievement Progress */}
        <Card className="card-interactive">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-success flex items-center justify-center">
                <Target className="w-3 h-3 text-white" />
              </div>
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievementData.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-muted-foreground">
                    {item.completed}/{item.total}
                  </span>
                </div>
                <Progress 
                  value={(item.completed / item.total) * 100} 
                  className="h-2"
                />
              </div>
            ))}
            
            <div className="mt-6 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-success" />
                <span className="font-medium text-success">Learning Streak</span>
              </div>
              <p className="text-sm text-success/80">
                15 days of consistent learning! Keep it up!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Badges & Achievements */}
        <Card className="card-interactive">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-warning flex items-center justify-center">
                <Award className="w-3 h-3 text-white" />
              </div>
              Badges & Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                    badge.earned 
                      ? "bg-success/10 border-success/20 hover:bg-success/20" 
                      : "bg-muted/50 border-border opacity-60"
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <h4 className={`font-medium text-sm ${badge.earned ? "text-success" : "text-muted-foreground"}`}>
                    {badge.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card className="card-interactive">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-secondary flex items-center justify-center">
              <Target className="w-3 h-3 text-white" />
            </div>
            Career Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                  milestone.completed 
                    ? "bg-success border-success" 
                    : "border-border bg-background"
                }`}>
                  {milestone.completed && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${milestone.completed ? "text-foreground" : "text-muted-foreground"}`}>
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{milestone.date}</p>
                </div>
                {milestone.completed && (
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    ✓ Complete
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}