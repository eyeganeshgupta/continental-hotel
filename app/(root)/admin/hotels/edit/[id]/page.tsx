import HotelForm from "@/components/forms/Hotel";
import PageTitle from "@/components/shared/PageTitle";
import { getHotelById } from "@/lib/actions/hotel.action";

const EditHotelPage = async ({ params }: { params: { id: string } }) => {
  const hotelId = params.id;
  const hotelDetails = await getHotelById(hotelId);
  return (
    <div>
      <PageTitle title="Edit Hotel" />
      <HotelForm type="edit" initialData={hotelDetails} />
    </div>
  );
};

export default EditHotelPage;
