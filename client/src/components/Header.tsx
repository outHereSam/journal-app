import Logo from "../assets/Logo.svg";
import { NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed w-full z-20">
      <div className="mx-auto max-w-3xl p-2 border-b-1 border-zinc-200 dark:border-zinc-800">
        <nav className="flex items-center justify-between ">
          <NavLink to="/">
            <img width="32" src={Logo} alt="" />
          </NavLink>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
