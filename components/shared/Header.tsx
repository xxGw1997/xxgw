"use client";

import Link from "next/link";
import React from "react";
import { LuNewspaper } from "react-icons/lu";

import ThemeSwitch from "./ThemeSwitch";
import DarkModeImg from "./DarkModeImg";
import ywxImg from "@/public/assets/imgs/ywx.png";
import ywxDarkImg from "@/public/assets/imgs/ywx-dark.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "博客",
    link: "/posts",
    icon: <LuNewspaper size={24} />,
  },
  {
    title: "随笔",
    link: "/notes",
    icon: <LuNewspaper size={24} />,
  },
  {
    title: "相册",
    link: "/photos",
    icon: <LuNewspaper size={24} />,
  },
  {
    title: "关于",
    link: "/about",
    icon: <LuNewspaper size={24} />,
  },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full flex justify-end sm:justify-center items-center px-10 py-6 sticky top-0 bg-[--blur-bg] backdrop-blur-sm z-[--z-top]">
      <Link href="/" title="首页" className="absolute left-2 top-2">
        <DarkModeImg
          lightImg={ywxImg}
          darkImg={ywxDarkImg}
          width={72}
          height={72}
          priority={true}
        />
      </Link>
      <nav className="grid gap-5 items-center sm:gap-[80px] grid-flow-col">
        {navItems.map((nav) => (
          <Link
            href={nav.link}
            title={nav.title}
            key={nav.link}
            className={cn(
              "opacity-60 hover:opacity-100 hover:text-[--primary]",
              { "text-[--primary]": pathname.includes(nav.link) }
            )}
          >
            <span className="sm:block hidden">{nav.title}</span>
            <div className="sm:hidden">{nav.icon}</div>
          </Link>
        ))}
        <div className="sm:hidden h-[24px]">
          <ThemeSwitch />
        </div>
      </nav>
      <div className="absolute hidden sm:block right-5">
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
