import RoomsData from "@/components/shared/RoomsData";
import Spinner from "@/components/shared/Spinner";
import { Suspense } from "react";

const Home = ({ searchParams }: { searchParams: any }) => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <RoomsData />
      </Suspense>
    </div>
  );
};

export default Home;
