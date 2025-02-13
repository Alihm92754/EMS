import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import logo from "../../../public/images/logoo.png";


const Navbar = ({children}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
    <nav className="bg-blue-950 shadow-md">
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
               <img
                 className="h-8 w-auto cursor-pointer"
                 src={logo}
               />
            </Link>
          </div>

          {/* Employee button with dropdown in the middle */}
          <div className="hidden md:flex items-center ">
            <div className="relative">
              <Link href="/" className="flex flex-row items-center gap-1 text-gray-400 hover:text-white px-3 py-2 rounded-md text-md font-medium focus:outline-none">Home</Link>
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex flex-row items-center gap-1 text-gray-400 hover:text-white px-3 py-2 rounded-md text-md font-medium focus:outline-none"
              >
                Employees
                <MdKeyboardArrowDown />
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-blue-950 ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      href={route("employees.create")}
                      className="block px-4 py-2 text-sm text-white hover:bg-blue-700"
                      role="menuitem"
                    >
                      Add New Employee
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Profile on the right */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
            <IoMdPerson className="text-gray-400 h-8 w-8 rounded-full cursor-pointer hover:text-white" />


              {/* <img
                className="h-8 w-8 rounded-full"
                src="https://via.placeholder.com/150"
                alt="User Profile"
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            onClick={toggleDropdown}
            className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            Employee
          </button>
          {isDropdownOpen && (
            <div className="pl-4">
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                Services
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
    <main>
        {children}
    </main>
    </>
  );
};

export default Navbar;