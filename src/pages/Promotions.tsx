import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Promotions = () => {
  const flyers = [
    {
      id: "beginner",
      title: "Beginner Level Flyer",
      description: "Perfect for sharing foundational programming opportunities with aspiring developers.",
      previewImage: "/TechBridge_Beginner_Flyer.jpg",
      downloadFile: "/TechBridge_Beginner_Flyer.jpg",
      fileName: "TechBridge_Beginner_Flyer.jpg"
    },
    {
      id: "intermediate",
      title: "Intermediate Level Flyer",
      description: "Showcase web development and full-stack training programs to motivated learners.",
      previewImage: "/TechBridge_Intermediate_Flyer.jpg",
      downloadFile: "/TechBridge_Intermediate_Flyer.jpg",
      fileName: "TechBridge_Intermediate_Flyer.jpg"
    },
    {
      id: "advanced",
      title: "Advanced Level Flyer",
      description: "Promote specialized training in cloud architecture and advanced technologies.",
      previewImage: "/TechBridge_Advanced_Flyer.jpg",
      downloadFile: "/TechBridge_Advanced_Flyer.jpg",
      fileName: "TechBridge_Advanced_Flyer.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      {/* Header Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Download TechBridge Flyers & Brochures
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share our programs and help more learners launch their tech careers.
            </p>
          </div>
        </div>
      </section>

      {/* Flyers Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flyers.map((flyer) => (
              <Card key={flyer.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  {/* Preview Image */}
                  <div className="aspect-[3/4] overflow-hidden bg-accent/20">
                    <img
                      src={flyer.previewImage}
                      alt={flyer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{flyer.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {flyer.description}
                    </p>
                    
                    {/* Download Button */}
                    <a
                      href={flyer.downloadFile}
                      download={flyer.fileName}
                      className="w-full"
                    >
                      <Button className="w-full" size="lg">
                        <Download className="mr-2 h-4 w-4" />
                        Download Flyer
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-accent/10">
        <div className="container mx-auto text-center max-w-2xl">
          <p className="text-lg">
            For partnership or media inquiries, contact us at{" "}
            <a
              href="mailto:info@techbridge.africa"
              className="text-primary font-semibold hover:underline"
            >
              info@techbridge.africa
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Promotions;
