import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star } from "lucide-react";

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Beginner",
      price: 250,
      description: "Perfect for those starting their software engineering journey",
      features: [
        "Live interactive classes",
        "Mon/Wed/Fri – 8:00-9:30 AM EST",
        "Hands-on assignments",
        "1-time recording access per session",
        "Assignment submission area",
        "Completion certificate",
        "Community forum access",
      ],
      popular: false,
    },
    {
      name: "Intermediate",
      price: 350,
      description: "Take your skills to the next level with advanced topics",
      features: [
        "All Beginner features",
        "Mon/Wed/Fri – 12:00-1:30 PM EST",
        "CV review & optimization",
        "Advanced project portfolio",
        "Priority support",
        "Career guidance session",
        "Job search assistance",
      ],
      popular: true,
    },
    {
      name: "Advanced",
      price: 550,
      description: "Master advanced specializations and earn certifications",
      features: [
        "All Intermediate features",
        "Mon/Wed/Fri – 4:00-5:30 PM EST",
        "Industry-recognized certification",
        "Capstone project mentorship",
        "Interview preparation",
        "LinkedIn profile optimization",
        "Lifetime course updates",
        "Alumni network access",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">
            Simple, <span className="bg-gradient-primary bg-clip-text text-transparent">Transparent Pricing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Choose the plan that fits your learning goals. All plans include lifetime access to course materials.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in ${
                  tier.popular ? "ring-2 ring-primary shadow-xl scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-4 w-4 fill-white" />
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold text-primary">${tier.price}</div>
                    <div className="text-sm text-muted-foreground">per course</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button
                      className="w-full"
                      variant={tier.popular ? "default" : "outline"}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recording Access */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">General Access</h2>
                    <p className="text-muted-foreground">
                      Not ready to commit to a full course? Get access to individual recorded sessions
                      and learn at your own pace.
                    </p>
                    <div className="pt-4">
                      <div className="text-4xl font-bold text-primary mb-2">$49</div>
                      <div className="text-sm text-muted-foreground">per recorded session</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Includes:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          Access to individual recorded sessions
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          Session materials and resources
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          Lifetime access to purchased recordings
                        </span>
                      </li>
                    </ul>
                    <Link to="/contact">
                      <Button variant="outline" className="w-full">
                        Contact for Access
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">What's included in the course price?</h3>
                <p className="text-muted-foreground">
                  All live classes, assignments, one free recording view per session, and a completion
                  certificate. Intermediate and Advanced tiers include additional career support services.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">How do I access the Zoom classes?</h3>
                <p className="text-muted-foreground">
                  After enrollment and payment, you'll receive an email with your Zoom registration link and
                  a countdown timer for the next class.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Can I rewatch recorded sessions?</h3>
                <p className="text-muted-foreground">
                  Yes! Each enrolled student gets one free viewing of each recorded session. Additional
                  rewatches are available for $49 per session.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards and payment methods through our secure payment gateway.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Is there a refund policy?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 7-day money-back guarantee if you're not satisfied with the course. Contact
                  our support team for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Still Have Questions?</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Our team is here to help you choose the right plan for your goals
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
