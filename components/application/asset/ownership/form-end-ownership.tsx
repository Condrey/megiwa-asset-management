import { Button } from "@/components/ui/button";
import { Form, FormFooter } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Asset } from "@/lib/generated/prisma/client";
import { OwnershipData } from "@/lib/types";
import { ownershipSchema, OwnershipSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { AssetTypeBadge } from "../asset-badges";
import FieldDateEnd from "./field-date-end";
import { useEndOwnershipMutation } from "./mutations";

interface FormEndOwnershipProps {
  asset: Asset;
  ownership: OwnershipData;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function FormEndOwnership({
  asset,
  ownership,
  open,
  onOpenChange,
}: FormEndOwnershipProps) {
  const { name, type } = asset;

  const form = useForm<OwnershipSchema>({
    resolver: zodResolver(ownershipSchema),
    defaultValues: {
      id: ownership.id,
      assetId: ownership.assetId || asset.id,
      memberId: ownership.memberId,
      share: ownership.share,
      startDate: ownership.startDate,
      endDate: ownership.endDate,
    },
  });

  const { mutate, isPending } = useEndOwnershipMutation();
  function submitForm(input: OwnershipSchema) {
    mutate(input, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="top"
        className="min-h-1/2 overflow-y-auto scroll-smooth max-h-dvh"
      >
        <div className="max-w-3xl space-y-6 mx-auto w-full  ">
          <SheetHeader className="w-full">
            <SheetTitle>
              End ownership of {ownership.member.fullName}
            </SheetTitle>
            <SheetDescription>
              <AssetTypeBadge type={type} className="mr-2" />
              {name}
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-6"
            >
              <FieldDateEnd form={form} />

              <FormFooter className="my-6">
                <Button
                  onClick={() => form.reset()}
                  type="reset"
                  size={"lg"}
                  variant={"outline"}
                >
                  Reset Form
                </Button>
                <LoadingButton
                  type="button"
                  loading={isPending}
                  size={"lg"}
                  onClick={() => form.handleSubmit(submitForm)()}
                >
                  End Ownership
                </LoadingButton>
              </FormFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
