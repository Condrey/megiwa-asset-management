import Container from "@/components/container";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { TypographyH1 } from "../components/headings";
import DashboardAssets from "./(dashboard)/dashboard-assets";
import DashboardDocuments from "./(dashboard)/dashboard-documents";
import DashboardManagement from "./(dashboard)/dashboard-management";

export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function Home() {
  const assets = await prisma.asset.findMany();
  return (
    <Container>
      <TypographyH1 className="uppercase" text="Ocira James Estates" />
      <DashboardAssets assets={assets} />
      <DashboardManagement />
      <DashboardDocuments />
    </Container>
  );
}
