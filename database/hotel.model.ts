import { Schema, model, models } from "mongoose";

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    media: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = models.Hotel || model("Hotel", HotelSchema);

export default Hotel;
