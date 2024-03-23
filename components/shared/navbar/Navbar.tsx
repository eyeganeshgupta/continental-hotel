import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import SignInButton from "./SignInButton";
import UserInfo from "./UserInfo";

const Navbar = async () => {
  const { userId } = auth();
  const user = await getUserById({ userId });
  // console.log(user);
  return (
    <div className="px-5 lg:px-20">
      <div className="flex justify-between items-center border border-t-0 border-solid">
        <div className="p-5 text-2xl font-bold border-0 border-r border-solid">
          Continental Hotel
        </div>
        {!user ? <SignInButton /> : <UserInfo user={JSON.stringify(user)} />}
      </div>
    </div>
  );
};

export default Navbar;
