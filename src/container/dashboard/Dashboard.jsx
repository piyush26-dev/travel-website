import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin} from "lucide-react";
import placesDashIcon from "../../assets/places-dash-icon.png";
import toursDashIcon from "../../assets/tours-dash-icon.png";
import activitiesDashIcon from "../../assets/activities-dash-icona.png";
import totalBookingIcon from "../../assets/total-booking-icon.png";
import bookingPenddingIcon from "../../assets/booking-pendding-icon.png";
import bookingCompleteIcon from "../../assets/booking-complete-icon.png";
import ActivityImg1 from "../../assets/mountain-hiking.jpg";
import ActivityImg2 from "../../assets/tour-img2.jpg";
import ActivityImg3 from "../../assets/tour-img3.jpg";
import tourImg from "../../assets/tour-img1.jpg";
import CountUp from "react-countup";
import { AreaChart } from "@tremor/react";

const monthlyData = [
  { date: "01", SalesPrice: 500 },
  { date: "02", SalesPrice: 520 },
  { date: "03", SalesPrice: 280 },
  { date: "04", SalesPrice: 540 },
  { date: "05", SalesPrice: 520 },
  { date: "06", SalesPrice: 560 },
  { date: "07", SalesPrice: 530 },
  { date: "08", SalesPrice: 380 },
  { date: "09", SalesPrice: 550 },
  { date: "10", SalesPrice: 600 },
  { date: "11", SalesPrice: 570 },
  { date: "12", SalesPrice: 620 },
  { date: "13", SalesPrice: 590 },
  { date: "14", SalesPrice: 630 },
  { date: "15", SalesPrice: 610 },
  { date: "16", SalesPrice: 640 },
  { date: "17", SalesPrice: 620 },
  { date: "18", SalesPrice: 460 },
  { date: "19", SalesPrice: 630 },
  { date: "20", SalesPrice: 670 },
  { date: "21", SalesPrice: 650 },
  { date: "22", SalesPrice: 680 },
  { date: "23", SalesPrice: 660 },
  { date: "24", SalesPrice: 700 },
  { date: "25", SalesPrice: 680 },
  { date: "26", SalesPrice: 220 },
  { date: "27", SalesPrice: 700 },
  { date: "28", SalesPrice: 740 },
  { date: "29", SalesPrice: 720 },
  { date: "30", SalesPrice: 760 },
  { date: "31", SalesPrice: 750 },
];


const yearlyData = [
  { date: "Jan", SalesPrice: 15000 },
  { date: "Feb", SalesPrice: 14000 },
  { date: "Mar", SalesPrice: 17000 },
  { date: "Apr", SalesPrice: 16000 },
  { date: "May", SalesPrice: 18000 },
  { date: "Jun", SalesPrice: 17500 },
  { date: "Jul", SalesPrice: 19000 },
  { date: "Aug", SalesPrice: 18500 },
  { date: "Sep", SalesPrice: 20000 },
  { date: "Oct", SalesPrice: 19500 },
  { date: "Nov", SalesPrice: 21000 },
  { date: "Dec", SalesPrice: 20500 },
];


const weeklyData = [
  { date: "Mon", SalesPrice: 500 },
  { date: "Tue", SalesPrice: 550 },
  { date: "Wed", SalesPrice: 530 },
  { date: "Thu", SalesPrice: 580 },
  { date: "Fri", SalesPrice: 560 },
  { date: "Sat", SalesPrice: 600 },
  { date: "Sun", SalesPrice: 590 },
];







const Dashboard = () => {

  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

    const chartData =
      selectedPeriod === "monthly"
        ? monthlyData
        : selectedPeriod === "yearly"
        ? yearlyData
        : weeklyData;
  const cards = [
    {
      id: 1,
      icon: placesDashIcon,
      heading: "Total Places",
      number: "150",
    },
    {
      id: 2,
      icon: toursDashIcon,
      heading: "Total Tours",
      number: "75",
    },
    {
      id: 3,
      icon: activitiesDashIcon,
      heading: "Total Activities",
      number: "12",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    hover: {
      scale: 1.1,
      // rotateX: -5,
      // rotateY: 5,
      translateZ: 10,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0.2, 0.3, 1], // Smooth and natural easing curve
      },
    },
    tap: {
      scale: 1.05,
      rotateX: -3,
      rotateY: 3,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <div className=" space-y-6">
        {" "}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="bg-kings-ransom/35 shadow-lg rounded-lg p-6 flex items-center gap-4 cursor-pointer transform perspective-1000 transition-transform duration-300"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="p-3 bg-apple-cucumber/70 rounded-lg  w-16">
                <img src={card.icon} className="w-full h-full object-fill" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black-powder">
                  {card.heading}
                </h3>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-[#73613f]">
                    <CountUp end={card.number} duration={3} />
                  </p>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3, // Matches the duration of CountUp
                      duration: 0.3, // Animation duration for the '+'
                    }}
                    className="text-2xl font-bold text-[#73613f]"
                  >
                    +
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 w-full "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="rounded p-6 transform perspective-1000 transition-transform duration-300 border border-dark-olive-green/10 space-y-4">
            <div className="">
              {/* Summary Heading */}
              <motion.h3
                className="text-xs font-medium text-black-powder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Summary
              </motion.h3>

              {/* Heading */}
              <motion.h1
                className="text-base md:text-lg font-semibold tracking-[.08em] text-black-powder  uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                Booking
              </motion.h1>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* First Card: BlueBayoux */}
              <motion.div
                className="bg-[#B6B4A5]/70 text-black-powder px-6 py-4 rounded-xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Card Content */}
                <motion.div
                  className=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold">289</h3>
                </motion.div>
                {/* Gap Between Number and Text */}
                <div className="my-[2rem]"></div>
                <div className="">
                  <img src={totalBookingIcon} alt="" className="w-8 h-8" />
                </div>
                <div className="">
                  <p className="text-base font-semibold mt-2">Total</p>
                </div>
              </motion.div>

              {/* Second Card: RockBlue */}
              <motion.div
                className="bg-[#C1A15E]/70 text-black-powder px-6 py-4 rounded-xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Card Content */}
                <motion.div
                  className=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold">124</h3>
                </motion.div>
                {/* Gap Between Number and Text */}
                <div className="my-[2rem]"></div>
                <div className="">
                  <img src={bookingPenddingIcon} alt="" className="w-8 h-8" />
                </div>
                <div className="">
                  <p className="text-base font-semibold mt-2">Pending</p>
                </div>
              </motion.div>

              {/* Third Card: OliveGreen */}
              <motion.div
                className="bg-[#A3B18A]/70 text-black-powder px-6 py-4 rounded-xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Card Content */}
                <motion.div
                  className=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold">76</h3>
                </motion.div>
                {/* Gap Between Number and Text */}
                <div className="my-[2rem]"></div>
                <div className="">
                  <img src={bookingCompleteIcon} alt="" className="w-8 h-8" />
                </div>
                <div className="">
                  <p className="text-base font-semibold mt-2">Completed</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div className="rounded p-6 transform perspective-1000 transition-transform duration-300 border border-dark-olive-green/10 space-y-4">
            <div className="">
              {/* resend  Heading */}
              <motion.h3
                className="text-xs font-medium text-black-powder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Resend
              </motion.h3>

              {/* enquiry Heading */}
              <motion.h1
                className="text-base md:text-lg font-semibold tracking-[.08em] text-black-powder  uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                Enquiry
              </motion.h1>
            </div>
            {/* Table Section with Flex Layout */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {/* Table Container using Flexbox */}
              <div className="flex w-full flex-col overflow-scroll md:overflow-hidden  space-y-4">
                {/* Table Header */}
                <motion.table
                  className="w-full text-left table-auto min-w-max"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.thead>
                    <motion.tr>
                      <motion.th className="p-2">
                        <p className="block  antialiased  leading-none text-sm text-black-powder">
                          Tour Details
                        </p>
                      </motion.th>
                      <motion.th className="p-2">
                        <p className="block  antialiased  leading-none text-sm text-black-powder">
                          User Name
                        </p>
                      </motion.th>
                      <motion.th className="p-2">
                        <p className="block  antialiased  leading-none text-sm text-black-powder">
                          Travel Data
                        </p>
                      </motion.th>
                      <motion.th className="p-2">
                        <p className="block  antialiased  leading-none text-sm text-black-powder">
                          Count
                        </p>
                      </motion.th>
                      <motion.th className="p-2">
                        <p className="block  antialiased  leading-none text-sm text-black-powder">
                          Status
                        </p>
                      </motion.th>
                    </motion.tr>
                  </motion.thead>
                  <motion.tbody>
                    <motion.tr className="cursor-pointer hover:bg-secondary/10">
                      <motion.td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-300 rounded overflow-hidden">
                            <img
                              src={ActivityImg1}
                              alt="Order"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="">
                            <h2 className="text-xs text-black-powder font-medium">
                              Mountain H...
                            </h2>
                            <p className="text-xs text-black-powder/70 ">
                              ₹2,500.00
                            </p>
                          </div>
                        </div>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          John Doe
                        </p>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          07-01-2025
                        </p>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          5
                        </p>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          <ul className="list-none pl-0">
                            <li
                              className={`text-red-500 font-medium flex flex-row`}
                            >
                              <span className="list-disc mr-2 ">•</span>
                              <span className="text-black-powder">
                                Not Resolved
                              </span>
                            </li>
                          </ul>
                        </p>
                      </motion.td>
                    </motion.tr>
                    <motion.tr className="cursor-pointer hover:bg-secondary/10">
                      <motion.td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-300 rounded overflow-hidden">
                            <img
                              src={ActivityImg2}
                              alt="Order"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="">
                            <h2 className="text-xs text-black-powder font-medium">
                              City Cycling
                            </h2>
                            <p className="text-xs text-black-powder/70 ">
                              ₹1,500.00
                            </p>
                          </div>
                        </div>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          Robert Brown
                        </p>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          06-01-2025
                        </p>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          7
                        </p>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          <ul className="list-none pl-0">
                            <li
                              className={`text-yellow-500 font-medium flex flex-row`}
                            >
                              <span className="list-disc mr-2 ">•</span>
                              <span className="text-black-powder">
                                Pendding
                              </span>
                            </li>
                          </ul>
                        </p>
                      </motion.td>
                    </motion.tr>
                    <motion.tr className="cursor-pointer hover:bg-secondary/10">
                      <motion.td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-300 rounded overflow-hidden">
                            <img
                              src={ActivityImg3}
                              alt="Order"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="">
                            <h2 className="text-xs text-black-powder font-medium">
                              Scuba Diving
                            </h2>
                            <p className="text-xs text-black-powder/70 ">
                              ₹3,500.00
                            </p>
                          </div>
                        </div>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          Jane Smith
                        </p>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          04-01-2025
                        </p>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          11
                        </p>
                      </motion.td>
                      <motion.td className="p-2">
                        <p className="text-xs text-black-powder font-medium">
                          <ul className="list-none pl-0">
                            <li
                              className={`text-green-500 font-medium flex flex-row`}
                            >
                              <span className="list-disc mr-2 ">•</span>
                              <span className="text-black-powder">
                                Resolved
                              </span>
                            </li>
                          </ul>
                        </p>
                      </motion.td>
                    </motion.tr>
                  </motion.tbody>
                </motion.table>
              </div>
              <div className="flex items-center justify-end">
                <a
                  href=""
                  className="text-black-powder font-medium text-xs hover:text-kings-ransom hover:underline duration-300 transition-all"
                >
                  {" "}
                  View More
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="rounded p-6 transform perspective-1000 transition-transform duration-300 border border-dark-olive-green/10 space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="md:flex items-center justify-between">
            {" "}
            <div>
              {/* Summary Heading */}
              <motion.h3
                className="text-xs font-medium text-black-powder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Total
              </motion.h3>

              {/* Heading */}
              <motion.h1
                className="text-base md:text-lg font-semibold tracking-[.08em] text-black-powder  uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                Earnings
              </motion.h1>
              <motion.h1
                className="text-xl md:text-2xl font-semibold  text-black-powder uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                ₹2,865,00
              </motion.h1>
            </div>
            {/* Period Toggle */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setSelectedPeriod("monthly")}
                className={`${
                  selectedPeriod === "monthly"
                    ? "bg-black-powder text-apple-cucumber"
                    : "bg-kings-ransom text-black-powder"
                } py-2 px-4 text-sm font-medium rounded transition duration-300 hover:bg-kings-ransom/70`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPeriod("yearly")}
                className={`${
                  selectedPeriod === "yearly"
                    ? "bg-black-powder text-apple-cucumber"
                    : "bg-kings-ransom text-black-powder"
                } py-2 px-4 text-sm font-medium rounded transition duration-300 hover:bg-kings-ransom/70`}
              >
                Yearly
              </button>
              <button
                onClick={() => setSelectedPeriod("weekly")}
                className={`${
                  selectedPeriod === "weekly"
                    ? "bg-black-powder text-apple-cucumber"
                    : "bg-kings-ransom text-black-powder"
                } py-2 px-4 text-sm font-medium rounded transition duration-300 hover:bg-kings-ransom/70`}
              >
                Weekly
              </button>
            </div>
          </div>

          {/* Area Chart */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <AreaChart
              className="h-[10rem]"
              data={chartData}
              index="date"
              categories={["SalesPrice"]}
              colors={["#9FB2CD"]}
              valueFormatter={(number) =>
                `${Intl.NumberFormat("in").format(number)} INR`
              }
              showYAxis={false} // Remove Y-axis and its labels
              showLegend={false} // Optional: Hide the legend
              curveType="monotone" // Smooth zig-zag pattern
              gridOpacity={0.1} // Lighter grid lines
              gridColor="#9FB2CD" // Grid line color
              showHorizontalGridLines={false} // Remove horizontal grid lines
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;
