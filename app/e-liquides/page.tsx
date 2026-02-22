import type { Metadata } from "next";
import { ELiquidesPage } from "@/components/e-liquides-page";

export const metadata: Metadata = {
  title: "LOVAPE | E-liquides",
  description: "LOVAPE - E-liquides et carte Fabricants."
};

export default function Page() {
  return <ELiquidesPage />;
}
