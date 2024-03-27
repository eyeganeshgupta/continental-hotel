import RoomForm from "@/components/forms/Room";
import PageTitle from "@/components/shared/PageTitle";
import { getAllHotels } from "@/lib/actions/hotel.action";

const AddRoomPage = async () => {
  const response = await getAllHotels();
  const hotels = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title="Add Room" />
      <RoomForm hotels={hotels} />
    </div>
  );
};

export default AddRoomPage;
