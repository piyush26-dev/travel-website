import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bed,
  CarFront,
  CheckCheck,
  ChevronDown,
  MapPin,
  MapPinned,
  MoveLeft,
  Volleyball,
  X,
} from "lucide-react";
import ActivityImg1 from "../../../assets/mountain-hiking.jpg";
import ActivityImg2 from "../../../assets/tour-img2.jpg";
import ActivityImg3 from "../../../assets/tour-img3.jpg";
import ActivityImg4 from "../../../assets/tour-img4.jpg";
import ActivityImg5 from "../../../assets/tour-img5.jpg";
import AttractionImg from "../../../assets/toursImg7.jpg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
const activityData = [
  {
    tour_id: "1",
    days: [
      {
        day: "1",
        activity_day_title:
          "Welcome to Dubai, 'The Pearl of the Gulf' | Day at Leisure",
        activities: [
          {
            activity_id: {
              id: "1",
              activity_title:
                "Burj Khalifa Tickets At the Top 124th 125th Floor - At the Top (Level 124 & 125) on a Private basis",
              activity_images: [
                { image: ActivityImg1 },
                { image: ActivityImg2 },
                { image: ActivityImg3 },
                { image: ActivityImg4 },
                { image: ActivityImg5 },
              ],
            },
            attraction_id: [
              {
                id: "1",
                attraction_name: "Burj Khalifa",
                attraction_image: AttractionImg,
              },
            ],
            ticket_included: true,
          },
        ],
      },
      {
        day: "2",
        activity_day_title:
          "Experience Abu Dhabi's Grandeur | Sheikh Zayed Mosque Visit",
        activities: [
          {
            activity_id: {
              id: "2",
              activity_title:
                "Sheikh Zayed Grand Mosque Guided Tour - On a Private basis",
              activity_images: [
                { image: ActivityImg3 },
                { image: ActivityImg4 },
                { image: ActivityImg5 },
              ],
            },
            attraction_id: [
              {
                id: "2",
                attraction_name: "Sheikh Zayed Grand Mosque",
                attraction_image: ActivityImg4,
              },
            ],
            ticket_included: false,
          },
        ],
      },
      {
        day: "3",
        activity_day_title:
          "Desert Safari Adventure | BBQ Dinner & Entertainment",
        activities: [
          {
            activity_id: {
              id: "3",
              activity_title:
                "Evening Desert Safari with BBQ Dinner & Live Shows - Shared basis",
              activity_images: [
                { image: ActivityImg4 },
                { image: ActivityImg5 },
                { image: ActivityImg2 },
              ],
            },
            attraction_id: [
              {
                id: "3",
                attraction_name: "Dubai Desert",
                attraction_image: AttractionImg,
              },
            ],
            ticket_included: true,
          },
        ],
      },
    ],
  },
];


const ViewTourActivity = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleBack = () => {
    navigate("/tour-activities");
  };
  // Toggle accordion state
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // Check if items array is empty
  if (activityData.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No data available to display.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center ">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="bg-kings-ransom/35 shadow-md rounded w-full max-w-3xl mx-4 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <button
            className="hidden bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm md:flex items-center gap-2"
            onClick={handleBack}
          >
            <MoveLeft size={16} />
          </button>
        </div>
        <div className="space-y-4 mt-8">
          <div className="inline-block bg-kings-ransom py-2 px-4 rounded shadow-md">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-medium text-black-powder/90">
                Tour Name :
              </h2>
              <h2 className="text-lg font-medium text-black-powder">
                Exploret Mheountains
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            {activityData.map((activities) =>
              activities.days.map((day, index) => (
                <div
                  key={index}
                  className="border border-black-powder/10 rounded shadow-sm overflow-hidden"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center px-6 py-4 bg-kings-ransom/35 hover:bg-kings-ransom/50 transition duration-300 text-black-powder"
                  >
                    <span className="text-base font-medium">
                      Day {day.day} - {day.activity_day_title}
                    </span>
                    <motion.span
                      className=""
                      animate={{
                        rotate: activeIndex === index ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>

                  {/* Accordion Content */}
                  <motion.div
                    initial="collapsed"
                    animate={activeIndex === index ? "expanded" : "collapsed"}
                    variants={{
                      collapsed: { height: 0, opacity: 0 },
                      expanded: { height: "auto", opacity: 1 },
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden bg-apple-cucumber text-black-powder py-2"
                  >
                    {day.activities.map((data, index) => (
                      <div key={index} className="p-2 space-y-4">
                        <div className="flex items-center gap-4 text-black-powder/70 border-b border-kings-ransom pb-2">
                          {" "}
                          <Volleyball size={18} />
                          <h2 className="text-sm font-medium">
                            {data.activity_id.activity_title}
                          </h2>
                        </div>
                        <div className=" space-y-4">
                          <div className="w-full border-b border-kings-ransom pb-6">
                            {" "}
                            {/* Image Slider */}
                            <Splide
                              options={{
                                type: "loop",
                                arrows: true,
                                autoplay: true,
                                interval: 3000,
                                perPage: 1,
                                pagination: true,
                                drag: "free",
                              }}
                            >
                              {data.activity_id.activity_images.map(
                                (image, i) => (
                                  <SplideSlide key={i}>
                                    <div className="w-full h-44">
                                      <img
                                        src={image.image}
                                        alt={`Tour ${i}`}
                                        className="w-full h-full object-cover rounded"
                                      />
                                    </div>
                                  </SplideSlide>
                                )
                              )}
                            </Splide>
                          </div>
                          <div className="space-y-4">
                            <h2 className="text-base text-black-powder font-medium">
                              You’ll be covering these amazing experiences
                            </h2>
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                              {data.attraction_id.map((data, index) => (
                                <div
                                  key={index}
                                  className="space-y-4 inline-block"
                                >
                                  <div className="w-48 h-60">
                                    <img
                                      src={data.attraction_image}
                                      className="w-full h-full object-cover rounded"
                                    />
                                  </div>
                                  <h2 className="text-sm font-medium text-black-powder">
                                    {index + 1}. {data.attraction_name}
                                  </h2>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewTourActivity;
