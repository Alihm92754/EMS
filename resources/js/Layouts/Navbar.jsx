import { Link, usePage } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSettingsSharp, IoLogOutOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { Inertia } from "@inertiajs/inertia";
import logo from "../../../public/images/logoo.png";
import { useRoute } from "../../../vendor/tightenco/ziggy";

const Navbar = ({ children }) => {
  const [isEmployeesDropdownOpen, setIsEmployeesDropdownOpen] = useState(false);
  const [isTimesheetsDropdownOpen, setIsTimesheetsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const employeesDropdownRef = useRef(null);
  const timesheetsDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const { auth } = usePage().props;
  const user = auth.user;
  const route = useRoute();

  // Toggle dropdown functions
  const toggleEmployeesDropdown = () => {
    setIsEmployeesDropdownOpen(!isEmployeesDropdownOpen);
    setIsTimesheetsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleTimesheetsDropdown = () => {
    setIsTimesheetsDropdownOpen(!isTimesheetsDropdownOpen);
    setIsEmployeesDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsEmployeesDropdownOpen(false);
    setIsTimesheetsDropdownOpen(false);
  };

  // Close handlers for dropdown items
  const closeEmployeesDropdown = () => setIsEmployeesDropdownOpen(false);
  const closeTimesheetsDropdown = () => setIsTimesheetsDropdownOpen(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      [
        employeesDropdownRef,
        timesheetsDropdownRef,
        profileDropdownRef
      ].forEach(ref => {
        if (ref.current && !ref.current.contains(event.target)) {
          switch(ref) {
            case employeesDropdownRef:
              setIsEmployeesDropdownOpen(false);
              break;
            case timesheetsDropdownRef:
              setIsTimesheetsDropdownOpen(false);
              break;
            case profileDropdownRef:
              setIsProfileDropdownOpen(false);
              break;
          }
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-blue-950 shadow-md">
        <div className="max-w mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo on the left */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img className="h-8 w-auto cursor-pointer" src={logo} alt="Logo" />
              </Link>
            </div>

            {/* Middle navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Home Button */}
              <Link
                href="/"
                className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
              >
                Home
              </Link>

              {/* Employees Dropdown */}
              <div className="relative" ref={employeesDropdownRef}>
                <button
                  onClick={toggleEmployeesDropdown}
                  className="flex items-center gap-1 text-gray-400 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
                >
                  Employees
                  <MdKeyboardArrowDown className="mt-0.5" />
                </button>
                {isEmployeesDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white border border-white/20 backdrop-blur-lg overflow-hidden">
                    <div className="py-1">
                      <Link
                        href={route("employees.create")}
                        onClick={closeEmployeesDropdown}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-200"
                      >
                        Add New Employee
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Timesheets Dropdown */}
              <div className="relative" ref={timesheetsDropdownRef}>
                <button
                  onClick={toggleTimesheetsDropdown}
                  className="flex items-center gap-1 text-gray-400 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
                >
                  Timesheets
                  <MdKeyboardArrowDown className="mt-0.5" />
                </button>
                {isTimesheetsDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white border border-white/20 backdrop-blur-lg overflow-hidden">
                    <div className="py-1">
                      <Link
                        href="/timesheets"
                        onClick={closeTimesheetsDropdown}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-200"
                      >
                        View All Timesheets
                      </Link>
                      <Link
                        href="/timesheets/create"
                        onClick={closeTimesheetsDropdown}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-200"
                      >
                        Create New Timesheet
                      </Link>
                      <Link
                        href="/timesheets/calendar"
                        onClick={closeTimesheetsDropdown}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-200"
                      >
                        View Calendar
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center relative" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 group relative"
              >
                <div className="relative">
                  <IoMdPerson className="text-gray-400 h-8 w-8 rounded-full cursor-pointer hover:text-white transition-colors duration-200" />
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="origin-top-right absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl bg-white backdrop-blur-lg border border-white/20 overflow-hidden">
                  {/* User Info Section */}
                  <div className="p-4 bg-gradient-to-br from-blue-900 to-purple-800">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <IoMdPerson className="w-6 h-6 text-purple-200" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white truncate">
                          {user?.name || 'Guest'}
                        </p>
                        <p className="text-xs font-light text-purple-200/80 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Items */}
                  <div className="divide-y divide-white/5">
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50 rounded-lg transition-all duration-200">
                        <IoSettingsSharp className="w-5 h-5 text-purple-600" />
                        Profile Settings
                      </button>
                      <button
                        onClick={() => Inertia.post(route('logout'))}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <IoLogOutOutline className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Navbar;