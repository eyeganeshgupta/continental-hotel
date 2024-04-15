import AdminOnly from "@/components/shared/AdminOnly";
import LinkButton from "@/components/shared/LinkButton";
import PageTitle from "@/components/shared/PageTitle";
import RoomTable from "@/components/tables/Room";
import { getAllRooms } from "@/lib/actions/room.action";
import { getCurrentUserFromMongoDB } from "@/lib/actions/user.action";

const RoomsPage = async () => {
  const userInfo = await getCurrentUserFromMongoDB();
  const isAdmin = JSON.parse(JSON.stringify(userInfo))?.data?.isAdmin;
  if (!isAdmin) {
    return <AdminOnly />;
  }

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
