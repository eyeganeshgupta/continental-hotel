"use server";

import Hotel from "@/database/hotel.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";

export const getHotelById = async (hotelId: string) => {
  try {
    connectToDatabase();
    const response = await Hotel.findById(hotelId);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
      message: "Hotel added successfully!",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateHotel = async ({
  hotelId,
  payload,
}: {
  hotelId: string;
  payload: any;
}) => {
  try {
    connectToDatabase();
    revalidatePath("/admin/hotels");
    return {
      success: true,
      message: "Hotel updated successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message,
    };
  }
};
