import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getGuideArticleBySlug,
  getGuideArticles,
  getGuideBeginnerPath,
  getGuideTagLabel,
  type GuideArticle
} from "@/lib/guide-content";

interface GuideArticlePageProps {
  params: Promise<{ slug: string }>;
}

function getRelatedArticles(article: GuideArticle): GuideArticle[] {
  const allArticles = getGuideArticles();
  return allArticles
    .filter((item) => item.slug !== article.slug && item.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 3);
}

function getNextBeginnerArticle(article: GuideArticle): GuideArticle | null {
  if (typeof article.beginnerStep !== "number") {
    return null;
  }

  const currentStep = article.beginnerStep;
  return getGuideBeginnerPath().find((item) => item.beginnerStep === currentStep + 1) ?? null;
}

export async function generateMetadata({ params }: GuideArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideArticleBySlug(slug);

  if (!article) {
    return { title: "Article guide introuvable" };
  }

  return {
    title: article.title,
    description: article.description
  };
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getGuideArticles().map((article) => ({ slug: article.slug }));
}

export default async function GuideArticlePage({ params }: GuideArticlePageProps) {
  const { slug } = await params;
  const article = getGuideArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article);
  const nextBeginnerArticle = getNextBeginnerArticle(article);

  return (
    <div className="container space-y-6 py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Fil d ariane">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/guide" className="hover:text-foreground">
              Guide
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{article.title}</li>
        </ol>
      </nav>

      <header className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {getGuideTagLabel(tag)}
            </Badge>
          ))}
          <Badge variant="secondary">{article.readTimeMinutes} min</Badge>
          <Badge variant="warning">Vente interdite aux mineurs</Badge>
        </div>
        <h1 className="font-heading text-3xl font-semibold">{article.title}</h1>
        <p className="max-w-3xl text-muted-foreground">{article.description}</p>
        <Alert>Contenu informatif, non medical.</Alert>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="space-y-4">
          {article.sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </article>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aller plus loin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Link href={article.catalogCtaHref} className={buttonVariants({ variant: "secondary", size: "sm" })}>
                {article.catalogCtaLabel}
              </Link>
              <Link href="/guide" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                Retour au hub guide
              </Link>
              <Link href="/checkout/request" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                Ouvrir une demande de commande
              </Link>
            </CardContent>
          </Card>

          {nextBeginnerArticle ? (
            <Card>
              <CardHeader>
                <CardTitle>Etape suivante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Etape {nextBeginnerArticle.beginnerStep}: {nextBeginnerArticle.title}
                </p>
                <Link href={`/guide/${nextBeginnerArticle.slug}`} className={buttonVariants({ variant: "secondary", size: "sm" })}>
                  Continuer le parcours
                </Link>
              </CardContent>
            </Card>
          ) : null}

          {relatedArticles.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Articles lies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {relatedArticles.map((relatedArticle) => (
                  <div key={relatedArticle.slug} className="space-y-1">
                    <p className="font-medium text-foreground">{relatedArticle.title}</p>
                    <p className="text-muted-foreground">{relatedArticle.excerpt}</p>
                    <Link href={`/guide/${relatedArticle.slug}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                      Lire l article
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}

          <Alert variant="warning">Si vous ne fumez pas, ne vapez pas.</Alert>
        </aside>
      </section>
    </div>
  );
}
