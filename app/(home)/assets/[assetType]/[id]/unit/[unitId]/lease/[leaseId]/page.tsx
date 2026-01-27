import { getLeaseById } from "@/components/application/asset/units/lease/actions";
import { notFound } from "next/navigation";
import PageClient from "./page-client";

interface Props {
  params: Promise<{ assetType: string; id: string; leaseId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { leaseId: encodedLeaseId } = await params;
  const leaseId = decodeURIComponent(encodedLeaseId);

  const lease = await getLeaseById(leaseId);

  if (!lease) {
    return {
      title: "Lease Not Found",
      description: "The item you are looking for does not exist.",
    };
  }

  return {
    title: `Lease ${lease.id} - Unit of ${lease.unit.name}: ${lease.unit.asset.name}`,
    description: `Viewing details for lease ${lease.id} of unit ${lease.unit.name}.`,
  };
}

export default async function Page({ params }: Props) {
  const { leaseId: encodedLeaseId } = await params;
  const leaseId = decodeURIComponent(encodedLeaseId);

  const lease = await getLeaseById(leaseId);

  if (!lease) return notFound();

  return <PageClient lease={lease} />;
}
