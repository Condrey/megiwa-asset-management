import { TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import { Button } from "@/components/ui/button";

import { TabsContent } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";

export default function LegalCasesTab({ asset }: { asset: AssetData }) {
  const { name, legalCases } = asset;

  return (
    <TabsContent value="legalCases" className="space-y-6">
      <TypographyH2 text="Legal cases" />
      {!legalCases.length ? (
        <EmptyContainer
          title={`There are no legal cases for "${name}" yet!`}
          description="In a scenario where there is a legal case, please add it here."
        >
          <Button>Register a case</Button>
        </EmptyContainer>
      ) : (
        <div>
          {legalCases.map((legalCase) => (
            <div key={legalCase.id}>{legalCase.id}</div>
          ))}
        </div>
      )}
    </TabsContent>
  );
}
