import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  LoaderCircle,
  MoveLeft,
  Plus,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ActivityFormValidation, ToursFormValidation } from "../../Utils/validation";
import CurrencyInput from "react-currency-input-field";
import moment from "moment";
import TimePicker from "react-time-picker";
const MAX_IMAGES = 15;
const MIN_IMAGES = 5;
const placesData = [
  { id: 1, place_name: "Mount Everest" },
  { id: 2, place_name: "Grand Canyon" },
  { id: 3, place_name: "Great Wall of China" },
  { id: 4, place_name: "Eiffel Tower" },
  { id: 5, place_name: "Machu Picchu" },
];
const weeksData = [
  { week_name: "Monday" },
  { week_name: "Tuesday" },
  { week_name: "Wednesday" },
  { week_name: "Thursday" },
  { week_name: "Fryday" },
  { week_name: "Saturday" },
  { week_name: "Sunday" },
];

const AddActivity = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const controls = useAnimation();

  const [formDetails, setFormDetails] = useState({
    activity_images: "",
    palce_id: "",
    activity_name: "",
    activity_title: "",
    description: "",
    price: "",
    dicout: "",
    working_days: [],
    opening_hours: "",
    closing_hours: "",
    activity_tags: [],
    activity_must_know: [],
    activity_highlight: [],
    activity_accessibility: [],
    activity_slug: "",
    coordinates: "",
  });

  const [inputValues, setInputValues] = useState({
    activity_tags: "",
    activity_must_know: "",
    activity_highlight: "",
    activity_accessibility: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenStart, setIsDropdownOpenStart] = useState(false);
  const [isDropdownOpenEnd, setIsDropdownOpenEnd] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [slug, setSlug] = useState("");
  const [value, setValue] = useState("");
  
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  //    const handleChange = (e) => {
  //      const { name, value } = e.target;
  //      const newData = { [name]: value };

  //      setFormDetails((prevDetails) => ({
  //        ...prevDetails,
  //        [name]: value,
  //      }));

  //      const { errors } = ToursFormValidation(newData);
  //      setErrorMessages({
  //        ...errorMessages,
  //        ...errors,
  //      });
  //    };

  const handleChange = (e, value) => {
    const name = e.target ? e.target.name : e.name; // For custom components
    const selectedValue = e.target ? e.target.value : value;

    const keys = name.split(".");
    let newValue = selectedValue;

    if (
      name === "duration_nights" ||
      name === "dicout" ||
      name === "price" ||
      keys[keys.length - 1] === "duration_days"
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

    const { errors } = ToursFormValidation({ [name]: newValue });
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name],
    }));
  };

  const handleChangeTwo = (name, value) => {
    const newData = { [name]: value };
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    const { errors } = ToursFormValidation(newData);
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
  };

  const handleValueChange = (value) => {
    setValue(value || "");
    const e = {
      target: {
        name: "price",
        value: value === undefined ? "" : value,
      },
    };
    handleChange(e);
  };
  // Add Field Function
  const addField = (field) => {
    const inputValue = inputValues[field]?.trim(); // Ensure safe access
    if (inputValue && !formDetails[field].includes(inputValue)) {
      const updatedValues = [...formDetails[field], inputValue];
      setFormDetails({ ...formDetails, [field]: updatedValues });
      setInputValues({ ...inputValues, [field]: "" });

      if (typeof handleChange === "function") {
        handleChange({
          target: {
            value: updatedValues,
            name: field,
          },
        });
      }
    }
  };

  // Remove Field Function
  const removeField = (field, valueToRemove) => {
    const updatedValues = formDetails[field].filter(
      (item) => item !== valueToRemove
    );
    setFormDetails({ ...formDetails, [field]: updatedValues });

    if (typeof handleChange === "function") {
      handleChange({
        target: {
          value: updatedValues,
          name: field,
        },
      });
    }
  };

  const handleToursNameChange = (e) => {
    const name = e.target.value;
    const slug = generateSlug(name); // Generate slug from the name
    setActivityName(name);
    setSlug(slug); // Set the slug

    const bcv = {
      target: {
        value: name,
        name: "activity_name",
      },
    };

    const abc = {
      target: {
        value: slug, // Use the generated slug here
        name: "activity_slug",
      },
    };

    handleChange(bcv);
    //  handleChange(abc);
  };
  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const totalImages = [...images, ...selectedFiles];
    if (images.length + selectedFiles.length > MAX_IMAGES) {
      toast.error(`Max add tours ${MAX_IMAGES} images.`);
      setImages((prev) => [
        ...prev,
        ...selectedFiles.slice(0, MAX_IMAGES - prev.length),
      ]);
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      ["activity_images"]: totalImages.slice(0, 4),
    }));
    validateImages([...images, ...selectedFiles]);
  };

  const validateImages = (currentImages) => {
    if (currentImages.length < MIN_IMAGES) {
      setErrorMessages({
        ...errorMessages,
        images: `Min add tours ${MIN_IMAGES} images.`,
      });
    } else {
      setErrorMessages({
        ...errorMessages,
        images: "",
      });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    validateImages(updatedImages);
  };

  // Function to handle adding/removing days
  const handleChangeValue = (key, value) => {
   
    const newData = { [key]: value };

    setFormDetails((prev) => {
      const updatedDays = prev[key].includes(value)
        ? prev[key].filter((day) => day !== value) // Remove if already selected
        : [...prev[key], value]; // Add if not selected

      return { ...prev, [key]: updatedDays };
    });
     setIsDropdownOpenStart(false);
    const { errors } = ToursFormValidation(newData);
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
  };

  // Function to remove a tag
  const removeTag = (tag) => {
    setFormDetails((prev) => {
      const updatedDays = prev.working_days.filter((day) => day !== tag);
      return { ...prev, working_days: updatedDays };
    });
  };

   
const handleOpeningHoursChange = (time) => {
  const [hours, period] = (formDetails?.opening_hours || "00:00 AM").split(" ");
  setFormDetails((prevDetails) => ({
    ...prevDetails,
    opening_hours: `${time} ${period || "AM"}`,
  }));
};

const handleOpeningPeriodChange = (period) => {
  const [time] = (formDetails?.opening_hours || "00:00 AM").split(" ");
  setFormDetails((prevDetails) => ({
    ...prevDetails,
    opening_hours: `${time} ${period}`,
  }));
};

const handleClosingHoursChange = (time) => {
  const [hours, period] = (formDetails?.closing_hours || "00:00 AM").split(" ");
  setFormDetails((prevDetails) => ({
    ...prevDetails,
    closing_hours: `${time} ${period || "AM"}`,
  }));
};

const handleClosingPeriodChange = (period) => {
  const [time] = (formDetails?.closing_hours || "00:00 AM").split(" ");
  setFormDetails((prevDetails) => ({
    ...prevDetails,
    closing_hours: `${time} ${period}`,
  }));
};



  const handleBack = () => {
    navigate("/activities");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = ToursFormValidation(formDetails);
    let imageError;
    if (images.length > MAX_IMAGES) {
      toast.error(`Max add tours ${MAX_IMAGES} images.`);
      setImages((prev) => [...prev, ...selectedFiles.slice(0, 4)]);
      imageError = "";
    } else if (images.length < MIN_IMAGES) {
      imageError = `Min add product ${MIN_IMAGES} images.`;
    }
    setErrorMessages({
      ...errorMessages,
      ...errors,
      images: imageError,
    });
    if (imageError) return;
    if (!isValid) return;
    setLoading(true);

    //   try {
    //     const keyMapping = {
    //       designer_service_name: "service_name",
    //       designer_service_category: "service_category",
    //       designer_service_description: "description",
    //       estimated_delivery_time: "turnaround_time",
    //       additional_services: "after_sale_services",
    //     };
    //     const formData = new FormData();

    //     Object.keys(addDesignerServiceDetail).forEach((key) => {
    //       const value = addDesignerServiceDetail[key];
    //       if (key === "designer_service_images" && value) {
    //         if (Array.isArray(value)) {
    //           value.forEach((image) => {
    //             if (image instanceof File) {
    //               formData.append("portfolio", image);
    //             } else {
    //               formData.append("old_image", image);
    //             }
    //           });
    //         } else {
    //           formData.append("portfolio", value);
    //         }
    //       } else if (keyMapping[key]) {
    //         formData.append(keyMapping[key], value);
    //       } else {
    //         formData.append(key, value);
    //       }
    //     });

    //     const response = await addDesignerServicesService(formData);
    //     if (response?.status === 200) {
    //       setAddServiceId(response?.data?.data?._id);
    //       setIsCustomerFormOpen(true);
    //       toast.success(response?.data?.message);
    //     } else {
    //       toast.error(response?.data?.message);
    //     }
    //   } catch (error) {
    //     toast.error(t("please_try_again"));
    //   } finally {
    //     setLoading(false);
    //   }
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

  const renderField = (field, label) => (
    <div className="mb-4">
      <div className="relative">
        <label className="block text-sm font-medium text-black-powder mb-1">
          {label}
        </label>
        <input
          type="text"
          value={inputValues[field]}
          onChange={(e) =>
            setInputValues({ ...inputValues, [field]: e.target.value })
          }
          placeholder={`Enter ${label}`}
          className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
        />
        <button
          type="button"
          onClick={() => addField(field)}
          className="absolute right-3 top-[2.1rem] text-black-powder/70 cursor-pointer hover:text-opacity-80 rounded bg-kings-ransom/35 hover:bg-kings-ransom duration-300 transition-all"
        >
          <Plus size={20} />
        </button>
      </div>
      {errorMessages?.[field] && (
        <span className="label-text-alt text-red-500 text-xs">
          {errorMessages?.[field]}
        </span>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        <AnimatePresence>
          {formDetails[field].map((item) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-x-1.5 py-1.5 px-3 pe-2 rounded text-xs font-medium bg-kings-ransom/35 text-black-powder"
            >
              {item}
              <button
                type="button"
                onClick={() => removeField(field, item)}
                className="shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-kings-ransom focus:outline-none focus:bg-kings-ransom focus:text-black-powder duration-300 transition-all cursor-pointer"
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
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
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <button
              className="hidden bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm md:flex items-center gap-2"
              onClick={handleBack}
            >
              <MoveLeft size={16} />
            </button>
          </div>
          <div className="space-y-4">
            <div class="w-full  ">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Activities Image
              </label>
              <div className=" py-6">
                <div className="grid grid-cols-4 gap-4  w-full max-w-4xl ">
                  {/* Add Image Box */}
                  {images.length < MAX_IMAGES && (
                    <motion.div
                      className="border-dashed border-2 border-kings-ransom rounded-lg flex items-center justify-center bg-kings-ransom/10  hover:bg-kings-ransom/20 cursor-pointer w-[10rem] h-[10rem] text-black-powder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <div className="flex items-center justify-center">
                          <div className="">
                            <div className="flex items-center justify-center">
                              <Plus size={65} />
                            </div>
                            <p>Select images</p>
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          multiple
                          onChange={handleImageUpload}
                        />
                      </label>
                    </motion.div>
                  )}

                  {/* Render Uploaded Images */}
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      className="relative border border-kings-ransom rounded-lg overflow-hidden w-[10rem] h-[10rem]"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Uploaded ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <button
                          size="sm"
                          variant="outlined"
                          className=" flex items-center justify-center text-black-powder border-kings-ransom bg-kings-ransom/35 hover:bg-dark-olive-green hover:text-apple-cucumber duration-300 transition-all rounded"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Error Messages */}
                {errorMessages?.images && (
                  <div className=" mt-4">
                    <span className="text-red-500 text-sm">
                      {errorMessages.images}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Place
              </label>
              <div className="relative  dropdown-container w-full">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between px-3 py-2 border border-kings-ransom text-black-powder font-normal text-sm  transition w-full rounded"
                >
                  {formDetails?.palce_id
                    ? formDetails?.palce_id
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
                {errorMessages?.palce_id && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errorMessages?.palce_id}
                  </span>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      className={`absolute right-0 mt-2 bg-primary border border-black-powder/10 rounded shadow-lg overflow-hidden text-black-powder text-sm w-full max-h-max overflow-y-auto bg-kings-ransom`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {placesData?.length > 0 ? (
                        placesData.map((place) => (
                          <motion.li
                            key={place?.id}
                            onClick={() => {
                              handleChangeTwo("palce_id", place?.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`px-6 py-2 ${
                              formDetails?.palce_id === place?.id
                                ? "bg-apple-cucumber/70"
                                : "bg-kings-ransom"
                            } hover:bg-apple-cucumber/70 cursor-pointer`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {place?.place_name}
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
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Activity Name
              </label>
              <input
                type="text"
                value={activityName}
                onChange={handleToursNameChange}
                placeholder="Enter activity Name"
                className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
              />
              {errorMessages?.activity_name && (
                <span className="label-text-alt text-red-500 text-xs">
                  {errorMessages?.activity_name}
                </span>
              )}
            </div>
            <div className="">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                readOnly
                className="w-full px-3 py-2 border rounded border-kings-ransom text-gray-700 cursor-not-allowed bg-transparent text-sm font-normal"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Activity title
              </label>
              <input
                type="text"
                name="activity_title"
                value={formDetails?.activity_title}
                onChange={handleChange}
                placeholder="Enter activity title"
                className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
              />
              {errorMessages?.activity_title && (
                <span className="label-text-alt text-red-500 text-xs">
                  {errorMessages?.activity_title}
                </span>
              )}
            </div>
            <div className="">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Activity Price
              </label>
              <CurrencyInput
                id="price"
                name="price"
                value={value}
                allowDecimals={true}
                allowNegativeValue={false}
                decimalsLimit={2}
                prefix="₹"
                decimalSeparator="."
                groupSeparator=","
                placeholder="Price"
                style={{
                  width: "100%",
                  background: "none",
                  // color: "#33372C",
                  fontSize: "8px",
                  // fontWeight:500,
                  outline: "none",
                  border: "1px solid #B59F78",
                  padding: "12px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  borderRadius: "5px",
                  fontSize: "0.9rem",
                }}
                className="placeholder-custom text-secondary myClass"
                onValueChange={handleValueChange}
              />
              {errorMessages?.price && (
                <span className="label-text-alt text-red-500 text-xs">
                  {errorMessages?.price}
                </span>
              )}
            </div>
            <div className="">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Activity Dicout
              </label>
              <input
                type="text"
                name="dicout"
                value={formDetails?.dicout}
                onChange={handleChange}
                placeholder="Enter dicout"
                className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
              />
              {errorMessages?.dicout && (
                <span className="label-text-alt text-red-500 text-xs">
                  {errorMessages?.dicout}
                </span>
              )}
            </div>
            <div className="w-full">
              <div className="flex items-center gap-4 w-full">
                {/* Opening Hours */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-black-powder mb-1">
                    Opening Hours
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      name="opening_hours"
                      step="60"
                      onChange={(e) => handleOpeningHoursChange(e.target.value)}
                      value={formDetails?.opening_hours.split(" ")[0] || ""}
                      className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C]"
                    />
                    <div className="relative ">
                      <select
                        onChange={(e) =>
                          handleOpeningPeriodChange(e.target.value, "opening")
                        }
                        value={formDetails?.opening_hours.split(" ")[1] || "AM"}
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
                    </div>
                  </div>
                  {errorMessages?.opening_hours && (
                    <span className="label-text-alt text-red-500">
                      {errorMessages?.opening_hours}
                    </span>
                  )}
                </div>

                {/* Closing Hours */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-black-powder mb-1">
                    Closing Hours
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      name="closing_hours"
                      step="60"
                      min={formDetails?.opening_hours.split(" ")[0] || "00:00"}
                      onChange={(e) => handleClosingHoursChange(e.target.value)}
                      value={formDetails?.closing_hours.split(" ")[0] || ""}
                      className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C]"
                    />
                    <div className="relative ">
                      <select
                        onChange={(e) =>
                          handleClosingPeriodChange(e.target.value, "closing")
                        }
                        value={formDetails?.closing_hours.split(" ")[1] || "AM"}
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
                    </div>
                  </div>
                  {errorMessages?.closing_hours && (
                    <span className="label-text-alt text-red-500">
                      {errorMessages?.closing_hours}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Working Days
              </label>
              <div className="relative dropdown-container w-full">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpenStart(!isDropdownOpenStart)}
                  className="flex items-center justify-between px-3 py-2 border border-kings-ransom text-black-powder font-normal text-sm transition w-full rounded"
                >
                  Select week days
                  <motion.span
                    className="ml-2"
                    animate={{ rotate: isDropdownOpenStart ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                {errorMessages?.working_days && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errorMessages?.working_days}
                  </span>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpenStart && (
                    <motion.ul
                      className="absolute right-0 mt-2 bg-primary border border-black-powder/10 rounded shadow-lg overflow-hidden text-black-powder text-sm w-full max-h-max overflow-y-auto bg-kings-ransom z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {weeksData?.length > 0 ? (
                        weeksData.map((week, index) => (
                          <motion.li
                            key={index}
                            onClick={() =>
                              handleChangeValue("working_days", week.week_name)
                            }
                            className={`px-6 py-2 ${
                              formDetails.working_days.includes(week.week_name)
                                ? "bg-apple-cucumber/70"
                                : "bg-kings-ransom"
                            } hover:bg-apple-cucumber/70 cursor-pointer`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {week.week_name}
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
                          Weeks not available
                        </motion.li>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                <AnimatePresence>
                  {formDetails.working_days.map((week, index) => (
                    <motion.span
                      key={week}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-x-1.5 py-1.5 px-3 pe-2 rounded text-xs font-medium bg-kings-ransom/35 text-black-powder"
                    >
                      {week}
                      <button
                        type="button"
                        onClick={() => removeTag(week)}
                        className="shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-kings-ransom focus:outline-none focus:bg-kings-ransom focus:text-black-powder duration-300 transition-all cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            {renderField("activity_tags", "Activity Tags")}
            {renderField("activity_must_know", "Activity Must Know")}
            {renderField("activity_highlight", "Activity Highlight")}
            {renderField("activity_accessibility", "Activity Accessibility")}
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

export default AddActivity;
