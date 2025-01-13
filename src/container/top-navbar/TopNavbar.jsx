import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Plus, SearchIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopNavbar = ({ onButtonClick }) => {
  const navigate = useNavigate();
  const activeLink = useSelector(
    (state) => state.activeRoute.activeRouteSlice.activeLink
  );
  const [searchText, setSearchText] = useState("");
  const clearInput = () => {
    setSearchText("");
  };

  const handleAddTours = () => {
    navigate("/add-tours");
  };
  const handleAddActivity = () => {
    navigate("/add-activity");
  };

  const handleAddSummarizedTour = () => {
    navigate("/add-summarized-tour");
  };

  const handleAddActivitiesTour = () => {
    navigate("/add-tour-activity");
  };

  const handleAddTransfersTour = () => {
    navigate("/add-transfers-tour");
  };

  const handleAddStayTour = () => {
    navigate("/add-stay-tour");
  };

  const handleAddTourDays = () => {
    navigate("/add-tour-days");
  };
  const handleAddAttraction = () => {
    navigate("/add-attraction");
  };

  const handleViewProfile = () => {
    navigate("/settings");
  }

  // Determine navbar content based on activeLink
  const renderNavbarContent = () => {
    if (activeLink === "/") {
      return { heading: "Dashboard", showSearch: false, showButton: false };
    } else if (activeLink.startsWith("/places")) {
      return {
        heading: "Places",
        showSearch: true,
        buttonLabel: "Place",
        buttonClick: onButtonClick,
      };
    } else if (activeLink.startsWith("/tours")) {
      return {
        heading: "Tours",
        showSearch: true,
        buttonLabel: "Tour",
        buttonClick: handleAddTours,
      };
    } else if (activeLink.startsWith("/activities")) {
      return {
        heading: "Activities",
        showSearch: true,
        buttonLabel: "Activity",
        buttonClick: handleAddActivity,
      };
    } else if (activeLink.startsWith("/users")) {
      return { heading: "Users", showSearch: true, showButton: false };
    } else if (activeLink.startsWith("/user-view")) {
      return { heading: "View User", showSearch: false, showButton: false };
    } else if (activeLink.startsWith("/settings")) {
      return { heading: "Settings", showSearch: false, showButton: false };
    } else if (activeLink.startsWith("/add-tours")) {
      return { heading: "Add Tours", showSearch: false, showButton: false };
    } else if (activeLink.startsWith("/view-tour")) {
      return { heading: "View Tour", showSearch: false, showButton: false };
    } else if (activeLink.startsWith("/add-activity")) {
      return { heading: "Add Activity", showSearch: false, showButton: false };
    } else if (activeLink.startsWith("/summarized-view")) {
      return {
        heading: "Summarized View",
        showSearch: true,
        buttonLabel: "Summarized",
        buttonClick: handleAddSummarizedTour,
      };
    } else if (activeLink.startsWith("/add-summarized-tour")) {
      return {
        heading: "Add Summarized",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/view-summarized-tour")) {
      return {
        heading: "View Summarized Tour",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/tour-activities")) {
      return {
        heading: "Tour Activities",
        showSearch: true,
        buttonLabel: "Activities",
        buttonClick: handleAddActivitiesTour,
      };
    } else if (activeLink.startsWith("/view-activity")) {
      return {
        heading: "View Activity",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/view-tour-activity")) {
      return {
        heading: "View Tour Activity",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/add-tour-activity")) {
      return {
        heading: "Add Tour Activities",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/tour-transfers-list")) {
      return {
        heading: "Tour Transfers",
        showSearch: true,
        buttonLabel: "Transfers",
        buttonClick: handleAddTransfersTour,
      };
    } else if (activeLink.startsWith("/add-transfers-tour")) {
      return {
        heading: "Add Tour Transfers",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/view-transfers-tour")) {
      return {
        heading: "View Transfers",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/all-stay-list-tour")) {
      return {
        heading: "All Stay",
        showSearch: true,
        buttonLabel: "Stay",
        buttonClick: handleAddStayTour,
      };
    } else if (activeLink.startsWith("/view-stay-tour")) {
      return {
        heading: "View Stay",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/add-stay-tour")) {
      return {
        heading: "Add Tour Stay",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/tour-days")) {
      return {
        heading: "Tour Days",
        showSearch: true,
        buttonLabel: "Tour Days",
        buttonClick: handleAddTourDays,
      };
    } else if (activeLink.startsWith("/view-tour-days")) {
      return {
        heading: "View Tour Days",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/add-tour-days")) {
      return {
        heading: "Add Tour Days",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/attractions-list")) {
      return {
        heading: "Attractions List",
        showSearch: true,
        buttonLabel: "Attraction",
        buttonClick: handleAddAttraction,
      };
    } else if (activeLink.startsWith("/view-attraction")) {
      return {
        heading: "View Attraction",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/add-attraction")) {
      return {
        heading: "Add Attraction",
        showSearch: false,
        showButton: false,
      };
    } else if (activeLink.startsWith("/all-enquiry-list")) {
      return { heading: "Enquiries", showSearch: true, showButton: false };
    } else if (activeLink.startsWith("/view-enquiry")) {
      return {
        heading: "View Enquiry",
        showSearch: false,
        showButton: false,
      };
    } else {
      return { heading: "Dashboard", showSearch: false, showButton: false };
    }
  };

  const { heading, showSearch, buttonLabel, showButton, buttonClick } =
    renderNavbarContent();

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="flex items-center md:justify-between  justify-end text-black-powder  py-4 px-6"
      >
        {/* Left - Heading */}
        <h1 className=" hidden md:block text-2xl font-semibold">{heading}</h1>

        {/* Center - Search Input */}
        {showSearch && (
          <div className="relative w-4/12 hidden md:block">
            {/* Input field */}
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={`Search ${heading.toLowerCase()}`}
              className="w-full p-2 pl-10 text-black rounded focus:outline-none border border-black/70 bg-apple-cucumber text-sm font-normal"
            />

            {/* Left search icon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <SearchIcon size={16} />
            </div>

            {/* Right X icon with Framer Motion */}
            {searchText && (
              <motion.div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={16} onClick={clearInput} />
              </motion.div>
            )}
          </div>
        )}

        {/* Right - Button */}
        <div className="flex items-center gap-6 ">
          {showButton !== false && buttonLabel && (
            <button
              className="hidden bg-black-powder text-apple-cucumber px-4 py-2 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm md:flex items-center gap-2"
              onClick={buttonClick}
            >
              <Plus size={16} />
              {buttonLabel}
            </button>
          )}
          {/* Avatar */}
          <motion.img
            src="https://randomuser.me/api/portraits/men/1.jpg" // Add avatar image URL
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            whileHover={{ scale: 1.1 }} // Hover animation (increase size)
            transition={{ type: "spring", stiffness: 300 }}
            onClick={handleViewProfile}
          />
        </div>
      </motion.div>

      {/* mobile responsive */}
      <div className=" space-y-4">
        <div className="flex md:hidden justify-between items-center px-4">
          {/* Left - Heading */}
          <h1 className="text-lg font-semibold">{heading}</h1>
          {showButton !== false && buttonLabel && (
            <button
              className=" bg-black-powder text-apple-cucumber px-4 py-2 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm flex items-center gap-2"
              onClick={buttonClick}
            >
              <Plus size={16} />
              {buttonLabel}
            </button>
          )}
        </div>
        <div className="px-4 md:hidden block">
          {showSearch && (
            <div className="relative ">
              {/* Input field */}
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={`Search ${heading.toLowerCase()}`}
                className="w-full p-2 pl-10 text-black rounded focus:outline-none border border-black/70 bg-apple-cucumber text-sm font-normal"
              />

              {/* Left search icon */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <SearchIcon size={16} />
              </div>

              {/* Right X icon with Framer Motion */}
              {searchText && (
                <motion.div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={16} onClick={clearInput} />
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
