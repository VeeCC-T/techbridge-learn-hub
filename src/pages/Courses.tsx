import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Clock, Award, CheckCircle, Calendar, BookOpen, FileText } from "lucide-react";
import { courses, CourseLevel } from "@/data/coursesData";
import { courseSchedules } from "@/data/scheduleData";

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | "all">("all");

  const filteredCourses = selectedLevel === "all" 
    ? courses 
    : courses.filter(course => course.level === selectedLevel);

  const levelColors = {
    beginner: "bg-green-500/10 text-green-700 border-green-200",
    intermediate: "bg-blue-500/10 text-blue-700 border-blue-200",
    advanced: "bg-purple-500/10 text-purple-700 border-purple-200",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Courses</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Choose from our carefully structured curriculum designed to take you from beginner to professional
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={selectedLevel === "all" ? "default" : "outline"}
              onClick={() => setSelectedLevel("all")}
            >
              All Courses
            </Button>
            <Button
              variant={selectedLevel === "beginner" ? "default" : "outline"}
              onClick={() => setSelectedLevel("beginner")}
            >
              Beginner
            </Button>
            <Button
              variant={selectedLevel === "intermediate" ? "default" : "outline"}
              onClick={() => setSelectedLevel("intermediate")}
            >
              Intermediate
            </Button>
            <Button
              variant={selectedLevel === "advanced" ? "default" : "outline"}
              onClick={() => setSelectedLevel("advanced")}
            >
              Advanced
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <Card
                key={course.id}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={levelColors[course.level]}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </Badge>
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <Award className="h-4 w-4" />
                      <span>${course.price}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-sm font-semibold">Key Benefits:</p>
                    <ul className="space-y-1">
                      {course.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Link to={`/courses/${course.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link to="/signup" className="flex-1">
                      <Button className="w-full">Enroll Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 12-Week Schedule Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Complete <span className="bg-gradient-primary bg-clip-text text-transparent">12-Week Schedule</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See exactly what you'll learn each week. Choose your level and start your journey to becoming a software engineer.
            </p>
          </div>

          <Tabs defaultValue="beginner" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {courseSchedules.map((schedule) => (
              <TabsContent key={schedule.level} value={schedule.level} className="space-y-6">
                {/* Level Info Card */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 text-center md:text-left">
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
                  </CardContent>
                </Card>

                {/* Schedule Table - Mobile Optimized */}
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
                          <th className="px-4 py-3 text-left text-sm font-semibold">Class Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {schedule.weeks.map((week) => (
                          <tr key={week.week} className="hover:bg-muted/50 transition-colors">
                            <td className="px-4 py-4">
                              <Badge variant="outline" className="font-semibold">
                                Week {week.week}
                              </Badge>
                            </td>
                            <td className="px-4 py-4">
                              <p className="font-semibold text-foreground">{week.mainTopic}</p>
                            </td>
                            <td className="px-4 py-4">
                              <ul className="space-y-1">
                                {week.subtopics.map((subtopic, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{subtopic}</span>
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-muted-foreground">{week.assignment}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-xs text-muted-foreground whitespace-nowrap">
                                {week.classTime.split("–")[0].trim()}<br />
                                {week.classTime.split("–")[1].trim()}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-4">
                    {schedule.weeks.map((week) => (
                      <Card key={week.week} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 pb-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="font-semibold">
                              Week {week.week}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{week.classTime}</span>
                          </div>
                          <CardTitle className="text-lg mt-2">{week.mainTopic}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-8">
                  <Link to="/signup">
                    <Button size="lg" className="gap-2">
                      <Award className="h-5 w-5" />
                      Enroll in {schedule.displayName}
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            ))}
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
                  Real-time instruction with Q&A and immediate feedback
                </p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Hands-on Assignments</h3>
                <p className="text-sm text-muted-foreground">
                  Practical projects to build your portfolio
                </p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Recorded Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  One free viewing per session, rewatch for $49
                </p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Certificate</h3>
                <p className="text-sm text-muted-foreground">
                  Industry-recognized completion certificate
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
