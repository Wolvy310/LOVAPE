import type { Metadata } from "next";
import { FabricantsPage } from "@/components/fabricants-page";

export const metadata: Metadata = {
  title: "LOVAPE | Fabricants E-liquides",
  description:
    "LOVAPE - Fabricants d'e-liquides: Vegetol, VDLV, Terroir et Vapeur, Curieux, Le French Liquide, Savourea, Alfaliquid."
};

export default function Page() {
  return <FabricantsPage />;
}
