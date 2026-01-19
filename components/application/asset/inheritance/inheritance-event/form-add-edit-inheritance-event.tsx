import TipTapEditorWithHeader from "@/components/tip-tap-editor/tip-tap-editor-with-header";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Asset } from "@/lib/generated/prisma/client";
import { InheritanceEventData } from "@/lib/types";
import {
  InheritanceEventSchema,
  inheritanceEventSchema,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { AssetTypeBadge } from "../../asset-badges";
import FieldEventDate from "./event-date";
import FieldDeceased from "./field-deceased";
import { useUpsertInheritanceEventMutation } from "./mutations";

interface Props {
  inheritanceEvent?: InheritanceEventData;
  asset: Asset;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function FormAddEditInheritanceEvent({
  inheritanceEvent,
  asset,
  open,
  onOpenChange,
}: Props) {
  const form = useForm<InheritanceEventSchema>({
    resolver: zodResolver(inheritanceEventSchema),
    values: {
      id: inheritanceEvent?.id || "",
      assetId: inheritanceEvent?.assetId || asset.id || "",
      deceasedId: inheritanceEvent?.deceasedId || "",
      notes: inheritanceEvent?.notes || "",
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      eventDate: inheritanceEvent?.eventDate!,
    },
  });
  const { mutate, isPending } = useUpsertInheritanceEventMutation();
  function submitForm(input: InheritanceEventSchema) {
    mutate(input, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className=" overflow-y-auto scroll-smooth h-dvh">
        <div className="max-w-7xl space-y-6 mx-auto  size-full ">
          <SheetHeader className="w-full">
            <SheetTitle>
              {inheritanceEvent ? "Update" : "Create a new"} inheritance Event
            </SheetTitle>
            <SheetDescription className="space-x-3">
              <AssetTypeBadge type={asset.type} />
              <span>{asset.name}</span>
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <div className="space-y-6 p-3   flex-1 flex flex-col">
              <div className="flex gap-3 w-full *:flex-1 *:w-full flex-col md:flex-row items-center">
                <FieldDeceased
                  asset={asset}
                  inheritanceForm={form}
                  disabled={!!inheritanceEvent}
                />
                <FieldEventDate form={form} />
              </div>
              <div className="size-full ">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes about this event</FormLabel>
                      <FormControl>
                        <TipTapEditorWithHeader
                          placeholder="give a full description about this inheritance event including why, where, and how it is being done"
                          className="last:min-h-[60vh] h-full flex-1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormFooter className="mt-6">
                <LoadingButton
                  type="button"
                  loading={isPending}
                  size={"lg"}
                  onClick={() => form.handleSubmit(submitForm)()}
                >
                  {inheritanceEvent ? "Update event info" : "Create event"}
                </LoadingButton>
              </FormFooter>
            </div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
