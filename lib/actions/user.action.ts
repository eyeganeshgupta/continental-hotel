"use server";

import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";
import { CreateUserParams } from "./shared.types";

export async function getUserById(params: any) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const userFound = await User.findOne({ clerkUserId: userId });

    return userFound;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(userData);
    console.log(JSON.stringify(newUser));
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: any) {
  try {
    await connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: any) {
  try {
    await connectToDatabase();
    const { clerkId } = params;

    // const userFound = await User.findOneAndDelete({ clerkId });

    const userFound = await User.findOne({ clerkId });

    if (!userFound) {
      throw new Error("User not found!");
    }

    const deletedUser = "";

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
