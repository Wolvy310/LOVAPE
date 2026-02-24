"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Alert } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminLoginFormProps {
  nextPath: string;
}

export function AdminLoginForm({ nextPath }: AdminLoginFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Connexion impossible. Verifiez vos informations.");
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Une erreur reseau est survenue. Reessayez dans quelques instants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">Connexion admin</CardTitle>
        <CardDescription>Acces reserve a l administration LOVAPE.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="warning">Vente interdite aux mineurs.</Alert>
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="space-y-1">
            <span className="text-sm font-medium">Mot de passe admin</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            />
          </label>
          {error ? <Alert variant="destructive">{error}</Alert> : null}
          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
            <Link href="/" className={buttonVariants({ variant: "secondary" })}>
              Retour accueil
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
