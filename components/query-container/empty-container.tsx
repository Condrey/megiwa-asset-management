import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { MessageSquareMoreIcon } from "lucide-react";

export function EmptyContainer({
  title,
  description,
  required = false,
  children,
}: {
  title: string;
  description?: string;
  required?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Empty>
      <EmptyMedia variant={"icon"}>
        <MessageSquareMoreIcon
          className={cn(
            "size-20 fill-accent text-accent-foreground",
            required && "animate-bounce fill-primary text-primary-foreground"
          )}
          strokeWidth={0.5}
        />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle className={cn(required && "animate-pulse")}>
          {title}
        </EmptyTitle>
        <EmptyDescription className={cn(required && "animate-pulse")}>
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{children} </EmptyContent>
    </Empty>
  );
}
