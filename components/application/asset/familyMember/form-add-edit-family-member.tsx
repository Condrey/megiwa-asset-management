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
import { FamilyMemberData } from "@/lib/types";
import { FamilyMemberSchema, familyMemberSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import FieldDateOfBirth from "./field-date-of-birth";
import FieldDateOfDeath from "./field-date-of-death";
import FieldFather from "./field-father";
import FieldGender from "./field-gender";
import FieldMother from "./field-mother";
import { useUpsertFamilyMemberMutation } from "./mutations";

interface Props {
  familyMember?: FamilyMemberData;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function FormAddEditFamilyMember({
  familyMember,
  open,
  onOpenChange,
}: Props) {
  const form = useForm<FamilyMemberSchema>({
    resolver: zodResolver(familyMemberSchema),
    defaultValues: {
      id: familyMember?.id || "",
      contact: familyMember?.contact,
      email: familyMember?.email,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      gender: familyMember?.gender!,
      fullName: familyMember?.fullName || "",
      fatherId: familyMember?.fatherId,
      motherId: familyMember?.motherId,
      dateOfBirth: familyMember?.dateOfBirth,
      dateOfDeath: familyMember?.dateOfDeath,
    },
  });
  const { mutate, isPending } = useUpsertFamilyMemberMutation();
  function submitForm(input: FamilyMemberSchema) {
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
              {familyMember ? "Update" : "Create a new"} family Member
            </SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <div className="space-y-6 p-3 w-fit md:w-lg lg:w-3xl">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3 w-full *:flex-1 *:w-full flex-col md:flex-row items-center">
                <FieldGender form={form} />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="e.g., 0776239674"
                          {...field}
                          value={field.value!}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="e.g., someone@gmail.com"
                        {...field}
                        value={field.value!}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" gap-3 w-full grid md:grid-cols-2   items-center">
                <FieldFather form={form} />
                <FieldMother form={form} />
              </div>
              <div className="flex gap-3 w-full *:flex-1 *:w-full flex-col md:flex-row items-center">
                <FieldDateOfBirth form={form} />
                <FieldDateOfDeath form={form} />
              </div>
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
                  {familyMember ? "Update member info" : "Create member"}
                </LoadingButton>
              </FormFooter>
            </div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
