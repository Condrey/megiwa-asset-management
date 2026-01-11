import { TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import { Button } from "@/components/ui/button";

import { TabsContent } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";

export default function UnitsTab({ asset }: { asset: AssetData }) {
  const { name, units } = asset;

  return (
    <TabsContent value="units" className="space-y-6">
      <TypographyH2 text="Asset Units" />

      {!units.length ? (
        <EmptyContainer
          title={`There are no units for "${name}" yet!`}
          description="Please note that this asset might not have the capacity to have a unit assigned to it."
        >
          <Button>Create a unit</Button>
        </EmptyContainer>
      ) : (
        <div>
          {units.map((unit) => (
            <div key={unit.id}>{unit.id}</div>
          ))}
        </div>
      )}
    </TabsContent>
  );
}
