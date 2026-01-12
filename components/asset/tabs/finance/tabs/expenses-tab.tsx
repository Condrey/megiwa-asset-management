import { TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";

export default function ExpensesTab({ asset }: { asset: AssetData }) {
  const { name, expenses } = asset;
  return (
    <TabsContent value="expenses">
      <TypographyH2 text="Asset Expenses" />

      {!expenses.length ? (
        <EmptyContainer
          title={`There are no expenses for "${name}" yet!`}
          description="Add expense using the button below."
        >
          <Button>Add expense</Button>
        </EmptyContainer>
      ) : (
        <div>
          {expenses.map((expense) => (
            <div key={expense.id}>{expense.id}</div>
          ))}
        </div>
      )}
    </TabsContent>
  );
}
