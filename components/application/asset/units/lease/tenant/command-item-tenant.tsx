import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { TenantData } from "@/lib/types";
import { cn, getColorsFromText, getNameInitials } from "@/lib/utils";
import { CheckIcon, DotIcon } from "lucide-react";

interface Props {
  tenant: TenantData | undefined;
  isChecked: boolean;
  avatarSize?: string;
  className?: string;
}
export function CommandItemTenant({
  tenant,
  isChecked,
  avatarSize = "45px",
  className,
}: Props) {
  if (!tenant) {
    return null;
  }
  const { contact, email, fullName } = tenant;
  const { color2: BG_GRADIENT } = getColorsFromText(fullName);

  return (
    <Item className={cn("w-full", className)}>
      <ItemMedia>
        <Avatar
          style={
            {
              "--avatar-size": avatarSize,
              "--bg-gradient": BG_GRADIENT,
            } as React.CSSProperties
          }
          className="size-(--avatar-size)"
        >
          <AvatarImage src={undefined} alt="user profile" />
          <AvatarFallback className="bg-radial to-(--bg-gradient) from-(--bg-gradient)/50 text-(--bg-gradient) text-xl font-bold">
            {getNameInitials(fullName)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{fullName}</ItemTitle>
        <ItemDescription>
          <span>{contact}</span>
          {email && (
            <>
              <DotIcon />
              {email}
            </>
          )}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        {isChecked && <CheckIcon className="text-success" />}
      </ItemActions>
    </Item>
  );
}

export function ChosenTenantCommandItem({
  tenant,
}: {
  tenant: TenantData | undefined;
}) {
  if (!tenant) return null;
  const { contact, fullName } = tenant;
  return (
    <div className="flex max-w-md justify-between gap-2 items-center">
      <p className="line-clamp-1 text-ellipsis">{fullName}</p>
      <span className="text-muted-foreground text-xs">
        {obscureText({ text: contact })}
      </span>
    </div>
  );
}

const obscureText = ({
  text,
  endLen = 3,
  startLen = 2,
}: {
  text: string;
  startLen?: number;
  endLen?: number;
}) => {
  const textLen = text.length;
  if (startLen >= textLen) {
    return `'${text}`;
  }
  const start = text.substring(0, startLen!);
  const middleLen = text.substring(startLen!, textLen).length;
  const middle = Array.from({ length: middleLen }, () => {})
    .map(() => "*")
    .join("");
  const end = text.substring(textLen - endLen);
  return start + middle + end;
};
