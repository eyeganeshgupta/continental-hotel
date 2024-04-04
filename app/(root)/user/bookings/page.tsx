import PageTitle from "@/components/shared/PageTitle";
import UserBookings from "@/components/tables/UserBooking";
import { getAllUserBookings } from "@/lib/actions/booking.action";
import { getCurrentUserFromMongoDB } from "@/lib/actions/user.action";

const Bookings = async () => {
  const user = await getCurrentUserFromMongoDB();

  let userBookings = await getAllUserBookings(user.data._id);

  userBookings = JSON.parse(JSON.stringify(userBookings));

  console.log(userBookings);

  return (
    <div>
      <PageTitle title="My Bookings" />
      <UserBookings bookings={userBookings} />
    </div>
  );
};

export default Bookings;
