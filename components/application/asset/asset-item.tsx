"use client";

"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { assetTypes } from "@/lib/enums";
import { Asset } from "@/lib/generated/prisma/browser";
import { getColorsFromText } from "@/lib/utils";
import { formatDate } from "date-fns";
import { DotIcon, HistoryIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";
import { AssetLegalStatusBadge, AssetTypeBadge } from "./asset-badges";

export default function AssetItem({ asset }: { asset: Asset }) {
  const { id, legalStatus, location, name, createdAt, retiredAt, size, type } =
    asset;
  const { icon: AssetIcon } = assetTypes[type];
  const { color1 } = getColorsFromText(name);
  const iconClassName = "size-20 fill-(--item-color)/20 text-(--item-color)";
  const href = `/assets/${type}/${id}`;
  const [isPending, startTransition] = useTransition();

  return (
    <Item
      key={id}
      variant={"muted"}
      style={
        {
          "--item-color": color1,
        } as React.CSSProperties
      }
      className="bg-linear-to-br even:bg-linear-to-bl from-(--item-color)/10 hover:from-muted hover:text-muted-foreground hover:shadow-lg"
      onClick={() => startTransition(() => {})}
      asChild
    >
      <Link href={href}>
        <ItemMedia>
          {isPending ? (
            <Spinner className={iconClassName} strokeWidth={0.5} />
          ) : (
            <AssetIcon className={iconClassName} strokeWidth={0.5} />
          )}
        </ItemMedia>

        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription>
            <HistoryIcon className="inline size-4" />{" "}
            {formatDate(createdAt, "PP")} -{" "}
            {retiredAt ? formatDate(retiredAt, "PP") : "Now"}
          </ItemDescription>
        </ItemContent>
        <ItemHeader>
          <span>
            {" "}
            <>
              {size && (
                <span className="inline-block">
                  {size}
                  <DotIcon className="inline" />
                </span>
              )}
            </>
            <MapPinIcon className="size-4.5 inline fill-muted-foreground text-muted" />{" "}
            {location}
          </span>
        </ItemHeader>
        <ItemFooter>
          <AssetLegalStatusBadge legalStatus={legalStatus} />
          <AssetTypeBadge type={type} />
        </ItemFooter>
      </Link>
    </Item>
  );
}
