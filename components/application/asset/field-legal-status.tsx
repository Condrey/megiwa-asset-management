import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allLegalStatuses, assetLegalStatuses } from "@/lib/enums";
import { AssetSchema } from "@/lib/validations";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<AssetSchema>;
}
export default function FieldLegalStatus({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="legalStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Legal Status</FormLabel>
          <Select onValueChange={field.onChange} value={field.value!}>
            <SelectTrigger className="w-full">
              <FormControl>
                <SelectValue
                  placeholder={"Please choose a legal status"}
                  className="w-full"
                />
              </FormControl>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Allowed Legal Statuses</SelectLabel>
                {allLegalStatuses.map((legalStatus) => {
                  const { icon: Icon, title } = assetLegalStatuses[legalStatus];
                  return (
                    <SelectItem key={legalStatus} value={legalStatus}>
                      <Icon className="mr-3 inline" /> {title}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
