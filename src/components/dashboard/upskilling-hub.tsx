import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, Award, Clock, Star, Users } from "lucide-react";

interface UpskillingHubProps {
  className?: string;
}

const courses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    provider: "Tech Academy",
    duration: "8 hours",
    level: "Intermediate",
    rating: 4.8,
    students: "12.5k",
    price: "$79",
    skills: ["React", "JavaScript", "Performance"],
    description: "Master advanced React patterns and optimization techniques",
    isRecommended: true
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    provider: "AI Institute",
    duration: "24 hours",
    level: "Beginner",
    rating: 4.9,
    students: "45.2k",
    price: "$129",
    skills: ["Python", "ML", "Statistics"],
    description: "Complete introduction to machine learning concepts and applications",
    isRecommended: true
  },
  {
    id: 3,
    title: "AWS Solutions Architect",
    provider: "Cloud Masters",
    duration: "32 hours",
    level: "Advanced",
    rating: 4.7,
    students: "8.9k",
    price: "$199",
    skills: ["AWS", "Cloud", "Architecture"],
    description: "Comprehensive AWS architecture and best practices",
    isRecommended: false
  }
];

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    difficulty: "Intermediate",
    duration: "3-4 weeks",
    skills: ["React", "Node.js", "Database"],
    description: "Build a full-stack e-commerce platform with payment integration"
  },
  {
    id: 2,
    title: "AI Chatbot",
    difficulty: "Advanced",
    duration: "2-3 weeks",
    skills: ["Python", "NLP", "API"],
    description: "Create an intelligent chatbot using natural language processing"
  }
];

const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    provider: "Amazon",
    validity: "3 years",
    difficulty: "Professional",
    examFee: "$300",
    passingScore: "720/1000"
  },
  {
    id: 2,
    title: "React Developer Certification",
    provider: "Meta",
    validity: "2 years",
    difficulty: "Intermediate",
    examFee: "$150",
    passingScore: "80%"
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner": return "bg-success/10 text-success";
    case "Intermediate": return "bg-warning/10 text-warning";
    case "Advanced": return "bg-destructive/10 text-destructive";
    default: return "bg-muted text-muted-foreground";
  }
};

export function UpskillingHub({ className }: UpskillingHubProps) {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
            <BookOpen className="w-3 h-3 text-white" />
          </div>
          Upskilling Hub
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-4 mt-4">
            {courses.map((course) => (
              <Card key={course.id} className="card-interactive border-border/50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{course.title}</h3>
                          {course.isRecommended && (
                            <Badge className="bg-primary/10 text-primary text-xs">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                        <p className="text-sm font-medium text-muted-foreground">{course.provider}</p>
                      </div>
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {course.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg text-primary">{course.price}</span>
                      <Button size="sm" className="gradient-primary hover:opacity-90">
                        <Play className="w-4 h-4 mr-1" />
                        Start Course
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 mt-4">
            {projects.map((project) => (
              <Card key={project.id} className="card-interactive border-border/50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <Badge className={getLevelColor(project.difficulty)}>
                        {project.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button size="sm" variant="outline" className="w-full hover:bg-primary/10">
                      Start Building
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4 mt-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="card-interactive border-border/50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{cert.title}</h3>
                        <p className="text-sm font-medium text-muted-foreground">{cert.provider}</p>
                      </div>
                      <Badge className={getLevelColor(cert.difficulty)}>
                        {cert.difficulty}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Exam Fee:</span>
                        <span className="ml-2 font-medium">{cert.examFee}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Valid for:</span>
                        <span className="ml-2 font-medium">{cert.validity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Passing Score:</span>
                        <span className="ml-2 font-medium">{cert.passingScore}</span>
                      </div>
                    </div>

                    <Button size="sm" variant="outline" className="w-full hover:bg-primary/10">
                      <Award className="w-4 h-4 mr-1" />
                      Prepare for Exam
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}