"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { assetTypes } from "@/lib/enums";
import { AssetLegalStatus, AssetType } from "@/lib/generated/prisma/enums";
import { AssetData } from "@/lib/types";
import { AssetSchema, assetSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { AssetTypeBadge } from "./asset-badges";
import FieldAssetType from "./field-asset-type";
import FieldCreatedAtDate from "./field-created-at-date";
import FieldLegalStatus from "./field-legal-status";
import FieldRetiredAtDate from "./field-retired-at-date";
import { useUpsertAssetMutation } from "./mutations";

interface Props {
  asset?: AssetData;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  assetType?: AssetType;
}
export default function FormAddEditAsset({
  asset,
  open,
  onOpenChange,
  assetType,
}: Props) {
  const { title: typeOfAsset } = assetTypes[assetType || AssetType.RESIDENTIAL];
  const form = useForm<AssetSchema>({
    resolver: zodResolver(assetSchema),
    values: {
      id: asset?.id || "",
      name: asset?.name || "",
      location: asset?.location || "",
      size: asset?.size,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      type: assetType || asset?.type!,
      legalStatus: asset?.legalStatus || AssetLegalStatus.CLEAN,
      retiredAt: asset?.retiredAt,
      createdAt: asset?.createdAt,
    },
  });
  const { mutate, isPending } = useUpsertAssetMutation(assetType);
  function submitForm(input: AssetSchema) {
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
        side="right"
        className="sm:max-w-fit overflow-y-auto scroll-smooth h-dvh"
      >
        <div className="max-w-7xl space-y-6 mx-auto w-full  ">
          <SheetHeader className="w-full">
            <SheetTitle>
              {asset ? "Update" : "Create a new"} {assetType && typeOfAsset}{" "}
              Asset
            </SheetTitle>
            {assetType && <AssetTypeBadge type={assetType} />}
          </SheetHeader>
          <Form {...form}>
            <div className="space-y-6 p-3 w-fit md:w-lg lg:w-xl">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Asset name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Jamline and Sons Building"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!assetType && <FieldAssetType form={form} />}

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Asset location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Uhuru Bar, Soroti road"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset size</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 15 rooms, 500 sqm"
                        {...field}
                        value={field.value!}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FieldLegalStatus form={form} />
              <FieldCreatedAtDate form={form} />
              <FieldRetiredAtDate form={form} />

              <FormFooter className="mt-6">
                <Button
                  onClick={() => form.reset()}
                  type="button"
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
                  {asset ? "Update asset" : "Create asset"}
                </LoadingButton>
              </FormFooter>
            </div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
