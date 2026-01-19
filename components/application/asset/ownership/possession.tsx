import { cn } from "@/lib/utils";
import { formatDuration, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

interface Props {
  startDate: Date;
  endDate: Date | null;
  className?: string;
}

const INTERVAL_DURATION = 1000;

export default function PossessionDuration({
  startDate,
  endDate,
  className,
}: Props) {
  const calculateDuration = () =>
    formatDuration(
      intervalToDuration({
        start: startDate,
        end: endDate ?? new Date(),
      })
    );

  const [duration, setDuration] = useState<string>(calculateDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(calculateDuration());
    }, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <span className={cn("line-clamp-1 text-ellipsis", className)}>
      {duration} {endDate && "possession"}
    </span>
  );
}
