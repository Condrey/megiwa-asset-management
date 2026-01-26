import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { FamilyMember } from "@/lib/generated/prisma/client";
import { FamilyMemberData, InheritanceBeneficiaryData } from "@/lib/types";
import {
  cn,
  formatPercentage,
  getColorsFromText,
  getNameInitials,
} from "@/lib/utils";
import { formatDate } from "date-fns";
import { CheckIcon, CircleIcon, DotIcon, SkullIcon } from "lucide-react";
import React from "react";

interface Props {
  familyMember: FamilyMemberData;
  avatarSize?: string;
  className?: string;
  variant?: "default" | "muted" | "outline";
  isChecked: boolean;
}
export default function CommandItemFamilyMember({
  familyMember: {
    avatarUrl,
    fullName,
    father,
    mother,
    contact,
    email,
    isDeceased,
    dateOfBirth,
  },
  avatarSize,
  isChecked,
  className,
  variant,
}: Props) {
  const { color2: BG_GRADIENT } = getColorsFromText(fullName);
  return (
    <Item
      variant={variant || "default"}
      className={cn("p-0 w-full max-w-md", className)}
    >
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
          <AvatarImage src={avatarUrl!} alt="user profile" />
          <AvatarFallback className="bg-radial to-(--bg-gradient) from-(--bg-gradient)/50 text-(--bg-gradient) text-xl font-bold">
            {getNameInitials(fullName)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1">
          {fullName}
          <BornDate dateOfBirth={dateOfBirth} />
        </ItemTitle>
        <ItemDescription className="inline-block line-clamp-1">
          {!father && !mother && `${contact ?? email ?? "No contact provided"}`}
          {father && (
            <span>
              Father:{" "}
              {!mother ? father.fullName : getNameInitials(father.fullName)}
            </span>
          )}
          {mother && (
            <>
              <DotIcon className="inline" />
              <span>
                Mother:{" "}
                {!father ? mother.fullName : getNameInitials(mother.fullName)}
              </span>
            </>
          )}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <IsADeceased isDeceased={isDeceased} />
        <CheckIcon
          className={cn("ml-auto", isChecked ? "opacity-100" : "opacity-0")}
        />
      </ItemActions>
    </Item>
  );
}

export function ChosenFamilyMemberCommandItem({
  familyMember,
}: {
  familyMember: FamilyMember | undefined;
}) {
  if (!familyMember) return null;
  const { isDeceased, fullName, dateOfBirth } = familyMember;
  return (
    <div className="flex max-w-md justify-between gap-2 items-center">
      <p className="line-clamp-1 text-ellipsis">{fullName}</p>
      <BornDate dateOfBirth={dateOfBirth} />
      <IsADeceased isDeceased={isDeceased} />
    </div>
  );
}

function BornDate({ dateOfBirth }: { dateOfBirth: Date | null }) {
  return (
    <>
      {dateOfBirth && (
        <span className="flex-0 text-xs text-muted-foreground">
          {`( Born: '${formatDate(dateOfBirth, "y")})`}
        </span>
      )}
    </>
  );
}

function IsADeceased({ isDeceased }: { isDeceased: boolean }) {
  return (
    <>
      {isDeceased && (
        <SkullIcon className="fill-destructive text-destructive-foreground" />
      )}
    </>
  );
}

interface BeneficiaryItemFamilyMemberProps {
  beneficiary: InheritanceBeneficiaryData;
  totalShares: number | null;
  avatarSize?: string;
  className?: string;
}
export function BeneficiaryItemFamilyMember({
  beneficiary: {
    member: {
      avatarUrl,
      fullName,
      father,
      mother,
      contact,
      email,
      isDeceased,
      dateOfBirth,
    },
    share,
    previousShare,
  },
  avatarSize = "35px",
  totalShares,
  className,
}: BeneficiaryItemFamilyMemberProps) {
  const { color2: BG_GRADIENT } = getColorsFromText(fullName);
  const hasNoShare = share <= 0;
  return (
    <Item className={cn("p-0", className)}>
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
          <AvatarImage src={avatarUrl!} alt="user profile" />
          <AvatarFallback className="bg-radial to-(--bg-gradient) from-(--bg-gradient)/50 text-(--bg-gradient) text-sm font-bold">
            {getNameInitials(fullName)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>

      <ItemContent>
        <ItemTitle className="line-clamp-1">
          {fullName}
          <BornDate dateOfBirth={dateOfBirth} />
        </ItemTitle>
        <ItemDescription className="inline-block line-clamp-1">
          {!father && !mother && `${contact ?? email ?? "No contact provided"}`}
          {father && (
            <span>
              Father:{" "}
              {!mother ? father.fullName : getNameInitials(father.fullName)}
            </span>
          )}
          {mother && (
            <>
              <DotIcon className="inline" />
              <span>
                Mother:{" "}
                {!father ? mother.fullName : getNameInitials(mother.fullName)}
              </span>
            </>
          )}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <IsADeceased isDeceased={isDeceased} />
        <div className="slashed-zero tabular-nums font-mono *:flex *:flex-col *:items-center gap-0.5">
          {hasNoShare ? (
            <div>
              <div className="text-destructive flex items-center">
                <CircleIcon className="size-3 fill-destructive text-destructive mr-0.5" />{" "}
                Had {formatPercentage(previousShare / 100)}
              </div>
              <div>shares</div>
            </div>
          ) : (
            <div>
              <div className="text-success flex items-center">
                <CircleIcon className="size-3 fill-success text-success mr-0.5" />{" "}
                {`${formatPercentage(share / 100)} ${!totalShares ? "" : `of ${formatPercentage(totalShares / 100)}`}`}
              </div>
              <div>shares</div>
            </div>
          )}
        </div>
      </ItemActions>
    </Item>
  );
}
