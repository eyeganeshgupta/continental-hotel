import ThemeProvider from "@/components/providers/theme-provider";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <main>
        <Navbar />
        <section className="px-5 lg:px-20 mt-8">{children}</section>
      </main>
    </ThemeProvider>
  );
};

export default Layout;
