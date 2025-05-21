"use client";

import { formatShortDate } from "@/lib/format-data";
import {
  useGetAllUsersQuery,
} from "@/store/user/user-api";
import { Box, Button, Modal } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import DataTable from "../data-table";
import { FaUsers } from "react-icons/fa";

interface Props { }

const AllUsers: FC<Props> = (props): JSX.Element => {
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "courses",
      headerName: "Purchased",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Joined At",
      flex: 0.5,
    },
    {
      field: " ",
      headerName: "Email",
      flex: 0.25,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`} className="text-center">
              <AiOutlineMail
                size={20}
                className="dark:text-dark_text text-slate-700"
              />
            </a>
          </>
        );
      },
    },

  ];

  let rows = [];

  if (data) {
    rows = data.users.map((item: any) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role[0].toUpperCase() + item.role.substring(1),
      courses: `${item.courses.length} ${item.courses.length > 1 ? "courses" : "course"
        }`,
      created_at: formatShortDate(item.createdAt),
    }));
  }

  return (
    <div className="mt-3 w-[90%] mx-auto ">

      <div className="flex items-center gap-2 -mb-3">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
          <FaUsers size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          ALL USERS
        </h2>
      </div>

      <DataTable rows={rows} columns={columns} isLoading={isLoading} />

    </div>
  );
};

export default AllUsers;
