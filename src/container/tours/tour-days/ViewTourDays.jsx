import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { ChevronDown, LoaderCircle, MoveLeft, Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const toursData = [
  { id: 1, tours_name: "Explore the Mountains", tours_days: 12 },
  { id: 2, tours_name: "Beachside Paradise", tours_days: 5 },
  { id: 3, tours_name: "Historic City Tour", tours_days: 7 },
];

const ViewTourDays = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formDetails, setFormDetails] = useState({
    tour_name: "",
    tour_id: "",
    tours_all_days: [],
  });
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleBack = () => {
    navigate("/tour-days");
  };

  const handleEditOn = () => {
    setIsLoading(true); // Start loading
    setTimeout(() => {
      setIsEditable(false); // End loading and toggle editable state
      setIsLoading(false);
      toast.success("Edit this tour"); // Trigger success toast
    }, 2000); // 2 minutes delay
  };

  return (
    <>
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
            <div className="flex items-center">
              {!isEditable ? (
                <>
                  <button
                    className="bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm flex items-center gap-2"
                    onClick={() => setIsEditable(!isEditable)}
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm flex items-center gap-2"
                    onClick={handleEditOn}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span> // Loading spinner
                    ) : (
                      <Pencil size={16} />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="mb-4">
            {/* Dropdown for Tours */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Select Tour
              </label>
              <div className="relative dropdown-container w-full">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={isEditable}
                  className={`${
                    isEditable ? "cursor-not-allowed" : ""
                  } flex items-center justify-between px-3 py-2 border border-kings-ransom text-black-powder font-normal text-sm  transition w-full rounded`}
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
                      onChange={(e) =>
                        handleDayNameChange(index, e.target.value)
                      }
                      placeholder="Enter day name"
                      disabled={isEditable}
                      className={`${
                        isEditable ? "cursor-not-allowed" : ""
                      } w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {!isEditable && (
            <div className="flex justify-center items-center space-x-4 !mt-8">
              <button
                className="bg-black-powder text-apple-cucumber w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm gap-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                ) : (
                  "Save"
                )}
              </button>
              <button
                className=" bg-transparent text-black-powder border border-black-powder/70 w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm  gap-2"
                // onClick={onClose}
              >
                Cancel
              </button>
            </div>
          )}
        </motion.div>
      </div>{" "}
    </>
  );
};

export default ViewTourDays;
