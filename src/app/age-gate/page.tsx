import { Alert } from "@/components/ui/alert";
import { PagePlaceholder } from "@/components/page-placeholder";

export default function AgeGatePage() {
  return (
    <div className="container space-y-4 py-10">
      <Alert variant="warning">Vente interdite aux mineurs.</Alert>
      <PagePlaceholder
        title="Verification de l'age"
        description="Le formulaire date de naissance + cookie de validation sera implemente en Etape C."
      />
    </div>
  );
}

