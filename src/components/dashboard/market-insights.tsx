import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Briefcase, DollarSign, Users, AlertTriangle } from "lucide-react";

interface MarketInsightsProps {
  className?: string;
}

const demandData = [
  { skill: "AI/ML", demand: 95, growth: "+25%" },
  { skill: "React", demand: 88, growth: "+18%" },
  { skill: "Python", demand: 85, growth: "+22%" },
  { skill: "AWS", demand: 82, growth: "+20%" },
  { skill: "DevOps", demand: 78, growth: "+15%" },
  { skill: "Mobile", demand: 65, growth: "+12%" },
];

const salaryTrends = [
  { role: "AI Engineer", junior: 120, mid: 160, senior: 220 },
  { role: "Full Stack", junior: 85, mid: 120, senior: 180 },
  { role: "DevOps", junior: 95, mid: 130, senior: 190 },
  { role: "Mobile Dev", junior: 80, mid: 110, senior: 160 },
];

const emergingRoles = [
  { title: "AI Product Manager", demand: "Very High", avgSalary: "$180k", growth: "+35%" },
  { title: "MLOps Engineer", demand: "High", avgSalary: "$170k", growth: "+40%" },
  { title: "Prompt Engineer", demand: "High", avgSalary: "$160k", growth: "+50%" },
  { title: "AR/VR Developer", demand: "Medium", avgSalary: "$140k", growth: "+28%" },
];

const getDemandColor = (demand: string) => {
  switch (demand) {
    case "Very High": return "text-destructive bg-destructive/10";
    case "High": return "text-warning bg-warning/10";
    case "Medium": return "text-success bg-success/10";
    default: return "text-muted-foreground bg-muted";
  }
};

export function MarketInsights({ className }: MarketInsightsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Skills Demand */}
      <Card className="card-interactive">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-white" />
            </div>
            Skills Market Demand
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="skill" 
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
                <Bar 
                  dataKey="demand" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {demandData.map((item) => (
              <div key={item.skill} className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                <span className="text-sm font-medium">{item.skill}</span>
                <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                  {item.growth}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Trends */}
        <Card className="card-interactive">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-success flex items-center justify-center">
                <DollarSign className="w-3 h-3 text-white" />
              </div>
              Salary Ranges by Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salaryTrends.map((role) => (
                <div key={role.role} className="space-y-2">
                  <h4 className="font-medium text-sm">{role.role}</h4>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Junior</span>
                    <div className="flex-1 bg-muted rounded-full h-2 relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-success rounded-full"
                        style={{ width: '30%' }}
                      />
                      <div 
                        className="absolute top-0 left-[30%] h-full bg-warning rounded-full"
                        style={{ width: '35%' }}
                      />
                      <div 
                        className="absolute top-0 left-[65%] h-full bg-destructive rounded-full"
                        style={{ width: '35%' }}
                      />
                    </div>
                    <span className="text-muted-foreground">Senior</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${role.junior}k</span>
                    <span>${role.mid}k</span>
                    <span>${role.senior}k</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emerging Roles */}
        <Card className="card-interactive">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-warning flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-white" />
              </div>
              Emerging Roles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergingRoles.map((role, index) => (
              <div key={index} className="p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">{role.title}</h4>
                  <Badge className={getDemandColor(role.demand)}>
                    {role.demand}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Avg. Salary:</span>
                  <span className="font-medium">{role.avgSalary}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Growth:</span>
                  <span className="font-medium text-success">{role.growth}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Predictions */}
      <Card className="card-interactive">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-secondary flex items-center justify-center">
              <AlertTriangle className="w-3 h-3 text-white" />
            </div>
            AI Predictions & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-medium text-primary">Hot Prediction</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI/ML roles are expected to grow 40% faster than average in the next 2 years. 
                Your current Python skills give you a head start.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-warning" />
                <span className="font-medium text-warning">Market Shift</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Remote-first companies are prioritizing cloud and DevOps skills. 
                Consider upskilling in AWS and Kubernetes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}