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
import TourImage from "../../assets/tour-img1.jpg";
import ActivityImage from "../../assets/mountain-hiking.jpg";
import { useNavigate } from "react-router-dom";

const AllEnquiryList = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [viewModalOpen, setViewModalOpen] = useState();
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [EnquiryData, setEnquiryData] = useState([
    {
      id: 1,
      tourImage: TourImage,
      tourName: "Dubai Highlights | Skyline and Sandscapes",
      tourCost: "45000",
      full_name: "John Deo",
      phone_no: "919856985655",
      email: "johndeo@gmail.com",
      travel_data: "06-01-2025",
      traveller_count: "5",
      message: "xyz",
      status: "pending",
    },
    {
      id: 2,
      activityImage: ActivityImage,
      activityName: "Mountain Hiking",
      activityCost: "2500",
      full_name: "Jane Smith",
      phone_no: "919856985655",
      email: "janesmith@gmail.com",
      travel_data: "15-01-2025",
      traveller_count: "15",
      message: "xyzxx",
      status: "pending",
    },
    {
      id: 3,
      tourImage: TourImage,
      tourName: "Paris City Tour",
      tourCost: "75000",
      full_name: "Alice Johnson",
      phone_no: "919123456789",
      email: "alicejohnson@gmail.com",
      travel_data: "12-02-2025",
      traveller_count: "3",
      message: "abc",
      status: "resolved",
    },
    {
      id: 4,
      activityImage: ActivityImage,
      activityName: "Scuba Diving",
      activityCost: "5000",
      full_name: "Robert Brown",
      phone_no: "919987654321",
      email: "robertbrown@gmail.com",
      travel_data: "22-01-2025",
      traveller_count: "1",
      message: "diving experience",
      status: "pending",
    },
    {
      id: 5,
      tourImage: TourImage,
      tourName: "Swiss Alps Adventure",
      tourCost: "85000",
      full_name: "Emily White",
      phone_no: "919876543210",
      email: "emilywhite@gmail.com",
      travel_data: "05-03-2025",
      traveller_count: "2",
      message: "great",
      status: "pending",
    },
    {
      id: 6,
      activityImage: ActivityImage,
      activityName: "Skydiving Experience",
      activityCost: "10000",
      full_name: "Chris Green",
      phone_no: "919555666777",
      email: "chrisgreen@gmail.com",
      travel_data: "10-01-2025",
      traveller_count: "2",
      message: "exciting",
      status: "resolved",
    },
    {
      id: 7,
      tourImage: TourImage,
      tourName: "Maldives Getaway",
      tourCost: "120000",
      full_name: "Sophia Blue",
      phone_no: "919444555666",
      email: "sophiablue@gmail.com",
      travel_data: "20-01-2025",
      traveller_count: "4",
      message: "beach vibes",
      status: "resolved",
    },
    {
      id: 8,
      activityImage: ActivityImage,
      activityName: "Bungee Jumping",
      activityCost: "3500",
      full_name: "David Black",
      phone_no: "919333444555",
      email: "davidblack@gmail.com",
      travel_data: "18-01-2025",
      traveller_count: "2",
      message: "adventure",
      status: "pending",
    },
    {
      id: 9,
      tourImage: TourImage,
      tourName: "New York City Tour",
      tourCost: "60000",
      full_name: "Laura Red",
      phone_no: "919222333444",
      email: "laurared@gmail.com",
      travel_data: "25-03-2025",
      traveller_count: "3",
      message: "city fun",
      status: "pending",
    },
    {
      id: 10,
      activityImage: ActivityImage,
      activityName: "Cycling Adventure",
      activityCost: "2000",
      full_name: "Mark Yellow",
      phone_no: "919111222333",
      email: "markyellow@gmail.com",
      travel_data: "12-02-2025",
      traveller_count: "1",
      message: "fit fun",
      status: "resolved",
    },
    {
      id: 11,
      tourImage: TourImage,
      tourName: "Tokyo Highlights",
      tourCost: "90000",
      full_name: "Olivia Purple",
      phone_no: "919000111222",
      email: "oliviapurple@gmail.com",
      travel_data: "01-04-2025",
      traveller_count: "2",
      message: "tech world",
      status: "pending",
    },
    {
      id: 12,
      activityImage: ActivityImage,
      activityName: "Rock Climbing",
      activityCost: "4000",
      full_name: "Henry Gold",
      phone_no: "919333444555",
      email: "henrygold@gmail.com",
      travel_data: "08-01-2025",
      traveller_count: "1",
      message: "challenging",
      status: "resolved",
    },
    {
      id: 13,
      tourImage: TourImage,
      tourName: "Santorini Escape",
      tourCost: "95000",
      full_name: "Isla Grey",
      phone_no: "919888999000",
      email: "islagrey@gmail.com",
      travel_data: "15-03-2025",
      traveller_count: "3",
      message: "romantic",
      status: "pending",
    },
    {
      id: 14,
      activityImage: ActivityImage,
      activityName: "Kayaking Adventure",
      activityCost: "3000",
      full_name: "Leo Silver",
      phone_no: "919777888999",
      email: "leosilver@gmail.com",
      travel_data: "11-01-2025",
      traveller_count: "1",
      message: "water sport",
      status: "pending",
    },
    {
      id: 15,
      tourImage: TourImage,
      tourName: "Rome and Vatican Tour",
      tourCost: "80000",
      full_name: "Mia Orange",
      phone_no: "919666777888",
      email: "miaorange@gmail.com",
      travel_data: "05-02-2025",
      traveller_count: "5",
      message: "history buff",
      status: "resolved",
    },
  ]);
  const [loadingDelete, setLoadingDelete] = useState();
  const [selectedEnquiry, setSelectedEnquiry] = useState(null); // To hold the selected enquiry data

  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  // Calculate total pages
  const totalPages = Math.ceil(EnquiryData.length / itemsPerPage);

  // Get the current page data
  const currentData = EnquiryData.slice(
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

  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

  const elementVariant = (delay = 0) => ({
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay } },
  });

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };

  const handleActionOpen = (action) => {
    setSelectedAction(action);
    setActionModalOpen(true);
  };

  const handleActionClose = () => {
    setActionModalOpen(false);
  };

  // const updateStatus = (newStatus) => {
  //   // Update the status in your data source
  //   const updatedData = EnquiryData.map((item) =>
  //     item.id === openMenuId ? { ...item, status: newStatus } : item
  //   );

  //   // Save the updated data back to state or server
  //   setEnquiryData(updatedData);

  //   // Close the menu
  //   handleMenuClose();
  //   handleActionClose();
  // };

  const updateStatus = (newStatus) => {
    const updatedData = EnquiryData.map((item) =>
      item.id === openMenuId ? { ...item, status: newStatus } : item
    );
    setEnquiryData(updatedData); // Update the data in state
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "text-green-500";
      case "not resolved":
        return "text-red-500";
      case "pending":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const formatPhoneNumber = (phoneNo) => {
    if (!phoneNo || phoneNo.length !== 12) return phoneNo; // Check valid length
    return `+${phoneNo.slice(0, 2)} ${phoneNo.slice(2, 7)} - ${phoneNo.slice(
      7
    )}`;
  };

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); // Toggle the menu
  };

  const handleMenuClose = () => {
    setOpenMenuId(null); // Close the menu
  };

  const handleViewEnquiry = (id) => {
    const enquiry = EnquiryData.find((item) => item.id === id); // Find the enquiry by ID
    if (enquiry) {
      setSelectedEnquiry(enquiry); // Set the selected enquiry
      setViewModalOpen(true); // Open the modal
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setViewModalOpen(false);
    setSelectedEnquiry(null); // Clear the selected enquiry
  };

  const handleViewTransfers = () => {
    navigate("/view-tour-days");
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
      <div className="px-4 overflow-scroll md:overflow-scroll lg:overflow-hidden">
        {currentData.map((data, index) => (
          <motion.table
            key={index}
            className="bg-kings-ransom/35 shadow-lg rounded-lg mb-6 p-6 flex flex-row justify-between cursor-pointer table-auto min-w-max  lg:space-x-0 space-x-4"
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            whileHover={hoverEffect}
            transition={{ type: "spring", stiffness: 50 }}
            // onClick={() => handleViewAssignment(assignment?._id)}
          >
            {/* Order ID */}
            <motion.div
              key={data.id}
              className="flex flex-col items-center md:w-1/5"
              variants={elementVariant(0.1)}
              onClick={() => handleViewEnquiry(data?.id)}
            >
              <h3 className="font-semibold text-black-powder">
                {data.tourName ? "Tour Details" : "Activity Details"}
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8">
                  <img
                    src={data.tourImage || data.activityImage}
                    alt="Image"
                    className="w-full h-full object-fill rounded"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-black-powder/70">
                    {data.tourName?.length > 13
                      ? `${data.tourName.substring(0, 13)}...`
                      : data.tourName ||
                        (data.activityName?.length > 13
                          ? `${data.activityName.substring(0, 13)}...`
                          : data.activityName)}
                  </h2>

                  <p className="text-xs font-medium text-black-powder/70">
                    {data.tourCost
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(data.tourCost)
                      : new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(data.activityCost)}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Subject */}
            <motion.div
              className="flex flex-col items-center md:w-1/5 h-full"
              variants={elementVariant(0.2)}
            >
              <h3 className="font-semibold text-black-powder">User Name</h3>
              <div className=" flex items-center justify-center h-10">
                {" "}
                <p className="text-sm font-medium text-black-powder/70">
                  {data.full_name || "-----"}
                </p>
              </div>
            </motion.div>

            {/* Assignment Code */}
            {/* <motion.div
                      className="flex flex-col items-center md:w-1/5"
                      variants={elementVariant(0.3)}
                    >
                      <h3 className="font-semibold text-black-powder">Assignment Code</h3>
                      <p className="text-gray-500">{assignment.assignemnt_code || "-----"}</p>
                    </motion.div> */}

            {/* Travel Data */}
            <motion.div
              className="flex flex-col items-center md:w-1/5"
              variants={elementVariant(0.4)}
            >
              <h3 className="font-semibold text-black-powder">Travel Data</h3>
              {/* <p className="text-gray-500">
                          {moment(assignment.deadline).format(
                            "DD-MM-YYYY HH:MM A"
                          )}
                        </p> */}
              <div className=" flex items-center justify-center h-10">
                {" "}
                <p className="text-sm font-medium text-black-powder/70">
                  {data?.travel_data}
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col items-center md:w-1/5"
              variants={elementVariant(0.5)}
            >
              <h3 className="font-semibold text-black-powder">
                Traveller Count
              </h3>
              <div className=" flex items-center justify-center h-10">
                {" "}
                <p className="text-sm font-medium text-black-powder/70">
                  {data?.traveller_count}
                </p>
              </div>
            </motion.div>

            {/* Enquiry Status */}
            <motion.div
              className="flex flex-col items-center md:w-1/5"
              variants={elementVariant(0.6)}
            >
              <h3 className="font-semibold text-black-powder">
                Enquiry Status
              </h3>
              <div className=" flex items-center justify-center h-10">
                <motion.p
                  className={`${getStatusColor(
                    data.status
                  )} text-sm font-medium `}
                  whileHover={{ scale: 1.1, color: "rgba(0,0,0,0.8)" }}
                >
                  {data.status}
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col items-center md:w-1/5"
              variants={elementVariant(0.7)}
            >
              <h3 className="font-semibold text-black-powder">Action</h3>
              <div className="flex items-center justify-center h-10 relative">
                <div
                  onClick={(e) => {
                    if (data.status === "pending") {
                      e.stopPropagation(); // Prevent event from bubbling up
                      handleMenuToggle(data.id); // Toggle menu for the clicked card
                    }
                  }}
                  className={`${
                    data.status !== "pending"
                      ? "bg-black-powder/70 text-kings-ransom cursor-not-allowed"
                      : "hover:bg-kings-ransom/70"
                  } bg-apple-cucumber/60 rounded-full shadow-md border border-black-powder/5 text-black-powder h-[1.5rem] w-[1.5rem] flex items-center justify-center duration-300 transition-all`}
                >
                  <EllipsisVertical size={16} />
                </div>

                {/* Menu for the current card */}
                {openMenuId === data.id && data.status === "pending" && (
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
                          handleActionOpen("resolved"); // Update status to resolved
                          handleMenuClose();
                        }}
                      >
                        <span className="text-xs font-medium">Resolved</span>
                      </li>
                      <li
                        className="cursor-pointer hover:bg-kings-ransom flex items-center text-xs py-1 px-2 rounded bg-kings-ransom/35"
                        onClick={() => {
                          handleActionOpen("not resolved"); // Update status to not resolved
                          handleMenuClose();
                        }}
                      >
                        <span className="text-xs font-medium">
                          Not Resolved
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.table>
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
      {/* view enquiry modal*/}
      {viewModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            className="bg-apple-cucumber p-6 rounded shadow-lg w-[30rem] relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <h2 className="text-lg font-semibold mb-4 text-black-powder">
              Enquiry Details
            </h2>
            <div className="space-y-4 text-sm">
              <div className="">
                <label className="block text-sm font-bold text-black-powder mb-1">
                  Tour Details
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10">
                    <img
                      src={
                        selectedEnquiry.tourImage ||
                        selectedEnquiry.activityImage
                      }
                      alt="Image"
                      className="w-full h-full object-fill rounded"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-black-powder">
                      {selectedEnquiry.tourName?.length > 50
                        ? `${selectedEnquiry.tourName.substring(0, 50)}...`
                        : selectedEnquiry.tourName ||
                          (selectedEnquiry.activityName?.length > 50
                            ? `${selectedEnquiry.activityName.substring(
                                0,
                                50
                              )}...`
                            : selectedEnquiry.activityName)}
                    </h2>

                    <p className="text-xs font-medium text-black-powder">
                      {selectedEnquiry.tourCost
                        ? new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(selectedEnquiry.tourCost)
                        : new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(selectedEnquiry.activityCost)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <label className="block text-sm font-bold text-black-powder mb-1">
                  User Name
                </label>
                <h2 className="text-sm font-medium text-black-powder">
                  {selectedEnquiry.full_name}
                </h2>
              </div>
              <div className="">
                <label className="block text-sm font-bold text-black-powder mb-1">
                  Email
                </label>
                <h2 className="text-sm font-medium text-black-powder">
                  {selectedEnquiry.email}
                </h2>
              </div>
              <div className="">
                <label className="block text-sm font-bold text-black-powder mb-1">
                  Phone Number
                </label>
                <h2 className="text-sm font-medium text-black-powder">
                  {formatPhoneNumber(selectedEnquiry.phone_no)}
                </h2>
              </div>
              <div className="lg:flex lg:space-y-0 space-y-4 items-center gap-36">
                <div className="">
                  <label className="block text-sm font-bold text-black-powder mb-1">
                    Travel Date
                  </label>
                  <h2 className="text-sm font-medium text-black-powder">
                    {selectedEnquiry.travel_data}
                  </h2>
                </div>
                <div className="">
                  <label className="block text-sm font-bold text-black-powder mb-1">
                    Traveller Count
                  </label>
                  <h2 className="text-sm font-medium text-black-powder">
                    {selectedEnquiry.traveller_count}
                  </h2>
                </div>
              </div>
              <div className="">
                <label className="block text-sm font-bold text-black-powder mb-1">
                  Message
                </label>
                <h2 className="text-sm font-medium text-black-powder">
                  {selectedEnquiry.message}
                </h2>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-black-powder text-apple-cucumber w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm gap-2"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* action enquiry modal*/}
      {actionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.form
            className="bg-apple-cucumber p-6 rounded-lg shadow-lg w-[25rem] relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onSubmit={(e) => {
              e.preventDefault();
              setLoadingAction(true);
              setTimeout(() => {
                updateStatus(selectedAction);
                setLoadingAction(false);
                handleActionClose();
              }, 1000); // Simulated API call delay
            }}
          >
            <h2 className="text-lg font-semibold mb-4 text-black-powder">
              Edit This Enquiry Status
            </h2>
            <p className="text-sm font-medium text-black-powder">
              Are you sure you want to {selectedAction} this enquiry?
            </p>
            <div className=" space-y-4">
              <div className="flex justify-center items-center space-x-4 !mt-8">
                <button
                  className="bg-black-powder text-apple-cucumber w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm gap-2"
                  type="submit"
                  disabled={loadingAction}
                >
                  {loadingDelete ? (
                    <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                  ) : (
                    "Yes"
                  )}
                </button>
                <button
                  className=" bg-transparent text-black-powder border border-black-powder/70 w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm  gap-2"
                  onClick={handleActionClose}
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

export default AllEnquiryList;
