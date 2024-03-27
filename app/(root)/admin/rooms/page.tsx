import LinkButton from "@/components/shared/LinkButton";
import PageTitle from "@/components/shared/PageTitle";

const RoomsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Rooms" />
        <LinkButton path="/admin/rooms/add" title="Add Room" />
      </div>
    </div>
  );
};

export default RoomsPage;
