import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Promotions = () => {
  const materials = [
    {
      id: "beginner",
      title: "Beginner Level Flyer",
      description: "Start your tech journey with beginner-friendly guidance and community support.",
      previewImage: "/TechBridge_Beginner_Flyer.jpg",
      downloadFile: "/files/TechBridge_Beginner_Flyer.pdf",
      fileName: "TechBridge_Beginner_Flyer.pdf"
    },
    {
      id: "intermediate",
      title: "Intermediate Level Flyer",
      description: "Advance your skills with real projects, mentorship, and practical experience.",
      previewImage: "/TechBridge_Intermediate_Flyer.jpg",
      downloadFile: "/files/TechBridge_Intermediate_Flyer.pdf",
      fileName: "TechBridge_Intermediate_Flyer.pdf"
    },
    {
      id: "advanced",
      title: "Advanced Level Flyer",
      description: "Master specialized tracks and prepare for global opportunities in tech.",
      previewImage: "/TechBridge_Advanced_Flyer.jpg",
      downloadFile: "/files/TechBridge_Advanced_Flyer.pdf",
      fileName: "TechBridge_Advanced_Flyer.pdf"
    },
    {
      id: "brochure",
      title: "TechBridge Program Brochure",
      description: "Overview of all levels, curriculum, benefits, and enrollment process.",
      previewImage: "/TechBridge_Beginner_Flyer.jpg",
      downloadFile: "/files/TechBridge_Program_Brochure.pdf",
      fileName: "TechBridge_Program_Brochure.pdf"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      {/* Header Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Download TechBridge Flyers & Brochures
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share our programs and help more learners launch their tech careers.
          </p>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {materials.map((material) => (
              <Card key={material.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Preview Column */}
                    <div className="aspect-[3/4] md:aspect-auto overflow-hidden bg-accent/20">
                      <img
                        src={material.previewImage}
                        alt={material.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content Column */}
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <h3 className="text-xl font-semibold">{material.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6">
                          {material.description}
                        </p>
                      </div>
                      
                      {/* Download Button */}
                      <a
                        href={material.downloadFile}
                        download={material.fileName}
                        className="w-full"
                      >
                        <Button className="w-full" size="lg">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </a>
                    </div>
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
          <p className="text-lg text-muted-foreground">
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
