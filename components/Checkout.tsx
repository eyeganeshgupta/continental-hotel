"use client";

import { RoomType } from "@/lib/actions/shared.types";
import { Button, Form, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const Checkout = ({ room }: { room: RoomType }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  return (
    <div className="p-5 border border-gray-300 border-solid">
      <Form layout="vertical" className="flex flex-col gap-5  text-gray-500">
        <Form.Item label="Check In">
          <Input
            type="date"
            onChange={(e) => setCheckIn(e.target.value)}
            value={checkIn}
            min={dayjs().format("YYYY-MM-DD")}
          />
        </Form.Item>

        <Form.Item label="Check Out">
          <Input
            type="date"
            onChange={(e) => setCheckOut(e.target.value)}
            value={checkOut}
            min={dayjs(checkIn).add(1, "day").format("YYYY-MM-DD")}
            disabled={!checkIn}
          />
        </Form.Item>

        <Button type="primary" className="w-full">
          Check Availability
        </Button>
      </Form>
    </div>
  );
};

export default Checkout;
