import { getUnitById } from "@/components/application/asset/units/actions";
import { notFound } from "next/navigation";
import PageClient from "./page-client";

interface Props {
  params: Promise<{ assetType: string; id: string; unitId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { unitId: encodedUnitId } = await params;
  const unitId = decodeURIComponent(encodedUnitId);

  const unit = await getUnitById(unitId);

  if (!unit) {
    return {
      title: "Unit Not Found",
      description: "The item you are looking for does not exist.",
    };
  }

  return {
    title: `${unit.name} - Unit of ${unit.asset.name}`,
    description: `Viewing details for unit ${unit.name} of asset ${unit.asset.name}.`,
  };
}

export default async function Page({ params }: Props) {
  const { unitId: encodedUnitId } = await params;

  const unitId = decodeURIComponent(encodedUnitId);

  const unit = await getUnitById(unitId);

  if (!unit) return notFound();

  return <PageClient unit={unit} />;
}
