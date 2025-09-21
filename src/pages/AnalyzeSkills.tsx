import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Target, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillAnalysis {
  current_skills: string[];
  missing_skills: string[];
  skill_level: string;
  recommendations: string[];
}

const AnalyzeSkills = () => {
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!skills.trim()) {
      toast({
        title: "Error",
        description: "Please enter your skills first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: skills.split(",").map(s => s.trim()).filter(s => s)
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze skills");
      }

      const data = await response.json();
      setAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: "Your skills have been analyzed successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to the backend. Make sure the API is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Target className="w-10 h-10 text-primary" />
          Skill Analysis
        </h1>
        <p className="text-muted-foreground text-lg">
          Enter your current skills and discover areas for improvement
        </p>
      </div>

      <Card className="card-interactive">
        <CardHeader>
          <CardTitle>Your Current Skills</CardTitle>
          <CardDescription>
            Enter your skills separated by commas (e.g., Python, React, SQL, Machine Learning)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              placeholder="Python, React, SQL, Machine Learning, Data Analysis..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-2"
            />
          </div>
          <Button onClick={handleAnalyze} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Target className="w-4 h-4 mr-2" />
                Analyze My Skills
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid gap-6">
          <Card className="border-success">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <TrendingUp className="w-5 h-5" />
                Current Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.current_skills.map((skill, index) => (
                  <Badge key={index} variant="default" className="bg-success text-success-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Skill Level: <span className="font-semibold text-foreground">{analysis.skill_level}</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-warning">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertCircle className="w-5 h-5" />
                Missing Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.missing_skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AnalyzeSkills;