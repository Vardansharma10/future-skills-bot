import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, MapPin, Briefcase, GraduationCap, Star } from "lucide-react";

interface UserProfileProps {
  className?: string;
}

export function UserProfile({ className }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    title: "Software Developer",
    location: "San Francisco, CA",
    education: "B.S. Computer Science",
    experience: "3 years",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
    interests: ["AI/ML", "Cloud Computing", "Mobile Development"]
  });

  const skillLevels = {
    "React": 85,
    "TypeScript": 78,
    "Node.js": 82,
    "Python": 75,
    "AWS": 65
  };

  return (
    <Card className={`card-interactive ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
              <Star className="w-3 h-3 text-white" />
            </div>
            Profile & Skills Overview
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="hover:bg-primary/10"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border-2 border-primary/20">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="gradient-primary text-white font-semibold">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            {isEditing ? (
              <Input
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="font-semibold text-xl"
              />
            ) : (
              <h2 className="font-semibold text-xl">{profile.name}</h2>
            )}
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{profile.title}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-muted/50 border">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Education</span>
            </div>
            <p className="text-sm text-muted-foreground">{profile.education}</p>
          </div>
          
          <div className="p-3 rounded-lg bg-muted/50 border">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Experience</span>
            </div>
            <p className="text-sm text-muted-foreground">{profile.experience}</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-medium mb-3">Core Skills</h3>
          <div className="space-y-3">
            {Object.entries(skillLevels).map(([skill, level]) => (
              <div key={skill} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{skill}</span>
                  <span className="text-muted-foreground">{level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-primary transition-all duration-1000 ease-out"
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <h3 className="font-medium mb-3">Learning Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <Badge 
                key={interest} 
                variant="secondary" 
                className="bg-secondary/10 text-secondary hover:bg-secondary/20"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}