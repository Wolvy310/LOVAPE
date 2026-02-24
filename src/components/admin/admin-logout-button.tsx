"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", {
        method: "POST"
      });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <Button type="button" variant="secondary" size="sm" onClick={onLogout} disabled={loading}>
      {loading ? "Deconnexion..." : "Se deconnecter"}
    </Button>
  );
}
