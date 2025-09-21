import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { Brain } from "lucide-react";

interface SkillRadarProps {
  className?: string;
}

const skillData = [
  { skill: "Frontend", current: 85, target: 95 },
  { skill: "Backend", current: 75, target: 85 },
  { skill: "DevOps", current: 60, target: 80 },
  { skill: "Mobile", current: 45, target: 70 },
  { skill: "AI/ML", current: 30, target: 75 },
  { skill: "Design", current: 55, target: 65 },
];

export function SkillRadar({ className }: SkillRadarProps) {
  return (
    <Card className={`card-interactive ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
            <Brain className="w-3 h-3 text-white" />
          </div>
          Skills Assessment
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillData}>
              <PolarGrid 
                stroke="hsl(var(--border))" 
                strokeWidth={1}
                className="opacity-50"
              />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                className="text-xs"
              />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickCount={5}
              />
              <Radar
                name="Current Level"
                dataKey="current"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Target Level"
                dataKey="target"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span>Current Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-secondary bg-secondary/20"></div>
            <span>Target Level</span>
          </div>
        </div>

        <div className="mt-6 p-3 rounded-lg bg-muted/50 border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Next Focus:</strong> Based on your goals, 
            prioritize AI/ML and Mobile development to reach your target skill levels.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}