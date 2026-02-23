import Link from "next/link";
import { ShieldCheck, Truck, Wrench } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container space-y-10 py-10">
      <section className="grid gap-6 rounded-2xl border border-border bg-card p-8 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">LOVAPE</p>
          <h1 className="font-heading text-3xl font-semibold leading-tight md:text-4xl">
            Selection MTL sobre, avec prise de commande accompagnee.
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Nous privilegions le bon usage, la clarte et une experience sans pression commerciale.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/catalog/e-liquides" className={buttonVariants({ variant: "default" })}>
              Voir les e-liquides
            </Link>
            <Link href="/catalog/materiel-mtl" className={buttonVariants({ variant: "secondary" })}>
              Voir le materiel MTL
            </Link>
          </div>
        </div>
        <div className="space-y-3 rounded-xl border border-border bg-secondary/40 p-5">
          <Alert variant="warning">Vente interdite aux mineurs.</Alert>
          <Alert variant="warning">Si vous ne fumez pas, ne vapez pas.</Alert>
          <p className="text-sm text-muted-foreground">
            Le paiement en ligne est desactive sur le MVP. Les commandes passent en mode demande.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
              Politique responsable
            </CardTitle>
            <CardDescription>Interdiction pods/puffs/jetables. Orientation MTL uniquement.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les produits non conformes sont bloques cote serveur et ne pourront pas etre ajoutes.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Truck className="h-5 w-5 text-primary" aria-hidden />
              Livraison et retours
            </CardTitle>
            <CardDescription>Informations transparentes avant validation de commande.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Consultez les pages livraison, retours et contact avant de soumettre votre demande.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="h-5 w-5 text-primary" aria-hidden />
              Demarrage progressif
            </CardTitle>
            <CardDescription>Checkout request-first avec extension paiement preparee.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            L architecture Payment Adapter sera branchee en etape dediee, apres validation legale et PSP.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
