import { TypographyH2 } from "@/components/headings";
import { EmptyContainer } from "@/components/query-container/empty-container";
import { Button } from "@/components/ui/button";

import { TabsContent } from "@/components/ui/tabs";
import { AssetData } from "@/lib/types";

export default function DocumentsTab({ asset }: { asset: AssetData }) {
  const { name, documents } = asset;

  return (
    <TabsContent value="documents" className="space-y-6">
      <TypographyH2 text="Documents pertaining to the asset" />
      {!documents.length ? (
        <EmptyContainer
          title={`There are no uploaded documents for "${name}" yet!`}
          description="You may add a document pertaining to this asset here."
        >
          <Button>Add Document</Button>
        </EmptyContainer>
      ) : (
        <div>
          {documents.map((document) => (
            <div key={document.id}>{document.id}</div>
          ))}
        </div>
      )}
    </TabsContent>
  );
}
