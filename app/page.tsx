import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();
  return (
    <div className="flex flex-col gap-5 p-5 items-center justify-center h-screen">
      <h1 className="text-3xl text-gray-500 font-bold uppercase">
        The Continental Hotel
      </h1>
      <h2>Clerk UserId: {userId ? userId : "guest"}</h2>
    </div>
  );
}
