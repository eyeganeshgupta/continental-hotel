"use client";

import { checkRoomAvailability } from "@/lib/actions/booking.action";
import { RoomType } from "@/lib/actions/shared.types";
import { Button, Form, Input, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const Checkout = ({ room }: { room: RoomType }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    setIsAvailable(false);
  }, [checkIn, checkOut]);

  const checkAvailability = async () => {
    try {
      setLoading(true);
      const response = await checkRoomAvailability({
        roomId: room._id,
        reqCheckInDate: checkIn,
        reqCheckOutDate: checkOut,
      });

      if (response.success) {
        setIsAvailable(true);
        message.success("Room is available");
      } else {
        setIsAvailable(false);
        message.error("Room is not available");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onBookRoom = async () => {};

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

        <Button
          type="primary"
          className="w-full"
          disabled={!checkIn || !checkOut || isAvailable}
          loading={loading}
          onClick={checkAvailability}
        >
          Check Availability
        </Button>

        {isAvailable && (
          <>
            <Button
              type="primary"
              className="w-full"
              loading={loading}
              onClick={onBookRoom}
            >
              Book Your Room
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default Checkout;
