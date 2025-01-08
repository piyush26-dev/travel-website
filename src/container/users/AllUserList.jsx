import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Mail, Phone } from "lucide-react";
import ProfileImg1 from "../../assets/profile-5.jpg";
import ProfileImg2 from "../../assets/profile-1.jpg";
import ProfileImg3 from "../../assets/profile-2.jpg";
import ProfileImg4 from "../../assets/profile-3.jpg";
import ProfileImg5 from "../../assets/profile-4.jpg";
import ProfileImg6 from "../../assets/profile-6.jpg";
import ProfileImg7 from "../../assets/profile-7.jpg";
import ProfileImg8 from "../../assets/profile-8.jpg";
import ProfileImg9 from "../../assets/profile-9.jpg";
import ProfileImg10 from "../../assets/profile-10.jpg";
import ArrowImg from "../../assets/arrows.png";
import dummyProfile from "../../assets/user.png";

import { useNavigate } from "react-router-dom";
const userData = [
  {
    id: 1,
    profile: ProfileImg1,
    full_name: "John Deo",
    phone_no: "919856985655",
    email: "johndeo@gmail.com",
  },
  {
    id: 2,
    profile: ProfileImg2,
    full_name: "Jane Smith",
    phone_no: "919845672233",
    email: "janesmith@gmail.com",
  },
  {
    id: 3,
    profile: ProfileImg3,
    full_name: "Robert Brown",
    phone_no: "919763425876",
    email: "robertbrown@gmail.com",
  },
  {
    id: 4,
    profile: ProfileImg4,
    full_name: "Emily Davis",
    phone_no: "919654782341",
    email: "emilydavis@gmail.com",
  },
  {
    id: 5,
    profile: ProfileImg5,
    full_name: "Michael Wilson",
    phone_no: "919847293847",
    email: "michaelwilson@gmail.com",
  },
  {
    id: 6,
    profile: ProfileImg6,
    full_name: "Sarah Johnson",
    phone_no: "919948372610",
    email: "sarahjohnson@gmail.com",
  },
  {
    id: 7,
    profile: ProfileImg7,
    full_name: "David Martinez",
    phone_no: "919857463920",
    email: "davidmartinez@gmail.com",
  },
  {
    id: 8,
    profile: ProfileImg8,
    full_name: "Sophia Lopez",
    phone_no: "919846372510",
    email: "sophialopez@gmail.com",
  },
  {
    id: 9,
    profile: ProfileImg9,
    full_name: "James White",
    phone_no: "919756842937",
    email: "jameswhite@gmail.com",
  },
  {
    id: 10,
    profile: ProfileImg10,
    full_name: "Isabella Green",
    phone_no: "919865734829",
    email: "isabellagreen@gmail.com",
  },
  {
    id: 11,
    profile: ProfileImg1,
    full_name: "William Taylor",
    phone_no: "919847261039",
    email: "williamtaylor@gmail.com",
  },
  {
    id: 12,
    profile: ProfileImg2,
    full_name: "Mia Anderson",
    phone_no: "919847562930",
    email: "miaanderson@gmail.com",
  },
  {
    id: 13,
    profile: ProfileImg3,
    full_name: "Alexander Thomas",
    phone_no: "919856392740",
    email: "alexanderthomas@gmail.com",
  },
  {
    id: 14,
    profile: ProfileImg4,
    full_name: "Charlotte Walker",
    phone_no: "919764382910",
    email: "charlottewalker@gmail.com",
  },
  {
    id: 15,
    profile: ProfileImg5,
    full_name: "Daniel Harris",
    phone_no: "919857392641",
    email: "danielharris@gmail.com",
  },
];


const gradientColors = [
  "bg-gradient-to-r from-kings-ransom to-dark-olive-green",
];


const AllUserList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(userData.length / itemsPerPage);
  // Get the current page data
  const currentData = userData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleViewProfile = () => {
    navigate("/user-view");
  };

  const formatPhoneNumber = (phoneNo) => {
    if (!phoneNo || phoneNo.length !== 12) return phoneNo; // Check valid length
    return `+${phoneNo.slice(0, 2)} ${phoneNo.slice(2, 7)} - ${phoneNo.slice(
      7
    )}`;
  };

  return (
    <>
      {" "}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"> */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        {currentData.map((student, index) => (
          <motion.div
            key={index}
            className="bg-white/35 shadow-lg rounded-lg overflow-hidden relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => handleViewStudentPrdofile(student?._id)}
          >
            {/* Top section with gradient and name */}
            <div
              className={`${
                gradientColors[index % gradientColors.length]
              } p-4 pb-16 pt-6 text-center text-white`}
            >
              <h2 className="text-xl font-bold">{student.full_name}</h2>
              <p className="text-sm">
                {student?.education?.length > 50
                  ? student?.education.slice(0, 50) + "..."
                  : student?.education}
              </p>
            </div>

            {/* Profile and Info */}
            <div className="flex justify-center -mt-10 ">
              <div className="w-20 h-20  rounded-xl border-4 border-white shadow-md bg-white">
                <img
                  src={student?.profile || dummyProfile}
                  alt={student?.full_name}
                  className=" object-contain  rounded-lg h-full w-full "
                />
              </div>
            </div>

            {/* Details section */}
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-4">
                <div className="left-side space-y-4">
                  <div className="border border-kings-ransom rounded p-1 bg-apple-cucumber/35 text-kings-ransom">
                    {" "}
                    <Mail size={15} />
                  </div>
                  <div className="border border-kings-ransom rounded p-1 bg-apple-cucumber/35 text-kings-ransom">
                    {" "}
                    <Phone size={15} />
                  </div>
                </div>
                <div className="right-side space-y-4 text-sm font-medium text-start">
                  <div className=" pb-1  text-dark-olive-green">
                    {student?.email}
                  </div>
                  <div className=" pt-1  text-dark-olive-green">
                    {formatPhoneNumber(student?.phone_no)}
                  </div>
                </div>
              </div>
            </div>

            {/* MoveRight icon with hover effect */}
            <motion.div
              className="flex items-center cursor-pointer pb-4 px-4 justify-end text-gray-600"
              whileHover={{
                x: 10, // Move icon to the right by 10px on hover
              }}
            >
              <img
                src={ArrowImg}
                alt="Icon"
                className="w-10 h-10 z-10 relative"
              />
            </motion.div>
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
    </>
  );
};

export default AllUserList;
