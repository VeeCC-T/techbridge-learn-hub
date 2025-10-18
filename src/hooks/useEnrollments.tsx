import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Enrollment {
  id: string;
  course_level: string;
  payment_status: string;
  zoom_link: string | null;
  enrolled_at: string;
}

export const useEnrollments = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) {
        setEnrollments([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("enrollments")
          .select("*")
          .eq("user_id", user.id)
          .eq("payment_status", "completed");

        if (error) throw error;

        setEnrollments(data || []);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user]);

  const isEnrolled = (level: string) => {
    return enrollments.some((e) => e.course_level === level);
  };

  const getEnrollment = (level: string) => {
    return enrollments.find((e) => e.course_level === level);
  };

  return { enrollments, loading, isEnrolled, getEnrollment };
};
