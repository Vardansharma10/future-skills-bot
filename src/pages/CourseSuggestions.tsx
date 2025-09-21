import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, BookOpen, ExternalLink, Star, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  title: string;
  provider: string;
  duration: string;
  rating: number;
  level: string;
  price: string;
  url: string;
  description: string;
  skills: string[];
}

const CourseSuggestions = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/recommend-courses");
      
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      setCourses(data.courses || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch course recommendations. Make sure the API is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const getProviderLogo = (provider: string) => {
    const logos: { [key: string]: string } = {
      "Coursera": "🎓",
      "Udemy": "📚",
      "edX": "🏛️",
      "Pluralsight": "🔷",
      "LinkedIn Learning": "💼",
      "Khan Academy": "🦉",
    };
    return logos[provider] || "📖";
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-success/10 text-success border-success/20";
      case "intermediate":
        return "bg-warning/10 text-warning border-warning/20";
      case "advanced":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-20">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading course recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <BookOpen className="w-10 h-10 text-primary" />
          Course Suggestions
        </h1>
        <p className="text-muted-foreground text-lg">
          Curated courses from top learning platforms to boost your skills
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="card-interactive h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-2xl mb-2">{getProviderLogo(course.provider)}</div>
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {course.provider}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="text-lg font-bold text-primary">
                    {course.price}
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-muted-foreground">Skills you'll learn:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {course.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {course.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-auto" asChild>
                  <a 
                    href={course.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Enroll Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No courses available at the moment.</p>
          <Button onClick={fetchCourses} className="mt-4">
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseSuggestions;