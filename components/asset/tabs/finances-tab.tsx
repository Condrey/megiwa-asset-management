import { TypographyH2, TypographyH4 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";
import { TabsCounter } from "./tabs-counter";

export default function FinancesTab({ asset }: { asset: AssetData }) {
  const { name, expenses, incomes, valuations } = asset;

  return (
    <TabsContent value="finances" className="space-y-6">
      <TypographyH4 text="Please choose a finance item from below" />
      <Tabs defaultValue="incomes" className="space-y-6">
        <TabsList className="h-fit py-2 px-3 w-full md:*:h-12">
          <TabsTrigger value="valuations" className="h-fit">
            Valuations
            <TabsCounter count={valuations.length} />
          </TabsTrigger>
          <TabsTrigger value="incomes">
            Incomes <TabsCounter count={incomes.length} />
          </TabsTrigger>
          <TabsTrigger value="expenses">
            Expenses <TabsCounter count={expenses.length} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="valuations">
          <TypographyH2 text="Asset Valuations" />
          {!valuations.length ? (
            <EmptyContainer
              title={`There are no valuations for "${name}" yet!`}
              description="Click here to evaluate the asset"
            >
              <Button>Evaluate asset</Button>
            </EmptyContainer>
          ) : (
            <div>
              {valuations.map((valuation) => (
                <div key={valuation.id}>{valuation.id}</div>
              ))}
            </div>
          )}
        </TabsContent>
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
      </Tabs>
    </TabsContent>
  );
}
