"use server";

import Booking from "@/database/booking.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";
import { getCurrentUserFromMongoDB } from "./user.action";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getAllUserBookings = async (userId: string) => {
  const bookings = await Booking.find({
    user: userId,
  })
    .populate("room")
    .populate("hotel")
    .sort({ createdAt: -1 });

  return bookings;
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
