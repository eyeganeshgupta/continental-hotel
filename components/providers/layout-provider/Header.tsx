import { Button } from "antd";
import ProjectTitle from "./ProjectTitle";
import UserInfo from "./UserInfo";

const Header = ({ user }: any) => {
  return (
    <div className="px-20">
      <div className="flex justify-between items-center border border-t-0 border-solid">
        <ProjectTitle />
        {!user ? (
          <Button type="link">Sign In</Button>
        ) : (
          <UserInfo user={user} />
        )}
      </div>
    </div>
  );
};

export default Header;
