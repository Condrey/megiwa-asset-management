"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTenants } from "./action";

export function useTenantsQuery() {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: getAllTenants,
  });
}
