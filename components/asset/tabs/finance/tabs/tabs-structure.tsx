import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";
import { TabsCounter } from "../../tabs-counter";
import ExpensesTab from "./expenses-tab";
import IncomesTab from "./incomes-tab";
import ValuationsTab from "./valuations-tab";

export default function TabsStructure({ asset }: { asset: AssetData }) {
  const { expenses, incomes, valuations } = asset;

  return (
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
      <ValuationsTab asset={asset} />
      <IncomesTab asset={asset} />
      <ExpensesTab asset={asset} />
    </Tabs>
  );
}
