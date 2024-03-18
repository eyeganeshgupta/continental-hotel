import { connectToDatabase } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { Button } from "antd";

connectToDatabase();

export default async function Home() {
  return (
    <div className="flex flex-col gap-5 p-5 items-center justify-center h-screen">
      <h1 className="text-3xl text-gray-500 font-bold uppercase">
        The Continental Hotel
      </h1>
      <UserButton afterSignOutUrl="/sign-in" />
      <Button type="primary">Confirm your booking!</Button>
    </div>
  );
}
