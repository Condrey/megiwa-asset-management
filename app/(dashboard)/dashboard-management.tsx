"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { getColorsFromText, getNameInitials } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { TypographyH2 } from "../../components/headings";

type Management = {
  id: string;
  name: string;
  title: string;
  relationship: string | null;
  avatarUrl: string | null;
};
const management: Management[] = [
  {
    id: "0",
    title: "Owner",
    relationship: "Me",
    name: "Ocira James",
    avatarUrl: null,
  },
  {
    id: "1",
    title: "Caretaker",
    relationship: "Son",
    name: "Ocol Johnson",
    avatarUrl: null,
  },
  {
    id: "2",
    title: "Chairperson",
    relationship: "Daughter",
    name: "Akello Immaculate",
    avatarUrl: null,
  },
  {
    id: "3",
    title: "Secretary",
    relationship: "Son",
    name: "Owiny Peter",
    avatarUrl: null,
  },
  {
    id: "4",
    title: "Lawyer",
    relationship: "Co-opted member",
    name: "Alaro Tonny",
    avatarUrl: null,
  },
  {
    id: "5",
    title: "Member",
    relationship: "Daughter",
    name: "Awino Cinthia",
    avatarUrl: null,
  },
  {
    id: "6",
    title: "Member",
    relationship: "Brother",
    name: "Ocira Haggai",
    avatarUrl: null,
  },
  {
    id: "7",
    title: "Member",
    relationship: "Son",
    name: "Omia Hallan Johnson",
    avatarUrl: null,
  },
  {
    id: "8",
    title: "Member",
    relationship: "Cousin",
    name: "Otim Jaspher",
    avatarUrl: null,
  },
  {
    id: "9",
    title: "Member",
    relationship: "Father",
    name: "Okullo Arron",
    avatarUrl: null,
  },
  {
    id: "10",
    title: "Co-opted Member",
    relationship: null,
    name: "Acen Frider ",
    avatarUrl: null,
  },
  {
    id: "11",
    title: "Security Guard",
    relationship: null,
    name: "Omule Simba",
    avatarUrl: null,
  },
];
export default function DashboardManagement() {
  return (
    <>
      <TypographyH2 text={`Management (${management.length || "..."})`} />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {management.slice(0, 6).map((management) => (
          <ManagementItem key={management.id} management={management} />
        ))}
      </div>
      <div className="flex">
        {management.length > 6 && (
          <Button variant={"link"} className="max-w-fit w-full ms-auto" asChild>
            <Link href={"/managements"}>
              View all managements
              <MoveRightIcon />
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}

function ManagementItem({ management }: { management: Management }) {
  const { id, title, avatarUrl, name, relationship } = management;
  const { color2: BG_GRADIENT } = getColorsFromText(name + title);

  const [isPending, startTransition] = useTransition();

  return (
    <Item
      key={id}
      variant={"muted"}
      style={
        {
          "--bg-gradient": BG_GRADIENT,
        } as React.CSSProperties
      }
      className="bg-linear-to-tr from-(--bg-gradient)/10 hover:from-muted hover:text-muted-foreground hover:shadow-lg"
      onClick={() => startTransition(() => {})}
      asChild
    >
      <Link href={`/managements/${id}`}>
        <ItemMedia>
          {isPending ? (
            <Spinner
              className="size-20 fill-(--bg-gradient)/20 text-(--bg-gradient)"
              strokeWidth={0.5}
            />
          ) : (
            <Avatar className="size-20">
              <AvatarImage src={avatarUrl!} alt="image" />
              <AvatarFallback className="bg-radial to-(--bg-gradient) from-(--bg-gradient)/50 text-(--bg-gradient) text-2xl font-bold">
                {getNameInitials(name)}
              </AvatarFallback>
            </Avatar>
          )}
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>{relationship ?? "Not Related"}</ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
