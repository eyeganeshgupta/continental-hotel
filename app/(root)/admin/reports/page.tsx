import ReportFilter from "@/components/ReportFilter";
import PageTitle from "@/components/shared/PageTitle";
import ReportData from "@/components/shared/ReportData";
import Spinner from "@/components/shared/Spinner";
import { Suspense } from "react";

const ReportsPage = ({ searchParams }: { searchParams: any }) => {
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
