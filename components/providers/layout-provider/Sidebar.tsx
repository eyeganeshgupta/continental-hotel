import { Drawer } from "antd";
import { BedDouble, GitGraph, Home, Hotel, List, User } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = ({ showSidebar, setShowSidebar, user }: any) => {
  const router = useRouter();

  const iconSize = 18;

  const userMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/user/bookings"),
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      onClick: () => router.push("/user/profile"),
    },
  ];
  const adminMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/admin/bookings"),
    },
    {
      name: "Hotels",
      icon: <Hotel size={iconSize} />,
      onClick: () => router.push("/admin/hotels"),
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onClick: () => router.push("/admin/rooms"),
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconSize} />,
      onClick: () => router.push("/admin/reports"),
    },
  ];

  const menuItemsToShow: any[] = user?.isAdmin ? adminMenuItems : userMenuItems;

  return (
    <Drawer open={showSidebar} onClose={() => setShowSidebar(false)} closable>
      <div className="flex flex-col gap-14">
        {menuItemsToShow.map((item, index) => {
          return (
            <div
              className="flex items-center gap-4 text-gray-700 cursor-pointer"
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
      </div>
    </Drawer>
  );
};

export default Sidebar;
