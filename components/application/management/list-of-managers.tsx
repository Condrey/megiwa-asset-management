"use client";

import { DataTable } from "@/components/data-table/data-table";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { UserDataSelect } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { getAllManagers } from "./action";
import ButtonAddEditManager from "./button-add-edit-manager";
import { useManagersColumns } from "./columns";

interface Props {
  initialData: UserDataSelect[];
}
export function ListOfManagers({ initialData }: Props) {
  const query = useQuery({
    queryKey: ["managers"],
    queryFn: getAllManagers,
    initialData,
  });
  const { status, data } = query;
  if (status === "error") {
    return (
      <ErrorContainer errorMessage="Failed to get all managers" query={query} />
    );
  }
  if (status === "success" && !data.length) {
    return (
      <EmptyContainer
        title="There are no managers assigned yet."
        description="Please use the button below to add a manager."
      >
        <ButtonAddEditManager>Add a manager</ButtonAddEditManager>
      </EmptyContainer>
    );
  }
  return (
    <DataTable
      data={data}
      columns={useManagersColumns}
      filterColumn={{ id: "name" }}
      className="w-full"
    >
      <ButtonAddEditManager>
        <PlusIcon /> Manager
      </ButtonAddEditManager>
    </DataTable>
  );
}
