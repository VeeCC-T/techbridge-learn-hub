import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users, Award, Clock, CheckCircle, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const stats = [
    { value: "500+", label: "Learners Trained" },
    { value: "3", label: "Specialization Tracks" },
    { value: "95%", label: "Completion Rate" },
    { value: "100%", label: "Certificate-Backed" },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Structured Curriculum",
      description: "From beginner to advanced with clear learning paths",
    },
    {
      icon: Users,
      title: "Live Mentorship",
      description: "Real-time guidance from industry professionals",
    },
    {
      icon: Award,
      title: "Recognized Certificates",
      description: "Industry-recognized credentials upon completion",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Multiple class times to fit your lifestyle",
    },
  ];

  const testimonials = [
    {
      name: "Anna T.",
      role: "Junior Developer",
      content: "Learning here transformed my career. I built my first app within 6 weeks!",
      rating: 5,
    },
    {
      name: "Joseph M.",
      role: "Tech Intern",
      content: "The live mentorship and assignments helped me land an internship.",
      rating: 5,
    },
    {
      name: "Sarah K.",
      role: "Software Engineer",
      content: "Best investment in my career. The certification opened so many doors.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Build Your Tech Career from{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Zero to Mastery
                </span>{" "}
                in 12 Weeks
              </h1>
              <p className="text-lg text-muted-foreground">
                Join a global community of aspiring software engineers. Learn through structured mentorship,
                live classes, and recognized certifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Explore Courses
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src={heroImage}
                alt="Students learning software engineering"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Hub365?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed in your software engineering journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              Hear from our graduates who are now thriving in tech
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-md animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Journey?</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Join thousands of students who are building successful tech careers with Hub365
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Browse Courses
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
