"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-center my-10 space-x-4">
      <CustomLink
        href="/"
        name="Overview"
      />
      <span className="text-xl italic px-2">/</span>
      <CustomLink
        href="/behavioral"
        name="Behavioral"
      />
      <span className="text-xl italic px-2">/</span>
      <CustomLink
        href="/technical"
        name="Technical"
      />
      <span className="text-xl italic px-2">/</span>
      <CustomLink
        href="/benchmark"
        name="Benchmarking"
      />
      <span className="text-xl italic px-2">/</span>
      <CustomLink
        href="/actions"
        name="Actions"
      />
    </div>
  );
};

const CustomLink = ({ href, name }: LinkData) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative link-style text-tmuted italic hover:cursor-pointer hover:text-opacity-75 ${
        isActive ? "text-tprimary font-bold" : ""
      }`}
    >
      {name}
    </Link>
  );
};

export default NavBar;
