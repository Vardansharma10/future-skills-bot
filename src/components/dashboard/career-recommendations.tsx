import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, TrendingUp, DollarSign, Clock, Target } from "lucide-react";

interface CareerRecommendationsProps {
  className?: string;
}

const careerPaths = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    match: 92,
    salary: "$120k - $160k",
    demand: "High",
    timeToRole: "6-12 months",
    description: "Lead development of scalable web applications using modern frameworks",
    requiredSkills: ["React", "Node.js", "TypeScript", "System Design"],
    skillGaps: ["System Design", "Advanced React Patterns"],
    growth: "+15%"
  },
  {
    id: 2,
    title: "AI/ML Engineer",
    match: 68,
    salary: "$140k - $200k",
    demand: "Very High",
    timeToRole: "12-18 months",
    description: "Develop and deploy machine learning models at scale",
    requiredSkills: ["Python", "TensorFlow", "MLOps", "Statistics"],
    skillGaps: ["Machine Learning", "Statistics", "MLOps"],
    growth: "+22%"
  },
  {
    id: 3,
    title: "DevOps Engineer",
    match: 75,
    salary: "$110k - $150k",
    demand: "High",
    timeToRole: "8-14 months",
    description: "Automate infrastructure and improve deployment processes",
    requiredSkills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    skillGaps: ["Kubernetes", "Advanced AWS"],
    growth: "+18%"
  }
];

const getDemandColor = (demand: string) => {
  switch (demand) {
    case "Very High": return "text-success bg-success/10";
    case "High": return "text-warning bg-warning/10";
    default: return "text-muted-foreground bg-muted";
  }
};

export function CareerRecommendations({ className }: CareerRecommendationsProps) {
  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
            <Target className="w-3 h-3 text-white" />
          </div>
          Career Path Recommendations
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {careerPaths.map((career) => (
          <Card key={career.id} className="card-interactive border-border/50 hover:shadow-md">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{career.title}</h3>
                    <p className="text-sm text-muted-foreground">{career.description}</p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${getDemandColor(career.demand)} font-medium`}
                  >
                    {career.demand} Demand
                  </Badge>
                </div>

                {/* Match Score */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Match Score</span>
                    <span className="font-semibold text-primary">{career.match}%</span>
                  </div>
                  <Progress value={career.match} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-success" />
                    <div>
                      <p className="font-medium">{career.salary}</p>
                      <p className="text-xs text-muted-foreground">Salary Range</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-warning" />
                    <div>
                      <p className="font-medium">{career.timeToRole}</p>
                      <p className="text-xs text-muted-foreground">Time to Role</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">{career.growth}</p>
                      <p className="text-xs text-muted-foreground">Growth Rate</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-medium mb-2 text-sm">Skills Needed</h4>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {career.requiredSkills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <h4 className="font-medium mb-2 text-sm">Skill Gaps to Address</h4>
                  <div className="flex flex-wrap gap-1">
                    {career.skillGaps.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="text-xs bg-warning/10 text-warning"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full gradient-primary hover:opacity-90">
                  View Career Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}