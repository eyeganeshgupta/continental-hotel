import Filters from "@/components/Filters";
import RoomsData from "@/components/shared/RoomsData";
import Spinner from "@/components/shared/Spinner";
import { Suspense } from "react";

const Home = ({ searchParams }: { searchParams: any }) => {
  const suspenseKey = JSON.stringify(searchParams);
  return (
    <div>
      <Filters searchParams={searchParams} />
      <Suspense fallback={<Spinner fullHeight />} key={suspenseKey}>
        <RoomsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Home;
