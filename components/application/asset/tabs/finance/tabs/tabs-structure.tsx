import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCustomSearchParams } from "@/hooks/use-custom-search-param";
import { FINANCE_SEARCH_PARAMETER, financeTabTriggers } from "@/lib/constants";
import { AssetData } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { TabsCounter } from "../../tabs-counter";
import ExpensesTab from "./expenses-tab";
import IncomesTab from "./incomes-tab";
import ValuationsTab from "./valuations-tab";

export default function TabsStructure({ asset }: { asset: AssetData }) {
  const { expenses, incomes, valuations } = asset;
  const searchParams = useSearchParams();
  const tabValue = searchParams.get(FINANCE_SEARCH_PARAMETER);
  const [tab, setTab] = useState<string>(tabValue || "incomes");
  const { updateSearchParamsAndNavigate } = useCustomSearchParams();

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => {
        setTab(value);
        updateSearchParamsAndNavigate(FINANCE_SEARCH_PARAMETER, value);
      }}
      className="space-y-6"
    >
      <TabsList className="h-fit py-2 px-3 w-full md:*:h-12">
        {financeTabTriggers.map((triggerValue) => (
          <TabsTrigger key={triggerValue} value={triggerValue}>
            {triggerValue}
            {triggerValue === "valuations" ? (
              <TabsCounter count={valuations.length} />
            ) : triggerValue === "incomes" ? (
              <TabsCounter count={incomes.length} />
            ) : triggerValue === "expenses" ? (
              <TabsCounter count={expenses.length} />
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>
      <ValuationsTab asset={asset} />
      <IncomesTab asset={asset} />
      <ExpensesTab asset={asset} />
    </Tabs>
  );
}
