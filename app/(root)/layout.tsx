import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <section className="px-5 lg:px-20 mt-7">{children}</section>
    </main>
  );
};

export default Layout;
