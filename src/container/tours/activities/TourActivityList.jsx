import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  LoaderCircle,
  Pencil,
  TentTree,
  TramFront,
  Trash2,
} from "lucide-react";
import CountUp from "react-countup";
import activitiesListIcon from "../../../assets/tour-activities.png";
import { useNavigate } from "react-router-dom";

const ActivitiesData = [
  {
    id: 1,
    name: "Explore the Mountains",
    icon: activitiesListIcon,
    totalActivities: 2,
  },
  {
    id: 2,
    name: "Beachside Paradise",
    icon: activitiesListIcon,
    totalActivities: 1,
  },
  {
    id: 3,
    name: "Historic City Tour",
    icon: activitiesListIcon,
    totalActivities: 2,
  },
  {
    id: 4,
    name: "Wildlife Safari",
    icon: activitiesListIcon,
    totalActivities: 3,
  },
  {
    id: 5,
    name: "Gourmet Food Adventure",
    icon: activitiesListIcon,
    totalActivities: 4,
  },
  {
    id: 6,
    name: "Desert Exploration",
    icon: activitiesListIcon,
    totalActivities: 5,
  },
  {
    id: 7,
    name: "Underwater Diving",
    icon: activitiesListIcon,
    totalActivities: 3,
  },
  {
    id: 8,
    name: "Rainforest Retreat",
    icon: activitiesListIcon,
    totalActivities: 2,
  },
  {
    id: 9,
    name: "City Lights Night Tour",
    icon: activitiesListIcon,
    totalActivities: 3,
  },
  {
    id: 10,
    name: "Cultural Festival",
    icon: activitiesListIcon,
    totalActivities: 2,
  },
  {
    id: 11,
    name: "Snowy Peaks Expedition",
    icon: activitiesListIcon,
    totalActivities: 2,
  },
  {
    id: 12,
    name: "Island Hopping",
    icon: activitiesListIcon,
    totalActivities: 2,
  },
  {
    id: 13,
    name: "Ancient Ruins Discovery",
    icon: activitiesListIcon,
    totalActivities: 3,
  },
  {
    id: 14,
    name: "Luxury Cruise",
    icon: activitiesListIcon,
    totalActivities: 4,
  },
  {
    id: 15,
    name: "Adrenaline Adventures",
    icon: activitiesListIcon,
    totalActivities: 2,
  },
];

const TourActivityList = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [delteModalOpen, setDeleteModalOpen] = useState();
  const [loadingDelete, setLoadingDelete] = useState();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  // Calculate total pages
  const totalPages = Math.ceil(ActivitiesData.length / itemsPerPage);

  // Get the current page data
  const currentData = ActivitiesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const cardVariantTwo = {
    hidden: { opacity: 0, y: 20 }, // Initial state when not in view
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Reduced duration for faster animations
        type: "easeInOut", // Simplified easing for smoother transitions
      },
    },
  };

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); // Toggle the menu
  };

  const handleMenuClose = () => {
    setOpenMenuId(null); // Close the menu
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(!delteModalOpen);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleViewTourActivity = () => {
    navigate("/view-tour-activity");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null); // Close menu if clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // if (!isOpen) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentData.map((data, index) => (
          <motion.div
            key={data.id} // Ensure a consistent and unique key
            variants={cardVariantTwo}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true }} // Ensures animation runs only once when in view
            className="bg-kings-ransom/35 border border-black-powder/5 rounded shadow-lg transform transition-all hover:shadow-xl cursor-pointer relative"
          >
            <div
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up
                handleMenuToggle(data.id); // Toggle menu for the clicked card
              }}
              className="bg-apple-cucumber/60 absolute top-2 right-2 rounded-full shadow-md border border-black-powder/5 text-black-powder h-[1.5rem] w-[1.5rem] flex items-center justify-center hover:bg-kings-ransom/70 duration-300 transition-all"
            >
              <EllipsisVertical size={16} />
            </div>

            {/* Menu for the current card */}
            {openMenuId === data.id && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-apple-cucumber absolute top-3 right-10 bg- shadow-md rounded border border-black-powder/5 w-28 z-10 overflow-hidden text-black-powder"
              >
                <ul className="space-y-1 p-2">
                  <li
                    className="cursor-pointer hover:bg-kings-ransom flex items-center gap-2 text-xs py-1 px-2 rounded bg-kings-ransom/35"
                    onClick={() => {
                      handleMenuClose();
                      handleViewTourActivity();
                    }}
                  >
                    <Eye size={14} />
                    <span className="text-xs font-medium">View</span>
                  </li>
                  <li
                    className="cursor-pointer hover:bg-kings-ransom flex items-center gap-2 text-xs py-1 px-2 rounded bg-kings-ransom/35"
                    onClick={() => handleMenuClose()}
                  >
                    <Pencil size={14} />
                    <span className="text-xs font-medium">Edit</span>
                  </li>
                  <li
                    className="cursor-pointer hover:bg-kings-ransom flex items-center gap-2 text-xs py-1 px-2 rounded bg-kings-ransom/35"
                    onClick={() => {
                      handleDeleteModalOpen();
                      handleMenuClose();
                    }}
                  >
                    <Trash2 size={14} />
                    <span className="text-xs font-medium">Delete</span>
                  </li>
                </ul>
              </motion.div>
            )}

            <div className="flex items-center gap-4 p-4">
              {/* Icon */}
              <div className="bg-apple-cucumber/60 p-3 rounded text-black-powder/70">
                <img src={data.icon} className="h-10 w-10" />
              </div>

              {/* Place Details */}
              <div className="space-y-3">
                {/* Title */}
                <div>
                  <h2 className="text-lg font-bold text-black-powder">
                    {data.name.length > 20
                      ? `${data.name.substring(0, 20)}...`
                      : data.name}
                  </h2>
                </div>

                <div className="flex items-center md:gap-8 gap-4 w-full">
                  <div className="flex items-center gap-2 text-black-powder">
                    <span className="text-sm font-medium">
                      Total Activity Days
                    </span>
                    <span className="text-sm font-medium">:</span>
                    <span className="text-sm font-medium">
                      <CountUp end={data.totalActivities} duration={5} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex md:justify-end justify-center">
        {/* Pagination */}
        <div className="flex items-center justify-center space-x-3 mt-6 text-sm font-medium">
          <button
            className={`${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-black-powder"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${
                  currentPage === page
                    ? "bg-black-powder text-apple-cucumber"
                    : "text-black-powder  bg-black-powder/5 hover:bg-black-powder/10"
                } w-6 h-6 flex items-center justify-center rounded transition-colors duration-300`}
              >
                {page}
              </button>
            )
          )}

          {/* Next button */}
          <button
            className={`${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-black-powder"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {/* delete Transfers modal*/}
      {delteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.form
            className="bg-apple-cucumber p-6 rounded-lg shadow-lg w-[25rem] relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onSubmit={handleDeleteModalClose}
          >
            <h2 className="text-lg font-semibold mb-4 text-black-powder">
              Delete This Tour Activity
            </h2>
            <p className="text-sm font-medium text-black-powder">
              Are you sure you want to delete this tour activity?
            </p>
            <div className=" space-y-4">
              <div className="flex justify-center items-center space-x-4 !mt-8">
                <button
                  className="bg-black-powder text-apple-cucumber w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm gap-2"
                  type="submit"
                  disabled={loadingDelete}
                >
                  {loadingDelete ? (
                    <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                  ) : (
                    "Delete"
                  )}
                </button>
                <button
                  className=" bg-transparent text-black-powder border border-black-powder/70 w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm  gap-2"
                  onClick={handleDeleteModalClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      )}
    </>
  );
};

export default TourActivityList;
