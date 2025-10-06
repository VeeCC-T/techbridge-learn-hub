import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import instagramSquare from "@/assets/promo-instagram-square.jpg";
import linkedinBanner from "@/assets/promo-linkedin-banner.jpg";
import whatsappStory from "@/assets/promo-whatsapp-story.jpg";
import webBanner from "@/assets/promo-web-banner.jpg";

const Promotions = () => {
  const { toast } = useToast();

  const promotionalMaterials = [
    {
      title: "Instagram Square Post",
      description: "Perfect for Instagram feed posts (1080x1080)",
      image: instagramSquare,
      filename: "techbridge-instagram-square.jpg",
    },
    {
      title: "LinkedIn Banner",
      description: "Optimized for LinkedIn posts and articles (1200x628)",
      image: linkedinBanner,
      filename: "techbridge-linkedin-banner.jpg",
    },
    {
      title: "WhatsApp Story",
      description: "Vertical format for WhatsApp status (1080x1920)",
      image: whatsappStory,
      filename: "techbridge-whatsapp-story.jpg",
    },
    {
      title: "Web Banner",
      description: "Wide banner for websites and email (1920x1080)",
      image: webBanner,
      filename: "techbridge-web-banner.jpg",
    },
  ];

  const handleDownload = (imageUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: `${filename} is being downloaded.`,
    });
  };

  const handleShare = async (title: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `TechBridge Academy - ${title}`,
          text: "Join our 12-week Software Engineering Bootcamp. Learn. Build. Launch your tech career.",
          url: "https://www.techbridgelearn.com",
        });
        toast({
          title: "Shared successfully",
          description: "Thank you for spreading the word!",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText("https://www.techbridgelearn.com");
      toast({
        title: "Link copied",
        description: "Website link copied to clipboard!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Promotions & Marketing Materials
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Download and share our professionally designed promotional materials. 
            Help us reach aspiring software engineers worldwide.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Learn. Build. Launch your tech career.
          </div>
        </div>
      </section>

      {/* Promotional Materials Grid */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {promotionalMaterials.map((material, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <CardTitle>{material.title}</CardTitle>
                  <CardDescription>{material.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 overflow-hidden rounded-lg border border-border">
                    <img
                      src={material.image}
                      alt={material.title}
                      className="w-full h-auto hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleDownload(material.image, material.filename)}
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      onClick={() => handleShare(material.title)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Information Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Bootcamp Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-primary">Schedule</h3>
              <p className="text-muted-foreground">Mon/Wed/Fri</p>
              <p className="text-sm text-muted-foreground">90 minutes per session</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-secondary">Duration</h3>
              <p className="text-muted-foreground">12 Weeks</p>
              <p className="text-sm text-muted-foreground">Comprehensive training</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-accent">Pricing</h3>
              <p className="text-muted-foreground">$250 - $550</p>
              <p className="text-sm text-muted-foreground">Three levels available</p>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>✓ Live interactive classes with expert instructors</p>
            <p>✓ Hands-on assignments and real-world projects</p>
            <p>✓ Recorded sessions for review and flexibility</p>
            <p>✓ Industry-recognized certification upon completion</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promotions;
