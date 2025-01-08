import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Plus, X } from "lucide-react";
import { PlaceFormValidation } from "../../Utils/validation";

const AddPlaceModal = ({ isOpen, onClose }) => {
  const [formDetails, setFormDetails] = useState({
    place_icon: "",
    place_image: "",
    place_name: "",
    place_slug: "",
    place_tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [profileUrl, setProfileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState();
  const [proImgUrl, setProImgUrl] = useState(null);
  const [placeUrl, setPlaceUrl] = useState("");
  const [selectedPlaceFile, setSelectedPlaceFile] = useState(null);
  const [placeImgUrl, setPlaceImgUrl] = useState(null);

  const [placeName, setPlaceName] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };
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

  if (!isOpen) return null;

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

  const handleCloseAddModal = () => {
    onClose();
    setErrorMessages({});
    // Reset formDetails to empty
    setFormDetails({
      place_icon: "",
      place_image: "",
      place_name: "",
      place_slug: "",
      place_tags: [],
    });
  };

  return (
    <>
      {/* add place modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.form
            className="bg-apple-cucumber p-6 rounded-lg shadow-lg w-[35rem] relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg font-semibold mb-4 text-black-powder">
              Add Places
            </h2>
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
                        className="border-dashed border-2 border-kings-ransom rounded-lg flex items-center justify-center bg-secondary/10 hover:bg-secondary/20 cursor-pointer w-[6rem] h-[6rem]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                          <div className="flex items-center justify-center">
                            <div className="text-black-powder/70">
                              <div className="flex items-center justify-center">
                                <Plus size={25} />
                              </div>
                              <p className="text-xs font-medium">
                                Select Image
                              </p>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePlaceImageUpload}
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
                          className="absolute top-1 right-1 bg-kings-ransom/35 text-black-powder rounded p-1 shadow hover:bg-kings-ransom hover:text-black-powde transition-all duration-300"
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
                        className="border-dashed border-2 border-kings-ransom rounded-lg flex items-center justify-center bg-secondary/10 hover:bg-secondary/20 cursor-pointer w-[6rem] h-[6rem]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                          <div className="flex items-center justify-center">
                            <div className="text-black-powder/70">
                              <div className="flex items-center justify-center">
                                <Plus size={25} />
                              </div>
                              <p className="text-xs font-medium">
                                Select Images
                              </p>
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
                      <div className="relative w-[6rem] h-[6rem]">
                        <img
                          src={profileUrl}
                          alt="Selected"
                          className="w-full h-full object-cover rounded-lg border border-kings-ransom"
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
                  className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
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
                  className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="absolute right-3 top-[2.1rem] text-black-powder/70 cursor-pointer hover:text-opacity-80 rounded bg-kings-ransom/35 hover:bg-kings-ransom duration-300 transition-all"
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
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-kings-ransom focus:outline-none focus:bg-kings-ransom focus:text-black-powder duration-300 transition-all cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
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
                  onClick={(e) => {
                    e.preventDefault(); // Prevents the form submission
                    e.stopPropagation(); // Stops event propagation
                    handleCloseAddModal(); // Closes the modal
                  }}
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

export default AddPlaceModal;
