import { useAuth } from "@clerk/nextjs";
import { Drawer } from "antd";
import { BedDouble, GitGraph, Home, Hotel, List, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = ({ showSidebar, setShowSidebar, user }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuth();

  const onLogout = async () => {
    await signOut();
    setShowSidebar(false);
    router.push("/sign-in");
  };

  const iconSize = 18;

  const userMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/user/bookings"),
      isActive: pathname === "/user/bookings",
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      onClick: () => router.push("/user/profile"),
      isActive: pathname === "/user/profile",
    },
  ];

  const adminMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/admin/bookings"),
      isActive: pathname === "/admin/bookings",
    },
    {
      name: "Hotels",
      icon: <Hotel size={iconSize} />,
      onClick: () => router.push("/admin/hotels"),
      isActive: pathname.includes("/admin/hotels"),
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onClick: () => router.push("/admin/rooms"),
      isActive: pathname === "/admin/rooms",
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconSize} />,
      onClick: () => router.push("/admin/reports"),
      isActive: pathname === "/admin/reports",
    },
  ];

  const menuItemsToShow: any[] = user?.isAdmin ? adminMenuItems : userMenuItems;

  return (
    <Drawer open={showSidebar} onClose={() => setShowSidebar(false)} closable>
      <div className="flex flex-col gap-14">
        {menuItemsToShow.map((item, index) => {
          return (
            <div
              className={`flex items-center gap-4 text-gray-700 cursor-pointer px-7 py-3 rounded ${
                item.isActive ? "bg-gray-700 text-white" : ""
              }`}
              key={item.name + " " + index}
              onClick={() => {
                item.onClick();
                setShowSidebar(false);
              }}
            >
              {item.icon}
              <span className="mt-[2px]">{item.name}</span>
            </div>
          );
        })}

        <span
          className="text-center cursor-pointer text-red-500"
          onClick={onLogout}
        >
          Logout
        </span>
      </div>
    </Drawer>
  );
};

export default Sidebar;
