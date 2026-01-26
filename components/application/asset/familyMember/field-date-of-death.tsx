import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FamilyMemberSchema } from "@/lib/validations";
import { formatDate } from "date-fns";
import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<FamilyMemberSchema>;
}
export default function FieldDateOfDeath({ form }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name="dateOfDeath"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date of death</FormLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  type="button"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between font-normal"
                >
                  {field.value
                    ? formatDate(field.value, "PPPP")
                    : "Select date"}
                  <ChevronsUpDownIcon className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value!}
                captionLayout="dropdown"
                onSelect={(date) => {
                  form.setValue("dateOfDeath", date!);
                  form.clearErrors("dateOfDeath");
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
