"use server";

import Booking from "@/database/booking.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";
import { getCurrentUserFromMongoDB } from "./user.action";

export const checkRoomAvailability = async ({
  roomId,
  reqCheckInDate,
  reqCheckOutDate,
}: {
  roomId: string;
  reqCheckInDate: string;
  reqCheckOutDate: string;
}) => {
  try {
    connectToDatabase();

    const bookedSlot = await Booking.findOne({
      room: roomId,
      bookingStatus: "Booked",
      $or: [
        {
          checkInDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          $and: [
            { checkInDate: { $lte: reqCheckInDate } },
            { checkOutDate: { $gte: reqCheckOutDate } },
          ],
        },
      ],
    });

    if (bookedSlot) {
      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const bookRoom = async (payload: any) => {
  try {
    const userResponse = await getCurrentUserFromMongoDB();
    payload.user = userResponse.data._id;
    const booking = new Booking(payload);
    await booking.save();
    revalidatePath("/user/bookings");
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
