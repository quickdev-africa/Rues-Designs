"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    async function checkRole() {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      const userId = session.user.id;
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();
      if (isMounted) {
        setRole(data?.role || null);
        setLoading(false);
        if (!["admin", "operations", "warehouse"].includes(data?.role)) {
          router.replace("/admin/login");
        }
      }
    }
    checkRole();
    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) return <div className="p-12 text-center text-gray-700">Checking admin access...</div>;
  if (!role) return null;
  // Optionally, you can restrict children based on role here
  return <>{children}</>;
}
