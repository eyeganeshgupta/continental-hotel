import Filters from "@/components/Filters";
import RoomsData from "@/components/shared/RoomsData";
import Spinner from "@/components/shared/Spinner";
import { Suspense } from "react";

const Home = ({ searchParams }: { searchParams: any }) => {
  return (
    <div>
      <Filters searchParams={searchParams} />
      <Suspense fallback={<Spinner />}>
        <RoomsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Home;
