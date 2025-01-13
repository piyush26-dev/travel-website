import { useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
("react");
import { useNavigate } from "react-router-dom";
import { ChevronDown, LoaderCircle, MoveLeft, Plus, X } from "lucide-react";
import { SummarizedFormValidation } from "../../../Utils/validation";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
const toursData = [
  { id: 1, tours_name: "Explore the Mountains", tours_days: 12 },
  { id: 2, tours_name: "Beachside Paradise", tours_days: 5 },
  { id: 3, tours_name: "Historic City Tour", tours_days: 7 },
  { id: 4, tours_name: "Wildlife Safari", tours_days: 22 },
  { id: 5, tours_name: "Gourmet Food Adventure", tours_days: 7 },
  { id: 6, tours_name: "Desert Exploration", tours_days: 10 },
  { id: 7, tours_name: "Underwater Diving", tours_days: 12 },
  { id: 8, tours_name: "Rainforest Retreat", tours_days: 5 },
  { id: 9, tours_name: "City Lights Night Tour", tours_days: 3 },
  { id: 10, tours_name: "Cultural Festival", tours_days: 9 },
  { id: 11, tours_name: "Snowy Peaks Expedition", tours_days: 8 },
  { id: 12, tours_name: "Island Hopping", tours_days: 6 },
  { id: 13, tours_name: "Ancient Ruins Discovery", tours_days: 10 },
  { id: 14, tours_name: "Luxury Cruise", tours_days: 2 },
  { id: 15, tours_name: "Adrenaline Adventures", tours_days: 5 },
];

const AddSummarizedTour = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [formDetails, setFormDetails] = useState({
    tour_name: "",
    tour_id: "",
    summarized_days: Array(0)
      .fill(null)
      .map((_, index) => ({
        tours_days: (index + 1).toString(),
        transfer: [],
        activities: [],
        hotels: [],
      })),
  });

  const [inputValues, setInputValues] = useState({
    transfer: "",
    activities: "",
    hotels: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleBack = () => {
    navigate("/summarized-view");
  };
  const handleChange = (e, value) => {
    const name = e.target ? e.target.name : e.name; // For custom components
    const selectedValue = e.target ? e.target.value : value;

    const keys = name.split(".");
    let newValue = selectedValue;

    if (
      name === "summarized_day" ||
      keys[keys.length - 1] === "summarized_day"
    ) {
      newValue = selectedValue.replace(/[^0-9]/g, ""); // Only numeric
    }
    // if (name === "dimension.weight.weight_unit") {
    //   setDimensions({
    //     ...dimensions,
    //     ["weight_unit"]: value,
    //   });
    // }
    setFormDetails((prevDetails) => {
      if (keys.length > 1) {
        let updatedDetails = { ...prevDetails };
        let nestedObject = updatedDetails;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!nestedObject[keys[i]]) nestedObject[keys[i]] = {};
          nestedObject = nestedObject[keys[i]];
        }
        nestedObject[keys[keys.length - 1]] = newValue;
        return updatedDetails;
      }

      return {
        ...prevDetails,
        [name]: newValue,
      };
    });

    const { errors } = SummarizedFormValidation({ [name]: newValue });
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name],
    }));
  };
  const handleChangeTwo = (name, value, additionalName, additionalValue) => {
    const newData = { [name]: value, [additionalName]: additionalValue };

    setFormDetails((prevDetails) => {
      if (additionalName === "tour_name") {
        const selectedTour = toursData.find(
          (tour) => tour.tours_name === additionalValue
        );
        const numberOfDays = selectedTour?.tours_days || 0;

        // Create summarized_days dynamically based on tours_days
        const summarizedDays = Array.from(
          { length: numberOfDays },
          (_, index) => ({
            tours_days: (index + 1).toString(),
            transfer: [],
            activities: [],
            hotels: [],
          })
        );

        return {
          ...prevDetails,
          [name]: value,
          [additionalName]: additionalValue,
          summarized_days: summarizedDays, // Set the number of days dynamically
        };
      }

      return { ...prevDetails, ...newData };
    });
  };

  // Add Field Function (add to specific day and field)
  const addField = (field, dayIndex) => {
    const inputValue = inputValues[field]?.trim(); // Get the input value and trim it

    // Add value if it's non-empty and not already in the field's array
    if (
      inputValue &&
      !formDetails.summarized_days[dayIndex][field].includes(inputValue)
    ) {
      const updatedDays = [...formDetails.summarized_days];
      updatedDays[dayIndex][field] = [
        ...updatedDays[dayIndex][field],
        inputValue,
      ]; // Add value to the array

      setFormDetails({ ...formDetails, summarized_days: updatedDays });
      setInputValues({ ...inputValues, [field]: "" }); // Reset the input field

      if (typeof handleChange === "function") {
        handleChange({
          target: {
            value: updatedDays[dayIndex][field], // Update the corresponding field in the state
            name: field,
          },
        });
      }
    }
  };

  // Remove Field Function (remove from specific day and field)
  const removeField = (field, valueToRemove, dayIndex) => {
    const updatedDays = [...formDetails.summarized_days];
    updatedDays[dayIndex][field] = updatedDays[dayIndex][field].filter(
      (item) => item !== valueToRemove
    ); // Remove the value

    setFormDetails({ ...formDetails, summarized_days: updatedDays });

    if (typeof handleChange === "function") {
      handleChange({
        target: {
          value: updatedDays[dayIndex][field], // Update the state after removal
          name: field,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = SummarizedFormValidation(formDetails);
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
    };

    if (isDropdownOpen) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }

    // Clean up the event listener
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isDropdownOpen]);

  // Render Field Function (display field input and values)
  const renderField = (dayIndex, field, label) => {
    const fieldValue = formDetails.summarized_days[dayIndex][field];

    return (
      <>
        <div className="mb-4">
          <div className="relative">
            <label className="block text-sm font-medium text-black-powder mb-1">
              {label}
            </label>
            <input
              type="text"
              value={inputValues[field]} // Bind input field to the inputValues state
              onChange={(e) =>
                setInputValues({ ...inputValues, [field]: e.target.value })
              } // Update input field on change
              placeholder={`Enter ${label}`}
              className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
            />
            <button
              type="button"
              onClick={() => addField(field, dayIndex)} // Add value to the specific field and day
              className="absolute right-3 top-[2.1rem] text-black-powder/70 cursor-pointer hover:text-opacity-80 rounded bg-kings-ransom/35 hover:bg-kings-ransom duration-300 transition-all"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {/* Render each value added to the field (e.g., transfer, activities, hotels) */}
            {fieldValue.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-x-1.5 py-1.5 px-3 pe-2 rounded text-xs font-medium bg-kings-ransom/35 text-black-powder"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeField(field, item, dayIndex)} // Remove the value from the field
                  className="shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-kings-ransom focus:outline-none focus:bg-kings-ransom focus:text-black-powder duration-300 transition-all cursor-pointer"
                >
                  <X size={12} />
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      </>
    );
  };

  // Render Day Fields Function
  const renderDayFields = (dayIndex) => (
    <div className="space-y-4" key={dayIndex}>
      <h2 className="text-lg font-medium text-black-powder">
        Day {dayIndex + 1}
      </h2>
      {renderField(dayIndex, "transfer", "Transfer")}
      {renderField(dayIndex, "activities", "Activities")}
      {renderField(dayIndex, "hotels", "Hotels")}
    </div>
  );

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
        <form onSubmit={handleSubmit}>
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
                                handleChangeTwo(
                                  "tour_id",
                                  tours?.id,
                                  "tour_name",
                                  tours?.tours_name
                                );

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
            <div className="space-y-4">
              {formDetails.summarized_days.map((_, index) =>
                renderDayFields(index)
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
        </form>
      </motion.div>
    </div>
  );
};

export default AddSummarizedTour;
