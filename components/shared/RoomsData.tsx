/* eslint-disable @next/next/no-img-element */
import { getAvailableRooms } from "@/lib/actions/booking.action";
import { RoomType } from "@/lib/actions/shared.types";
import Link from "next/link";

const RoomsData = async ({ searchParams }: { searchParams: any }) => {
  const response = await getAvailableRooms({
    reqCheckInDate: searchParams.checkIn || "",
    reqCheckOutDate: searchParams.checkOut || "",
    type: searchParams.type || "",
  });

  console.log(response);

  const rooms: RoomType[] = response.data;

  if (rooms?.length === 0) {
    return <div>No Rooms Found!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-8">
      {rooms?.map((room: RoomType) => {
        return (
          <Link
            href={`book-room/${room._id}`}
            key={room._id}
            className="no-underline text-black"
          >
            <div className="flex flex-col gap-2 border border-gray-200 border-solid room-card">
              <img
                src={room.media[0]}
                className="w-full h-64 object-cover"
                alt="room"
              />

              <div className="px-3 py-2 flex flex-col text-sm gap-2">
                <span>{room.name}</span>
                <span className="text-gray-500 text-xs">
                  {(room.hotel.name + " - " + room.hotel.address).substring(
                    0,
                    63
                  ) + "..."}
                </span>

                <hr className="border-gray-200 border border-solid" />

                <div className="flex justify-between">
                  <span>{room.rentPerDay} ₹ / Per Day</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RoomsData;
