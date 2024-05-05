"use server";

import Booking from "@/database/booking.model";
import Hotel from "@/database/hotel.model";
import Room from "@/database/room.model";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";
import { getCurrentUserFromMongoDB } from "./user.action";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getAllBookingsForAdmin = async () => {
  try {
    connectToDatabase();

    const response = await Booking.find({})
      .populate("hotel")
      .populate("room")
      .populate("user")
      .sort({ createdAt: -1 });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllUserBookings = async (userId: string) => {
  const bookings = await Booking.find({
    user: userId,
  })
    .populate("hotel")
    .populate("room")
    .sort({ createdAt: -1 });

  return bookings;
};

export const getAvailableRooms = async ({
  reqCheckInDate,
  reqCheckOutDate,
  type,
}: {
  reqCheckInDate: string;
  reqCheckOutDate: string;
  type: string;
}) => {
  try {
    connectToDatabase();

    // ! if checkin date or checkout date is not valid return data only with type filter
    if (!reqCheckInDate || !reqCheckOutDate) {
      const rooms = await Room.find({
        ...(type && { type }),
      }).populate({
        path: "hotel",
        model: Hotel,
        select: "_id name address",
      });

      return {
        success: true,
        data: JSON.parse(JSON.stringify(rooms)),
      };
    }

    // ! first get all the rooms which are booked in the given date range
    const bookedSlots = await Booking.find({
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

    const bookedRoomIds = bookedSlots.map((slot) => slot.room);

    // ! get all the rooms by excluding the booked rooms
    const rooms = await Room.find({
      _id: { $nin: bookedRoomIds },
      ...(type && { type }),
    }).populate("hotel");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(rooms)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getBookingReport = async ({
  startDate,
  endDate,
}: {
  startDate: any;
  endDate: any;
}) => {
  try {
    const response = await Booking.find({
      bookingStatus: "Booked",
      createdAt: {
        $gte: dayjs(startDate).startOf("day").toDate(),
        $lte: dayjs(endDate).endOf("day").toDate(),
      },
    })
      .populate("room")
      .populate("user")
      .populate("hotel");

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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

export const cancelBooking = async ({
  bookingId,
  paymentId,
}: {
  bookingId: string;
  paymentId: string;
}) => {
  try {
    connectToDatabase();

    // ! change the status of the booking to cancelled
    await Booking.findByIdAndUpdate(bookingId, {
      bookingStatus: "Cancelled",
    });

    // ! refund the payment
    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
    });

    if (refund.status !== "succeeded") {
      return {
        success: false,
        message:
          "Your booking has been cancelled but the refund failed. Please contact support for further assistance.",
      };
    }

    revalidatePath("/user/bookings");

    return {
      success: true,
      message:
        "Your booking has been cancelled and the refund has been processed.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
