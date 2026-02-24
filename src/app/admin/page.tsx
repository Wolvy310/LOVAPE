import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { Alert } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-session-constants";
import { getAdminSessionFromCookieValue } from "@/server/admin-session";

export const metadata: Metadata = {
  title: "Administration",
  description: "Espace administration LOVAPE."
};

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const session = await getAdminSessionFromCookieValue(adminCookie);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-semibold">Administration LOVAPE</h1>
        <p className="text-muted-foreground">Session active jusqu au {session.expiresAt.toLocaleString("fr-FR")}.</p>
        <div className="flex flex-wrap gap-2">
          <AdminLogoutButton />
          <Link href="/" className={buttonVariants({ variant: "secondary", size: "sm" })}>
            Retour au site
          </Link>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Commandes</CardTitle>
            <CardDescription>Consulter les demandes de commande et leur statut.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Link href="/api/admin/orders" className={buttonVariants({ variant: "secondary", size: "sm" })}>
              Ouvrir API commandes
            </Link>
            <Link href="/api/admin/orders/export.csv" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Export commandes CSV
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Consentements</CardTitle>
            <CardDescription>Exporter les journaux de consentement RGPD.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Link href="/api/admin/consents/export.csv" className={buttonVariants({ variant: "secondary", size: "sm" })}>
              Export consentements CSV
            </Link>
          </CardContent>
        </Card>
      </section>

      <Alert variant="warning">Acces admin reserve. Ne partagez pas les identifiants de session.</Alert>
    </div>
  );
}
