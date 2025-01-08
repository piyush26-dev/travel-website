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
import CurrencyInput from "react-currency-input-field";
import moment from "moment";
import TimePicker from "react-time-picker";
import { AttractionValidation } from "../../Utils/validation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const placesData = [
  { id: 1, place_name: "Mount Everest" },
  { id: 2, place_name: "Grand Canyon" },
  { id: 3, place_name: "Great Wall of China" },
  { id: 4, place_name: "Eiffel Tower" },
  { id: 5, place_name: "Machu Picchu" },
];

const AddAttraction = () => {
  const navigate = useNavigate();

  const controls = useAnimation();
  const [formDetails, setFormDetails] = useState({
    attraction_image: "",
    palce_id: "",
    attraction_name: "",
    attraction_slug: "",
    location: "",
    overview: "",
    day_wise_timing: [
      { day: "Sunday", start_timing: "", end_timing: "" },
      { day: "Monday", start_timing: "", end_timing: "" },
      { day: "Tuesday", start_timing: "", end_timing: "" },
      { day: "Wednesday", start_timing: "", end_timing: "" },
      { day: "Thursday", start_timing: "", end_timing: "" },
      { day: "Friday", start_timing: "", end_timing: "" },
      { day: "Saturday", start_timing: "", end_timing: "" },
    ],
    point_of_intrastate: [],
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [attractionName, setAttractionName] = useState("");
  const [slug, setSlug] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState();
  const [proImgUrl, setProImgUrl] = useState(null);

  const [intrastateImgURL, setIntrastateImgURL] = useState(null);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // Update proImgUrl when proImg changes
  useEffect(() => {
    if (formDetails?.attraction_image instanceof File) {
      // Create a URL for the proImg File
      const imgURL = URL.createObjectURL(formDetails?.attraction_image);
      setProImgUrl(imgURL);
    } else {
      // If proImg is not a File, set proImgUrl to null
      setProImgUrl(null);
    }
  }, [formDetails?.attraction_image]);

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

  const handleAddPoint = () => {
    setFormDetails((prev) => ({
      ...prev,
      point_of_intrastate: [
        ...prev.point_of_intrastate,
        { image: null, title: "", description: "" },
      ],
    }));
  };

  const isAddPointDisabled = () => {
    return formDetails.point_of_intrastate.some(
      (point) =>
        !point.image || !point.title.trim() || !point.description.trim()
    );
  };


  const handleTimingChange = (index, field, value) => {
    setFormDetails((prevDetails) => {
      const updatedTimings = prevDetails.day_wise_timing.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      });
      return { ...prevDetails, day_wise_timing: updatedTimings };
    });
  };

  const handlePointChange = (index, key, value) => {
    const updatedPoints = formDetails.point_of_intrastate.map((item, idx) =>
      idx === index ? { ...item, [key]: value } : item
    );
    setFormDetails({ ...formDetails, point_of_intrastate: updatedPoints });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { [name]: value };

    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    const { errors } = AttractionValidation(newData);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
  };

  const handleChangeTwo = (name, value) => {
    const newData = { [name]: value };
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    const { errors } = AttractionValidation(newData);
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
  };

  const handleAttractionNameChange = (e) => {
    const name = e.target.value;
    const slug = generateSlug(name); // Generate slug from the name
    setAttractionName(name);
    setSlug(slug); // Set the slug

    const bcv = {
      target: {
        value: name,
        name: "attraction_name",
      },
    };

    const abc = {
      target: {
        value: slug, // Use the generated slug here
        name: "attraction_slug",
      },
    };

    handleChange(bcv);
    //  handleChange(abc);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileUrl(URL.createObjectURL(file));
      setSelectedFile(file);

      // Update the form details
      setFormDetails((prevDetails) => ({
        ...prevDetails,
        attraction_image: file,
      }));

      const xyz = {
        target: {
          value: file,
          name: "attraction_image",
        },
      };
      handleChange(xyz);
    }
  };

  const removeImage = () => {
    setProfileUrl(null);

    // Update the form details to remove the image
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      attraction_image: null,
    }));

    const xyz = {
      target: {
        value: null,
        name: "attraction_image",
      },
    };
    handleChange(xyz);
  };

  const handleBack = () => {
    navigate("/attractions-list");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = AttractionValidation(formDetails);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
    if (!isValid) return;
    setLoading(true);

    // const { attraction_image, full_name, phone_no } = formDetails;
    // const newData = new FormData();
    // newData.append("profile", attraction_image);
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
          <div className="flex items-center mb-4">
            <button
              className="hidden bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm md:flex items-center gap-2"
              onClick={handleBack}
            >
              <MoveLeft size={16} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className=" space-y-4">
              <div className="w-full  ">
                <label className="block text-sm font-medium text-black-powder mb-2">
                  Attraction Image
                </label>
                <div>
                  {!profileUrl ? (
                    <motion.div
                      className="border-dashed border-2 border-kings-ransom rounded-lg flex items-center justify-center bg-secondary/10 hover:bg-secondary/20 cursor-pointer w-[10rem] h-[10rem]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <div className="flex items-center justify-center">
                          <div className="text-black-powder/70">
                            <div className="flex items-center justify-center">
                              <Plus size={65} />
                            </div>
                            <p className="">Select Images</p>
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </motion.div>
                  ) : (
                    <div className="relative w-[10rem] h-[10rem]">
                      <img
                        src={profileUrl}
                        alt="Selected"
                        className="w-full h-full object-fill rounded-lg border border-kings-ransom"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-1 right-1 bg-kings-ransom/35 text-black-powder rounded p-1 shadow hover:bg-kings-ransom hover:text-black-powde transition-all duration-300"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  )}
                </div>
                {errorMessages?.attraction_image && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errorMessages?.attraction_image}
                  </span>
                )}
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
                  Attraction Name
                </label>
                <input
                  type="text"
                  value={attractionName}
                  onChange={handleAttractionNameChange}
                  placeholder="Enter Attraction Name"
                  className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                />
                {errorMessages?.attraction_name && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errorMessages?.attraction_name}
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
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formDetails?.location}
                  onChange={handleChange}
                  placeholder="Enter activity title"
                  className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                />
                {errorMessages?.location && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errorMessages?.location}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-black-powder mb-1">
                  Overview
                </label>
                <ReactQuill
                  theme="snow"
                  value={formDetails.overview}
                  onChange={(content) =>
                    setFormDetails({ ...formDetails, overview: content })
                  }
                  className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C]"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-black-powder mb-4">
                  Day Wise Timings
                </label>
                {formDetails.day_wise_timing.map((item, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">
                      {item.day}
                    </h4>
                    <div className="flex gap-4">
                      {/* Start Time */}
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-black-powder mb-1">
                          Start Time
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={item.start_timing.split(" ")[0] || ""}
                            onChange={(e) =>
                              handleTimingChange(
                                index,
                                "start_timing",
                                `${e.target.value} ${
                                  item.start_timing.split(" ")[1] || "AM"
                                }`
                              )
                            }
                            className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C]"
                          />
                          <div className="relative ">
                            <select
                              value={item.start_timing.split(" ")[1] || "AM"}
                              onChange={(e) =>
                                handleTimingChange(
                                  index,
                                  "start_timing",
                                  `${
                                    item.start_timing.split(" ")[0] || "00:00"
                                  } ${e.target.value}`
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
                          </div>
                        </div>
                      </div>

                      {/* End Time */}
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-black-powder mb-1">
                          End Time
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={item.end_timing.split(" ")[0] || ""}
                            onChange={(e) =>
                              handleTimingChange(
                                index,
                                "end_timing",
                                `${e.target.value} ${
                                  item.end_timing.split(" ")[1] || "AM"
                                }`
                              )
                            }
                            className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C]"
                          />
                          <div className="relative ">
                            <select
                              value={item.end_timing.split(" ")[1] || "AM"}
                              onChange={(e) =>
                                handleTimingChange(
                                  index,
                                  "end_timing",
                                  `${
                                    item.end_timing.split(" ")[0] || "00:00"
                                  } ${e.target.value}`
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className=" space-y-4">
                <div className="">
                  <label className="block text-sm font-medium text-black-powder mb-1">
                    Points of Intrastate
                  </label>
                  {formDetails.point_of_intrastate.map((point, index) => (
                    <div
                      key={index}
                      className="w-full px-3 py-2 border border-dashed border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C] space-y-4 mb-4"
                    >
                      <div>
                        {!point.image ? (
                          <motion.div
                            className="border-dashed border-2 border-kings-ransom rounded-lg flex items-center justify-center bg-secondary/10 hover:bg-secondary/20 cursor-pointer w-[10rem] h-[10rem]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                              <div className="flex items-center justify-center">
                                <div className="text-black-powder/70">
                                  <div className="flex items-center justify-center">
                                    <Plus size={65} />
                                  </div>
                                  <p className="">Select Image</p>
                                </div>
                              </div>
                              <input
                                className="hidden"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];

                                  handlePointChange(
                                    index,
                                    "image",
                                    file || null
                                  );
                                }}
                              />
                            </label>
                          </motion.div>
                        ) : (
                          <div className="relative w-[10rem] h-[10rem]">
                            <img
                              src={URL.createObjectURL(point.image)}
                              alt="Selected"
                              className="w-full h-full object-fill rounded-lg border border-kings-ransom"
                            />
                            <button
                              onClick={() => {
                                handlePointChange(index, "image", null); // Optionally reset the file
                              }}
                              className="absolute top-1 right-1 bg-kings-ransom/35 text-black-powder rounded p-1 shadow hover:bg-kings-ransom hover:text-black-powde transition-all duration-300"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-black-powder mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={point.title}
                          onChange={(e) =>
                            handlePointChange(index, "title", e.target.value)
                          }
                          placeholder="Title"
                          className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C]"
                        />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-black-powder mb-1">
                          Description
                        </label>
                        <textarea
                          value={point.description}
                          onChange={(e) =>
                            handlePointChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Description"
                          className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-[#33372C]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    className={`  px-4 py-2 rounded  transition-all duration-300 font-medium text-sm flex items-center gap-2 ${
                      isAddPointDisabled()
                        ? "bg-kings-ransom text-black-powder cursor-not-allowed"
                        : "bg-black-powder text-apple-cucumber hover:bg-kings-ransom hover:text-black-powder"
                    }`}
                    onClick={handleAddPoint}
                    disabled={isAddPointDisabled()}
                  >
                    <Plus size={16} />
                    Point of Intrastate
                  </button>
                </div>
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
    </>
  );
};

export default AddAttraction;
