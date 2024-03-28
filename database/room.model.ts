import { Schema, model, models } from "mongoose";

const RoomSchema = new Schema(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    media: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = models.Room || model("Room", RoomSchema);

export default Room;
