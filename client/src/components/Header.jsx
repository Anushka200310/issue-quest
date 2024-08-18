import React from "react";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiMenuFries } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import useAuth from "@/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bug, CircleDot, Home, LogOut, User } from "lucide-react";

const Header = () => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();
  const { pathname } = location;
  return (
    <header className="flex items-center justify-between top-0 sticky z-50 shadow-md dark:shadow-slate-700 backdrop-blur-lg">
      <div className="p-5 text-2xl text-blue-950 font-extralight dark:text-indigo-200">
        <Link to="/" className="flex items-center md:gap-2">
          Issue Quest <CircleDot className="hidden md:block" />
        </Link>
      </div>
      <div className="flex items-center gap-3 sm:gap-16">
        {/* search bar */}
        <form className="flex items-center gap-1 text-3xl cursor-pointer">
          {isLoggedIn && pathname === "/issue-list" ? (
            <>
              {" "}
              <Input
                className="dark:border-slate-400 mr-3 bg-transparent focus-visible:ring-0"
                placeholder="search..."
              />
            </>
          ) : null}
        </form>

        {/* desktop menu */}
        {isLoggedIn ? (
          <ul className="hidden md:flex gap-10">
            <li>
              <Link
                to="/"
                className={`flex items-center gap-2 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white ${
                  pathname === "/" && "font-bold"
                }`}
              >
                <Home />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/issue-list"
                className={`flex items-center gap-2 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white ${
                  pathname === "/issue-list" && "font-bold"
                }`}
              >
                <Bug />
                Issues
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
              >
                <LogOut />
                Log out
              </Link>
            </li>
          </ul>
        ) : null}
      </div>

      <div className="flex gap-3">
        {/* mobile menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden focus:outline-none">
            <CiMenuFries className="text-xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isLoggedIn ? (
              <>
                <div className="flex gap-1 items-center cursor-pointer">
                  {/* profile picture for mobile menu */}
                  <Avatar>
                    <Link to="/profile">
                      <AvatarImage src={user.avatar} alt="profile picture" />
                    </Link>
                    <AvatarFallback>Img</AvatarFallback>
                  </Avatar>
                  <DropdownMenuLabel><Link to="/profile">Profile</Link></DropdownMenuLabel>
                </div>
                <DropdownMenuSeparator />
              </>
            ) : null}

            <DropdownMenuItem>
              <Link to="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/issue-list">Issues</Link>
            </DropdownMenuItem>
            {isLoggedIn ? (
              <DropdownMenuItem>
                <Link to="/logout">Log out</Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <Link to="/signup">Sign up</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {isLoggedIn ? (
          <div className="flex gap-4 items-center cursor-pointer">
            {/* profile picture */}

            <Avatar className="hidden md:flex">
              <Link to="/profile">
                <AvatarImage src={user.avatar} alt="profile picture" />
              </Link>
              <AvatarFallback>img</AvatarFallback>
            </Avatar>

            {/*theme toggler */}
            <div className="p-5 focus:outline-none">
              <ModeToggle className="focus-visible:ring-0" />
            </div>
          </div>
        ) : (
          <div className="p-5 focus:outline-none flex items-center gap-6">
            <Link to="/signup" className="hidden md:flex items-center gap-2">
              <User />
              Signup
            </Link>
            <ModeToggle className="focus-visible:ring-0" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


