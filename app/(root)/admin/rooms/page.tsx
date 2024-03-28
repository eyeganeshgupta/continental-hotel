import LinkButton from "@/components/shared/LinkButton";
import PageTitle from "@/components/shared/PageTitle";
import RoomTable from "@/components/tables/Room";
import { getAllRooms } from "@/lib/actions/room.action";

const RoomsPage = async () => {
  const response = await getAllRooms();
  console.log(JSON.stringify(response));
  const rooms = JSON.parse(JSON.stringify(response));

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Rooms" />
        <LinkButton path="/admin/rooms/add" title="Add Room" />
      </div>
      <RoomTable rooms={rooms} />
    </div>
  );
};

export default RoomsPage;
