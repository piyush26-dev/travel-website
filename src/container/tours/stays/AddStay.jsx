import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
("react");
import { useNavigate } from "react-router-dom";
import {
  Bed,
  CarFront,
  ChevronDown,
  LoaderCircle,
  MoveLeft,
  Plus,
  X,
} from "lucide-react";
import {
  SummarizedFormValidation,
  StaysFormValidation,
} from "../../../Utils/validation";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const AddStay = () => {
  const navigate = useNavigate();
  const toursData = [
    { id: 1, tours_name: "Explore the Mountains", tours_days: 12 },
    { id: 2, tours_name: "Beachside Paradise", tours_days: 5 },
    { id: 3, tours_name: "Historic City Tour", tours_days: 7 },
    { id: 4, tours_name: "Wildlife Safari", tours_days: 22 },
  ];

  const [formDetails, setFormDetails] = useState({
    tour_name: "",
    tour_id: "",
    days: [],
  });
   const controls = useAnimation();

  const [selectedTour, setSelectedTour] = useState(null);
  const [dayInput, setDayInput] = useState(""); // Input field for day
  const [errorMessages, setErrorMessages] = useState({});
  const [isFormValid, setIsFormValid] = useState(true); // To track if form is valid
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenStay, setIsDropdownOpenStay] = useState(false);

  // Handle tour selection
  const handleTourSelect = (tour) => {
    setFormDetails({
      tour_name: tour.tours_name,
      tour_id: tour.id.toString(),
      days: [],
    });
    setSelectedTour(tour);
    setErrorMessages({});
    setDayInput(""); // Reset day input when a tour is selected
    setIsFormValid(true); // Reset form validity
  };

  // Add a new stay day
  const addStayDay = () => {
    const dayNumber = parseInt(dayInput, 10);

    if (!selectedTour || isNaN(dayNumber) || dayNumber <= 0) {
      setErrorMessages({
        stay_day: "Please enter a valid day greater than 0.",
      });
      return;
    }

    if (dayNumber > selectedTour.tours_days) {
      setErrorMessages({
        stay_day: `You cannot add a day beyond ${selectedTour.tours_days}.`,
      });
      return;
    }

    if (
      formDetails.days.some((stay) => stay.stay_day === dayNumber.toString())
    ) {
      setErrorMessages({
        stay_day: `Day ${dayNumber} is already added.`,
      });
      return;
    }

    const newDay = {
      stay_day: dayNumber.toString(),
      stay_day_title: "",
      stays: [
        {
          stay_name: "",
          check_in: "",
          check_out: "",
          nights: "",
          breakfast: false,
          lunch: false,
          dinner: false,
        },
      ],
    };

    setFormDetails((prev) => ({
      ...prev,
      days: [...prev.days, newDay],
    }));
    setDayInput(""); // Clear day input after adding
    setErrorMessages({});
    setIsFormValid(true); // Reset form validity after adding day
  };

  // Add a new selected stay category
  const addStayCategory = (dayIndex) => {
    const updatedStays = [...formDetails.days];
    updatedStays[dayIndex].stays.push({
      stay_name: "",
      check_in: "",
      check_out: "",
      nights:"",
      breakfast: false,
      lunch: false,
      dinner: false,
    });

    setFormDetails({ ...formDetails, days: updatedStays });
  };

  // Update stay title
  const handleStayTitleChange = (dayIndex, newTitle) => {
    const updatedStays = [...formDetails.days];
    updatedStays[dayIndex].stay_day_title = newTitle;

    setFormDetails({ ...formDetails, days: updatedStays });
  };

  // Add a mid-stay location
  const addMidTransferInput = (dayIndex, stayIndex) => {
    const updatedStays = [...formDetails.days];
    const midTransfers = updatedStays[dayIndex].stays[stayIndex].hotels;

    midTransfers.push(""); // Add an empty string as placeholder for the input
    setFormDetails({ ...formDetails, days: updatedStays });
  };

  // Update mid-stay location
  const handleAddHotelChange = (dayIndex, stayIndex, hotelIndex, value) => {
    const updatedStays = [...formDetails.days];
    updatedStays[dayIndex].stays[stayIndex].hotels[hotelIndex] = value;

    setFormDetails({ ...formDetails, days: updatedStays });
  };

  // Handle input change for Day field
  const handleDayInputChange = (e) => {
    const value = e.target.value;

    // Check if value is a positive number and update the input
    if (value === "" || (parseInt(value, 10) > 0 && !isNaN(value))) {
      setDayInput(value);
      setErrorMessages({}); // Clear error messages when the input is valid
      validateForm(); // Validate form each time input changes
    } else {
      setErrorMessages({
        stay_day: "Please enter a valid day greater than 0.",
      });
    }
  };

  // Validate form to check if any required field is empty
  const validateForm = () => {
    const isValid = formDetails.days.every((day) => {
      return day.stays.every((stay) => {
        // Check if any field except hotels is empty or null
        return stay.stay_name && stay.check_in && stay.check_out;
      });
    });

    setIsFormValid(isValid); // Update form validity
  };


    const handleStayFieldChange = (dayIndex, stayIndex, field, value) => {
      const updatedDays = [...formDetails.days];
      updatedDays[dayIndex].stays[stayIndex][field] = value;
      setFormDetails({ ...formDetails, days: updatedDays });
    };

    const toggleStayField = (dayIndex, stayIndex, field) => {
      const updatedDays = [...formDetails.days];

      // Toggle the value for the specific field
      updatedDays[dayIndex].stays[stayIndex][field] =
        !updatedDays[dayIndex].stays[stayIndex][field];

      // Update the state
      setFormDetails({ ...formDetails, days: updatedDays });

      // Debugging output to ensure state updates correctly
      // console.log("Updated Days:", updatedDays);
    };



  // Check if any stay field is invalid
  const isStayCategoryDisabled = (dayIndex) => {
    const transferFields = formDetails.days[dayIndex].stays;

    // Check if any field is empty, undefined or null
    return transferFields.some(
      (stay) => !stay.stay_name || !stay.check_in || !stay.check_out
    );
  };

  // Check if all stay fields are filled to enable the "Add Stay Day" button
  const isAddStayDayDisabled = () => {
    // Check if any stay field in any day is empty
    return formDetails.days.some((day) => {
      return day.stays.some(
        (stay) => !stay.stay_name || !stay.check_in || !stay.check_out
      );
    });
  };

  const handleBack = () => {
    navigate("/all-stay-list-tour");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = StaysFormValidation(formDetails);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
    if (!isValid) return;
    setLoading(true);

    // const { place_image, full_name, phone_no } = formDetails;
    // const newData = new FormData();
    // newData.append("profile", place_image);
    // newData.append("full_name", full_name);
    // newData.append("phone_no", phone_no);

    // try {
    //   const response = await profileUpdateService(newData);
    //   if (response?.status === 200) {
    //     await dispatch(profileDetails());
    //     toast.success(response?.data?.message);
    //     setIsFieldsEnabled(false);
    //   } else {
    //     toast.error(response?.data?.message);
    //   }
    // } catch (error) {
    //   toast.error("An error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  // Auto close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
      if (!event.target.closest(".dropdown-container-tow")) {
        setIsDropdownOpenStay(false);
      }
    };

    if (isDropdownOpen || isDropdownOpenStay) {
      window.addEventListener("click", handleOutsideClick);
    }

    // Clean up the event listener on component unmount or dependency changes
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen, isDropdownOpenStay]);

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
        <div className="flex items-center mb-4">
          <button
            className="bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm flex items-center gap-2"
            onClick={handleBack}
          >
            <MoveLeft size={16} />
          </button>
        </div>
        <div>
          <div className="space-y-4">
            <div className="">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Tour
              </label>
              <div className="relative  dropdown-container w-full">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between px-3 py-2 border border-kings-ransom text-black-powder font-normal text-sm  transition w-full rounded"
                >
                  {formDetails?.tour_name
                    ? formDetails?.tour_name
                    : "Select place"}

                  {/* {addDesignerServiceDetail?.designer_service_category} */}
                  <motion.span
                    className="ml-2"
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                {errorMessages?.tour_name && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errorMessages?.tour_name}
                  </span>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <SimpleBar
                      style={{ maxHeight: "100vh" }}
                      className={`absolute right-0 mt-2 bg-primary border border-black-powder/10 rounded shadow-lg  text-black-powder text-sm w-full max-h-max  bg-kings-ransom h-[10rem] z-50 `}
                    >
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {toursData?.length > 0 ? (
                          toursData.map((tours) => (
                            <motion.li
                              key={tours?.id}
                              onClick={() => {
                                const selected = tours;
                                // handleChangeTwo(
                                //   "tour_id",
                                //   tours?.id,
                                //   "tour_name",
                                //   tours?.tours_name
                                // );
                                handleTourSelect(selected);

                                setIsDropdownOpen(false);
                              }}
                              className={`px-6 py-2 ${
                                formDetails?.tour_id === tours?.id
                                  ? "bg-apple-cucumber/70"
                                  : "bg-kings-ransom"
                              } hover:bg-apple-cucumber/70 cursor-pointer`}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {tours?.tours_name}
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
            {formDetails.days.map((stay, dayIndex) => (
              <div key={dayIndex} className="space-y-4 pt-8">
                <h2 className="text-lg font-medium text-black-powder">
                  Day {stay.stay_day}
                </h2>
                <div className="">
                  <label className="block text-sm font-medium text-black-powder mb-1">
                    Stay Title
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter stay title`}
                    className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                    value={stay.stay_day_title}
                    onChange={(e) =>
                      handleStayTitleChange(dayIndex, e.target.value)
                    }
                  />
                </div>

                {stay.stays.map((stayDetail, stayIndex) => (
                  <div key={stayIndex}>
                    <div className="rounded border border-dashed border-kings-ransom p-2">
                      <div className="space-y-4 ">
                        <div className="">
                          <div className="inline-block">
                            <div className="flex items-center gap-4 text-black-powder/70 border-b-2 border-kings-ransom">
                              {" "}
                              <Bed size={18} />
                              <h2 className="text-base font-medium">Stay At</h2>
                            </div>
                          </div>
                          <div className="space-y-4 mt-4">
                            <div className="">
                              <label className="block text-sm font-medium text-black-powder mb-1">
                                Stay Name
                              </label>
                              <input
                                type="text"
                                placeholder={`Enter Stay Name`}
                                value={stayDetail.stay_name}
                                onChange={(e) => {
                                  const updatedStays = [...formDetails.days];
                                  updatedStays[dayIndex].stays[
                                    stayIndex
                                  ].stay_name = e.target.value;
                                  setFormDetails({
                                    ...formDetails,
                                    days: updatedStays,
                                  });
                                  validateForm(); // Validate form on name change
                                }}
                                className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                              />
                            </div>
                            <div className="w-full">
                              <div className="lg:flex lg:space-y-4 space-y-4 items-center gap-4 w-full">
                                {/* Check-In */}
                                <div className="w-full">
                                  <label className="block text-sm font-medium text-black-powder mb-1">
                                    Check-In
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="time"
                                      name="check_in"
                                      step="60"
                                      value={stay.check_in}
                                      onChange={(e) =>
                                        handleStayFieldChange(
                                          dayIndex,
                                          stayIndex,
                                          "check_in",
                                          e.target.value
                                        )
                                      }
                                      className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C]"
                                    />
                                    {/* <div className="relative ">
                                      <select
                                        value={stay.check_in}
                                        onChange={(e) =>
                                          handleStayFieldChange(
                                            dayIndex,
                                            stayIndex,
                                            "check_in",
                                            e.target.value
                                          )
                                        }
                                        className="px-3 py-2 border border-kings-ransom rounded focus:outline-none bg-transparent text-sm font-normal text-[#33372C] appearance-none w-[4rem]"
                                      >
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                      </select>
                                      <motion.div
                                        animate={controls}
                                        initial={{ rotate: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute right-2 top-3 transform -translate-y-1/2 pointer-events-none"
                                      >
                                        <ChevronDown size={16} />
                                      </motion.div>
                                    </div> */}
                                  </div>
                                  {errorMessages?.check_in && (
                                    <span className="label-text-alt text-red-500">
                                      {errorMessages?.check_in}
                                    </span>
                                  )}
                                </div>
                                {/* Check-Out */}
                                <div className="w-full">
                                  <label className="block text-sm font-medium text-black-powder mb-1">
                                    Check-Out
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="time"
                                      name="check_out"
                                      step="60"
                                      value={stay.check_out}
                                      onChange={(e) =>
                                        handleStayFieldChange(
                                          dayIndex,
                                          stayIndex,
                                          "check_out",
                                          e.target.value
                                        )
                                      }
                                      className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C]"
                                    />
                                    {/* <div className="relative ">
                                      <select
                                        value={stay.check_out}
                                        onChange={(e) =>
                                          handleStayFieldChange(
                                            dayIndex,
                                            stayIndex,
                                            "check_out",
                                            e.target.value
                                          )
                                        }
                                        className="px-3 py-2 border border-kings-ransom rounded focus:outline-none bg-transparent text-sm font-normal text-[#33372C] appearance-none w-[4rem]"
                                      >
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                      </select>
                                      <motion.div
                                        animate={controls}
                                        initial={{ rotate: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute right-2 top-3 transform -translate-y-1/2 pointer-events-none"
                                      >
                                        <ChevronDown size={16} />
                                      </motion.div>
                                    </div> */}
                                  </div>
                                  {errorMessages?.check_out && (
                                    <span className="label-text-alt text-red-500">
                                      {errorMessages?.check_out}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="w-full">
                              <label className="block text-sm font-medium text-black-powder mb-1">
                                Nights
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  name="nights"
                                  value={stay.nights}
                                  onChange={(e) => {
                                    const rawValue = e.target.value; // Get raw input value
                                    const numericValue = rawValue.replace(
                                      /\D/g,
                                      ""
                                    ); // Remove non-numeric characters
                                    if (numericValue !== stay.nights) {
                                      // Only update state if value changes
                                      handleStayFieldChange(
                                        dayIndex,
                                        stayIndex,
                                        "nights",
                                        numericValue
                                      );
                                    }
                                  }}
                                  className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C]"
                                />
                              </div>
                              {errorMessages?.nights && (
                                <span className="label-text-alt text-red-500">
                                  {errorMessages?.nights}
                                </span>
                              )}
                            </div>

                            <div className="">
                              <label className="block text-sm font-medium text-black-powder mb-1">
                                Inclusions
                              </label>
                              <ul className="flex items-center gap-6">
                                {/* Breakfast Chip */}
                                <li
                                  className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium ${
                                    formDetails.days[dayIndex].stays[stayIndex]
                                      .breakfast
                                      ? "bg-black-powder text-apple-cucumber"
                                      : "bg-kings-ransom text-black-powder"
                                  } hover:bg-black-powder hover:text-apple-cucumber duration-300 transition-all`}
                                  onClick={() =>
                                    toggleStayField(
                                      dayIndex,
                                      stayIndex,
                                      "breakfast"
                                    )
                                  }
                                >
                                  Breakfast
                                </li>

                                {/* Lunch Chip */}
                                <li
                                  className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium ${
                                    formDetails.days[dayIndex].stays[stayIndex]
                                      .lunch
                                      ? "bg-black-powder text-apple-cucumber"
                                      : "bg-kings-ransom text-black-powder"
                                  } hover:bg-black-powder hover:text-apple-cucumber duration-300 transition-all`}
                                  onClick={() =>
                                    toggleStayField(
                                      dayIndex,
                                      stayIndex,
                                      "lunch"
                                    )
                                  }
                                >
                                  Lunch
                                </li>

                                {/* Dinner Chip */}
                                <li
                                  className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium ${
                                    formDetails.days[dayIndex].stays[stayIndex]
                                      .dinner
                                      ? "bg-black-powder text-apple-cucumber"
                                      : "bg-kings-ransom text-black-powder"
                                  } hover:bg-black-powder hover:text-apple-cucumber duration-300 transition-all`}
                                  onClick={() =>
                                    toggleStayField(
                                      dayIndex,
                                      stayIndex,
                                      "dinner"
                                    )
                                  }
                                >
                                  Dinner
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end">
                  <button
                    className={`  px-4 py-2 rounded  transition-all duration-300 font-medium text-sm flex items-center gap-2 ${
                      isStayCategoryDisabled(dayIndex)
                        ? "bg-kings-ransom text-black-powder cursor-not-allowed"
                        : "bg-black-powder text-apple-cucumber hover:bg-kings-ransom hover:text-black-powder"
                    }`}
                    onClick={() => addStayCategory(dayIndex)}
                    disabled={isStayCategoryDisabled(dayIndex)}
                  >
                    <Plus size={16} />
                    Stay
                  </button>
                </div>
              </div>
            ))}

            <div className="">
              {selectedTour &&
                formDetails.days.length < selectedTour.tours_days && (
                  <>
                    {" "}
                    <div className="space-y-4">
                      <div className="">
                        <label className="block text-sm font-medium text-black-powder mb-1">
                          Select Day
                        </label>
                        <input
                          type="text"
                          placeholder="Enter From Location"
                          value={dayInput}
                          onChange={handleDayInputChange}
                          className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                        />
                        {errorMessages?.stay_day && (
                          <span className="label-text-alt text-red-500 text-xs">
                            {errorMessages.stay_day}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <button
                          className={`  px-4 py-2 rounded  transition-all duration-300 font-medium text-sm flex items-center gap-2 ${
                            isAddStayDayDisabled()
                              ? "bg-kings-ransom text-black-powder cursor-not-allowed"
                              : "bg-black-powder text-apple-cucumber hover:bg-kings-ransom hover:text-black-powder"
                          }`}
                          onClick={addStayDay}
                          disabled={isAddStayDayDisabled()}
                        >
                          <Plus size={16} />
                          Stay Day
                        </button>
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>
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
        </div>
      </motion.div>
    </div>
  );
};

export default AddStay;
