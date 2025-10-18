import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, LockOpen, Clock, Award, CheckCircle, Calendar, BookOpen, FileText, ExternalLink, Loader2 } from "lucide-react";
import { courseSchedules } from "@/data/scheduleData";
import { useAuth } from "@/contexts/AuthContext";
import { useEnrollments } from "@/hooks/useEnrollments";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Courses = () => {
  const { user } = useAuth();
  const { isEnrolled, getEnrollment, loading: enrollmentsLoading } = useEnrollments();
  const [processingLevel, setProcessingLevel] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const levelColors = {
    beginner: "bg-green-500/10 text-green-700 border-green-200",
    intermediate: "bg-blue-500/10 text-blue-700 border-blue-200",
    advanced: "bg-purple-500/10 text-purple-700 border-purple-200",
  };

  const levelPrices = {
    beginner: 250,
    intermediate: 350,
    advanced: 550,
  };

  const handleEnroll = async (level: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to enroll in courses.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setProcessingLevel(level);

    try {
      const { data, error } = await supabase.functions.invoke("create-enrollment-checkout", {
        body: { courseLevel: level },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error: any) {
      console.error("Error creating checkout:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingLevel(null);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">
            Transform Your <span className="bg-gradient-primary bg-clip-text text-transparent">Tech Career</span> in 12 Weeks
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Master in-demand software skills through live classes, real-world projects, and expert guidance. Choose your level and start your journey.
          </p>
        </div>
      </section>

      {/* 12-Week Schedule Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Complete <span className="bg-gradient-primary bg-clip-text text-transparent">12-Week Program</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Pay once per level to unlock all 12 weeks of content, live classes, and assignments.
            </p>
          </div>

          <Tabs defaultValue="beginner" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {courseSchedules.map((schedule) => {
              const enrolled = isEnrolled(schedule.level);
              const enrollment = getEnrollment(schedule.level);
              const isProcessing = processingLevel === schedule.level;

              return (
                <TabsContent key={schedule.level} value={schedule.level} className="space-y-6">
                  {/* Level Info Card */}
                  <Card className={`border-2 ${enrolled ? 'border-green-500/50 bg-green-500/5' : 'border-primary/20 bg-primary/5'}`}>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-4 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                          {enrolled ? (
                            <LockOpen className="h-5 w-5 text-green-600" />
                          ) : (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p className="font-semibold">
                              {enrolled ? "Enrolled ✓" : "Locked"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Schedule</p>
                            <p className="font-semibold">{schedule.classTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3">
                          <Clock className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-semibold">12 Weeks</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3">
                          <Award className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Investment</p>
                            <p className="font-semibold">${schedule.price}</p>
                          </div>
                        </div>
                      </div>

                      {enrolled && enrollment?.zoom_link && (
                        <div className="mt-6 pt-6 border-t">
                          <Button asChild className="w-full md:w-auto" size="lg">
                            <a href={enrollment.zoom_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-5 w-5" />
                              Join Live Classes
                            </a>
                          </Button>
                        </div>
                      )}

                      {!enrolled && (
                        <div className="mt-6 pt-6 border-t">
                          <Button
                            onClick={() => handleEnroll(schedule.level)}
                            disabled={isProcessing || enrollmentsLoading}
                            className="w-full md:w-auto"
                            size="lg"
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Award className="mr-2 h-5 w-5" />
                                Enroll for ${levelPrices[schedule.level as keyof typeof levelPrices]} - Unlock All Topics
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Schedule Table/Cards */}
                  <div className="space-y-4">
                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto rounded-lg border shadow-sm">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Week</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Main Topic</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Key Focus Areas</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Assignment</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Access</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {schedule.weeks.map((week) => (
                            <tr key={week.week} className={`hover:bg-muted/50 transition-colors ${!enrolled ? 'opacity-60' : ''}`}>
                              <td className="px-4 py-4">
                                <Badge variant="outline" className="font-semibold">
                                  Week {week.week}
                                </Badge>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                  {!enrolled && <Lock className="h-4 w-4 text-muted-foreground" />}
                                  <p className="font-semibold text-foreground">{week.mainTopic}</p>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                {enrolled ? (
                                  <ul className="space-y-1">
                                    {week.subtopics.map((subtopic, idx) => (
                                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{subtopic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-muted-foreground italic">Locked – Enroll to Access</p>
                                )}
                              </td>
                              <td className="px-4 py-4">
                                {enrolled ? (
                                  <p className="text-sm text-muted-foreground">{week.assignment}</p>
                                ) : (
                                  <p className="text-sm text-muted-foreground italic">Locked</p>
                                )}
                              </td>
                              <td className="px-4 py-4">
                                {enrolled ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-4">
                      {schedule.weeks.map((week) => (
                        <Card key={week.week} className={`overflow-hidden ${!enrolled ? 'opacity-60' : ''}`}>
                          <CardHeader className="bg-muted/50 pb-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="font-semibold">
                                Week {week.week}
                              </Badge>
                              {enrolled ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <Lock className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <CardTitle className="text-lg mt-2 flex items-center gap-2">
                              {!enrolled && <Lock className="h-4 w-4" />}
                              {week.mainTopic}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-4">
                            {enrolled ? (
                              <>
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="h-4 w-4 text-primary" />
                                    <p className="text-sm font-semibold">Key Focus Areas</p>
                                  </div>
                                  <ul className="space-y-1 ml-6">
                                    {week.subtopics.map((subtopic, idx) => (
                                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-primary">•</span>
                                        <span>{subtopic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <p className="text-sm font-semibold">Assignment</p>
                                  </div>
                                  <p className="text-sm text-muted-foreground ml-6">{week.assignment}</p>
                                </div>
                              </>
                            ) : (
                              <p className="text-sm text-muted-foreground italic text-center py-4">
                                🔒 Locked – Enroll to Access Full Content
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">What's Included in Every Course</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Live Interactive Classes</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time instruction with Q&A and immediate feedback - 3 classes per week
                </p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Hands-on Assignments</h3>
                <p className="text-sm text-muted-foreground">
                  Practical projects to build your portfolio and real-world skills
                </p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Recorded Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  One-time free viewing per session for enrolled students
                </p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Certificate of Completion</h3>
                <p className="text-sm text-muted-foreground">
                  Industry-recognized certificate upon successful completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
