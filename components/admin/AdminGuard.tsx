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
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    async function checkAdmin() {
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
        setIsAdmin(data?.role === "admin");
        setLoading(false);
        if (data?.role !== "admin") {
          router.replace("/admin/login");
        }
      }
    }
    checkAdmin();
    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) return <div className="p-12 text-center text-gray-700">Checking admin access...</div>;
  if (!isAdmin) return null;
  return <>{children}</>;
}
