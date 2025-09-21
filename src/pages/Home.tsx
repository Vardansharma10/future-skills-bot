import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Users, BookOpen, Briefcase, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Target,
      title: "Skill Analysis",
      description: "Discover skill gaps and get personalized improvement suggestions",
      href: "/analyze-skills"
    },
    {
      icon: Users,
      title: "Career Recommendations", 
      description: "Find career paths that match your skills and interests",
      href: "/careers"
    },
    {
      icon: BookOpen,
      title: "Course Suggestions",
      description: "Access curated courses from top learning platforms",
      href: "/courses"
    },
    {
      icon: Briefcase,
      title: "Job Matching",
      description: "Find relevant job opportunities in real-time",
      href: "/jobs"
    },
    {
      icon: MessageSquare,
      title: "Interview Practice",
      description: "Practice with AI-powered mock interviews",
      href: "/interview"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Personalized AI Career Mentor
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Navigate your career journey with AI-powered insights. Analyze your skills, 
            discover opportunities, and accelerate your professional growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/analyze-skills">
                Get Started
                <Target className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/careers">
                Explore Careers
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-background/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Succeed
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-interactive group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                      <Link to={feature.href} className="text-primary hover:text-primary/80">
                        Learn More →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;