import Checkout from "@/components/Checkout";
import RoomInfo from "@/components/RoomInfo";
import { getRoomById } from "@/lib/actions/room.action";
import { RoomType } from "@/lib/actions/shared.types";

const BookRoomPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const response = await getRoomById(params.id);
  const room: RoomType = JSON.parse(JSON.stringify(response));

  return (
    <div>
      <div>
        <h1 className="font-bold text-gray-500 text-2xl">
          {room.name} - {room.hotel.name}
        </h1>
        <span className="text-gray-500 text-sm">{room.hotel.address}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-10 mb-10">
        <div className="col-span-2">
          <RoomInfo room={room} />
        </div>
        <div className="col-span-1">
          <Checkout room={room} />
        </div>
      </div>
    </div>
  );
};

export default BookRoomPage;
