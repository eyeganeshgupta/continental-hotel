"use server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getStripeClientSecretKey = async ({
  amount,
  hotelName,
  roomName,
}: {
  amount: number;
  hotelName: string;
  roomName: string;
}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      description: `${hotelName} - ${roomName}`,
    });

    console.log({ paymentIntent });

    return {
      success: true,
      data: paymentIntent.client_secret,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
