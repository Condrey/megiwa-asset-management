import { TypographyH4 } from "@/components/headings";

import { TabsContent } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";
import { Suspense } from "react";
import TabsStructure from "./tabs/tabs-structure";

export default function FinancesTab({ asset }: { asset: AssetData }) {
  return (
    <TabsContent value="finances" className="space-y-6">
      <TypographyH4 text="Please choose a finance item from below" />
      <Suspense>
        <TabsStructure asset={asset} />s
      </Suspense>
    </TabsContent>
  );
}
