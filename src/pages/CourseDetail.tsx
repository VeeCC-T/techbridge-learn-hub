import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Clock, Award, CheckCircle, Calendar, DollarSign, ArrowLeft } from "lucide-react";
import { courses } from "@/data/coursesData";

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Course Not Found</h1>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const levelColors = {
    beginner: "bg-green-500/10 text-green-700 border-green-200",
    intermediate: "bg-blue-500/10 text-blue-700 border-blue-200",
    advanced: "bg-purple-500/10 text-purple-700 border-purple-200",
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-subtle py-12 border-b">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
          <div className="space-y-4">
            <Badge className={levelColors[course.level]}>
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">{course.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{course.description}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">What You'll Learn</h2>
                <ul className="space-y-3">
                  {course.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Course Outline */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Course Outline</h2>
                <div className="space-y-4">
                  {course.outline.map((week) => (
                    <div key={week.week} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Week {week.week}</h3>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <ul className="space-y-2">
                        {week.topics.map((topic, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Benefits */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Course Benefits</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">${course.price}</span>
                    <Badge variant="secondary">Live Classes</Badge>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-muted-foreground">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium">Schedule</p>
                        <p className="text-muted-foreground">{course.schedule}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium">Certificate</p>
                        <p className="text-muted-foreground">Upon completion</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/signup">
                    <Button className="w-full" size="lg">
                      Enroll & Pay
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground">
                    After enrollment, you'll receive your Zoom link and access to materials
                  </p>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <h3 className="font-semibold text-sm">Included:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Live class access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Assignment submissions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      1 free recording view per session
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Completion certificate
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground text-center">
                    Rewatch recordings: <span className="font-semibold text-foreground">$49/session</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
