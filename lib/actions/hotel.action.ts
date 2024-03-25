"use server";

import Hotel from "@/database/hotel.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";

export const getAllHotels = async () => {
  try {
    connectToDatabase();
    const response = await Hotel.find().sort({ createdAt: -1 });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addHotel = async (payload: any) => {
  try {
    connectToDatabase();
    const newHotel = new Hotel(payload);
    await newHotel.save();
    revalidatePath("/admin/hotels");
    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};
