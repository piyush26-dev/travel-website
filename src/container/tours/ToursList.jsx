import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ToursImg1 from "../../assets/tour-img1.jpg";
import ToursImg2 from "../../assets/tour-img2.jpg";
import ToursImg3 from "../../assets/tour-img3.jpg";
import ToursImg4 from "../../assets/tour-img4.jpg";
import ToursImg5 from "../../assets/tour-img5.jpg";
import ToursImg6 from "../../assets/toursImg6.jpg";
import ToursImg7 from "../../assets/toursImg7.jpg";
import ToursImg8 from "../../assets/toursImg8.jpg";
import ToursImg9 from "../../assets/toursImg9.jpg";
import ToursImg10 from "../../assets/toursImg10.jpg";
import ToursImg11 from "../../assets/Historic-City-Tour.jpg";
import ToursImg12 from "../../assets/Wildlife-Safari.jpg";
import ToursImg13 from "../../assets/Gourmet-Food-Adventure.jpg";
import { useNavigate } from "react-router-dom";
const toursData = [
  {
    id: 1,
    title: "Explore the Mountains",
    description: "A breathtaking journey through pristine landscapes.",
    images: [ToursImg1, ToursImg2, ToursImg3, ToursImg4, ToursImg5],
    duration_days: "7 Days",
    price: "₹2500",
    duration_nights: "6 Nights",
    place: "Rocky Mountains, USA",
  },
  {
    id: 2,
    title: "Beachside Paradise",
    description:
      "Relax and rejuvenate with sandy beaches and crystal-clear waters.",
    images: [ToursImg6, ToursImg7, ToursImg8, ToursImg9, ToursImg10],
    duration_days: "7 Days",
    price: "₹1000",
    duration_nights: "6 Nights",
    place: "Maldives",
  },
  {
    id: 3,
    title: "Historic City Tour",
    description:
      "Dive into history and culture with guided tours of iconic landmarks.",
    images: [
      ToursImg11,
      "https://via.placeholder.com/300x200?text=Image1",
      "https://via.placeholder.com/300x200?text=Image5",
      "https://via.placeholder.com/300x200?text=Image3",
      "https://via.placeholder.com/300x200?text=Image4",
    ],
    duration_days: "5 Days",
    price: "₹2500",
    duration_nights: "4 Nights",
    place: "Rome, Italy",
  },
  {
    id: 4,
    title: "Wildlife Safari",
    description:
      "Witness nature's magnificence up close in wildlife sanctuaries.",
    images: [
      ToursImg12,
      "https://via.placeholder.com/300x200?text=Image4",
      "https://via.placeholder.com/300x200?text=Image3",
      "https://via.placeholder.com/300x200?text=Image1",
      "https://via.placeholder.com/300x200?text=Image2",
    ],
    duration_days: "7 Days",
    duration_nights: "6 Nights",
    price: "₹200",
    place: "Serengeti National Park, Tanzania",
  },
  {
    id: 5,
    title: "Gourmet Food Adventure",
    description: "Savor the finest culinary delights crafted by top chefs.",
    images: [
      ToursImg13,
      "https://via.placeholder.com/300x200?text=Image4",
      "https://via.placeholder.com/300x200?text=Image1",
      "https://via.placeholder.com/300x200?text=Image3",
      "https://via.placeholder.com/300x200?text=Image5",
    ],
    duration_days: "5 Days",
    duration_nights: "4 Nights",
    price: "₹1000",
    place: "Paris, France",
  },
  // More tours follow the same format...
];

const ToursList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(toursData.length / itemsPerPage);
  // Get the current page data
  const currentData = toursData.slice(
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

  const handleViewTours = () => {
    navigate("/view-tours");
  }

  


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
            <div className="p-4 space-y-2 cursor-pointer" onClick={handleViewTours}>
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
                <p>Duration :</p>{" "}
                <p className="text-black-powder/80 font-medium">
                  {tour.duration_days} / {tour.duration_nights}
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

export default ToursList;
