import HotelForm from "@/components/forms/Hotel";
import PageTitle from "@/components/shared/PageTitle";
import { getHotelById } from "@/lib/actions/hotel.action";

const EditHotelPage = async ({ params }: { params: { id: string } }) => {
  const hotelId = params.id;
  let hotelDetails = await getHotelById(hotelId);
  hotelDetails = JSON.parse(JSON.stringify(hotelDetails));
  return (
    <div>
      <PageTitle title="Edit Hotel" />
      <HotelForm type="edit" initialData={hotelDetails} />
    </div>
  );
};

export default EditHotelPage;
