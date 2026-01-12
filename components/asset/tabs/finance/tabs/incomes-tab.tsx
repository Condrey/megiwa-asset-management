import { TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";

export default function IncomesTab({ asset }: { asset: AssetData }) {
  const { name, incomes } = asset;
  return (
    <TabsContent value="incomes">
      <TypographyH2 text="Asset Incomes" />

      {!incomes.length ? (
        <EmptyContainer
          title={`There are no incomes available for "${name}" yet!`}
          description="Click the button below to create one."
        >
          <Button>Create an income</Button>
        </EmptyContainer>
      ) : (
        <div>
          {incomes.map((income) => (
            <div key={income.id}>{income.id}</div>
          ))}
        </div>
      )}
    </TabsContent>
  );
}
