import React, { Dispatch, SetStateAction } from "react";

type MenuProps = {
  menuOpened: boolean;
  setMenuOpened: Dispatch<SetStateAction<boolean>>;
  onSectionChange: Dispatch<SetStateAction<number>>;
};

type MenuButtonProps = {
  label: string;
  onClick: () => void;
};

const MenuButton = ({ label, onClick }: MenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer hover:text-[--primary] transition-colors"
    >
      {label}
    </button>
  );
};

const Menu = ({ menuOpened, setMenuOpened, onSectionChange }: MenuProps) => {
  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-12 right-12 p-3 bg-[--primary] w-11 h-11 rounded-md"
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45  translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-80" : "w-0"}`}
      >
        <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
          <MenuButton label="About" onClick={() => onSectionChange(0)} />
          <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
          <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
          <MenuButton label="Contact" onClick={() => onSectionChange(3)} />
        </div>
      </div>
    </>
  );
};

export default Menu;
