// "use client";

import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";
import Header from "./Header";

const LayoutProvider = async ({ children }: { children: React.ReactNode }) => {
  // const [loggedInUserData, setLoggedInUserData] = useState<any>(null);
  const { userId } = auth();
  const mongoUser = await getUserById({ userId });
  console.log(mongoUser);
  return (
    <div>
      <Header user={mongoUser} />
      {children}
    </div>
  );
};

export default LayoutProvider;
