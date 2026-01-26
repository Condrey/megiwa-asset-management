import { calculateDuration, cn } from "@/lib/utils";
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
  const [duration, setDuration] = useState<string>(
    calculateDuration({ startDate, endDate }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(calculateDuration({ startDate, endDate }));
    }, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <span className={cn("line-clamp-1 text-ellipsis", className)}>
      {duration} {endDate && "possession"}
    </span>
  );
}
