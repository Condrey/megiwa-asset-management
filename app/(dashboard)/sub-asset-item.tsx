"use client";

import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { AssetType, SubAsset } from "@/lib/types";
import { getColorsFromText } from "@/lib/utils";
import { DotIcon } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";
import { assetTypes } from "../../lib/constants";

export function SubAssetItem({
  subAsset: subAsset,
  type,
}: {
  subAsset: SubAsset;
  type: AssetType;
}) {
  const { id, landSize, description, location, name } = subAsset;
  const Icon = assetTypes[type].icon;
  const { color1 } = getColorsFromText(name);
  const iconClassName = "size-20 fill-(--item-color)/20 text-(--item-color)";

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
      className="bg-linear-to-br from-(--item-color)/10 hover:from-muted hover:text-muted-foreground hover:shadow-lg"
      onClick={() => startTransition(() => {})}
      asChild
    >
      <Link href={`${id}`}>
        <ItemMedia>
          {isPending ? (
            <Spinner className={iconClassName} strokeWidth={0.5} />
          ) : (
            <Icon className={iconClassName} strokeWidth={0.5} />
          )}
        </ItemMedia>
        <ItemContent>
          <Badge>{landSize}</Badge>
          <ItemTitle>
            {name}
            <DotIcon />
            {location}
          </ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
