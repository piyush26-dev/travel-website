import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { CarFront, ChevronDown, MapPin, MapPinned, MoveLeft } from "lucide-react";
  const transferData = [
    {
      tour_id: "1",
      transfers: [
        {
          day: "1",
          transfer_title:
            "Welcome to Dubai, 'The Pearl of the Gulf' | Day at Leisure",
          transfer: [
            {
              transfer_category: "Private Transfer",
              transfer_name:
                "Transfer in Toyota Sienna, Toyota Previa or similar",
              form: "Dubai International Airport",
              mid: [],
              to: "Standard Hotel in Dubai",
            },
          ],
        },
        {
          day: "2",
          transfer_title:
            "WelVisit the Iconic Burj Khalifa | Dubai Desert Safari with Bbq Dinner",
          transfer: [
            {
              transfer_category: "Private Transfer",
              transfer_name:
                "Transfer in Toyota Sienna, Toyota Previa or similar",
              form: "Standard Hotel in Dubai",
              mid: [],
              to: "Standard Hotel in Dubai",
            },
            {
              transfer_category: "Shared Transfer",
              transfer_name: "Transfer in 4x4 Land Cruiser Jeep",
              form: "Burj Khalifa Tickets At the Top 124th 125th Floor",
              mid: [],
              to: "Dubai Desert Safari with BBQ Dinner",
            },
          ],
        },
        {
          day: "3",
          transfer_title: "Day Trip to ​​IMG Worlds of Adventure",
          transfer: [
            {
              transfer_category: "Private Transfer",
              transfer_name:
                "Transfer in Toyota Sienna, Toyota Previa or similar",
              form: "Standard Hotel in Dubai",
              mid: ["IMG Worlds Of Adventure Tickets, Dubai"],
              to: "Standard Hotel in Dubai",
            },
          ],
        },
      ],
    },
  ];

const ViewTransfersTour = () => {

   const navigate = useNavigate();
   const [activeIndex, setActiveIndex] = useState(0);
   const handleBack = () => {
     navigate("/tour-transfers-list");
   };
   // Toggle accordion state
   const toggleAccordion = (index) => {
     setActiveIndex(activeIndex === index ? null : index);
   };
   // Check if items array is empty
   if (transferData.length === 0) {
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
            {transferData.map((transfer) =>
              transfer.transfers.map((day, index) => (
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
                      Day {day.day} - {day.transfer_title}
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
                    {day.transfer.map((data, index) => (
                      <div key={index} className="p-2 space-y-4">
                        <div className="flex items-center gap-4 text-black-powder/70 border-b border-kings-ransom">
                          {" "}
                          <CarFront size={18} />
                          <h2 className="text-sm font-medium">
                            {data.transfer_category}
                          </h2>
                        </div>
                        <div className=" space-y-4">
                          <div className="flex items-center gap-3 text-black-powder">
                            <MapPin size={20} className="text-kings-ransom" />
                            <div>
                              <div className=" rounded border border-kings-ransom/70 shadow-md p-2">
                                <p className="text-xs font-semibold text-black-powder">
                                  From :-
                                </p>
                                <p className="text-sm font-medium">
                                  {data.form}
                                </p>
                              </div>
                            </div>
                          </div>
                          {data.mid.map((m, index) => (
                            <div className="flex items-center gap-3 text-black-powder">
                              <MapPinned
                                size={20}
                                className="text-kings-ransom"
                              />
                              <div>
                                <div className=" rounded border border-kings-ransom/70 shadow-md p-2">
                                  <p className="text-xs font-semibold text-black-powder">
                                    Mid :-
                                  </p>
                                  <p className="text-sm font-medium">{m}</p>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="flex items-center gap-3 text-black-powder">
                            <MapPin size={20} className="text-kings-ransom" />
                            <div>
                              <div className=" rounded border border-kings-ransom/70 shadow-md p-2">
                                <p className="text-xs font-semibold text-black-powder">
                                  To :-
                                </p>
                                <p className="text-sm font-medium">{data.to}</p>
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
}

export default ViewTransfersTour