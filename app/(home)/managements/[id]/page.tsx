import { getManagerById } from "@/components/application/management/action";
import { roles } from "@/lib/enums";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageClient from "./page-client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const managerId = decodeURIComponent(id);
  const manager = await getManagerById(managerId);
  if (!manager)
    return {
      title: "Manager Not Found",
      description: "The item you are looking for does not exist.",
    };
  const { title: managerTitle } = roles[manager.role];

  return {
    title: `${manager.name} - Manager`,
    description: `Viewing details for ${managerTitle} ${manager.name} in the managements section.`,
  };
}

export default async function Page({ params }: Props) {
  const { id: paramsId } = await params;
  const managerId = decodeURIComponent(paramsId);
  const manager = await getManagerById(managerId);
  if (!manager) return notFound();

  return <PageClient initialData={manager} />;
}
