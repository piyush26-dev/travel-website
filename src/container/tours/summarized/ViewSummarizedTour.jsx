import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MoveLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const items = [
  {
    id: 1,
    title: "Singapore",
    days: [
      {
        day: 1,
        transfer: [
          "Private car from airport to hotel",
          "Private car from airport to hotel",
        ],
        activities: ["Hiking through the valley", "Campfire at night"],
        hotels: ["Mountain Inn"],
      },
      {
        day: 2,
        transfer: ["Jeep safari to the national park"],
        activities: ["Wildlife photography", "Boat ride in the lake"],
        hotels: ["Parkview Resort"],
      },
    ],
  },
];


const ViewSummarizedTour = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleBack = () => {
    navigate("/summarized-view");
  };
  // Toggle accordion state
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // Check if items array is empty
  if (items.length === 0) {
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
            {items.map((item) =>
              item.days.map((day, index) => (
                <div
                  key={index}
                  className="border border-black-powder/10 rounded shadow-sm overflow-hidden"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center px-6 py-4 bg-kings-ransom/35 hover:bg-kings-ransom/50 transition duration-300 text-black-powder"
                  >
                    <span className="text-lg font-medium">
                      Day {day.day} - {item.title}
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
                    className="overflow-hidden bg-apple-cucumber text-black-powder"
                  >
                    <div className="px-6 py-4 space-y-4">
                      <div>
                        <h4 className="text-md font-semibold">
                          Transfer
                        </h4>
                        <ul className="list-disc list-inside text-sm">
                          {day.transfer.map((transfer, tIndex) => (
                            <li key={tIndex}>{transfer}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold">
                          Activities
                        </h4>
                        <ul className="list-disc list-inside text-sm">
                          {day.activities.map((activity, aIndex) => (
                            <li key={aIndex}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold">
                          Hotels
                        </h4>
                        <ul className="list-disc list-inside text-sm">
                          {day.hotels.map((hotel, hIndex) => (
                            <li key={hIndex}>{hotel}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
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

export default ViewSummarizedTour;
