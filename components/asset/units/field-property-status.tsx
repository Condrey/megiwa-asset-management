import { Badge } from "@/components/ui/badge";
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
import { allPropertyStatuses, propertyStatuses } from "@/lib/enums";
import { UnitSchema } from "@/lib/validations";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<UnitSchema>;
}
export default function FieldPropertyStatus({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Property Status</FormLabel>
          <Select onValueChange={field.onChange} value={field.value!}>
            <SelectTrigger className="w-full">
              <FormControl>
                <SelectValue
                  placeholder={"Please choose a property Status"}
                  className="w-full"
                />
              </FormControl>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Allowed Property Status</SelectLabel>
                {allPropertyStatuses.map((propertyStatus) => {
                  const {
                    icon: Icon,
                    title,
                    variant,
                  } = propertyStatuses[propertyStatus];
                  return (
                    <SelectItem key={propertyStatus} value={propertyStatus}>
                      <div className="flex items-center gap-2">
                        <Badge variant={variant} className="opacity-50">
                          <Icon className="text-inherit " />
                        </Badge>
                        <span className="font-bold">{title}</span>
                      </div>
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
