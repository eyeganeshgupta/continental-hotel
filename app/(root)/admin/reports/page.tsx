import ReportFilter from "@/components/ReportFilter";
import AdminOnly from "@/components/shared/AdminOnly";
import PageTitle from "@/components/shared/PageTitle";
import ReportData from "@/components/shared/ReportData";
import Spinner from "@/components/shared/Spinner";
import { getCurrentUserFromMongoDB } from "@/lib/actions/user.action";
import { Suspense } from "react";

const ReportsPage = async ({ searchParams }: { searchParams: any }) => {
  const userInfo = await getCurrentUserFromMongoDB();
  const isAdmin = JSON.parse(JSON.stringify(userInfo))?.data?.isAdmin;
  if (!isAdmin) {
    return <AdminOnly />;
  }

  const suspenseKey = JSON.stringify(searchParams);
  return (
    <div>
      <PageTitle title="Reports" />

      <ReportFilter searchParams={searchParams} />

      <Suspense key={suspenseKey} fallback={<Spinner fullHeight />}>
        <ReportData searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ReportsPage;
