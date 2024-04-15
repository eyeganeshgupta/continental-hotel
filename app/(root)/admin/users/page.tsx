import PageTitle from "@/components/shared/PageTitle";
import UsersTable from "@/components/tables/User";
import { getAllUsers } from "@/lib/actions/user.action";

const UsersPage = async () => {
  const response = await getAllUsers();
  const users = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title="Users" />
      <UsersTable users={users} />
    </div>
  );
};

export default UsersPage;
