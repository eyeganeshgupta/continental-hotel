/* eslint-disable camelcase */
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  // https://query-burst-git-master-ganesh-guptas-projects.vercel.app/api/webhook
  // ! We can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  // TODO: Add webhook secret to .env
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;
  console.log(WEBHOOK_SECRET);

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the type
  const eventType = evt.type;

  // * user created
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    // * create a new user in database
    const mongoUser = await createUser({
      clerkUserId: id,
      name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
      email: email_addresses[0].email_address,
      picture: image_url,
      isAdmin: false,
      isActive: true,
    });

    console.log("user created!");

    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  // * user updated
  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    // update an existing user in database
    const mongoUser = await updateUser({
      clerkUserId: id,
      updateData: {
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
      path: `/profile/${id}`,
    });

    console.log("user updated!");

    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  // * user deleted
  if (eventType === "user.deleted") {
    const { id } = evt.data;
    const deletedUser = await deleteUser({
      clerkUserId: id!,
    });
    console.log("user deleted");
    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  /*
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);
  */

  return NextResponse.json({ message: "OK" });
}
