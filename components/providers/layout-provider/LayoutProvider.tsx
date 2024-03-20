import React from "react";
import Header from "./Header";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default LayoutProvider;
