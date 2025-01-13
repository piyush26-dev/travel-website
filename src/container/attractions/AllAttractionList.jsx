import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AttractionImg1 from "../../assets/museum-of-the-future-img.jpg";
import AttractionImg2 from "../../assets/iniversal-studios-singapore-img.jpg";
import AttractionImg3 from "../../assets/eiffel-tower-img.jpg";
import AttractionImg4 from "../../assets/great-wall-of-china.jpg";
import AttractionImg5 from "../../assets/taj-mahal.jpg";
import AttractionImg6 from "../../assets/santorini.jpg";
import AttractionImg7 from "../../assets/toursImg8.jpg";
import AttractionImg8 from "../../assets/toursImg8.jpg";
import AttractionImg9 from "../../assets/toursImg9.jpg";
import AttractionImg10 from "../../assets/toursImg10.jpg";
import AttractionImg11 from "../../assets/city-cycling-tour.jpg";
import AttractionImg12 from "../../assets/safari-jeep-ride.jpg";
import AttractionImg13 from "../../assets/cooking-class.jpg";
import AttractionImg14 from "../../assets/cooking-class.jpg";
import AttractionImg15 from "../../assets/cooking-class.jpg";
import { useNavigate } from "react-router-dom";
const attractionsData = [
  {
    id: 1,
    title: "Museum Of The Future",
    description:
      "The Museum of Future, Dubai is a new era museum themed on modern technology.",
    images: AttractionImg1,
    place: "Dubai, UAE",
  },
  {
    id: 2,
    title: "Universal Studios Singapore",
    description:
      "South Asia’s first and only Universal Studios theme park, Universal Studios Singapore is a big crowd-puller with children and adults alike.",
    images: AttractionImg2,
    place: "Singapore",
  },
  {
    id: 3,
    title: "Eiffel Tower",
    description:
      "The iconic symbol of France, the Eiffel Tower is a must-visit for its stunning views and architecture.",
    images: AttractionImg3,
    place: "Paris, France",
  },
  {
    id: 4,
    title: "Great Wall of China",
    description:
      "A historic marvel and one of the Seven Wonders of the World, the Great Wall offers breathtaking views and a glimpse into China's history.",
    images: AttractionImg4,
    place: "China",
  },
  {
    id: 5,
    title: "Taj Mahal",
    description:
      "A symbol of love and an architectural masterpiece, the Taj Mahal is a UNESCO World Heritage site.",
    images: AttractionImg5,
    place: "Agra, India",
  },
  {
    id: 6,
    title: "Santorini",
    description:
      "Known for its white-washed buildings and stunning sunsets, Santorini is a picturesque island in Greece.",
    images: AttractionImg6,
    place: "Santorini, Greece",
  },
  {
    id: 7,
    title: "Statue of Liberty",
    description:
      "A symbol of freedom and democracy, the Statue of Liberty is one of the most recognizable landmarks in the world.",
    images: AttractionImg7,
    place: "New York, USA",
  },
  {
    id: 8,
    title: "Sydney Opera House",
    description:
      "An architectural masterpiece and a symbol of Australia, the Sydney Opera House is a hub for performing arts.",
    images: AttractionImg8,
    place: "Sydney, Australia",
  },
  {
    id: 9,
    title: "Machu Picchu",
    description:
      "An ancient Incan city located high in the Andes Mountains, Machu Picchu is a UNESCO World Heritage site.",
    images: AttractionImg9,
    place: "Peru",
  },
  {
    id: 10,
    title: "Burj Khalifa",
    description:
      "The tallest building in the world, the Burj Khalifa is a marvel of modern engineering and design.",
    images: AttractionImg10,
    place: "Dubai, UAE",
  },
  {
    id: 11,
    title: "Niagara Falls",
    description:
      "A breathtaking natural wonder, Niagara Falls is a popular destination for its stunning views and boat tours.",
    images: AttractionImg11,
    place: "Canada/USA",
  },
  {
    id: 12,
    title: "Colosseum",
    description:
      "An ancient amphitheater in Rome, the Colosseum is a symbol of Italy's rich history and culture.",
    images: AttractionImg12,
    place: "Rome, Italy",
  },
  {
    id: 13,
    title: "Petra",
    description:
      "An archaeological site in Jordan, Petra is famous for its rock-cut architecture and historical significance.",
    images: AttractionImg13,
    place: "Jordan",
  },
  {
    id: 14,
    title: "Disneyland",
    description:
      "A magical destination for children and adults, Disneyland offers fun, entertainment, and adventure.",
    images: AttractionImg14,
    place: "California, USA",
  },
  {
    id: 15,
    title: "Pyramids of Giza",
    description:
      "One of the Seven Wonders of the Ancient World, the Pyramids of Giza are a testament to ancient Egyptian engineering.",
    images: AttractionImg15,
    place: "Giza, Egypt",
  },
];


const AllAttractionList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(attractionsData.length / itemsPerPage);
  // Get the current page data
  const currentData = attractionsData.slice(
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
    navigate("/view-attraction");
  };

  return (
    <>
      {" "}
    <div className="grid lg:grid-cols-3 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        {currentData.map((tour, index) => (
          <motion.div
            key={tour.id}
            className="bg-kings-ransom/35 shadow-lg rounded overflow-hidden"
            variants={cardAnimation}
            initial="hidden"
            animate="visible"
          >
            {/* Image Slider */}
            <div className="w-full h-40">
              <img src={tour.images} className="w-full h-full object-cover" />
            </div>

            {/* Tour Details */}
            <div
              className="p-4 space-y-2 cursor-pointer"
              onClick={handleViewActivity}
            >
              <h2 className="text-lg font-semibold mb-2 text-black-powder">
                {tour.title}
              </h2>
              <p className="text-black-powder text-sm mb-4 line-clamp-2">
                {tour.description}
              </p>

              <div className="text-sm font-medium text-black-powder flex items-center gap-4">
                <p>Place :</p>{" "}
                <p className="text-black-powder/80 font-medium">{tour.place}</p>
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

export default AllAttractionList;
