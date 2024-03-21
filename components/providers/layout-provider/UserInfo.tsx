import { User } from "lucide-react";

const UserInfo = ({ user }: any) => {
  return (
    <div className="p-5 border-0 border-l border-solid flex items-center gap-5">
      <span className="text-gray-500 text-sm">{user.name}</span>
      <User className="text-gray-500" />
    </div>
  );
};

export default UserInfo;
