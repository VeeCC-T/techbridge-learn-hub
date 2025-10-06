import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To democratize tech education and empower global learners to build successful software engineering careers through accessible, high-quality training.",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience in software development and tech leadership.",
    },
    {
      icon: Award,
      title: "Recognized Credentials",
      description: "Earn certificates that are valued by employers worldwide and demonstrate your commitment to excellence.",
    },
    {
      icon: Heart,
      title: "Student-Centered",
      description: "We prioritize your success with personalized mentorship, flexible schedules, and comprehensive support throughout your journey.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">TechBridge Academy</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            We're on a mission to bridge the gap between aspiration and achievement in tech education
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                TechBridge Academy was founded with a simple yet powerful vision: to make world-class software
                engineering education accessible to everyone, everywhere. We recognized that traditional education
                paths often leave aspiring developers without the practical skills and industry connections needed
                to succeed in today's fast-paced tech world.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our founders, experienced software engineers and educators, came together to create a learning
                platform that combines rigorous technical training with real-world mentorship. Since our inception,
                we've helped over 500 students transition into successful tech careers, with many now working at
                leading companies worldwide.
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <h2 className="text-3xl font-bold">What Makes Us Different</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong>Live Interactive Classes:</strong> Not just pre-recorded videos. Real-time instruction
                    with immediate feedback and Q&A.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong>Structured Learning Paths:</strong> Carefully designed curricula that build skills
                    progressively from fundamentals to advanced topics.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong>Personal Mentorship:</strong> One-on-one guidance to help you overcome challenges and
                    accelerate your learning.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong>Industry-Recognized Certifications:</strong> Credentials that employers trust and value
                    in the hiring process.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong>Career Support:</strong> CV reviews, interview preparation, and job placement assistance
                    for intermediate and advanced students.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p className="text-muted-foreground">
              Our instructors are experienced software engineers and educators who are passionate about helping
              students succeed. They bring real-world industry experience from companies like Google, Microsoft,
              Amazon, and leading tech startups.
            </p>
            <p className="text-muted-foreground">
              Every instructor at TechBridge Academy is committed to providing personalized attention and mentorship
              to ensure your success. They don't just teach—they mentor, guide, and support you throughout your
              entire learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Join Our Community</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Become part of a global network of aspiring and successful software engineers
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
