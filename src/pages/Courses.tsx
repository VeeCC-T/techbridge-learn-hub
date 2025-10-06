import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Clock, Award, CheckCircle } from "lucide-react";
import { courses, CourseLevel } from "@/data/coursesData";

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
