import React, { useEffect, useState } from "react";
import logo from "../../assets/travel-logo.png";
import controlerImg from "../../assets/control-main.png";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { setActiveLink } from "../../Redux/features/activeRoute/activeRouteSlice";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  MapPinHouse,
  Settings,
  TentTree,
  TramFront,
  Users,
  Menu,
  X,
  ChevronDown,
  MapPinned,
  NotebookPen,
  House,
  Volleyball,
  CalendarSync,
  Binoculars,
  CalendarDays,
  FerrisWheel,
  ClipboardPenLine,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const SideBar = ({
  open,
  setOpen,
  logoutOpen,
  setLogoutOpen,
  onButtonLogOutClick,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const activeLink = useSelector(
    (state) => state.activeRoute.activeRouteSlice.activeLink
  );

  // const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuOpen, setSubmenuOpen] = useState(true);
  // Update activeLink state based on the current location pathname
  useEffect(() => {
    dispatch(setActiveLink(location.pathname));
  }, [location, dispatch]);

  const handleNavLinkMenuClick = (path) => {
    dispatch(setActiveLink(path));
  };

  const handleNavLinkClick = (path, text) => {
    // Set active link regardless of the path
    setActiveLink(path);

    // Check if the clicked NavLink is the "Student Profile"
    if (text === "Tours") {
      // Toggle the submenu if clicking on the "Student Profile" NavLink
      setSubmenuOpen(!subMenuOpen);
    } else {
      // Close the submenu if clicking on any other NavLink
      setSubmenuOpen(true);
    }
  };

  const handleSubMenuOpen = (text) => {
    if (text === "Tours") {
      // Toggle the submenu if clicking on the "Student Profile" NavLink
      setSubmenuOpen(!subMenuOpen);
    } else {
      // Close the submenu if clicking on any other NavLink
      setSubmenuOpen(true);
    }
  };

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={`${
          open ? "md:w-72 md:max-w-[14rem]" : "md:w-20 md:max-w-[4rem]"
        } bg-[#33372C] h-screen pb-5 pt-4  duration-300 app-container overflow-hidden md:block hidden fixed left-0 top-0`}
      >
        <div
          className={`absolute cursor-pointer -right-3 top-[4.5rem] w-7 text-black-powder border-[#33372C] bg-apple-cucumber h-7 flex items-center justify-center 
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        >
          <ChevronLeft size={18} />
        </div>
        <div
          className="flex gap-x-3 items-center"
          onClick={() => Navigate("/")}
        >
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-[#D8DBBD]  tracking-[.08em] uppercase origin-left font-bold text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Travel Web
          </h1>
        </div>
        <div className="pt-9 space-y-6 ">
          <SimpleBar
            style={{ maxHeight: "100vh" }}
            className={`h-[20rem] overflow-y-auto`}
          >
            <div className={`space-y-2 ${open ? "pl-5" : "pl-[0.8rem]"} pb-5`}>
              <NavLink
                to="/"
                onClick={() => handleNavLinkMenuClick("/")}
                className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                  activeLink === "/"
                    ? "bg-[#B59F78] text-black/70"
                    : "text-[#D8DBBD]"
                }`}
              >
                <LayoutDashboard size={18} />
                <span
                  className={`transition-opacity duration-200 text-sm font-medium ${
                    !open && "hidden"
                  } origin-left`}
                >
                  Dashboard
                </span>
              </NavLink>
              <NavLink
                to="/places"
                onClick={() => handleNavLinkMenuClick("/places")}
                className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                  activeLink === "/places"
                    ? "bg-[#B59F78] text-black/70"
                    : "text-[#D8DBBD]"
                }`}
              >
                <MapPinHouse size={18} />
                <span
                  className={`transition-opacity duration-200 text-sm font-medium ${
                    !open && "hidden"
                  } origin-left`}
                >
                  Places
                </span>
              </NavLink>
              <NavLink
                // to="/"
                // onClick={() => handleNavLinkClick("/")}
                onClick={() => {
                  handleSubMenuOpen("Tours");
                  // handleNavLinkMenuClick("/");
                }}
                className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                  activeLink === ""
                    ? "bg-[#B59F78] text-black/70"
                    : "text-[#D8DBBD]"
                }`}
              >
                <TramFront size={18} />
                <span
                  className={`transition-opacity duration-200 text-sm font-medium ${
                    !open && "hidden"
                  } origin-left`}
                  onClick={() => {
                    handleSubMenuOpen("Tours");
                  }}
                >
                  Tours
                </span>
                <span
                  className={`${!subMenuOpen && "rotate-180"} ${
                    !open && "hidden"
                  } `}
                >
                  <ChevronDown size={18} />
                </span>
              </NavLink>
              <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                  !subMenuOpen ? "max-h-screen" : "max-h-0 hidden"
                }`}
              >
                <ul
                  className={`${
                    !open
                      ? "mt-2 space-y-2"
                      : "rounded-md bg-apple-cucumber/15 pl-2  py-2 gap-x-4 rounded-t-none mt-1 space-y-2"
                  }`}
                >
                  <NavLink
                    to="/tours"
                    onClick={() => handleNavLinkMenuClick("/tours")}
                    className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                      activeLink === "/tours"
                        ? "bg-[#B59F78] text-black/70"
                        : "text-[#D8DBBD]"
                    }`}
                  >
                    <Binoculars size={18} />
                    <span
                      className={`transition-opacity duration-200 text-sm font-medium ${
                        !open && "hidden"
                      } origin-left`}
                    >
                      All Tours
                    </span>
                  </NavLink>
                  <NavLink
                    to="/tour-days"
                    onClick={() => handleNavLinkMenuClick("/tour-days")}
                    className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                      activeLink === "/tour-days"
                        ? "bg-[#B59F78] text-black/70"
                        : "text-[#D8DBBD]"
                    }`}
                  >
                    <CalendarDays size={18} />
                    <span
                      className={`transition-opacity duration-200 text-sm font-medium ${
                        !open && "hidden"
                      } origin-left`}
                    >
                      Tour Days
                    </span>
                  </NavLink>
                  <NavLink
                    to="/summarized-view"
                    onClick={() => handleNavLinkMenuClick("/summarized-view")}
                    className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                      activeLink === "/summarized-view"
                        ? "bg-[#B59F78] text-black/70"
                        : "text-[#D8DBBD]"
                    }`}
                  >
                    <NotebookPen size={18} />
                    <span
                      className={`transition-opacity duration-200 text-sm font-medium ${
                        !open && "hidden"
                      } origin-left`}
                    >
                      Summarized View
                    </span>
                  </NavLink>

                  <NavLink
                    to="/tour-activities"
                    onClick={() => handleNavLinkMenuClick("/tour-activities")}
                    className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                      activeLink === "/tour-activities"
                        ? "bg-[#B59F78] text-black/70"
                        : "text-[#D8DBBD]"
                    }`}
                  >
                    <Volleyball size={18} />
                    <span
                      className={`transition-opacity duration-200 text-sm font-medium ${
                        !open && "hidden"
                      } origin-left`}
                    >
                      Activities
                    </span>
                  </NavLink>
                  <NavLink
                    to="/all-stay-list-tour"
                    onClick={() =>
                      handleNavLinkMenuClick("/all-stay-list-tour")
                    }
                    className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                      activeLink === "/all-stay-list-tour"
                        ? "bg-[#B59F78] text-black/70"
                        : "text-[#D8DBBD]"
                    }`}
                  >
                    <House size={18} />
                    <span
                      className={`transition-opacity duration-200 text-sm font-medium ${
                        !open && "hidden"
                      } origin-left`}
                    >
                      Stay
                    </span>
                  </NavLink>
                  <NavLink
                    to="/tour-transfers-list"
                    onClick={() => handleNavLinkMenuClick("/tour-transfers-list")}
                    className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                      activeLink === "/tour-transfers-list"
                        ? "bg-[#B59F78] text-black/70"
                        : "text-[#D8DBBD]"
                    }`}
                  >
                    <CalendarSync size={18} />
                    <span
                      className={`transition-opacity duration-200 text-sm font-medium ${
                        !open && "hidden"
                      } origin-left`}
                    >
                      Transfers
                    </span>
                  </NavLink>
                </ul>
              </div>

              <NavLink
                to="/activities"
                onClick={() => handleNavLinkMenuClick("/activities")}
                className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                  activeLink === "/activities"
                    ? "bg-[#B59F78] text-black/70"
                    : "text-[#D8DBBD]"
                }`}
              >
                <TentTree size={18} />
                <span
                  className={`transition-opacity duration-200 text-sm font-medium ${
                    !open && "hidden"
                  } origin-left`}
                >
                  Activities
                </span>
              </NavLink>
              <NavLink
                to="/all-enquiry-list"
                onClick={() => handleNavLinkMenuClick("/all-enquiry-list")}
                className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                  activeLink === "/all-enquiry-list"
                    ? "bg-[#B59F78] text-black/70"
                    : "text-[#D8DBBD]"
                }`}
              >
                <ClipboardPenLine size={18} />
                <span
                  className={`transition-opacity duration-200 text-sm font-medium ${
                    !open && "hidden"
                  } origin-left`}
                >
                  Enquiries
                </span>
              </NavLink>
              <NavLink
                to="/attractions-list"
                onClick={() => handleNavLinkMenuClick("/attractions-list")}
                className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                  activeLink === "/attractions-list"
                    ? "bg-[#B59F78] text-black/70"
                    : "text-[#D8DBBD]"
                }`}
              >
                <FerrisWheel size={18} />
                <span
                  className={`transition-opacity duration-200 text-sm font-medium ${
                    !open && "hidden"
                  } origin-left`}
                >
                  Attractions
                </span>
              </NavLink>
              <NavLink
                to="/users"
                onClick={() => handleNavLinkMenuClick("/users")}
                className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                  activeLink === "/users"
                    ? "bg-[#B59F78] text-black/70"
                    : "text-[#D8DBBD]"
                }`}
              >
                <Users size={18} />
                <span
                  className={`transition-opacity duration-200 text-sm font-medium ${
                    !open && "hidden"
                  } origin-left`}
                >
                  Users
                </span>
              </NavLink>
              <NavLink
                to="/settings"
                onClick={() => handleNavLinkMenuClick("/settings")}
                className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                  activeLink === "/settings"
                    ? "bg-[#B59F78] text-black/70"
                    : "text-[#D8DBBD]"
                }`}
              >
                <Settings size={18} />
                <span
                  className={`transition-opacity duration-200 text-sm font-medium ${
                    !open && "hidden"
                  } origin-left`}
                >
                  Settings
                </span>
              </NavLink>
            </div>
          </SimpleBar>

          <div className="h-divider">
            <div className="shadow-mm"></div>
          </div>

          <div className="">
            <div className="flex justify-center items-center mt-9">
              <div
                className="flex items-center cursor-pointer text-[#D8DBBD] hover:text-[#B59F78] duration-300 transition-all"
                onClick={onButtonLogOutClick}
              >
                <span
                  className={`${
                    !open && "hidden"
                  } ] font-medium text-base mr-2`}
                >
                  Sign Out
                </span>
                <LogOut size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div className="md:hidden block">
        {/* Top Left Menu Icon */}
        <button
          onClick={toggleDrawer}
          className="absolute top-4 left-4 z-50 text-[#D8DBBD] p-2 bg-[#33372C] rounded"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Drawer */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? 0 : "-100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed md:hidden top-0 left-0 h-full w-72 max-w-[14rem] z-40 bg-[#33372C] shadow-lg text-[#D8DBBD] "
        >
          {/* Drawer Content */}
          <div className="mt-[4rem] space-y-6 ">
            <SimpleBar
              style={{ maxHeight: "100vh" }}
              className={`h-[20rem] overflow-y-auto`}
            >
              <div
                className={`space-y-2 ${open ? "pl-5" : "pl-[0.8rem]"} pb-5`}
              >
                <NavLink
                  to="/"
                  onClick={() => {
                    handleNavLinkMenuClick("/");
                    setIsOpen(!open);
                  }}
                  className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                    activeLink === "/"
                      ? "bg-[#B59F78] text-black/70"
                      : "text-[#D8DBBD]"
                  }`}
                >
                  <LayoutDashboard size={18} />
                  <span
                    className={`transition-opacity duration-200 text-sm font-medium ${
                      !open && "hidden"
                    } origin-left`}
                  >
                    Dashboard
                  </span>
                </NavLink>
                <NavLink
                  to="/places"
                  onClick={() => {
                    setIsOpen(!open);
                    handleNavLinkMenuClick("/places");
                  }}
                  className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                    activeLink === "/places"
                      ? "bg-[#B59F78] text-black/70"
                      : "text-[#D8DBBD]"
                  }`}
                >
                  <MapPinHouse size={18} />
                  <span
                    className={`transition-opacity duration-200 text-sm font-medium ${
                      !open && "hidden"
                    } origin-left`}
                  >
                    Places
                  </span>
                </NavLink>
                <NavLink
                  // to="/"
                  // onClick={() => handleNavLinkClick("/")}
                  onClick={() => {
                    handleSubMenuOpen("Tours");
                    // handleNavLinkMenuClick("/");
                  }}
                  className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                    activeLink === ""
                      ? "bg-[#B59F78] text-black/70"
                      : "text-[#D8DBBD]"
                  }`}
                >
                  <TramFront size={18} />
                  <span
                    className={`transition-opacity duration-200 text-sm font-medium ${
                      !open && "hidden"
                    } origin-left`}
                    onClick={() => {
                      handleSubMenuOpen("Tours");
                    }}
                  >
                    Tours
                  </span>
                  <span
                    className={`${!subMenuOpen && "rotate-180"} ${
                      !open && "hidden"
                    } `}
                  >
                    <ChevronDown size={18} />
                  </span>
                </NavLink>
                <div
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    !subMenuOpen ? "max-h-screen" : "max-h-0 hidden"
                  }`}
                >
                  <ul
                    className={`${
                      !open
                        ? "mt-2 space-y-2"
                        : "rounded-md bg-apple-cucumber/15 pl-2  py-2 gap-x-4 rounded-t-none mt-1 space-y-2"
                    }`}
                  >
                    <NavLink
                      to="/tours"
                      onClick={() => {
                        setIsOpen(!open);
                        handleNavLinkMenuClick("/tours");
                      }}
                      className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                        activeLink === "/tours"
                          ? "bg-[#B59F78] text-black/70"
                          : "text-[#D8DBBD]"
                      }`}
                    >
                      <Binoculars size={18} />
                      <span
                        className={`transition-opacity duration-200 text-sm font-medium ${
                          !open && "hidden"
                        } origin-left`}
                      >
                        All Tours
                      </span>
                    </NavLink>
                    <NavLink
                      to="/tour-days"
                      onClick={() => {
                        setIsOpen(!open);
                        handleNavLinkMenuClick("/tour-days");
                      }}
                      className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                        activeLink === "/tour-days"
                          ? "bg-[#B59F78] text-black/70"
                          : "text-[#D8DBBD]"
                      }`}
                    >
                      <CalendarDays size={18} />
                      <span
                        className={`transition-opacity duration-200 text-sm font-medium ${
                          !open && "hidden"
                        } origin-left`}
                      >
                        Tour Days
                      </span>
                    </NavLink>
                    <NavLink
                      to="/summarized-view"
                      onClick={() => {
                        setIsOpen(!open);
                        handleNavLinkMenuClick("/summarized-view");
                      }}
                      className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                        activeLink === "/summarized-view"
                          ? "bg-[#B59F78] text-black/70"
                          : "text-[#D8DBBD]"
                      }`}
                    >
                      <NotebookPen size={18} />
                      <span
                        className={`transition-opacity duration-200 text-sm font-medium ${
                          !open && "hidden"
                        } origin-left`}
                      >
                        Summarized View
                      </span>
                    </NavLink>

                    <NavLink
                      to="/tour-activities"
                      onClick={() => {
                        setIsOpen(!open);
                        handleNavLinkMenuClick("/tour-activities");
                      }}
                      className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                        activeLink === "/tour-activities"
                          ? "bg-[#B59F78] text-black/70"
                          : "text-[#D8DBBD]"
                      }`}
                    >
                      <Volleyball size={18} />
                      <span
                        className={`transition-opacity duration-200 text-sm font-medium ${
                          !open && "hidden"
                        } origin-left`}
                      >
                        Activities
                      </span>
                    </NavLink>
                    <NavLink
                      to="/all-stay-list-tour"
                      onClick={() => {
                        setIsOpen(!open);
                        handleNavLinkMenuClick("/all-stay-list-tour");
                      }}
                      className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                        activeLink === "/all-stay-list-tour"
                          ? "bg-[#B59F78] text-black/70"
                          : "text-[#D8DBBD]"
                      }`}
                    >
                      <House size={18} />
                      <span
                        className={`transition-opacity duration-200 text-sm font-medium ${
                          !open && "hidden"
                        } origin-left`}
                      >
                        Stay
                      </span>
                    </NavLink>
                    <NavLink
                      to="/tour-transfers-list"
                      onClick={() => {
                        setIsOpen(!open);
                        handleNavLinkMenuClick("/tour-transfers-list");
                      }}
                      className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                        activeLink === "/tour-transfers-list"
                          ? "bg-[#B59F78] text-black/70"
                          : "text-[#D8DBBD]"
                      }`}
                    >
                      <CalendarSync size={18} />
                      <span
                        className={`transition-opacity duration-200 text-sm font-medium ${
                          !open && "hidden"
                        } origin-left`}
                      >
                        Transfers
                      </span>
                    </NavLink>
                  </ul>
                </div>

                <NavLink
                  to="/activities"
                  onClick={() => {
                    setIsOpen(!open);
                    handleNavLinkMenuClick("/activities");
                  }}
                  className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                    activeLink === "/activities"
                      ? "bg-[#B59F78] text-black/70"
                      : "text-[#D8DBBD]"
                  }`}
                >
                  <TentTree size={18} />
                  <span
                    className={`transition-opacity duration-200 text-sm font-medium ${
                      !open && "hidden"
                    } origin-left`}
                  >
                    Activities
                  </span>
                </NavLink>
                <NavLink
                  to="/all-enquiry-list"
                  onClick={() => {
                    setIsOpen(!open);
                    handleNavLinkMenuClick("/all-enquiry-list");
                  }}
                  className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                    activeLink === "/all-enquiry-list"
                      ? "bg-[#B59F78] text-black/70"
                      : "text-[#D8DBBD]"
                  }`}
                >
                  <ClipboardPenLine size={18} />
                  <span
                    className={`transition-opacity duration-200 text-sm font-medium ${
                      !open && "hidden"
                    } origin-left`}
                  >
                    Enquiries
                  </span>
                </NavLink>
                <NavLink
                  to="/attractions-list"
                  onClick={() => {
                    setIsOpen(!open);
                    handleNavLinkMenuClick("/attractions-list");
                  }}
                  className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                    activeLink === "/attractions-list"
                      ? "bg-[#B59F78] text-black/70"
                      : "text-[#D8DBBD]"
                  }`}
                >
                  <FerrisWheel size={18} />
                  <span
                    className={`transition-opacity duration-200 text-sm font-medium ${
                      !open && "hidden"
                    } origin-left`}
                  >
                    Attractions
                  </span>
                </NavLink>
                <NavLink
                  to="/users"
                  onClick={() => {
                    setIsOpen(!open);
                    handleNavLinkMenuClick("/users");
                  }}
                  className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                    activeLink === "/users"
                      ? "bg-[#B59F78] text-black/70"
                      : "text-[#D8DBBD]"
                  }`}
                >
                  <Users size={18} />
                  <span
                    className={`transition-opacity duration-200 text-sm font-medium ${
                      !open && "hidden"
                    } origin-left`}
                  >
                    Users
                  </span>
                </NavLink>
                <NavLink
                  to="/settings"
                  onClick={() => {
                    setIsOpen(!open);
                    handleNavLinkMenuClick("/settings");
                  }}
                  className={`flex rounded-tl rounded-bl p-2 cursor-pointer  text-sm items-center gap-x-4 hover:text-black/70 hover:bg-[#D8DBBD] duration-300 transition-all ${
                    activeLink === "/settings"
                      ? "bg-[#B59F78] text-black/70"
                      : "text-[#D8DBBD]"
                  }`}
                >
                  <Settings size={18} />
                  <span
                    className={`transition-opacity duration-200 text-sm font-medium ${
                      !open && "hidden"
                    } origin-left`}
                  >
                    Settings
                  </span>
                </NavLink>
              </div>
            </SimpleBar>

            <div className="h-divider">
              <div className="shadow-mm"></div>
            </div>

            <div className="">
              <div className="flex justify-center items-center mt-9">
                <div
                  className="flex items-center cursor-pointer text-[#D8DBBD] hover:text-[#B59F78] duration-300 transition-all"
                  onClick={() => {
                    onButtonLogOutClick();
                    setIsOpen(!open);
                  }}
                >
                  <span
                    className={`${
                      !open && "hidden"
                    } ] font-medium text-base mr-2`}
                  >
                    Sign Out
                  </span>
                  <LogOut size={18} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SideBar;
