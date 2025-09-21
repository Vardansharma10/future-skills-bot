import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Briefcase, MapPin, DollarSign, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  posted_date: string;
  apply_url: string;
}

const JobMatching = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/job-matching");
      
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch job listings. Make sure the API is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-success/10 text-success border-success/20";
      case "part-time":
        return "bg-warning/10 text-warning border-warning/20";
      case "contract":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "remote":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-20">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Finding matching job opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Briefcase className="w-10 h-10 text-primary" />
          Job Matching
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover job opportunities that match your skills and interests
        </p>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Available Opportunities</h2>
            <Badge variant="outline" className="px-3 py-1">
              {jobs.length} jobs found
            </Badge>
          </div>

          <div className="grid gap-6">
            {jobs.map((job, index) => (
              <Card key={index} className="card-interactive">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-foreground">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge className={getJobTypeColor(job.type)}>
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold text-primary">{job.salary}</span>
                    </div>
                    <div className="text-xs">
                      Posted: {job.posted_date}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed">
                    {job.description}
                  </p>

                  <div>
                    <span className="text-sm font-semibold mb-2 block">Requirements:</span>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, reqIndex) => (
                        <Badge key={reqIndex} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1" asChild>
                      <a 
                        href={job.apply_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button variant="outline">
                      Save Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No job listings available at the moment.</p>
          <Button onClick={fetchJobs} className="mt-4">
            Refresh Jobs
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobMatching;