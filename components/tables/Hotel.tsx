"use client";

import loading from "@/app/loading";
import { deleteHotel } from "@/lib/actions/hotel.action";
import { HotelType } from "@/lib/actions/shared.types";
import { Table, message } from "antd";
import dayjs from "dayjs";
import { Edit, PlusSquare, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HotelTable = ({ hotels }: { hotels: HotelType[] }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = async (hotelId: string) => {
    try {
      setLoading(true);
      const response = await deleteHotel(hotelId);

      if (response.success) {
        message.success(response.message);
      }

      if (!response.success) {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
            <Trash2
              size={18}
              className="cursor-pointer text-red-700"
              onClick={() => onDelete(record._id)}
            />
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
      <Table loading={loading} dataSource={hotels} columns={columns}></Table>
    </div>
  );
};

export default HotelTable;
