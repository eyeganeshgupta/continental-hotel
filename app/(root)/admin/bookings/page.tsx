import PageTitle from "@/components/shared/PageTitle";
import AdminBooking from "@/components/tables/AdminBooking";
import { getAllBookingsForAdmin } from "@/lib/actions/booking.action";

async function AdminBookingsPage() {
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
