import RoomForm from "@/components/forms/Room";
import PageTitle from "@/components/shared/PageTitle";
import { getAllHotels } from "@/lib/actions/hotel.action";
import { getRoomById } from "@/lib/actions/room.action";

const EditRoomPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const response = await getRoomById(params.id);
  const room = JSON.parse(JSON.stringify(response));

  const hotelsReponse = await getAllHotels();
  const hotels = JSON.parse(JSON.stringify(hotelsReponse));

  return (
    <div>
      <PageTitle title="Edit Room" />
      <RoomForm initialData={room} type="edit" hotels={hotels} />
    </div>
  );
};

export default EditRoomPage;
