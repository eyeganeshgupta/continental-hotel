import AdminOnly from "@/components/shared/AdminOnly";
import PageTitle from "@/components/shared/PageTitle";
import AdminBooking from "@/components/tables/AdminBooking";
import { getAllBookingsForAdmin } from "@/lib/actions/booking.action";
import { getCurrentUserFromMongoDB } from "@/lib/actions/user.action";

async function AdminBookingsPage() {
  const userInfo = await getCurrentUserFromMongoDB();
  const isAdmin = JSON.parse(JSON.stringify(userInfo))?.data?.isAdmin;
  if (!isAdmin) {
    return <AdminOnly />;
  }

  const bookingsResponse = await getAllBookingsForAdmin();
  const bookings = JSON.parse(JSON.stringify(bookingsResponse));

  return (
    <div>
      <PageTitle title="Bookings" />
      <AdminBooking bookings={bookings} />
    </div>
  );
}

export default AdminBookingsPage;
