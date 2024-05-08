import React from "react";

import Header from "../../components/shared/Header";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-[--bg]">
        <Header />
        <main className="mx-auto min-h-[70vh]">{children}</main>
        <footer className="text-center text-[14px] pb-10">
          <Link
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            className="hover:underline"
          >
            CC BY-NC-SA 4.0
          </Link>
          2021-PRESENT © xxGw
        </footer>
      </div>
    </>
  );
};

export default Layout;
