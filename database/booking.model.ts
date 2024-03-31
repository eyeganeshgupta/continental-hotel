import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkInDate: {
      type: String,
      required: true,
    },
    checkOutDate: {
      type: String,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
      default: "Booked",
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
