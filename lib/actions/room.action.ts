"use server";

import Hotel from "@/database/hotel.model";
import Room from "@/database/room.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";

export const getRoomById = async (RoomId: string) => {
  try {
    connectToDatabase();
    const response = await Room.findById(RoomId).populate({
      path: "hotel",
      model: Hotel,
      select: "_id name",
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    connectToDatabase();
    const response = await Room.find()
      .populate({
        path: "hotel",
        model: Hotel,
        select: "_id name",
      })
      .sort({ createdAt: -1 });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addRoom = async (payload: any) => {
  try {
    connectToDatabase();
    const newRoom = new Room(payload);
    await newRoom.save();
    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "Room added successfully!",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateRoom = async ({
  roomId,
  payload,
}: {
  roomId: string;
  payload: any;
}) => {
  try {
    connectToDatabase();
    await Room.findByIdAndUpdate(roomId, payload);
    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "Room updated successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message,
    };
  }
};

export const deleteRoom = async (roomId: string) => {
  try {
    connectToDatabase();
    await Room.findByIdAndDelete(roomId);
    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "Room deleted successfully!",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error?.message,
    };
  }
};
