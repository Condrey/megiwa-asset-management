import { TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";

import { DataTable } from "@/components/data-table/data-table";
import { TabsContent } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import ButtonAddEditUnit from "../units/button-add-edit-unit";
import { useUnitColumns } from "../units/columns";

export default function UnitsTab({ asset }: { asset: AssetData }) {
  const { name, units } = asset;

  return (
    <TabsContent value="units" className="space-y-6">
      <TypographyH2
        text="Asset Units"
        className="flex justify-between gap-3 items-center"
      >
        <ButtonAddEditUnit asset={asset}>
          <PlusIcon /> New Unit
        </ButtonAddEditUnit>
      </TypographyH2>

      {!units.length ? (
        <EmptyContainer
          title={`There are no units for "${name}" yet!`}
          description="Please note that this asset might not have the capacity to have a unit assigned to it."
        >
          <ButtonAddEditUnit asset={asset}>Create a unit</ButtonAddEditUnit>
        </EmptyContainer>
      ) : (
        <DataTable
          columns={useUnitColumns}
          data={units}
          filterColumn={{ id: "name", label: "unit name" }}
          ROWS_PER_TABLE={10}
          className="w-full"
        ></DataTable>
      )}
    </TabsContent>
  );
}
