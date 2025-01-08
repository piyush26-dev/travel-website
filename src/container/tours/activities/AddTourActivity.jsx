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
  Trash2,
  Volleyball,
  X,
} from "lucide-react";
import {
  SummarizedFormValidation,
  StaysFormValidation,
} from "../../../Utils/validation";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const AddTourActivity = () => {
  const navigate = useNavigate();
  const toursData = [
    { id: 1, tours_name: "Explore the Mountains", tours_days: 12 },
    { id: 2, tours_name: "Beachside Paradise", tours_days: 5 },
    { id: 3, tours_name: "Historic City Tour", tours_days: 7 },
    { id: 4, tours_name: "Wildlife Safari", tours_days: 22 },
  ];
  const activitiesData = [
    {
      id: 1,
      title: "Mountain Hiking",
      description: "Embark on a thrilling hike through rugged mountain paths.",
    },
    {
      id: 2,
      title: "Beach Volleyball",
      description: "A fun activity on the beach with your friends.",
    },
  ];

  const attractionsData = [
    { id: 1, name: "Mountain Peak" },
    { id: 2, name: "Sunset Point" },
    { id: 3, name: "Cave Exploration" },
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
  const [isDropdownOpenActivity, setIsDropdownOpenActivity] = useState(false);
  const [isDropdownOpenAttraction, setIsDropdownOpenAttraction] =
    useState(false);

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
  const addActivityDay = () => {
    const dayNumber = parseInt(dayInput, 10);

    if (!selectedTour || isNaN(dayNumber) || dayNumber <= 0) {
      setErrorMessages({
        activity_day: "Please enter a valid day greater than 0.",
      });
      return;
    }

    if (dayNumber > selectedTour.tours_days) {
      setErrorMessages({
        activity_day: `You cannot add a day beyond ${selectedTour.tours_days}.`,
      });
      return;
    }

    if (
      formDetails.days.some(
        (stay) => stay.activity_day === dayNumber.toString()
      )
    ) {
      setErrorMessages({
        activity_day: `Day ${dayNumber} is already added.`,
      });
      return;
    }

    const newDay = {
      activity_day: dayNumber.toString(),
      activities: [
        {
          activity_id: "",
          attraction_id: [],
          ticket_included: false,
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
  const addActivity = (dayIndex) => {
    const updatedStays = [...formDetails.days];
    updatedStays[dayIndex].activities.push({
      activity_id: "",
      attraction_id: [],
      ticket_ncluded: false,
    });

    setFormDetails({ ...formDetails, days: updatedStays });
  };

  // Update stay title
  const handleStayTitleChange = (dayIndex, newTitle) => {
    const updatedStays = [...formDetails.days];
    updatedStays[dayIndex].activity_day_title = newTitle;

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
        activity_day: "Please enter a valid day greater than 0.",
      });
    }
  };

  const handleActivitySelect = (dayIndex, activityIndex, selectedActivity) => {
    if (!selectedActivity) return;

    const updatedDays = [...formDetails.days];
    updatedDays[dayIndex].activities[activityIndex].activity_id =
      selectedActivity.id;

    setFormDetails((prev) => ({
      ...prev,
      days: updatedDays,
    }));

    setIsDropdownOpenActivity(false); // Ensure dropdown closes after selection
  };

const handleAttractionSelect = (dayIndex, activityIndex, attractionId) => {
  const updatedDays = [...formDetails.days];
  const activity = updatedDays[dayIndex].activities[activityIndex];

  // Ensure attraction IDs are strings
  const attractionIdString = attractionId.toString();
  if (!activity.attraction_id.includes(attractionIdString)) {
    activity.attraction_id.push(attractionIdString);
  }

  setFormDetails({ ...formDetails, days: updatedDays });
  setIsDropdownOpenAttraction(false); // Correcting this function call
};


  const removeAttraction = (dayIndex, activityIndex, attractionId) => {
    const updatedDays = [...formDetails.days];
    const activity = updatedDays[dayIndex].activities[activityIndex];

    // Convert attractionId to a string for comparison and removal
    const attractionIdString = attractionId.toString();
    activity.attraction_id = activity.attraction_id.filter(
      (id) => id !== attractionIdString
    );

    setFormDetails({ ...formDetails, days: updatedDays });
  };

    const removeActivity = (dayIndex, activityIndex) => {
      const updatedDays = [...formDetails.days];
      updatedDays[dayIndex].activities.splice(activityIndex, 1);
      setFormDetails({ ...formDetails, days: updatedDays });
    };

    const removeDay = (dayIndex) => {
      const updatedDays = [...formDetails.days];
      updatedDays.splice(dayIndex, 1);
      setFormDetails({ ...formDetails, days: updatedDays });
    };


  // Validate form to check if any required field is empty
  const validateForm = () => {
    const isValid = formDetails.days.every((day) => {
      return day.activities.every((stay) => {
        // Check if any field except hotels is empty or null
        return stay.activity_name && stay.check_in && stay.check_out;
      });
    });

    setIsFormValid(isValid); // Update form validity
  };
  // Check if any stay field is invalid
const isAddActivityDisabled = (dayIndex) => {
  const activities = formDetails.days[dayIndex].activities;

  // Check if any field in activities is empty, undefined, or null
  return activities.some(
    (activity) =>
      !activity.activity_id || // Check if activity_id is empty
      activity.attraction_id.length === 0 || // Check if attraction_id array is empty
      activity.attraction_id === null || // Check if attraction_id is null
      activity.attraction_id === undefined // Check if attraction_id is undefined
  );
};

  // Check if all stay fields are filled to enable the "Add Stay Day" button
const isAddStayDayDisabled = () => {
  // Check if any day or activity field is empty, null, or undefined
  return formDetails.days.some((day) => {
    if (!day.activity_day) {
      // Check if activity_day is empty or falsy
      return true;
    }
    return day.activities.some(
      (activity) =>
        !activity.activity_id || // Check if activity_id is empty or falsy
        activity.attraction_id === null || // Check if attraction_id is null
        activity.attraction_id === undefined || // Check if attraction_id is undefined
        (Array.isArray(activity.attraction_id) &&
          activity.attraction_id.length === 0) // Check if attraction_id array is empty
    );
  });
};


  const handleBack = () => {
    navigate("/tour-activities");
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
      if (!event.target.closest(".dropdown-container-tow")) {
        setIsDropdownOpenActivity(false);
      }
      if (!event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
      if (!event.target.closest(".dropdown-container-three")) {
        setIsDropdownOpenAttraction(false);
      }
    };

    if (isDropdownOpen || isDropdownOpenActivity || isDropdownOpenAttraction) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen, isDropdownOpenActivity, isDropdownOpenAttraction]);

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
            className="hidden bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm md:flex items-center gap-2"
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
            {formDetails.days.map((activity, dayIndex) => (
              <div key={dayIndex} className="space-y-4 pt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-black-powder">
                    Day {activity.activity_day}
                  </h2>
                  <button
                    className="hidden bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm md:flex items-center gap-2"
                    onClick={() => removeDay(dayIndex)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-black-powder mb-1">
                    Activity Title
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter activity title`}
                    className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                    value={activity.activity_day_title}
                    onChange={(e) =>
                      handleStayTitleChange(dayIndex, e.target.value)
                    }
                  />
                </div>

                {activity.activities.map((act, activityIndex) => (
                  <div key={activityIndex}>
                    <div className="rounded border border-dashed border-kings-ransom p-2">
                      <div className="space-y-4 ">
                        <div className="">
                          <div className="flex items-center justify-between">
                            <div className="inline-block">
                              <div className="flex items-center gap-4 text-black-powder/70 border-b-2 border-kings-ransom">
                                {" "}
                                <Volleyball size={18} />
                                <h2 className="text-base font-medium">
                                  Activity
                                </h2>
                              </div>
                            </div>
                            <div className="inline-block">
                              <button
                                className="hidden bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm md:flex items-center gap-2"
                                onClick={() =>
                                  removeActivity(dayIndex, activityIndex)
                                }
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4 mt-4">
                            <div className="">
                              <label className="block text-sm font-medium text-black-powder mb-1">
                                Activity
                              </label>
                              <div className="relative dropdown-container-tow w-full">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent click from bubbling to the window
                                    setIsDropdownOpenActivity(
                                      !isDropdownOpenActivity
                                    );
                                  }}
                                  className="flex items-center justify-between px-3 py-2 border border-kings-ransom text-black-powder font-normal text-sm transition w-full rounded"
                                >
                                  {act.activity_id
                                    ? activitiesData.find(
                                        (a) => a.id === act.activity_id
                                      )?.title
                                    : "Select Activity"}
                                  <motion.span
                                    className="ml-2"
                                    animate={{
                                      rotate: isDropdownOpenActivity ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <ChevronDown size={16} />
                                  </motion.span>
                                </button>
                                <AnimatePresence>
                                  {isDropdownOpenActivity && (
                                    <SimpleBar
                                      style={{ maxHeight: "100vh" }}
                                      className={`absolute right-0 mt-2 bg-primary border border-black-powder/10 rounded shadow-lg text-black-powder text-sm w-full max-h-max ${
                                        activitiesData?.length > 4
                                          ? "h-[10rem]"
                                          : ""
                                      } bg-kings-ransom z-50`}
                                    >
                                      <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        {activitiesData?.length > 0 ? (
                                          activitiesData.map((activity) => (
                                            <motion.li
                                              key={activity.id}
                                              onClick={() =>
                                                handleActivitySelect(
                                                  dayIndex,
                                                  activityIndex,
                                                  activity
                                                )
                                              }
                                              className={`px-6 py-2 ${
                                                act.activity_id === activity.id
                                                  ? "bg-apple-cucumber/70"
                                                  : "bg-kings-ransom"
                                              } hover:bg-apple-cucumber/70 cursor-pointer rounded`}
                                              initial={{ opacity: 0, y: -10 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              exit={{ opacity: 0, y: -10 }}
                                              transition={{ duration: 0.2 }}
                                            >
                                              {activity.title}
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
                                            No Activity Available
                                          </motion.li>
                                        )}
                                      </motion.ul>
                                    </SimpleBar>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                            <div className="w-full">
                              <label className="block text-sm font-medium text-black-powder mb-1">
                                Attractions
                              </label>
                              <div className="relative dropdown-container-three w-full">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setIsDropdownOpenAttraction(
                                      !isDropdownOpenAttraction
                                    )
                                  }
                                  className="flex items-center justify-between px-3 py-2 border border-kings-ransom text-black-powder font-normal text-sm transition w-full rounded"
                                >
                                  Select Attractions
                                  <motion.span
                                    className="ml-2"
                                    animate={{
                                      rotate: isDropdownOpenAttraction
                                        ? 180
                                        : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <ChevronDown size={16} />
                                  </motion.span>
                                </button>
                                {errorMessages?.attraction_id && (
                                  <span className="label-text-alt text-red-500 text-xs">
                                    {errorMessages?.attraction_id}
                                  </span>
                                )}

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                  {isDropdownOpenAttraction && (
                                    <motion.ul
                                      className="absolute right-0 mt-2 bg-primary border border-black-powder/10 rounded shadow-lg overflow-hidden text-black-powder text-sm w-full max-h-max overflow-y-auto bg-kings-ransom z-50"
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      {attractionsData?.length > 0 ? (
                                        attractionsData.map((attraction) => (
                                          <motion.li
                                            key={attraction.id}
                                            onClick={() =>
                                              handleAttractionSelect(
                                                dayIndex,
                                                activityIndex,
                                                attraction.id
                                              )
                                            }
                                            className={`px-6 py-2 ${
                                              act.attraction_id.includes(
                                                attraction.id.toString()
                                              ) // Convert to string for comparison
                                                ? "bg-apple-cucumber/70"
                                                : "bg-kings-ransom"
                                            } hover:bg-apple-cucumber/70 cursor-pointer`}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                          >
                                            {attraction.name}
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
                                          Attraction not available
                                        </motion.li>
                                      )}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                              </div>
                              {/* Selected Tags */}
                              <div className="flex flex-wrap gap-2 mt-2">
                                <AnimatePresence>
                                  {act.attraction_id.map((attId) => (
                                    <motion.span
                                      key={attId}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      className="inline-flex items-center gap-x-1.5 py-1.5 px-3 pe-2 rounded text-xs font-medium bg-kings-ransom/35 text-black-powder"
                                    >
                                      {
                                        attractionsData.find(
                                          (att) =>
                                            att.id.toString() ===
                                            attId.toString() // Ensure type consistency
                                        )?.name
                                      }

                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeAttraction(
                                            dayIndex,
                                            activityIndex,
                                            attId
                                          )
                                        }
                                        className="shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-kings-ransom focus:outline-none focus:bg-kings-ransom focus:text-black-powder duration-300 transition-all cursor-pointer"
                                      >
                                        <X size={12} />
                                      </button>
                                    </motion.span>
                                  ))}
                                </AnimatePresence>
                              </div>
                            </div>
                            {/* Ticket Included */}
                            <div>
                              <label className="inline-flex items-center mt-2">
                                <input
                                  type="checkbox"
                                  checked={act.ticket_included}
                                  onChange={() => {
                                    const updatedDays = [...formDetails.days];
                                    updatedDays[dayIndex].activities[
                                      activityIndex
                                    ].ticket_included = !act.ticket_included;
                                    setFormDetails({
                                      ...formDetails,
                                      days: updatedDays,
                                    });
                                  }}
                                  className="form-checkbox text-blue-500"
                                />
                                <span className="ml-2 text-gray-700">
                                  Ticket Included
                                </span>
                              </label>
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
                      isAddActivityDisabled(dayIndex)
                        ? "bg-kings-ransom text-black-powder cursor-not-allowed"
                        : "bg-black-powder text-apple-cucumber hover:bg-kings-ransom hover:text-black-powder"
                    }`}
                    onClick={() => addActivity(dayIndex)}
                    disabled={isAddActivityDisabled(dayIndex)}
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
                          Day
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Day"
                          value={dayInput}
                          onChange={handleDayInputChange}
                          className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                        />
                        {errorMessages?.activity_day && (
                          <span className="label-text-alt text-red-500 text-xs">
                            {errorMessages.activity_day}
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
                          onClick={addActivityDay}
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

export default AddTourActivity;
