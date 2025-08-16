"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists() && snap.data().admin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setChecked(true);
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  if (loading || !checked) return <div className="p-8 text-center">Checking admin access...</div>;
  if (!isAdmin) return <div className="p-8 text-center text-red-600">Access Denied: You do not have admin rights.</div>;
  return <>{children}</>;
}
