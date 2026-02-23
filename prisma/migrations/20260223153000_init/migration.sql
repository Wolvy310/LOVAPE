-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "CategoryFamily" AS ENUM ('E_LIQUID', 'MTL_MATERIAL');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('E_LIQUID', 'MTL_MOD', 'MTL_CLEAROMIZER');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "StockPolicy" AS ENUM ('FINITE', 'INFINITE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('REQUESTED', 'REVIEWING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ConsentScope" AS ENUM ('NECESSARY', 'ANALYTICS');

-- CreateEnum
CREATE TYPE "ConsentDecision" AS ENUM ('ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "family" "CategoryFamily" NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "brandId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "stockPolicy" "StockPolicy" NOT NULL DEFAULT 'FINITE',
    "stockQty" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "warningRequired" BOOLEAN NOT NULL DEFAULT true,
    "imageUrl" TEXT,
    "specJson" JSONB,
    "nicotineMg" INTEGER,
    "pgRatio" INTEGER,
    "vgRatio" INTEGER,
    "volumeMl" INTEGER,
    "recommendedPowerMinW" INTEGER,
    "recommendedPowerMaxW" INTEGER,
    "airflowStyle" TEXT,
    "connectorType" TEXT,
    "resistanceRange" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "orderRef" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'REQUESTED',
    "customerFirstName" TEXT NOT NULL,
    "customerLastName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT,
    "customerMessage" TEXT,
    "legalAcceptedAt" TIMESTAMP(3) NOT NULL,
    "ageConfirmedAt" TIMESTAMP(3) NOT NULL,
    "analyticsConsentAt" TIMESTAMP(3),
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "totalCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "productNameSnapshot" TEXT NOT NULL,
    "skuSnapshot" TEXT NOT NULL,
    "unitPriceCents" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "lineTotalCents" INTEGER NOT NULL,
    "configJson" JSONB,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consent_logs" (
    "id" TEXT NOT NULL,
    "scope" "ConsentScope" NOT NULL,
    "decision" "ConsentDecision" NOT NULL,
    "pagePath" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipHash" TEXT,
    "userHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consent_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_sessions" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastSeenAt" TIMESTAMP(3),
    "ipHash" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "admin_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "brands_slug_key" ON "brands"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_family_isActive_sortOrder_idx" ON "categories"("family", "isActive", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_status_categoryId_updatedAt_idx" ON "products"("status", "categoryId", "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "products_type_status_idx" ON "products"("type", "status");

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderRef_key" ON "orders"("orderRef");

-- CreateIndex
CREATE INDEX "orders_status_createdAt_idx" ON "orders"("status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");

-- CreateIndex
CREATE INDEX "order_items_productId_idx" ON "order_items"("productId");

-- CreateIndex
CREATE INDEX "consent_logs_scope_createdAt_idx" ON "consent_logs"("scope", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "consent_logs_requestId_idx" ON "consent_logs"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_sessions_tokenHash_key" ON "admin_sessions"("tokenHash");

-- CreateIndex
CREATE INDEX "admin_sessions_expiresAt_idx" ON "admin_sessions"("expiresAt");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddCheckConstraints
ALTER TABLE "categories"
ADD CONSTRAINT "categories_name_no_forbidden_terms_chk"
CHECK (lower("name") !~ '(pod|podmod|puff|jetable|disposable)');

ALTER TABLE "categories"
ADD CONSTRAINT "categories_slug_no_forbidden_terms_chk"
CHECK (lower("slug") !~ '(pod|podmod|puff|jetable|disposable)');

ALTER TABLE "products"
ADD CONSTRAINT "products_name_no_forbidden_terms_chk"
CHECK (lower("name") !~ '(pod|podmod|puff|jetable|disposable)');

ALTER TABLE "products"
ADD CONSTRAINT "products_slug_no_forbidden_terms_chk"
CHECK (lower("slug") !~ '(pod|podmod|puff|jetable|disposable)');

ALTER TABLE "products"
ADD CONSTRAINT "products_price_non_negative_chk"
CHECK ("priceCents" >= 0);

ALTER TABLE "products"
ADD CONSTRAINT "products_stock_non_negative_chk"
CHECK ("stockQty" >= 0);

ALTER TABLE "products"
ADD CONSTRAINT "products_pg_ratio_range_chk"
CHECK ("pgRatio" IS NULL OR ("pgRatio" >= 0 AND "pgRatio" <= 100));

ALTER TABLE "products"
ADD CONSTRAINT "products_vg_ratio_range_chk"
CHECK ("vgRatio" IS NULL OR ("vgRatio" >= 0 AND "vgRatio" <= 100));

ALTER TABLE "products"
ADD CONSTRAINT "products_power_min_non_negative_chk"
CHECK ("recommendedPowerMinW" IS NULL OR "recommendedPowerMinW" >= 0);

ALTER TABLE "products"
ADD CONSTRAINT "products_power_max_non_negative_chk"
CHECK ("recommendedPowerMaxW" IS NULL OR "recommendedPowerMaxW" >= 0);

ALTER TABLE "products"
ADD CONSTRAINT "products_power_range_consistent_chk"
CHECK (
  "recommendedPowerMinW" IS NULL
  OR "recommendedPowerMaxW" IS NULL
  OR "recommendedPowerMaxW" >= "recommendedPowerMinW"
);

ALTER TABLE "orders"
ADD CONSTRAINT "orders_total_non_negative_chk"
CHECK ("totalCents" >= 0);

ALTER TABLE "order_items"
ADD CONSTRAINT "order_items_unit_price_non_negative_chk"
CHECK ("unitPriceCents" >= 0);

ALTER TABLE "order_items"
ADD CONSTRAINT "order_items_quantity_positive_chk"
CHECK ("quantity" >= 1);

ALTER TABLE "order_items"
ADD CONSTRAINT "order_items_line_total_non_negative_chk"
CHECK ("lineTotalCents" >= 0);

