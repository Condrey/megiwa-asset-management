"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { assetTypes } from "@/lib/enums";
import { GroupedAssetByTypeData } from "@/lib/types";
import { getColorsFromText } from "@/lib/utils";
import Link from "next/link";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { AssetTypeBadge } from "./asset-badges";

export function GroupedAssetItem({
  groupedAssetItem,
}: {
  groupedAssetItem: GroupedAssetByTypeData;
}) {
  const {
    _count: { type: itemsOfSameType },
    type,
  } = groupedAssetItem;
  const { icon: AssetIcon, title: assetTitle } = assetTypes[type];
  const { color1 } = getColorsFromText(type);
  const iconClassName = "size-20 fill-(--item-color)/20 text-(--item-color)";

  const [isPending, startTransition] = useTransition();

  return (
    <Item
      key={type}
      variant={"muted"}
      style={
        {
          "--item-color": color1,
        } as React.CSSProperties
      }
      className="bg-linear-to-br from-(--item-color)/10 hover:from-muted hover:text-muted-foreground hover:shadow-lg"
      onClick={() => startTransition(() => {})}
      asChild
    >
      <Link href={`/assets/${type}`}>
        <ItemMedia>
          {isPending ? (
            <Spinner className={iconClassName} strokeWidth={0.5} />
          ) : (
            <AssetIcon className={iconClassName} strokeWidth={0.5} />
          )}
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{assetTitle}s</ItemTitle>
          <ItemDescription>{`${itemsOfSameType} ${assetTitle} asset${itemsOfSameType === 1 ? "" : "s"}`}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant={"ghost"}>View all</Button>
        </ItemActions>
        <ItemFooter>
          <AssetTypeBadge type={type} />
        </ItemFooter>
      </Link>
    </Item>
  );
}
