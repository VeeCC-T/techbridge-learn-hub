import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added later
    console.log("Form submitted");
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "info@hub365.com",
      link: "mailto:info@hub365.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Global Online Platform",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">
            Get in <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Have questions about our courses? Want to learn more about enrollment? We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Course inquiry"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  We typically respond within 24 hours. For urgent matters, please call us directly.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-md animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-muted-foreground">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-md bg-gradient-subtle">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Office Hours</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Find quick answers to common questions. If you don't see your question here, feel free to contact us.
            </p>
            <div className="space-y-4 text-left">
              <details className="group bg-background p-6 rounded-lg shadow-sm">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  How do I enroll in a course?
                  <span className="text-primary">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground text-sm">
                  Click on "Enroll Now" on any course page, create an account, and proceed with payment. 
                  You'll receive your Zoom link and course materials immediately after enrollment.
                </p>
              </details>
              <details className="group bg-background p-6 rounded-lg shadow-sm">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  What if I miss a live class?
                  <span className="text-primary">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground text-sm">
                  All live classes are recorded and available for one free viewing. You can access recordings 
                  through your student dashboard. Additional rewatches are available for $49 per session.
                </p>
              </details>
              <details className="group bg-background p-6 rounded-lg shadow-sm">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  Do you offer payment plans?
                  <span className="text-primary">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground text-sm">
                  Yes! We offer flexible payment plans for all our courses. Contact us to discuss options 
                  that work for your budget.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
