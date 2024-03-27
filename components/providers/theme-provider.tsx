import { ConfigProvider } from "antd";
import React from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000",
            borderRadius: 3,
          },
          components: {
            Button: {
              controlHeight: 42,
              defaultBorderColor: "#000",
            },
            Input: {
              controlHeight: 42,
              activeShadow: "none",
              boxShadow: "none",
              borderRadius: 3,
              colorBorder: "#ccc",
            },
            Select: {
              controlHeight: 42,
              boxShadow: "none",
              controlOutline: "none",
              colorBorder: "#ccc",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
};

export default ThemeProvider;
