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
import { allGenders } from "@/lib/enums";
import { FamilyMemberSchema } from "@/lib/validations";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<FamilyMemberSchema>;
}
export default function FieldGender({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Gender</FormLabel>
          <Select onValueChange={field.onChange} value={field.value!}>
            <SelectTrigger className="w-full">
              <FormControl>
                <SelectValue
                  placeholder={"Please choose a gender"}
                  className="w-full"
                />
              </FormControl>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Allowed Gender/ Sex</SelectLabel>
                {allGenders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
