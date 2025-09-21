import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, Send, RotateCcw, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

const InterviewPractice = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startInterview = async () => {
    setSessionStarted(true);
    setLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/mock-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "start",
          message: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start interview");
      }

      const data = await response.json();
      setMessages([{
        type: "ai",
        content: data.question || "Hello! I'm your AI interviewer. Let's start with a simple question: Tell me about yourself and your background.",
        timestamp: new Date(),
      }]);
      
      toast({
        title: "Interview Started",
        description: "Good luck! Answer thoughtfully and take your time.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start interview. Make sure the API is running.",
        variant: "destructive",
      });
      setSessionStarted(false);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Error",
        description: "Please provide an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      type: "user",
      content: currentAnswer,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentAnswer("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/mock-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "answer",
          message: currentAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get next question");
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        type: "ai",
        content: data.question || data.feedback || "Thank you for your answer. Let's continue with the next question.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Make sure the API is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetInterview = () => {
    setMessages([]);
    setCurrentAnswer("");
    setSessionStarted(false);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      submitAnswer();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <MessageSquare className="w-10 h-10 text-primary" />
          Interview Practice
        </h1>
        <p className="text-muted-foreground text-lg">
          Practice with our AI interviewer to improve your interview skills
        </p>
      </div>

      {!sessionStarted ? (
        <Card className="card-interactive">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <CardTitle>Ready to Practice?</CardTitle>
            <CardDescription>
              Our AI interviewer will ask you common interview questions and provide feedback on your answers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-semibold mb-2">Behavioral Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Practice telling your story and showcasing your experience
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-semibold mb-2">Technical Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Test your knowledge and problem-solving skills
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-semibold mb-2">Real-time Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Get instant feedback to improve your responses
                </p>
              </div>
            </div>
            <Button onClick={startInterview} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Starting Interview...
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Interview Practice
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="px-3 py-1">
              Interview in Progress
            </Badge>
            <Button variant="outline" size="sm" onClick={resetInterview}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <Card className="h-96 overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Interview Session</CardTitle>
            </CardHeader>
            <CardContent className="h-full overflow-y-auto space-y-4 pb-20">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Type your answer here... (Ctrl+Enter to submit)"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows={4}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Tip: Use Ctrl+Enter to submit quickly
                  </span>
                  <Button onClick={submitAnswer} disabled={loading || !currentAnswer.trim()}>
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Answer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InterviewPractice;