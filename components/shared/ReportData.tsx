import { getBookingReport } from "@/lib/actions/booking.action";
import AdminBooking from "../tables/AdminBooking";

const ReportData = async ({ searchParams }: { searchParams: any }) => {
  const response = await getBookingReport({
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
  });

  const bookings = JSON.parse(JSON.stringify(response));
  const totalBookings = bookings.length;

  const totalRevenue = bookings.reduce(
    (acc: number, booking: any) => acc + booking.totalAmount,
    0
  );

  return (
    <div>
      <div className="md:flex-row flex-col flex gap-10">
        <div
          className="border py-7 px-10 flex flex-col border-solid gap-5"
          style={{
            border: "1px solid #40679E",
          }}
        >
          <h1 className="text-xl font-bold text-gray-600">Total Bookings</h1>
          <h1
            className="text-5xl font-bold text-center"
            style={{ color: "#40679E" }}
          >
            {totalBookings}
          </h1>
        </div>

        <div
          className="border py-7 px-10 flex flex-col border-solid gap-5"
          style={{
            border: "1px solid #944E63",
          }}
        >
          <h1 className="text-xl font-bold text-gray-600">Total Revenue</h1>
          <h1
            className="text-5xl font-bold text-center"
            style={{ color: "#944E63" }}
          >
            {totalRevenue} ₹
          </h1>
        </div>
      </div>

      <AdminBooking bookings={bookings} />
    </div>
  );
};

export default ReportData;
