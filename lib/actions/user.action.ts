"use server";

import User from "@/database/user.model";
import { currentUser } from "@clerk/nextjs";
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

export const getCurrentUserFromMongoDB = async () => {
  try {
    const currentUserFromClerk = await currentUser();

    // check if user exists in the database return user data
    const user = await User.findOne({
      clerkUserId: currentUserFromClerk?.id,
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)),
    };

    /*
    // if user does not exist in the database create a new user and return user data
    const newUser = new UserModel({
      name:
        currentUserFromClerk?.firstName + " " + currentUserFromClerk?.lastName,
      clerkUserId: currentUserFromClerk?.id,
      email: currentUserFromClerk?.emailAddresses[0].emailAddress,
      profilePic: currentUserFromClerk?.imageUrl,
      isAdmin: false,
      isActive: true,
    });

    await newUser.save();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
    */
  } catch (error) {
    return {
      success: false,
      error: error,
      message: "Error while fetching user data from MongoDB",
    };
  }
};

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
