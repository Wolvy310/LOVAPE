import type { Metadata } from "next";
import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";

interface ConfirmationPageProps {
  params: Promise<{ orderRef: string }>;
}

export const metadata: Metadata = {
  title: "Confirmation de demande",
  description: "Confirmation de la demande de commande LOVAPE."
};

export default async function CheckoutConfirmationPage({ params }: ConfirmationPageProps) {
  const { orderRef } = await params;

  return (
    <div className="container space-y-6 py-10">
      <h1 className="font-heading text-3xl font-semibold">Demande envoyee</h1>
      <Alert className="space-y-2">
        <p className="font-medium">Reference de demande: {orderRef}</p>
        <p className="text-sm text-muted-foreground">
          Nous revenons vers vous pour confirmer disponibilite, livraison et suite de commande.
        </p>
      </Alert>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-2 text-lg font-semibold">Prochaines etapes</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Notre equipe verifie le stock et les details de votre demande.</li>
          <li>Vous recevez un retour par email avec la suite a donner.</li>
          <li>Si necessaire, le SAV vous contacte pour finaliser les informations.</li>
        </ol>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          Retour accueil
        </Link>
        <Link href="/contact" className={buttonVariants({ variant: "secondary" })}>
          Contacter le SAV
        </Link>
      </div>
    </div>
  );
}

