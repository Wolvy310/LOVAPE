import type { Metadata } from "next";
import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GUIDE_LEXICON,
  getGuideArticles,
  getGuideBeginnerPath,
  getGuideTagLabel,
  type GuideArticle
} from "@/lib/guide-content";

export const metadata: Metadata = {
  title: "Guide debutant MTL",
  description: "Hub guide LOVAPE: lexique, bon usage non medical et parcours debutant MTL."
};

function renderArticleCard(article: GuideArticle) {
  return (
    <Card key={article.slug} className="h-full">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {getGuideTagLabel(tag)}
            </Badge>
          ))}
          <Badge variant="secondary">{article.readTimeMinutes} min</Badge>
        </div>
        <CardTitle className="text-lg">{article.title}</CardTitle>
        <CardDescription>{article.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>{article.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          <Link href={`/guide/${article.slug}`} className={buttonVariants({ variant: "secondary", size: "sm" })}>
            Lire l article
          </Link>
          <Link href={article.catalogCtaHref} className={buttonVariants({ variant: "ghost", size: "sm" })}>
            {article.catalogCtaLabel}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function GuidePage() {
  const articles = getGuideArticles();
  const beginnerPath = getGuideBeginnerPath();

  return (
    <div className="container space-y-8 py-10">
      <header className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="warning">Vente interdite aux mineurs</Badge>
          <Badge variant="warning">Si vous ne fumez pas, ne vapez pas</Badge>
        </div>
        <h1 className="font-heading text-3xl font-semibold">Guide LOVAPE</h1>
        <p className="max-w-3xl text-muted-foreground">
          Ressources claires pour comprendre le materiel MTL, choisir un e-liquide et preparer une demande de commande.
        </p>
        <Alert>Contenu informatif, non medical.</Alert>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Parcours debutant recommande</h2>
        <p className="text-sm text-muted-foreground">
          Suivez ces etapes dans l ordre pour construire une base stable avant votre premiere demande de commande.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {beginnerPath.map((article) => (
            <Card key={article.slug} className="h-full">
              <CardHeader>
                <CardDescription>Etape {article.beginnerStep}</CardDescription>
                <CardTitle className="text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{article.excerpt}</p>
                <Link href={`/guide/${article.slug}`} className={buttonVariants({ variant: "secondary", size: "sm" })}>
                  Ouvrir l etape
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Tous les articles</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{articles.map(renderArticleCard)}</div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Lexique rapide</h2>
        <Card>
          <CardContent className="space-y-3 pt-6 text-sm">
            {GUIDE_LEXICON.map((entry) => (
              <div key={entry.term} className="grid gap-1 border-b border-border pb-3 last:border-none last:pb-0 md:grid-cols-[180px_1fr]">
                <p className="font-medium text-foreground">{entry.term}</p>
                <p className="text-muted-foreground">{entry.definition}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-wrap gap-2">
        <Link href="/catalog/e-liquides" className={buttonVariants({ variant: "secondary" })}>
          Explorer les e-liquides
        </Link>
        <Link href="/catalog/materiel-mtl" className={buttonVariants({ variant: "secondary" })}>
          Explorer le materiel MTL
        </Link>
        <Link href="/contact" className={buttonVariants({ variant: "ghost" })}>
          Contacter le SAV
        </Link>
      </section>
    </div>
  );
}

