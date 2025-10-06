import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, Sparkles, Code, TestTube, Smartphone } from "lucide-react";
import specializationsBg from "@/assets/specializations-bg.jpg";

const Specializations = () => {
  const specializations = [
    {
      icon: Sparkles,
      title: "AI in Software Engineering",
      duration: "8 weeks",
      description: "Master machine learning, AI tools integration, and ethical AI development practices.",
      topics: [
        "Machine Learning fundamentals",
        "Neural Networks & Deep Learning",
        "AI APIs & Integration",
        "Natural Language Processing",
        "Computer Vision basics",
        "AI Ethics & Responsible Development",
      ],
      benefits: [
        "Build AI-powered applications",
        "Understand ML algorithms",
        "Work with production ML systems",
      ],
    },
    {
      icon: TestTube,
      title: "Software Testing & QA",
      duration: "6 weeks",
      description: "Become an expert in testing methodologies, automation frameworks, and quality assurance.",
      topics: [
        "Testing fundamentals & strategies",
        "Test automation with Selenium",
        "CI/CD integration",
        "Performance & load testing",
        "Test-driven development",
        "Quality metrics & reporting",
      ],
      benefits: [
        "Master testing automation",
        "Implement CI/CD pipelines",
        "Ensure software quality",
      ],
    },
    {
      icon: Code,
      title: "MERN Full-Stack Development",
      duration: "10 weeks",
      description: "Build modern full-stack web applications with MongoDB, Express, React, and Node.js.",
      topics: [
        "Node.js & Express backend",
        "MongoDB & database design",
        "React with Hooks & Context",
        "RESTful API development",
        "Real-time apps with Socket.io",
        "Deployment & DevOps basics",
      ],
      benefits: [
        "Build complete web applications",
        "Master full-stack development",
        "Deploy production-ready apps",
      ],
    },
    {
      icon: Smartphone,
      title: "Dart & Flutter App Development",
      duration: "8 weeks",
      description: "Create beautiful, cross-platform mobile applications with Flutter and Dart.",
      topics: [
        "Dart programming language",
        "Flutter framework & widgets",
        "State management",
        "API integration",
        "Native features access",
        "App deployment (iOS & Android)",
      ],
      benefits: [
        "Build iOS and Android apps",
        "Create beautiful UI/UX",
        "Publish to app stores",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={specializationsBg}
            alt="Specializations background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        </div>
        <div className="relative container mx-auto px-4 py-24 text-center text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">
            Advanced Specializations
          </h1>
          <p className="text-lg max-w-3xl mx-auto animate-slide-up opacity-90">
            Take your career to the next level with our advanced specialization tracks. 
            Earn industry-recognized certificates upon completion.
          </p>
        </div>
      </section>

      {/* Prerequisites Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-bold">Who Should Apply?</h2>
            <p className="text-muted-foreground">
              These specializations are designed for students who have completed our main courses or have
              equivalent programming experience. Each specialization builds on fundamental skills and takes
              you deeper into specialized career tracks.
            </p>
          </div>
        </div>
      </section>

      {/* Specializations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {specializations.map((spec, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <spec.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary">{spec.duration}</Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{spec.title}</CardTitle>
                  <p className="text-muted-foreground">{spec.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">What You'll Learn:</h3>
                    <ul className="space-y-2">
                      {spec.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-semibold text-sm">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {spec.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link to="/signup">
                      <Button className="w-full">Apply for Specialization</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block p-4 rounded-full bg-gradient-primary">
              <Award className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Earn Industry-Recognized Certificates</h2>
            <p className="text-lg text-muted-foreground">
              Upon successful completion of any specialization, you'll receive a certificate from TechBridge
              Academy in partnership with recognized industry partners. These credentials are valued by employers
              and demonstrate your advanced expertise in your chosen specialization.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <CheckCircle className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold">Verified Credential</h3>
                <p className="text-sm text-muted-foreground">
                  Digital certificate with unique verification ID
                </p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold">LinkedIn Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Add directly to your professional profile
                </p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold">Career Advancement</h3>
                <p className="text-sm text-muted-foreground">
                  Stand out in the competitive job market
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Specialize?</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Choose your specialization track and become an expert in your field
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Specializations;
