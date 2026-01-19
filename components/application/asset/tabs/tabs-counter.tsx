import { Badge } from "@/components/ui/badge";

export function TabsCounter({ count }: { count: number }) {
  return (
    <Badge
      variant={count === 0 ? "secondary" : "success"}
      className="-translate-y-2 rounded-full px-1 font-mono tabular-nums h-5 min-w-5"
    >
      {count}
    </Badge>
  );
}
