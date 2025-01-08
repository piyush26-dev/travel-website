import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ActivityImg1 from "../../assets/mountain-hiking.jpg";
import ActivityImg2 from "../../assets/tour-img2.jpg";
import ActivityImg3 from "../../assets/tour-img3.jpg";
import ActivityImg4 from "../../assets/tour-img4.jpg";
import ActivityImg5 from "../../assets/tour-img5.jpg";
import ActivityImg6 from "../../assets/scuba-diving.jpg";
import ActivityImg7 from "../../assets/toursImg7.jpg";
import ActivityImg8 from "../../assets/toursImg8.jpg";
import ActivityImg9 from "../../assets/toursImg9.jpg";
import ActivityImg10 from "../../assets/toursImg10.jpg";
import ActivityImg11 from "../../assets/city-cycling-tour.jpg";
import ActivityImg12 from "../../assets/safari-jeep-ride.jpg";
import ActivityImg13 from "../../assets/cooking-class.jpg";
import { useNavigate } from "react-router-dom";
const activitiesData = [
  {
    id: 1,
    title: "Mountain Hiking",
    description: "Embark on a thrilling hike through rugged mountain paths.",
    images: [
      ActivityImg1,
      ActivityImg2,
      ActivityImg3,
      ActivityImg4,
      ActivityImg5,
    ],
    duration_hours: "5 Hours",
    price: "₹1500",
    location: "Rocky Mountains, USA",
    place: "Rocky Mountains, USA", // Added place
    timing: "09:00 AM to 02:00 PM", // Added timing
  },
  {
    id: 2,
    title: "Scuba Diving",
    description:
      "Explore the underwater world with guided scuba diving sessions.",
    images: [
      ActivityImg6,
      ActivityImg7,
      ActivityImg8,
      ActivityImg9,
      ActivityImg10,
    ],
    duration_hours: "3 Hours",
    price: "₹3000",
    location: "Maldives",
    place: "Maldives", // Added place
    timing: "08:00 AM to 11:00 AM", // Added timing
  },
  {
    id: 3,
    title: "City Cycling Tour",
    description:
      "Cycle through iconic city landmarks on a guided cycling tour.",
    images: [
      ActivityImg11,
      "https://via.placeholder.com/300x200?text=Image1",
      "https://via.placeholder.com/300x200?text=Image5",
      "https://via.placeholder.com/300x200?text=Image3",
      "https://via.placeholder.com/300x200?text=Image4",
    ],
    duration_hours: "4 Hours",
    price: "₹1200",
    location: "Rome, Italy",
    place: "Rome, Italy", // Added place
    timing: "10:00 AM to 02:00 PM", // Added timing
  },
  {
    id: 4,
    title: "Safari Jeep Ride",
    description:
      "Enjoy an exhilarating jeep ride through the wildlife sanctuary.",
    images: [
      ActivityImg12,
      "https://via.placeholder.com/300x200?text=Image4",
      "https://via.placeholder.com/300x200?text=Image3",
      "https://via.placeholder.com/300x200?text=Image1",
      "https://via.placeholder.com/300x200?text=Image2",
    ],
    duration_hours: "6 Hours",
    price: "₹2500",
    location: "Serengeti National Park, Tanzania",
    place: "Serengeti National Park, Tanzania", // Added place
    timing: "07:00 AM to 01:00 PM", // Added timing
  },
  {
    id: 5,
    title: "Cooking Class",
    description:
      "Learn to cook gourmet meals from expert chefs in a hands-on class.",
    images: [
      ActivityImg13,
      "https://via.placeholder.com/300x200?text=Image4",
      "https://via.placeholder.com/300x200?text=Image1",
      "https://via.placeholder.com/300x200?text=Image3",
      "https://via.placeholder.com/300x200?text=Image5",
    ],
    duration_hours: "3 Hours",
    price: "₹2000",
    location: "Paris, France",
    place: "Paris, France", // Added place
    timing: "02:00 PM to 05:00 PM", // Added timing
  },
  // More activities follow the same format...
];



const ActivityList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(activitiesData.length / itemsPerPage);
  // Get the current page data
  const currentData = activitiesData.slice(
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

  const handleViewActivity = () => {
    navigate("/view-activity");
  };

  return (
    <>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentData.map((tour, index) => (
          <motion.div
            key={tour.id}
            className="bg-kings-ransom/35 shadow-lg rounded overflow-hidden"
            variants={cardAnimation}
            initial="hidden"
            animate="visible"
          >
            {/* Image Slider */}
            <Splide
              options={{
                type: "loop",
                arrows: true,
                autoplay: false,
                interval: 3000,
                perPage: 1,
                pagination: true,
                drag: "free",
              }}
            >
              {tour.images.map((image, i) => (
                <SplideSlide key={i}>
                  <div className="w-full h-40">
                    <img
                      src={image}
                      alt={`Tour ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SplideSlide>
              ))}
            </Splide>

            {/* Tour Details */}
            <div
              className="p-4 space-y-2 cursor-pointer"
              onClick={handleViewActivity}
            >
              <h2 className="text-lg font-semibold mb-2 text-black-powder">
                {tour.title}
              </h2>
              <p className="text-black-powder text-sm mb-4 line-clamp-3">
                {tour.description}
              </p>
              <div className="flex items-center gap-4">
                <h2 className="text-base font-semibold text-black-powder">
                  Price :
                </h2>
                <h2 className="text-base font-semibold text-black-powder">
                  {tour.price}
                </h2>
              </div>

              <div className="text-sm font-medium text-black-powder flex items-center gap-4">
                <p>Place :</p>{" "}
                <p className="text-black-powder/80 font-medium">{tour.place}</p>
              </div>
              <div className="text-sm font-medium text-black-powder flex items-center gap-4">
                <p>Timing :</p>{" "}
                <p className="text-black-powder/80 font-medium">
                  {tour.timing}
                </p>
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
    </>
  );
};

export default ActivityList;
