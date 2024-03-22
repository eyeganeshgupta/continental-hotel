import { User } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

const UserInfo = ({ user }: any) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="p-5 border-0 border-l border-solid flex items-center gap-5">
      <span className="text-gray-500 text-sm">{user.name}</span>
      <User
        className="text-gray-500"
        onClick={() => setShowSidebar(!showSidebar)}
      />

      {showSidebar && (
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          user={user}
        />
      )}
    </div>
  );
};

export default UserInfo;
