import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, CheckCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/promotions-hero.jpg";
import flyerBeginner from "@/assets/flyer-beginner.jpg";
import flyerIntermediate from "@/assets/flyer-intermediate.jpg";
import flyerAdvanced from "@/assets/flyer-advanced.jpg";

const Promotions = () => {
  const flyers = [
    {
      level: "Beginner",
      price: "$250",
      image: flyerBeginner,
      title: "Start Your Tech Journey",
      description: "Perfect for absolute beginners ready to learn programming fundamentals and build their first projects.",
    },
    {
      level: "Intermediate",
      price: "$350",
      image: flyerIntermediate,
      title: "Advance Your Skills",
      description: "For developers ready to tackle advanced concepts, frameworks, and real-world applications.",
    },
    {
      level: "Advanced",
      price: "$550",
      image: flyerAdvanced,
      title: "Become a Certified Pro",
      description: "Master advanced technologies, earn certification, and prepare for professional opportunities.",
    },
  ];

  const handleDownload = (level: string) => {
    // This would trigger actual PDF download in production
    console.log(`Downloading ${level} flyer`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 lg:py-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Launch Your Tech Career with{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Confidence
              </span>{" "}
              in 12 Weeks
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Master in-demand software skills through live classes, real-world projects, and expert guidance.
            </p>
            <Button size="lg" className="animate-scale-in">
              <Download className="mr-2 h-5 w-5" />
              Download Course Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* About the Program */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
              About the Program
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              At TechBridge, we help aspiring developers and professionals build real tech skills 
              through interactive live sessions, weekly projects, and career-focused mentorship.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/20 hover-scale">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">12-Week Intensive Learning Track</h3>
                      <p className="text-sm text-muted-foreground">
                        Structured curriculum designed to take you from beginner to job-ready.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 hover-scale">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">3 Live Classes Weekly</h3>
                      <p className="text-sm text-muted-foreground">
                        Monday, Wednesday & Friday sessions - 90 minutes each of interactive learning.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 hover-scale">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Practical Assignments & Projects</h3>
                      <p className="text-sm text-muted-foreground">
                        Build real applications and create a portfolio that showcases your skills.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 hover-scale">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Certificate of Specialization</h3>
                      <p className="text-sm text-muted-foreground">
                        Earn recognized credentials for advanced learners upon completion.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 hover-scale">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Access to Recorded Sessions</h3>
                      <p className="text-sm text-muted-foreground">
                        One-time free viewing of all class recordings for paid learners.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 hover-scale">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Career Development Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Get guidance on portfolio building, resume writing, and interview preparation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Flyers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the program level that matches your current skills and career goals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {flyers.map((flyer) => (
              <Card key={flyer.level} className="overflow-hidden hover-scale border-primary/20">
                <div className="aspect-square relative">
                  <img
                    src={flyer.image}
                    alt={`${flyer.level} Level Flyer`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold">{flyer.level} Level</h3>
                    <span className="text-2xl font-bold text-primary">{flyer.price}</span>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{flyer.title}</h4>
                  <p className="text-muted-foreground mb-4">{flyer.description}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDownload(flyer.level)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Flyer (PDF)
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Video Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              See How TechBridge Works
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your journey to a professional tech career starts here with TechBridge.
            </p>
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Button size="lg" className="rounded-full h-20 w-20">
                    <Play className="h-8 w-8" />
                  </Button>
                  <p className="mt-4 text-muted-foreground">Promotional Video Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Ready to Enroll?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose your level, enroll, and start your 12-week transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                View Courses
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" className="min-w-[200px]">
                Enroll Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Have questions? We're here to help you start your tech journey.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Official Email</p>
                <a
                  href="mailto:info@techbridge.com"
                  className="text-xl font-semibold text-primary hover:underline"
                >
                  info@techbridge.com
                </a>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">Follow Us</p>
                <div className="flex gap-4 justify-center">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promotions;
