"use client";

import { getManagerById } from "@/components/application/management/action";
import Container from "@/components/container";
import { TypographyH1 } from "@/components/headings";
import ErrorContainer from "@/components/query-container/error-container";
import { UserDataSelect } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default function PageClient({
  initialData,
}: {
  initialData: UserDataSelect;
}) {
  const id = initialData.id;
  const query = useQuery({
    queryKey: ["manager", id],
    queryFn: async () => getManagerById(id),
    initialData,
  });
  const { data, status } = query;

  if (!data) return notFound();
  const { name } = data;
  return (
    <Container
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "All Managers", href: "/managements" },
        { title: name },
      ]}
    >
      <div className="flex gap-3">
        <TypographyH1 text={name} className="line-clamp-2" />
      </div>
      {status === "error" ? (
        <ErrorContainer
          errorMessage="An error occurred while fetching manager"
          query={query}
        />
      ) : (
        <div></div>
      )}
    </Container>
  );
}
