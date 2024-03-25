import LinkButton from "@/components/shared/LinkButton";
import PageTitle from "@/components/shared/PageTitle";
import HotelTable from "@/components/tables/Hotel";
import { getAllHotels } from "@/lib/actions/hotel.action";

const HotelsPage = async () => {
  const response = await getAllHotels();
  const hotels = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Hotels" />
        <LinkButton title="Add Hotel" path="/admin/hotels/add" />
      </div>

      <HotelTable hotels={hotels} />
    </div>
  );
};

export default HotelsPage;
