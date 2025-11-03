import { ArrowRight, Code, Rocket, Award, Clock, Users, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Promotions = () => {
  const tracks = [
    {
      id: "beginner",
      title: "Beginner Track",
      description: "Learn fundamentals and gain confidence with structured guidance for your first steps in tech.",
      icon: BookOpen,
      color: "from-primary/20 to-primary/5"
    },
    {
      id: "intermediate",
      title: "Intermediate Track",
      description: "Build real-world projects and strengthen your portfolio with hands-on experience.",
      icon: Code,
      color: "from-accent/20 to-accent/5"
    },
    {
      id: "advanced",
      title: "Advanced Track",
      description: "Specialize, earn certificates, and unlock global career opportunities in software engineering.",
      icon: Award,
      color: "from-primary-glow/20 to-primary-glow/5"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Live Interactive Sessions",
      description: "Mon, Wed, Fri – 90 minutes each with expert instructors and real-time Q&A"
    },
    {
      icon: Rocket,
      title: "Real Projects & Mentorship",
      description: "Build portfolio-worthy projects with guidance from industry professionals"
    },
    {
      icon: Award,
      title: "Career Support & Certification",
      description: "Get certified upon completion and receive ongoing career guidance"
    },
    {
      icon: Users,
      title: "Global Community Learning",
      description: "Join a supportive community of learners and gain international recognition"
    }
  ];

  const testimonials = [
    {
      name: "Amara O.",
      location: "Lagos",
      quote: "Hub365 gave me the clarity and confidence to pursue a tech career. The live sessions were game-changing."
    },
    {
      name: "David K.",
      location: "Nairobi",
      quote: "The live sessions helped me understand coding beyond theory. I built three projects in my first month!"
    },
    {
      name: "Sarah M.",
      location: "Accra",
      quote: "From zero coding knowledge to landing my first developer role. Hub365 made it possible."
    },
    {
      name: "James T.",
      location: "Johannesburg",
      quote: "The mentorship and community support were invaluable. Best investment in my career."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-background via-accent/5 to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-fade-in">
            Launch Your Tech Career with Hub365
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
            A 12-week immersive online program designed to help beginners, intermediates, and advanced learners master software engineering skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/courses">
              <Button size="lg" className="text-lg px-8">
                View Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Enroll Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Program Overview Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Whether you're just starting or advancing your skills, Hub365 has a track designed for your journey.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <Card key={track.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${track.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{track.title}</h3>
                    <p className="text-muted-foreground mb-6">
                      {track.description}
                    </p>
                    <Link to="/courses">
                      <Button variant="outline" className="w-full">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose TechBridge Section */}
      <section className="py-16 px-4 bg-accent/10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose Hub365?
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Experience a comprehensive learning journey with industry-leading resources and support.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6 flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Student Success Stories
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their careers with Hub365.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-lg italic text-foreground">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    – {testimonial.name}, {testimonial.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary via-primary-glow to-accent text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join Hub365 today and take the first step toward a successful career in software engineering.
          </p>
          <Link to="/courses">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-6 h-auto">
              Enroll Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer Contact Section */}
      <section className="py-12 px-4 bg-accent/10">
        <div className="container mx-auto text-center max-w-2xl">
          <p className="text-lg text-muted-foreground">
            For inquiries, email{" "}
            <a
              href="mailto:info@hub365.com"
              className="text-primary font-semibold hover:underline"
            >
              info@hub365.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Promotions;