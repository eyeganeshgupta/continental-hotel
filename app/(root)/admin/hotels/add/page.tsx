import HotelForm from "@/components/forms/Hotel";
import PageTitle from "@/components/shared/PageTitle";

const AddHotelPage = () => {
  return (
    <div>
      <PageTitle title="Add Hotel" />
      <HotelForm type="add" />
    </div>
  );
};

export default AddHotelPage;
