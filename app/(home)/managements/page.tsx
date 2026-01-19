import { getAllManagers } from "@/components/application/management/action";
import { ListOfManagers } from "@/components/application/management/list-of-managers";
import Container from "@/components/container";
import { TypographyH1 } from "@/components/headings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All managements by group",
};

export default async function Page() {
  const managers = await getAllManagers();

  return (
    <Container
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Managements", href: "/managements" },
      ]}
      ITEMS_TO_DISPLAY={2}
    >
      <TypographyH1 text="All Managers" className="uppercase" />
      <ListOfManagers initialData={managers} />
    </Container>
  );
}
