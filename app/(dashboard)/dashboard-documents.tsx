"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { getColorsFromText } from "@/lib/utils";
import { formatDate } from "date-fns";
import { FileTextIcon, HistoryIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { TypographyH2 } from "../../components/headings";

type Document = {
  id: string;
  extension: string;
  title: string;
  size: string;
  dateCreated: Date;
};
const documents: Document[] = [
  {
    id: "0",
    title: "Boundary opening report Ireda Central Park house",
    extension: "PDF",
    size: "13mbs",
    dateCreated: new Date("12/12/2025"),
  },
  {
    id: "1",
    title: "Architectural Drawing Ireda Central Park house",
    extension: "PDF",
    size: "10mbs",
    dateCreated: new Date("12/12/2025"),
  },
  {
    id: "3",
    title: "Structural Drawing Ireda Central Park house",
    extension: "PDF",
    size: "23mbs",
    dateCreated: new Date("12/12/2025"),
  },
];
export default function DashboardDocuments() {
  return (
    <>
      <TypographyH2 text={`Documents (${documents.length || "..."})`} />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {documents.map((document) => (
          <DocumentItem key={document.id} document={document} />
        ))}
      </div>
      <div>
        {documents.length > 6 && (
          <Button variant={"link"} className="max-w-fit w-full ms-auto" asChild>
            <Link href={`/assets`}>
              View all documents
              <MoveRightIcon />
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
function DocumentItem({ document }: { document: Document }) {
  const { id, title, dateCreated, extension, size } = document;
  const { color2: BG_GRADIENT } = getColorsFromText(title);
  const iconClassName = "size-20 fill-(--item-color)/20 text-(--item-color)";

  const [isPending, startTransition] = useTransition();

  return (
    <Item
      key={id}
      variant={"muted"}
      style={
        {
          "--item-color": BG_GRADIENT,
        } as React.CSSProperties
      }
      className="bg-linear-to-tr from-(--item-color)/10 hover:from-muted hover:text-muted-foreground hover:shadow-lg"
      onClick={() => startTransition(() => {})}
      asChild
    >
      <Link href={`/documents/${id}`}>
        <ItemMedia>
          {isPending ? (
            <Spinner className={iconClassName} strokeWidth={0.5} />
          ) : (
            <FileTextIcon className={iconClassName} strokeWidth={0.5} />
          )}
        </ItemMedia>
        <ItemContent>
          <Badge variant={"outline"} className="max-w-fit ms-auto">
            {size}
          </Badge>
          <ItemTitle className="inline-block line-clamp-2">
            {title}.<span className="lowercase inline">{extension}</span>
          </ItemTitle>
          <ItemDescription>
            <HistoryIcon className="size-4 inline mr-0.5" />
            {formatDate(dateCreated, "Pp")}
          </ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
