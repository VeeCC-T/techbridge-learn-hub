import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const PaymentSuccessNew = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [enrollmentData, setEnrollmentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [pollingCount, setPollingCount] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!user || !sessionId) {
      navigate("/login");
      return;
    }

    const verifySession = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("verify-session", {
          body: { session_id: sessionId },
        });

        if (error) {
          console.error("Error verifying session:", error);
          setError(error.message);
          setLoading(false);
          return;
        }

        if (data?.success && data?.status === "completed") {
          setEnrollmentData(data.enrollment);
          setLoading(false);
        } else if (data?.status === "processing" || data?.status === "pending") {
          // Continue polling
          setPollingCount(prev => prev + 1);
          
          // Stop polling after 30 attempts (30 seconds)
          if (pollingCount >= 30) {
            setError("Enrollment is taking longer than expected. Please check your email or contact support.");
            setLoading(false);
          }
        } else {
          setError(data?.message || "Payment verification failed");
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Verification error:", err);
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    // Initial verification
    verifySession();

    // Poll every second if still processing
    const interval = setInterval(() => {
      if (pollingCount < 30 && loading) {
        verifySession();
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user, sessionId, navigate, pollingCount, loading]);

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Invalid Session</h2>
            <p className="text-muted-foreground mb-4">No payment session found.</p>
            <Button onClick={() => navigate("/courses")}>Return to Courses</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Processing Your Enrollment</h2>
            <p className="text-muted-foreground">
              {pollingCount < 5 
                ? "Verifying your payment..."
                : "Almost there! Creating your enrollment..."}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              This usually takes just a few seconds. Please don't close this window.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Processing...</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Your payment was successful! We'll send you a confirmation email at{" "}
                <strong>{user?.email}</strong> once your enrollment is fully processed.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate("/courses")} variant="outline">
                  Return to Courses
                </Button>
                <Button onClick={() => window.location.reload()}>
                  Refresh Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl">Enrollment Confirmed!</CardTitle>
          <p className="text-muted-foreground mt-2">
            Welcome to Hub365! You're all set to start learning.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Course Details */}
          <div className="bg-muted/50 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-lg">Course Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="font-semibold capitalize">{enrollmentData?.course_level}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">12 Weeks</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Schedule</p>
                <p className="font-semibold">Mon, Wed, Fri</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount Paid</p>
                <p className="font-semibold">
                  ${((enrollmentData?.amount_paid || 0) / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Zoom Link */}
          {enrollmentData?.zoom_link && (
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg space-y-3">
              <h3 className="font-semibold text-lg">Join Your Live Classes</h3>
              <p className="text-sm text-muted-foreground">
                Click the button below to access your Zoom classroom:
              </p>
              <Button asChild className="w-full" size="lg">
                <a href={enrollmentData.zoom_link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Open Zoom Classroom
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                Bookmark this link for easy access to your classes
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-3">
            <h3 className="font-semibold">What's Next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Check your email for course materials and detailed schedule</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Join the Zoom link 5 minutes before your first class</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Access recorded sessions and assignments in your dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Connect with fellow students and instructors</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={() => navigate("/courses")} variant="outline" className="flex-1">
              Browse More Courses
            </Button>
            <Button onClick={() => navigate("/")} className="flex-1">
              Go to Dashboard
            </Button>
          </div>

          {/* Support Info */}
          <p className="text-sm text-center text-muted-foreground pt-4 border-t">
            Questions? Contact us at{" "}
            <a href="mailto:info@hub365.com" className="text-primary hover:underline">
              info@hub365.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessNew;