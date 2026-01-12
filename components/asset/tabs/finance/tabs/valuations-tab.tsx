import ButtonAddEditValuation from "@/components/asset/valuations/button-add-edit-valuation";
import { useValuationColumns } from "@/components/asset/valuations/columns";
import { DataTable } from "@/components/data-table/data-table";
import { TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import { TabsContent } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";
import { PlusIcon } from "lucide-react";

export default function ValuationsTab({ asset }: { asset: AssetData }) {
  const { name, valuations } = asset;
  return (
    <TabsContent value="valuations">
      <TypographyH2
        text="Asset Valuations"
        className="w-full flex gap-3 items-center justify-between"
      >
        <ButtonAddEditValuation asset={asset}>
          <PlusIcon /> New Valuation
        </ButtonAddEditValuation>
      </TypographyH2>
      {!valuations.length ? (
        <EmptyContainer
          title={`There are no valuations for "${name}" yet!`}
          description="Click here to evaluate the asset"
        >
          <ButtonAddEditValuation asset={asset}>
            Evaluate asset
          </ButtonAddEditValuation>
        </EmptyContainer>
      ) : (
        <DataTable
          data={valuations}
          columns={useValuationColumns}
          className="w-full"
        ></DataTable>
      )}
    </TabsContent>
  );
}
