"use client";

import { InheritanceBeneficiaryData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getAllInheritanceEventBeneficiaries } from "./actions";

export const useInheritanceBeneficiariesQuery = ({
  inheritanceEventId,
  initialData,
}: {
  inheritanceEventId: string;
  initialData: InheritanceBeneficiaryData[];
}) =>
  useQuery({
    queryKey: ["inheritanceEvent", inheritanceEventId],
    initialData,
    queryFn: async () =>
      getAllInheritanceEventBeneficiaries(inheritanceEventId),
  });
