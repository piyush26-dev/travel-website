import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { ChevronDown } from "lucide-react";

const toursData = [
  { id: 1, tours_name: "Explore the Mountains", tours_days: 12 },
  { id: 2, tours_name: "Beachside Paradise", tours_days: 5 },
  { id: 3, tours_name: "Historic City Tour", tours_days: 7 },
];

export default function TourForm() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formDetails, setFormDetails] = useState({
    tour_name: "",
    tour_id: "",
    tours_all_days: [],
  });

  const handleChangeTwo = (key, value, key2, value2) => {
    setFormDetails((prev) => ({
      ...prev,
      [key]: value, // For tour_id
      [key2]: value2, // For tour_name
      tours_all_days: Array(
        toursData.find((tour) => tour.id === value).tours_days
      )
        .fill(null)
        .map((_, index) => ({
          tours_days: (index + 1).toString(),
          tour_day_name: "",
        })),
    }));
  };

  const handleDayNameChange = (index, value) => {
    const updatedDays = [...formDetails.tours_all_days];
    updatedDays[index].tour_day_name = value;
    setFormDetails((prev) => ({ ...prev, tours_all_days: updatedDays }));
  };

  return (
    <div>
      {/* Dropdown for Tours */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-black-powder mb-1">
          Select Tour
        </label>
        <div className="relative dropdown-container w-full">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between px-3 py-2 border border-kings-ransom text-black-powder font-normal text-sm transition w-full rounded"
          >
            {formDetails?.tour_name || "Select place"}
            <motion.span
              className="ml-2"
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <SimpleBar
                style={{ maxHeight: "200px" }}
                className="absolute right-0 mt-2 bg-primary border border-black-powder/10 rounded shadow-lg text-black-powder text-sm w-full bg-kings-ransom z-50"
              >
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {toursData.length > 0 ? (
                    toursData.map((tour) => (
                      <motion.li
                        key={tour.id}
                        onClick={() => {
                          handleChangeTwo(
                            "tour_id",
                            tour.id,
                            "tour_name",
                            tour.tours_name
                          );
                          setIsDropdownOpen(false);
                        }}
                        className={`px-6 py-2 ${
                          formDetails?.tour_id === tour.id
                            ? "bg-apple-cucumber/70"
                            : "bg-kings-ransom"
                        } hover:bg-apple-cucumber/70 cursor-pointer`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tour.tours_name}
                      </motion.li>
                    ))
                  ) : (
                    <motion.li
                      className="px-6 py-2 text-gray-500 cursor-not-allowed"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      Places not available
                    </motion.li>
                  )}
                </motion.ul>
              </SimpleBar>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Dynamic Day Names */}
      {formDetails.tours_all_days.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-black-powder mb-4">
            Set Day Names
          </h3>
          {formDetails.tours_all_days.map((day, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Day {index + 1}
              </label>
              <input
                type="text"
                value={day.tour_day_name}
                onChange={(e) => handleDayNameChange(index, e.target.value)}
                placeholder="Enter day name"
                className="px-3 py-2 border border-black-powder rounded w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
