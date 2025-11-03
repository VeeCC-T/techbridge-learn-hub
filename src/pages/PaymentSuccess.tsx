import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [zoomLink, setZoomLink] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const level = searchParams.get("level");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!user || !sessionId) {
        navigate("/login");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { sessionId },
        });

        if (error) throw error;

        if (data?.success) {
          setZoomLink(data.zoomLink);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [user, sessionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl">Payment Successful!</CardTitle>
          <p className="text-muted-foreground mt-2">
            Your course access has been unlocked. Welcome to Hub365!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-lg">Course Details</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Level:</span>
                <span className="font-semibold capitalize">{level}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-semibold">12 Weeks</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Class Schedule:</span>
                <span className="font-semibold">Mon, Wed, Fri</span>
              </p>
            </div>
          </div>

          {zoomLink && (
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg space-y-3">
              <h3 className="font-semibold text-lg">Join Your Live Classes</h3>
              <p className="text-sm text-muted-foreground">
                Click the button below to access your Zoom classroom:
              </p>
              <Button asChild className="w-full" size="lg">
                <a href={zoomLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Open Zoom Classroom
                </a>
              </Button>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-semibold">What's Next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Check your email for course materials and schedule details</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Join the Zoom link 5 minutes before your first class</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Access recorded sessions and assignments in your dashboard</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => navigate("/courses")} variant="outline" className="flex-1">
              View All Courses
            </Button>
            <Button onClick={() => navigate("/")} className="flex-1">
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
