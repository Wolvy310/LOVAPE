import type { Metadata } from "next";

import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Connexion admin",
  description: "Authentification admin LOVAPE."
};

interface AdminLoginPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getSafeNextPath(nextPath: string | string[] | undefined): string {
  const resolved = Array.isArray(nextPath) ? nextPath[0] : nextPath;
  if (!resolved || !resolved.startsWith("/admin")) {
    return "/admin";
  }

  return resolved;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const nextPath = getSafeNextPath(resolvedSearchParams.next);

  return (
    <div className="container py-10">
      <AdminLoginForm nextPath={nextPath} />
    </div>
  );
}
