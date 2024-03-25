"use client";

import { HotelType } from "@/lib/actions/shared.types";
import { Table } from "antd";
import dayjs from "dayjs";
import { Edit, PlusSquare, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const HotelTable = ({ hotels }: { hotels: HotelType[] }) => {
  const router = useRouter();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: HotelType) =>
        dayjs(record.createdAt).format("DD MMM, YYYY hh:mm A"),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: HotelType) => {
        return (
          <div className="flex gap-5 items-center">
            <Trash2 size={18} className="cursor-pointer text-red-700" />
            <Edit
              size={18}
              className="cursor-pointer text-yellow-700"
              onClick={() => router.push(`/admin/hotels/edit/${record._id}`)}
            />
            <PlusSquare size={18} className="cursor-pointer text-green-700" />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table dataSource={hotels} columns={columns}></Table>
    </div>
  );
};

export default HotelTable;
