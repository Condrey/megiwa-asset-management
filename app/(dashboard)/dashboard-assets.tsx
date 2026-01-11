"use client";

import AssetItem from "@/components/asset/asset-item";
import { TypographyH2 } from "@/components/headings";
import { Button } from "@/components/ui/button";
import { Asset } from "@/lib/generated/prisma/browser";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardAssets({ assets }: { assets: Asset[] }) {
  return (
    <>
      <TypographyH2 text={`Assets (${assets.length || "..."})`} />

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {assets.map((asset) => (
          <AssetItem key={asset.id} asset={asset} />
        ))}
      </div>
      <div>
        {assets.length > 6 && (
          <Button variant={"link"} className="max-w-fit w-full ms-auto" asChild>
            <Link href={`/assets`}>
              View all assets
              <MoveRightIcon />
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
