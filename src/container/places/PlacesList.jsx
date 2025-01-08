import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  Pencil,
  Plus,
  TentTree,
  TramFront,
  Trash2,
  X,
} from "lucide-react";
import CountUp from "react-countup";
import BurjKhalifaIcon from "../../assets/burj-khalifa.png";
import AbuDhabiIcon from "../../assets/abu-dhabi.png";
import JaipurIcon from "../../assets/jaipur.png";
import EiffelTowerIcon from "../../assets/eiffel-tower.png";
import BigBenIcon from "../../assets/big-ben.png";
import StatueOfLibertyIcon from "../../assets/statue-of-liberty.png";
import ColosseumIcon from "../../assets/colosseum.png";
import TokyoTowerIcon from "../../assets/tokyo-tower.png";
import BuildingIcon from "../../assets/building.png";
import BaliIcon from "../../assets/bali.png";
import BlueMosqueIcon from "../../assets/blue-mosque.png";
import CairoIcon from "../../assets/cairo.png";
import toast from "react-hot-toast";

const placesData = [
  {
    id: 1,
    name: "Dubai",
    icon: BurjKhalifaIcon,
    activityCount: 1200,
    tourCount: 800,
  },
  {
    id: 2,
    name: "Abu Dhabi",
    icon: AbuDhabiIcon,
    activityCount: 980,
    tourCount: 670,
  },
  {
    id: 3,
    name: "Jaipur",
    icon: JaipurIcon,
    activityCount: 700,
    tourCount: 450,
  },
  {
    id: 4,
    name: "Paris",
    icon: EiffelTowerIcon,
    activityCount: 1500,
    tourCount: 1100,
  },
  {
    id: 5,
    name: "London",
    icon: BigBenIcon,
    activityCount: 1400,
    tourCount: 900,
  },
  {
    id: 6,
    name: "New York",
    icon: StatueOfLibertyIcon,
    activityCount: 1800,
    tourCount: 1300,
  },
  {
    id: 7,
    name: "Rome",
    icon: ColosseumIcon,
    activityCount: 1100,
    tourCount: 870,
  },
  {
    id: 8,
    name: "Tokyo",
    icon: TokyoTowerIcon,
    activityCount: 1600,
    tourCount: 1200,
  },
  {
    id: 9,
    name: "Sydney",
    icon: BuildingIcon,
    activityCount: 1000,
    tourCount: 740,
  },
  {
    id: 10,
    name: "Bali",
    icon: BaliIcon,
    activityCount: 900,
    tourCount: 600,
  },
  {
    id: 11,
    name: "Istanbul",
    icon: BlueMosqueIcon,
    activityCount: 1300,
    tourCount: 1000,
  },
  {
    id: 12,
    name: "Cairo",
    icon: CairoIcon,
    activityCount: 1100,
    tourCount: 850,
  },
  {
    id: 14,
    name: "Istanbul",
    icon: BlueMosqueIcon,
    activityCount: 1300,
    tourCount: 1000,
  },
  {
    id: 15,
    name: "Cairo",
    icon: CairoIcon,
    activityCount: 1100,
    tourCount: 850,
  },
];

const PlacesList = () => {
  const menuRef = useRef(null);
  const [formDetails, setFormDetails] = useState({
    place_icon: "",
    place_image: "",
    place_name: "",
    place_slug: "",
    place_tags: [],
  });

  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, serIsEditModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [profileUrl, setProfileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState();
  const [proImgUrl, setProImgUrl] = useState(null);
  const [placeUrl, setPlaceUrl] = useState("");
  const [selectedPlaceFile, setSelectedPlaceFile] = useState(null);
  const [placeImgUrl, setPlaceImgUrl] = useState(null);
  const [isEditable, setIsEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [placeName, setPlaceName] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const itemsPerPage = 12;
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };
  // Calculate total pages
  const totalPages = Math.ceil(placesData.length / itemsPerPage);

  // Get the current page data
  const currentData = placesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 }, // Initial state when not in view
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Reduced duration for faster animations
        type: "easeInOut", // Simplified easing for smoother transitions
      },
    },
  };

  const handleEditModalOpen = () => {
    serIsEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    serIsEditModalOpen(false);
  };

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); // Toggle the menu
  };

  const handleMenuClose = () => {
    setOpenMenuId(null); // Close the menu
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null); // Close menu if clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // Update proImgUrl when proImg changes
  useEffect(() => {
    if (formDetails?.place_image instanceof File) {
      // Create a URL for the proImg File
      const imgURL = URL.createObjectURL(formDetails?.place_image);
      setProImgUrl(imgURL);
    } else {
      // If proImg is not a File, set proImgUrl to null
      setProImgUrl(null);
    }
  }, [formDetails?.place_image]);

  // Update placeImgUrl when placeImg changes
  useEffect(() => {
    if (formDetails?.place_icon instanceof File) {
      // Create a URL for the proImg File
      const imgURL = URL.createObjectURL(formDetails?.place_icon);
      setPlaceImgUrl(imgURL);
    } else {
      // If proImg is not a File, set proImgUrl to null
      setPlaceImgUrl(null);
    }
  }, [formDetails?.place_icon]);

  const handlePlaceNameChange = (e) => {
    const name = e.target.value;
    const slug = generateSlug(name); // Generate slug from the name
    setPlaceName(name);
    setSlug(slug); // Set the slug

    const bcv = {
      target: {
        value: name,
        name: "place_name",
      },
    };

    const abc = {
      target: {
        value: slug, // Use the generated slug here
        name: "place_slug",
      },
    };

    handleChange(bcv);
    //  handleChange(abc);
  };

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      const updatedTags = [...tags, inputValue.trim()]; // Add new tag to tags
      setTags(updatedTags); // Update the state
      setInputValue("");

      const xyz = {
        target: {
          value: updatedTags, // Set updated tags array here
          name: "place_tags",
        },
      };

      handleChange(xyz); // Call handleChange with updated tags
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove); // Remove the tag
    setTags(updatedTags); // Update the state

    const xyz = {
      target: {
        value: updatedTags, // Set updated tags array after removal
        name: "place_tags",
      },
    };

    handleChange(xyz); // Call handleChange with updated tags
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { [name]: value };

    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    const { errors } = PlaceFormValidation(newData);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
  };

  // File change handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileUrl(URL.createObjectURL(file));
      setSelectedFile(file);

      // Update the form details
      setFormDetails((prevDetails) => ({
        ...prevDetails,
        place_image: file,
      }));

      const xyz = {
        target: {
          value: file,
          name: "place_image",
        },
      };
      handleChange(xyz);
    }
  };

  const handlePlaceImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlaceUrl(URL.createObjectURL(file));
      setSelectedPlaceFile(file);

      // Update the form details
      setFormDetails((prevDetails) => ({
        ...prevDetails,
        place_icon: file,
      }));

      const xyz = {
        target: {
          value: file,
          name: "place_icon",
        },
      };
      handleChange(xyz);
    }
  };

  const removePlaceImage = () => {
    setPlaceUrl(null);

    // Update the form details to remove the image
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      place_icon: null,
    }));

    const xyz = {
      target: {
        value: null,
        name: "place_icon",
      },
    };
    handleChange(xyz);
  };

  const handleEditOn = () => {
    setIsLoading(true); // Start loading
    setTimeout(() => {
      setIsEditable(false); // End loading and toggle editable state
      setIsLoading(false);
      toast.success("Edit this tour"); // Trigger success toast
    }, 2000); // 2 minutes delay
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = PlaceFormValidation(formDetails);
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

  const removeImage = () => {
    setProfileUrl(null);

    // Update the form details to remove the image
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      place_image: null,
    }));

    const xyz = {
      target: {
        value: null,
        name: "place_image",
      },
    };
    handleChange(xyz);
  };

  // if (!isEditModalOpen) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentData.map((data, index) => (
          <motion.div
            key={data.id} // Ensure a consistent and unique key
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true }} // Ensures animation runs only once when in view
            className="bg-kings-ransom/35 border border-black-powder/5 rounded shadow-lg transform transition-all hover:shadow-xl cursor-pointer relative"
          >
            <div
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up
                handleMenuToggle(data.id); // Toggle menu for the clicked card
              }}
              className="bg-apple-cucumber/60 absolute top-2 right-2 rounded-full shadow-md border border-black-powder/5 text-black-powder h-[1.5rem] w-[1.5rem] flex items-center justify-center hover:bg-kings-ransom/70 duration-300 transition-all"
            >
              <EllipsisVertical size={16} />
            </div>

            {/* Menu for the current card */}
            {openMenuId === data.id && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-apple-cucumber absolute top-3 right-10 bg- shadow-md rounded border border-black-powder/5 w-28 z-10 overflow-hidden text-black-powder"
              >
                <ul className="space-y-1 p-2">
                  <li
                    className="cursor-pointer hover:bg-kings-ransom flex items-center gap-2 text-xs py-1 px-2 rounded bg-kings-ransom/35"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event from bubbling up
                      handleEditModalOpen(data.id);
                      handleMenuClose();
                    }}
                  >
                    <Eye size={14} />
                    <span className="text-xs font-medium">View</span>
                  </li>
                  {/* <li
                    className="cursor-pointer hover:bg-kings-ransom flex items-center gap-2 text-xs py-1 px-2 rounded bg-kings-ransom/35"
                    onClick={() => handleMenuClose()}
                  >
                    <Pencil size={14} />
                    <span className="text-xs font-medium">Edit</span>
                  </li> */}
                  <li
                    className="cursor-pointer hover:bg-kings-ransom flex items-center gap-2 text-xs py-1 px-2 rounded bg-kings-ransom/35"
                    onClick={() => handleMenuClose()}
                  >
                    <Trash2 size={14} />
                    <span className="text-xs font-medium">Delete</span>
                  </li>
                </ul>
              </motion.div>
            )}

            <div className="flex items-center gap-4 p-4">
              {/* Icon */}
              <div className="bg-apple-cucumber/60 p-3 rounded text-black-powder/70">
                <img src={data.icon} className="h-10 w-10" />
              </div>

              {/* Place Details */}
              <div className="space-y-3">
                {/* Title */}
                <div>
                  <h2 className="text-lg font-bold text-black-powder">
                    {data.name}
                  </h2>
                </div>

                <div className="flex items-center md:gap-8 gap-4 w-full">
                  <div className="flex items-center gap-2 text-black-powder">
                    <TramFront size={18} />{" "}
                    <span className="text-xs font-medium">:</span>
                    <span className="text-xs font-medium">
                      <CountUp end={data.tourCount} duration={5} />
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-black-powder">
                    <TentTree size={18} />{" "}
                    <span className="text-xs font-medium">:</span>
                    <span className="text-xs font-medium">
                      <CountUp end={data.activityCount} duration={5} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex md:justify-end justify-center">
        {/* Pagination */}
        <div className="flex items-center justify-center space-x-3 mt-6 text-sm font-medium">
          <button
            className={`${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-black-powder"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${
                  currentPage === page
                    ? "bg-black-powder text-apple-cucumber"
                    : "text-black-powder  bg-black-powder/5 hover:bg-black-powder/10"
                } w-6 h-6 flex items-center justify-center rounded transition-colors duration-300`}
              >
                {page}
              </button>
            )
          )}

          {/* Next button */}
          <button
            className={`${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-black-powder"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {/* edit palce modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.form
            className="bg-apple-cucumber p-6 rounded-lg shadow-lg w-[35rem] relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black-powder">
                Add Places
              </h2>
              <div className="flex items-center gap-4">
                {!isEditable ? (
                  <>
                    <button
                      className="hidden bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm md:flex items-center gap-2"
                      onClick={() => setIsEditable(!isEditable)}
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="hidden bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm md:flex items-center gap-2"
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

            <div className=" space-y-4">
              <div className="flex items-center">
                {" "}
                <div className="w-full  ">
                  <label className="block text-sm font-medium text-black-powder mb-1">
                    Place Image
                  </label>
                  <div>
                    {!placeUrl ? (
                      <motion.div
                        className={`border-dashed border-2 ${
                          isEditable
                            ? "border-gray-300 cursor-not-allowed"
                            : "border-kings-ransom"
                        } rounded-lg flex items-center justify-center ${
                          isEditable
                            ? "bg-gray-200"
                            : "bg-kings-ransom/10 hover:bg-kings-ransom/20"
                        }  w-[6rem] h-[6rem] text-black-powder transition-all duration-300`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <label
                          className={`flex flex-col items-center justify-center w-full h-full ${
                            isEditable ? "cursor-not-allowed" : "cursor-pointer"
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <div className="text-black-powder/70">
                              <div className="flex items-center justify-center">
                                <Plus size={25} />
                              </div>
                              <p
                                className={`${
                                  isEditable ? "text-gray-400" : ""
                                } text-xs font-medium`}
                              >
                                {isEditable ? "Cannot select" : "Select image"}
                              </p>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePlaceImageUpload}
                            disabled={isEditable}
                          />
                        </label>
                      </motion.div>
                    ) : (
                      <div className="relative w-[6rem] h-[6rem]">
                        <img
                          src={placeUrl}
                          alt="Selected"
                          className="w-full h-full object-cover rounded-lg border border-kings-ransom"
                        />
                        <button
                          onClick={removePlaceImage}
                          disabled={isEditable}
                          className={`absolute top-1 right-1 ${
                            isEditable
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-kings-ransom/35 hover:bg-dark-olive-green hover:text-apple-cucumber duration-300 transition-all"
                          }  rounded p-1 shadow `}
                        >
                          <X size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                  {errorMessages?.place_icon && (
                    <span className="label-text-alt text-red-500 text-xs">
                      {errorMessages?.place_icon}
                    </span>
                  )}
                </div>
                <div className="w-full  ">
                  <label className="block text-sm font-medium text-black-powder mb-1">
                    Place Icon
                  </label>
                  <div>
                    {!profileUrl ? (
                      <motion.div
                        className={`border-dashed border-2 ${
                          isEditable
                            ? "border-gray-300 cursor-not-allowed"
                            : "border-kings-ransom"
                        } rounded-lg flex items-center justify-center ${
                          isEditable
                            ? "bg-gray-200"
                            : "bg-kings-ransom/10 hover:bg-kings-ransom/20"
                        }  w-[6rem] h-[6rem] text-black-powder transition-all duration-300`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <label
                          className={`flex flex-col items-center justify-center w-full h-full ${
                            isEditable ? "cursor-not-allowed" : "cursor-pointer"
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <div className="text-black-powder/70">
                              <div className="flex items-center justify-center">
                                <Plus size={25} />
                              </div>
                              <p
                                className={`${
                                  isEditable ? "text-gray-400" : ""
                                } text-xs font-medium`}
                              >
                                {isEditable ? "Cannot select" : "Select image"}
                              </p>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={isEditable}
                          />
                        </label>
                      </motion.div>
                    ) : (
                      <div className="relative w-[6rem] h-[6rem]">
                        <img
                          src={profileUrl}
                          alt="Selected"
                          className="w-full h-full object-cover rounded-lg border border-kings-ransom"
                        />
                        <button
                          onClick={removeImage}
                          disabled={isEditable}
                          className={`absolute top-1 right-1 ${
                            isEditable
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-kings-ransom/35 hover:bg-dark-olive-green hover:text-apple-cucumber duration-300 transition-all"
                          }  rounded p-1 shadow `}
                        >
                          <X size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                  {errorMessages?.place_image && (
                    <span className="label-text-alt text-red-500 text-xs">
                      {errorMessages?.place_image}
                    </span>
                  )}
                </div>
              </div>
              <div className="">
                <label className="block text-sm font-medium text-black-powder mb-1">
                  Place Name
                </label>
                <input
                  type="text"
                  value={placeName}
                  onChange={handlePlaceNameChange}
                  placeholder="Enter Place Name"
                  disabled={isEditable}
                  className={`${
                    isEditable ? "cursor-not-allowed" : ""
                  } w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal`}
                />
                {errorMessages?.place_name && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errorMessages?.place_name}
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
              <div className="relative">
                <label className="block text-sm font-medium text-black-powder mb-1">
                  Place Tags
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter Place Tag"
                  disabled={isEditable}
                  className={`${
                    isEditable ? "cursor-not-allowed" : ""
                  } w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal`}
                />
                <button
                  type="button"
                  onClick={addTag}
                  disabled={isEditable}
                  className={`absolute right-3 top-[2.1rem] ${
                    isEditable
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "text-black-powder/70 cursor-pointer hover:text-opacity-80 rounded bg-kings-ransom/35 hover:bg-kings-ransom duration-300 transition-all"
                  } rounded`}
                >
                  <Plus size={20} />
                </button>
              </div>
              {errorMessages?.place_tags && (
                <span className="label-text-alt text-red-500 text-xs">
                  {errorMessages?.place_tags}
                </span>
              )}
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-x-1.5 py-1.5 px-3 pe-2 rounded text-xs font-medium bg-kings-ransom/35 text-black-powder"
                    >
                      {tag}
                      {!isEditable ? (
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-kings-ransom focus:outline-none focus:bg-kings-ransom focus:text-black-powder duration-300 transition-all cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      ) : (
                        ""
                      )}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex justify-center items-center space-x-4 !mt-8">
                {!isEditable && (
                  <button
                    className="bg-black-powder text-apple-cucumber w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm gap-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                    ) : (
                      "Update"
                    )}
                  </button>
                )}

                <button
                  className=" bg-transparent text-black-powder border border-black-powder/70 w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm  gap-2"
                  onClick={handleEditModalClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      )}
    </>
  );
};

export default PlacesList;
