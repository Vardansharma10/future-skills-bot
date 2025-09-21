import { UserProfile } from "@/components/dashboard/user-profile";
import { SkillRadar } from "@/components/dashboard/skill-radar";
import { CareerRecommendations } from "@/components/dashboard/career-recommendations";
import { UpskillingHub } from "@/components/dashboard/upskilling-hub";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, Sparkles } from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Skills Tracked", value: "12", icon: Target, change: "+2 this month" },
    { label: "Learning Hours", value: "48", icon: TrendingUp, change: "+12 this week" },
    { label: "Courses Completed", value: "8", icon: Sparkles, change: "+3 this month" },
    { label: "Network Connections", value: "156", icon: Users, change: "+24 this month" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl gradient-hero p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex! 🚀</h1>
          <p className="text-lg opacity-90 mb-4">
            Your AI-powered career advisor is ready to help you reach new heights
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              15-day learning streak 🔥
            </Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              3 new recommendations
            </Badge>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="card-interactive">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-success">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <UserProfile />
          <SkillRadar />
        </div>

        {/* Right Columns */}
        <div className="lg:col-span-2 space-y-6">
          <CareerRecommendations />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <UpskillingHub />
            <div>
              <ProgressTracker />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
