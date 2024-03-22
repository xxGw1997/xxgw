import React from "react";

import Header from "../../components/shared/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-[--bg]">
        <Header />
        <main>{children}</main>
        <div>footer</div>
      </div>
    </>
  );
};

export default Layout;
