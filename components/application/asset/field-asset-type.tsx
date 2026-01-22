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
import { allAssetTypes, assetTypes } from "@/lib/enums";
import { AssetSchema } from "@/lib/validations";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<AssetSchema>;
}
export default function FieldAssetType({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Asset type</FormLabel>
          <Select onValueChange={field.onChange} value={field.value!}>
            <SelectTrigger className="w-full">
              <FormControl>
                <SelectValue
                  placeholder={"Please choose an asset type"}
                  className="w-full"
                />
              </FormControl>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Allowed Asset Types</SelectLabel>
                {allAssetTypes.map((assetType) => {
                  const { icon: Icon, title } = assetTypes[assetType];
                  return (
                    <SelectItem key={assetType} value={assetType}>
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
