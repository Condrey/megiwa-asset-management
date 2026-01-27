"use client";

import DetailsTab from "@/components/application/asset/tabs/details-tab";
import UnitsTab from "@/components/application/asset/tabs/units-tab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCustomSearchParams } from "@/hooks/use-custom-search-param";
import { ASSET_SEARCH_PARAMETER, assetTabTriggers } from "@/lib/constants";
import { AssetData } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import DocumentsTab from "./documents-tab";
import FinancesTab from "./finance/finances-tab";
import LegalCasesTab from "./legal-cases-tab";
import { TabsCounter } from "./tabs-counter";

export default function TabsStructure({ asset }: { asset: AssetData }) {
  const searchParams = useSearchParams();
  const tabValue = searchParams.get(ASSET_SEARCH_PARAMETER);
  const [tab, setTab] = useState<string>(tabValue || "details");
  const { updateSearchParamsAndNavigate } = useCustomSearchParams();
  return (
    <Tabs
      value={tab}
      onValueChange={(value) => {
        setTab(value);
        updateSearchParamsAndNavigate(ASSET_SEARCH_PARAMETER, value);
      }}
      className="space-y-6"
    >
      <TabsList className="h-fit py-2 px-3 w-full md:*:h-12">
        {assetTabTriggers.map((triggerValue) => (
          <TabsTrigger key={triggerValue} value={triggerValue}>
            <span className="capitalize">{triggerValue}</span>
            {triggerValue === "units" ? (
              <TabsCounter count={asset.units.length} />
            ) : triggerValue === "legalCases" ? (
              <TabsCounter count={asset.legalCases.length} />
            ) : triggerValue === "documents" ? (
              <TabsCounter count={asset.documents.length} />
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>
      <DetailsTab asset={asset} />
      <UnitsTab asset={asset} />
      <FinancesTab asset={asset} />
      <LegalCasesTab asset={asset} />
      <DocumentsTab asset={asset} />
    </Tabs>
  );
}
