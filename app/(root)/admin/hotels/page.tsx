import LinkButton from "@/components/shared/LinkButton";
import PageTitle from "@/components/shared/PageTitle";

const HotelsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Hotels" />
        <LinkButton title="Add Hotel" path="/admin/hotels/add" />
      </div>
    </div>
  );
};

export default HotelsPage;
