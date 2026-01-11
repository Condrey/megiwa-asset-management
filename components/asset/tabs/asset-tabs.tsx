"use client";

import DetailsTab from "@/components/asset/tabs/details-tab";
import UnitsTab from "@/components/asset/tabs/units-tab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";
import DocumentsTab from "./documents-tab";
import FinancesTab from "./finances-tab";
import LegalCasesTab from "./legal-cases-tab";
import { TabsCounter } from "./tabs-counter";

export default function AssetTabs({ asset }: { asset: AssetData }) {
  return (
    <Tabs defaultValue="details" className="space-y-6">
      <TabsList className="h-fit py-2 px-3 w-full md:*:h-12">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="finances">Finances</TabsTrigger>
        <TabsTrigger value="units">
          Units
          <TabsCounter count={asset.units.length} />
        </TabsTrigger>
        <TabsTrigger value="legalCases">
          Legal cases <TabsCounter count={asset.legalCases.length} />
        </TabsTrigger>
        <TabsTrigger value="documents">
          Documents <TabsCounter count={asset.documents.length} />
        </TabsTrigger>
      </TabsList>
      <DetailsTab asset={asset} />
      <UnitsTab asset={asset} />
      <FinancesTab asset={asset} />
      <LegalCasesTab asset={asset} />
      <DocumentsTab asset={asset} />
    </Tabs>
  );
}
