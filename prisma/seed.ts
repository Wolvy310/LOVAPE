import { CategoryFamily, PrismaClient, ProductStatus, ProductType, StockPolicy } from "@prisma/client";

import { ALLOWED_ELIQUID_BRANDS, assertAllowedELiquidBrand, assertNoForbiddenVapeTerms } from "../src/lib/vape-policy";

const prisma = new PrismaClient();

interface SeedBrand {
  name: string;
  slug: string;
}

interface SeedCategory {
  name: string;
  slug: string;
  family: CategoryFamily;
  description: string;
  sortOrder: number;
}

interface SeedProduct {
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  type: ProductType;
  status: ProductStatus;
  brandSlug: string;
  categorySlug: string;
  priceCents: number;
  stockPolicy: StockPolicy;
  stockQty: number;
  tags: string[];
  warningRequired: boolean;
  imageUrl: string;
  nicotineMg?: number;
  pgRatio?: number;
  vgRatio?: number;
  volumeMl?: number;
  recommendedPowerMinW?: number;
  recommendedPowerMaxW?: number;
  airflowStyle?: string;
  connectorType?: string;
  resistanceRange?: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const brands: SeedBrand[] = [
  ...ALLOWED_ELIQUID_BRANDS.map((name) => ({ name, slug: slugify(name) })),
  { name: "LovaTech", slug: "lovatech" }
];

const categories: SeedCategory[] = [
  {
    name: "E-liquides",
    slug: "e-liquides",
    family: CategoryFamily.E_LIQUID,
    description: "Selection e-liquides pour usage responsable adulte.",
    sortOrder: 10
  },
  {
    name: "Materiel MTL",
    slug: "materiel-mtl",
    family: CategoryFamily.MTL_MATERIAL,
    description: "Materiel MTL faible puissance: mods et clearomiseurs.",
    sortOrder: 20
  }
];

const products: SeedProduct[] = [
  {
    sku: "ELQ-ALFA-CLASS-10",
    slug: "classic-blend-10ml-alfaliquid",
    name: "Classic Blend 10ml",
    shortDescription: "Profil tabac sec, simple et regulier.",
    longDescription: "E-liquide fictif pour demarrage MTL avec rendu sec et discret.",
    type: ProductType.E_LIQUID,
    status: ProductStatus.ACTIVE,
    brandSlug: "alfaliquid",
    categorySlug: "e-liquides",
    priceCents: 590,
    stockPolicy: StockPolicy.FINITE,
    stockQty: 60,
    tags: ["classic", "mtl", "debutant"],
    warningRequired: true,
    imageUrl: "/product-placeholder.svg",
    nicotineMg: 6,
    pgRatio: 50,
    vgRatio: 50,
    volumeMl: 10
  },
  {
    sku: "ELQ-VDLV-FRUIT-10",
    slug: "fruit-sec-10ml-vdlv",
    name: "Fruit Sec 10ml",
    shortDescription: "Note fruitee legere, sans exces sucre.",
    longDescription: "E-liquide fictif oriente clarte aromatique pour tirage indirect.",
    type: ProductType.E_LIQUID,
    status: ProductStatus.ACTIVE,
    brandSlug: "vdlv",
    categorySlug: "e-liquides",
    priceCents: 620,
    stockPolicy: StockPolicy.FINITE,
    stockQty: 55,
    tags: ["fruit", "mtl"],
    warningRequired: true,
    imageUrl: "/product-placeholder.svg",
    nicotineMg: 3,
    pgRatio: 60,
    vgRatio: 40,
    volumeMl: 10
  },
  {
    sku: "ELQ-TERROIR-NATURE-10",
    slug: "nature-equilibre-10ml-terroir-vapeur",
    name: "Nature Equilibre 10ml",
    shortDescription: "Base neutre et ronde pour usage quotidien.",
    longDescription: "E-liquide fictif axe regularite et faible echauffement.",
    type: ProductType.E_LIQUID,
    status: ProductStatus.ACTIVE,
    brandSlug: "terroir-vapeur",
    categorySlug: "e-liquides",
    priceCents: 640,
    stockPolicy: StockPolicy.FINITE,
    stockQty: 42,
    tags: ["equilibre", "mtl"],
    warningRequired: true,
    imageUrl: "/product-placeholder.svg",
    nicotineMg: 6,
    pgRatio: 50,
    vgRatio: 50,
    volumeMl: 10
  },
  {
    sku: "ELQ-VEGETOL-DOUX-10",
    slug: "doux-vegetal-10ml-vegetol",
    name: "Doux Vegetal 10ml",
    shortDescription: "Sensation douce pour tirage indirect.",
    longDescription: "E-liquide fictif formulae pour une sensation plus legere en gorge.",
    type: ProductType.E_LIQUID,
    status: ProductStatus.ACTIVE,
    brandSlug: "vegetol",
    categorySlug: "e-liquides",
    priceCents: 690,
    stockPolicy: StockPolicy.FINITE,
    stockQty: 35,
    tags: ["doux", "mtl", "quotidien"],
    warningRequired: true,
    imageUrl: "/product-placeholder.svg",
    nicotineMg: 6,
    pgRatio: 40,
    vgRatio: 60,
    volumeMl: 10
  },
  {
    sku: "ELQ-CURIEUX-FRAIS-10",
    slug: "frais-modere-10ml-curieux",
    name: "Frais Modere 10ml",
    shortDescription: "Sensation fraiche moderee, non agressive.",
    longDescription: "E-liquide fictif pense pour conserver un tirage MTL confortable.",
    type: ProductType.E_LIQUID,
    status: ProductStatus.ACTIVE,
    brandSlug: "curieux",
    categorySlug: "e-liquides",
    priceCents: 650,
    stockPolicy: StockPolicy.FINITE,
    stockQty: 48,
    tags: ["frais", "mtl"],
    warningRequired: true,
    imageUrl: "/product-placeholder.svg",
    nicotineMg: 3,
    pgRatio: 50,
    vgRatio: 50,
    volumeMl: 10
  },
  {
    sku: "ELQ-SAVOUREA-CLASSIC-10",
    slug: "classic-doux-10ml-savourea",
    name: "Classic Doux 10ml",
    shortDescription: "Classic leger adapte au MTL debutant.",
    longDescription: "E-liquide fictif de reference pour parcours d'initiation adulte.",
    type: ProductType.E_LIQUID,
    status: ProductStatus.ACTIVE,
    brandSlug: "savourea",
    categorySlug: "e-liquides",
    priceCents: 580,
    stockPolicy: StockPolicy.FINITE,
    stockQty: 70,
    tags: ["classic", "debutant", "mtl"],
    warningRequired: true,
    imageUrl: "/product-placeholder.svg",
    nicotineMg: 12,
    pgRatio: 70,
    vgRatio: 30,
    volumeMl: 10
  },
  {
    sku: "MTL-MOD-CORE-01",
    slug: "core-mtl-mod-20w",
    name: "Core MTL Mod 20W",
    shortDescription: "Mod compact faible puissance pour MTL.",
    longDescription: "Materiel fictif simple a regler avec puissance moderee.",
    type: ProductType.MTL_MOD,
    status: ProductStatus.ACTIVE,
    brandSlug: "lovatech",
    categorySlug: "materiel-mtl",
    priceCents: 3290,
    stockPolicy: StockPolicy.FINITE,
    stockQty: 18,
    tags: ["mod", "mtl", "20w"],
    warningRequired: true,
    imageUrl: "/product-placeholder.svg",
    recommendedPowerMinW: 8,
    recommendedPowerMaxW: 20,
    airflowStyle: "indirect",
    connectorType: "510",
    resistanceRange: "0.8-1.8 ohm"
  },
  {
    sku: "MTL-MOD-LITE-02",
    slug: "lite-mtl-mod-18w",
    name: "Lite MTL Mod 18W",
    shortDescription: "Format leger pour usage quotidien.",
    longDescription: "Materiel fictif oriente autonomie moderee et simplicite.",
    type: ProductType.MTL_MOD,
    status: ProductStatus.ACTIVE,
    brandSlug: "lovatech",
    categorySlug: "materiel-mtl",
    priceCents: 2890,
    stockPolicy: StockPolicy.FINITE,
    stockQty: 21,
    tags: ["mod", "mtl", "compact"],
    warningRequired: true,
    imageUrl: "/product-placeholder.svg",
    recommendedPowerMinW: 7,
    recommendedPowerMaxW: 18,
    airflowStyle: "indirect",
    connectorType: "510",
    resistanceRange: "1.0-1.8 ohm"
  },
  {
    sku: "MTL-CLEARO-FOCUS-01",
    slug: "focus-mtl-clearomiseur",
    name: "Focus MTL Clearomiseur",
    shortDescription: "Tirage serre avec airflow progressif.",
    longDescription: "Clearomiseur fictif dedie au tirage indirect et basse puissance.",
    type: ProductType.MTL_CLEAROMIZER,
    status: ProductStatus.ACTIVE,
    brandSlug: "lovatech",
    categorySlug: "materiel-mtl",
    priceCents: 2190,
    stockPolicy: StockPolicy.FINITE,
    stockQty: 24,
    tags: ["clearo", "mtl", "airflow"],
    warningRequired: true,
    imageUrl: "/product-placeholder.svg",
    recommendedPowerMinW: 10,
    recommendedPowerMaxW: 17,
    airflowStyle: "serre",
    connectorType: "510",
    resistanceRange: "1.0-1.6 ohm"
  },
  {
    sku: "MTL-CLEARO-BALANCE-02",
    slug: "balance-mtl-clearomiseur",
    name: "Balance MTL Clearomiseur",
    shortDescription: "Rendu saveur stable pour faibles puissances.",
    longDescription: "Clearomiseur fictif base sur un usage modere et regulier.",
    type: ProductType.MTL_CLEAROMIZER,
    status: ProductStatus.ACTIVE,
    brandSlug: "lovatech",
    categorySlug: "materiel-mtl",
    priceCents: 2390,
    stockPolicy: StockPolicy.FINITE,
    stockQty: 16,
    tags: ["clearo", "mtl", "saveur"],
    warningRequired: true,
    imageUrl: "/product-placeholder.svg",
    recommendedPowerMinW: 9,
    recommendedPowerMaxW: 16,
    airflowStyle: "indirect",
    connectorType: "510",
    resistanceRange: "0.8-1.4 ohm"
  }
];

async function upsertBrands(): Promise<Map<string, string>> {
  const idsBySlug = new Map<string, string>();

  for (const brand of brands) {
    assertNoForbiddenVapeTerms(brand.name, "brand.name");
    assertNoForbiddenVapeTerms(brand.slug, "brand.slug");

    const saved = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {
        name: brand.name,
        isActive: true
      },
      create: {
        name: brand.name,
        slug: brand.slug,
        isActive: true
      }
    });

    idsBySlug.set(saved.slug, saved.id);
  }

  return idsBySlug;
}

async function upsertCategories(): Promise<Map<string, string>> {
  const idsBySlug = new Map<string, string>();

  for (const category of categories) {
    assertNoForbiddenVapeTerms(category.name, "category.name");
    assertNoForbiddenVapeTerms(category.slug, "category.slug");

    const saved = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        family: category.family,
        description: category.description,
        isActive: true,
        sortOrder: category.sortOrder
      },
      create: {
        name: category.name,
        slug: category.slug,
        family: category.family,
        description: category.description,
        isActive: true,
        sortOrder: category.sortOrder
      }
    });

    idsBySlug.set(saved.slug, saved.id);
  }

  return idsBySlug;
}

async function upsertProducts(brandIds: Map<string, string>, categoryIds: Map<string, string>): Promise<void> {
  for (const product of products) {
    assertNoForbiddenVapeTerms(product.name, "product.name");
    assertNoForbiddenVapeTerms(product.slug, "product.slug");

    if (product.type === ProductType.E_LIQUID) {
      const brandName = brands.find((brand) => brand.slug === product.brandSlug)?.name;
      if (!brandName) {
        throw new Error(`Missing brand for e-liquid seed SKU ${product.sku}`);
      }
      assertAllowedELiquidBrand(brandName);
    }

    const brandId = brandIds.get(product.brandSlug);
    const categoryId = categoryIds.get(product.categorySlug);

    if (!brandId) {
      throw new Error(`Unknown brand slug "${product.brandSlug}" for SKU ${product.sku}`);
    }

    if (!categoryId) {
      throw new Error(`Unknown category slug "${product.categorySlug}" for SKU ${product.sku}`);
    }

    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        slug: product.slug,
        name: product.name,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        type: product.type,
        status: product.status,
        brandId,
        categoryId,
        priceCents: product.priceCents,
        stockPolicy: product.stockPolicy,
        stockQty: product.stockQty,
        tags: product.tags,
        warningRequired: product.warningRequired,
        imageUrl: product.imageUrl,
        nicotineMg: product.nicotineMg,
        pgRatio: product.pgRatio,
        vgRatio: product.vgRatio,
        volumeMl: product.volumeMl,
        recommendedPowerMinW: product.recommendedPowerMinW,
        recommendedPowerMaxW: product.recommendedPowerMaxW,
        airflowStyle: product.airflowStyle,
        connectorType: product.connectorType,
        resistanceRange: product.resistanceRange
      },
      create: {
        sku: product.sku,
        slug: product.slug,
        name: product.name,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        type: product.type,
        status: product.status,
        brandId,
        categoryId,
        priceCents: product.priceCents,
        stockPolicy: product.stockPolicy,
        stockQty: product.stockQty,
        tags: product.tags,
        warningRequired: product.warningRequired,
        imageUrl: product.imageUrl,
        nicotineMg: product.nicotineMg,
        pgRatio: product.pgRatio,
        vgRatio: product.vgRatio,
        volumeMl: product.volumeMl,
        recommendedPowerMinW: product.recommendedPowerMinW,
        recommendedPowerMaxW: product.recommendedPowerMaxW,
        airflowStyle: product.airflowStyle,
        connectorType: product.connectorType,
        resistanceRange: product.resistanceRange
      }
    });
  }
}

export async function main(): Promise<void> {
  const brandIds = await upsertBrands();
  const categoryIds = await upsertCategories();
  await upsertProducts(brandIds, categoryIds);

  // eslint-disable-next-line no-console
  console.log(`Seed completed: ${brands.length} brands, ${categories.length} categories, ${products.length} products.`);
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
