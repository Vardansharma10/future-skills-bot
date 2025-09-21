import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, DollarSign, TrendingUp, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Career {
  title: string;
  description: string;
  required_skills: string[];
  salary_range: string;
  job_growth: string;
  learning_path: string[];
}

const CareerRecommendations = () => {
  const [formData, setFormData] = useState({
    skills: "",
    interests: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);
  const [careers, setCareers] = useState<Career[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.skills.trim() || !formData.interests.trim()) {
      toast({
        title: "Error",
        description: "Please fill in your skills and interests",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/recommend-careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: formData.skills.split(",").map(s => s.trim()).filter(s => s),
          interests: formData.interests.split(",").map(s => s.trim()).filter(s => s),
          budget: parseInt(formData.budget) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get career recommendations");
      }

      const data = await response.json();
      setCareers(data.careers || []);
      toast({
        title: "Recommendations Ready",
        description: `Found ${data.careers?.length || 0} career suggestions for you!`,
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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <User className="w-10 h-10 text-primary" />
          Career Recommendations
        </h1>
        <p className="text-muted-foreground text-lg">
          Get personalized career suggestions based on your profile
        </p>
      </div>

      <Card className="card-interactive">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Tell us about your skills, interests, and budget for learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  placeholder="Python, React, Data Analysis..."
                  value={formData.skills}
                  onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="interests">Interests</Label>
                <Input
                  id="interests"
                  placeholder="AI, Web Development, Finance..."
                  value={formData.interests}
                  onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="budget">Learning Budget</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your learning budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Free resources only</SelectItem>
                  <SelectItem value="500">Up to $500</SelectItem>
                  <SelectItem value="1000">Up to $1,000</SelectItem>
                  <SelectItem value="2000">Up to $2,000</SelectItem>
                  <SelectItem value="5000">$5,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Finding Careers...
                </>
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Get Recommendations
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {careers.length > 0 && (
        <div className="grid gap-6">
          <h2 className="text-2xl font-bold">Recommended Career Paths</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {careers.map((career, index) => (
              <Card key={index} className="card-interactive">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {career.title}
                    <TrendingUp className="w-5 h-5 text-success" />
                  </CardTitle>
                  <CardDescription>{career.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="font-semibold">Salary:</span>
                    <span>{career.salary_range}</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-semibold">Job Growth:</span>
                    <span className="ml-2 text-success">{career.job_growth}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-sm">Required Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {career.required_skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-sm">Learning Path:</span>
                    <ul className="mt-2 space-y-1">
                      {career.learning_path.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <a href="#" className="flex items-center gap-2">
                      View Roadmap
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerRecommendations;