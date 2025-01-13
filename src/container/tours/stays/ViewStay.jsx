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
  X,
} from "lucide-react";
const stayData = [
  {
    tour_id: "1",
    days: [
      {
        day: "1",
        stay_day_title:
          "Welcome to Dubai, 'The Pearl of the Gulf' | Day at Leisure",
        stays: [
          {
            stay_name: "Check-in at Standard Hotel in Dubai",
            check_in: "3:00 PM",
            check_out: "12:00 PM",
            nights: "4",
            breakfast: true,
            lunch: false,
            dinner: true,
          },
        ],
      },
    ],
  },
];

const ViewStay = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleBack = () => {
    navigate("/days");
  };
  // Toggle accordion state
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // Check if items array is empty
  if (stayData.length === 0) {
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
            className="bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm flex items-center gap-2"
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
            {stayData.map((stays) =>
              stays.days.map((day, index) => (
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
                      Day {day.day} - {day.stay_day_title}
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
                    {day.stays.map((data, index) => (
                      <div key={index} className="p-2 space-y-4">
                        <div className="flex items-center gap-4 text-black-powder/70 border-b border-kings-ransom">
                          {" "}
                          <Bed size={18} />
                          <h2 className="text-sm font-medium">Stay At</h2>
                        </div>
                        <div className=" space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="space-y-4 ">
                                <div className="grid grid-cols-2 gap-4">
                                  <p className="text-base text-black-powder">
                                    {" "}
                                    Check-In:
                                  </p>
                                  <p className="text-base text-black-powder font-medium">
                                    {" "}
                                    {data.check_in}
                                  </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <p className="text-base text-black-powder">
                                    {" "}
                                    Check-Out:
                                  </p>
                                  <p className="text-base text-black-powder font-medium">
                                    {" "}
                                    {data.check_out}
                                  </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <p className="text-base text-black-powder">
                                    {" "}
                                    Nights:
                                  </p>
                                  <p className="text-base text-black-powder font-medium">
                                    {" "}
                                    {data.nights}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="space-y-4 ">
                                <div className="grid grid-cols-2 gap-4">
                                  <p className="text-base text-black-powder">
                                    {" "}
                                    Breakfast:
                                  </p>
                                  <div
                                    className={`font-medium flex items-center gap-2
                                      ${
                                        data.breakfast
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }
                                    `}
                                  >
                                    {data.breakfast ? (
                                      <CheckCheck size={18} />
                                    ) : (
                                      <X size={18} />
                                    )}
                                    <p>
                                      {data.breakfast
                                        ? "Included"
                                        : "Not Included"}
                                    </p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <p className="text-base text-black-powder">
                                    {" "}
                                    Lunch:
                                  </p>
                                  <div
                                    className={`font-medium flex items-center gap-2
                                      ${
                                        data.lunch
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }
                                    `}
                                  >
                                    {data.lunch ? (
                                      <CheckCheck size={18} />
                                    ) : (
                                      <X size={18} />
                                    )}
                                    <p>
                                      {data.lunch ? "Included" : "Not Included"}
                                    </p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <p className="text-base text-black-powder">
                                    {" "}
                                    Dinner:
                                  </p>
                                  <div
                                    className={`font-medium flex items-center gap-2
                                      ${
                                        data.dinner
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }
                                    `}
                                  >
                                    {data.dinner ? (
                                      <CheckCheck size={18} />
                                    ) : (
                                      <X size={18} />
                                    )}
                                    <p>
                                      {data.dinner
                                        ? "Included"
                                        : "Not Included"}
                                    </p>
                                  </div>
                                </div>
                              </div>
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

export default ViewStay;
