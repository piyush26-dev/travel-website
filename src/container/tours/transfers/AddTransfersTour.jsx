import { useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
("react");
import { useNavigate } from "react-router-dom";
import {
  CarFront,
  ChevronDown,
  LoaderCircle,
  MoveLeft,
  Plus,
  X,
} from "lucide-react";
import {
  SummarizedFormValidation,
  TransfersFormValidation,
} from "../../../Utils/validation";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";


const AddTransfersTour = () => {
  const navigate = useNavigate();
  const toursData = [
    { id: 1, tours_name: "Explore the Mountains", tours_days: 12 },
    { id: 2, tours_name: "Beachside Paradise", tours_days: 5 },
    { id: 3, tours_name: "Historic City Tour", tours_days: 7 },
    { id: 4, tours_name: "Wildlife Safari", tours_days: 22 },
  ];

  const TransfersData = [
    { transfers_name: "Private Transfer" },
    { transfers_name: "Shared Transfer" },
  ];

  const [formDetails, setFormDetails] = useState({
    tour_name: "",
    tour_id: "",
    transfers: [],
  });

  const [selectedTour, setSelectedTour] = useState(null);
  const [dayInput, setDayInput] = useState(""); // Input field for day
  const [errorMessages, setErrorMessages] = useState({});
  const [isFormValid, setIsFormValid] = useState(true); // To track if form is valid
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenTransfer, setIsDropdownOpenTransfer] = useState(false);

  // Handle tour selection
  const handleTourSelect = (tour) => {
    setFormDetails({
      tour_name: tour.tours_name,
      tour_id: tour.id.toString(),
      transfers: [],
    });
    setSelectedTour(tour);
    setErrorMessages({});
    setDayInput(""); // Reset day input when a tour is selected
    setIsFormValid(true); // Reset form validity
  };

  // Add a new transfer day
  const addTransferDay = () => {
    const dayNumber = parseInt(dayInput, 10);

    if (!selectedTour || isNaN(dayNumber) || dayNumber <= 0) {
      setErrorMessages({
        transfer_day: "Please enter a valid day greater than 0.",
      });
      return;
    }

    if (dayNumber > selectedTour.tours_days) {
      setErrorMessages({
        transfer_day: `You cannot add a day beyond ${selectedTour.tours_days}.`,
      });
      return;
    }

    if (
      formDetails.transfers.some(
        (transfer) => transfer.transfer_day === dayNumber.toString()
      )
    ) {
      setErrorMessages({
        transfer_day: `Day ${dayNumber} is already added.`,
      });
      return;
    }

    const newDay = {
      transfer_day: dayNumber.toString(),
      transfer_title: "",
      seleted_transfer: [
        {
          seleted_transfer_category: "",
          transfer_name: "",
          from_transfer: "",
          mid_transfer: [],
          to_transfer: "",
        },
      ],
    };

    setFormDetails((prev) => ({
      ...prev,
      transfers: [...prev.transfers, newDay],
    }));
    setDayInput(""); // Clear day input after adding
    setErrorMessages({});
    setIsFormValid(true); // Reset form validity after adding day
  };

  // Add a new selected transfer category
  const addTransferCategory = (dayIndex) => {
    const updatedTransfers = [...formDetails.transfers];
    updatedTransfers[dayIndex].seleted_transfer.push({
      seleted_transfer_category: "",
      transfer_name: "",
      from_transfer: "",
      mid_transfer: [],
      to_transfer: "",
    });

    setFormDetails({ ...formDetails, transfers: updatedTransfers });
  };

  // Update transfer title
  const handleTransferTitleChange = (dayIndex, newTitle) => {
    const updatedTransfers = [...formDetails.transfers];
    updatedTransfers[dayIndex].transfer_title = newTitle;

    setFormDetails({ ...formDetails, transfers: updatedTransfers });
  };

  // Add a mid-transfer location
  const addMidTransferInput = (dayIndex, transferIndex) => {
    const updatedTransfers = [...formDetails.transfers];
    const midTransfers =
      updatedTransfers[dayIndex].seleted_transfer[transferIndex].mid_transfer;

    midTransfers.push(""); // Add an empty string as placeholder for the input
    setFormDetails({ ...formDetails, transfers: updatedTransfers });
  };

  // Update mid-transfer location
  const handleMidTransferChange = (
    dayIndex,
    transferIndex,
    midIndex,
    value
  ) => {
    const updatedTransfers = [...formDetails.transfers];
    updatedTransfers[dayIndex].seleted_transfer[transferIndex].mid_transfer[
      midIndex
    ] = value;

    setFormDetails({ ...formDetails, transfers: updatedTransfers });
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
        transfer_day: "Please enter a valid day greater than 0.",
      });
    }
  };

  // Validate form to check if any required field is empty
  const validateForm = () => {
    const isValid = formDetails.transfers.every((day) => {
      return day.seleted_transfer.every((transfer) => {
        // Check if any field except mid_transfer is empty or null
        return (
          transfer.seleted_transfer_category &&
          transfer.transfer_name &&
          transfer.from_transfer &&
          transfer.to_transfer
        );
      });
    });

    setIsFormValid(isValid); // Update form validity
  };
  const handleTransferCategoryChange = (dayIndex, transferIndex, category) => {
    const updatedTransfers = [...formDetails.transfers];
    updatedTransfers[dayIndex].seleted_transfer[
      transferIndex
    ].seleted_transfer_category = category;

    setFormDetails({ ...formDetails, transfers: updatedTransfers });
    validateForm();
  };

  const handleTransferDataChange = (dayIndex, transferIndex, key, value) => {
    const updatedTransfers = [...formDetails.transfers];
    updatedTransfers[dayIndex].seleted_transfer[
      transferIndex
    ].seleted_transfer_data[0][key] = value;

    setFormDetails({ ...formDetails, transfers: updatedTransfers });
      validateForm();
  };

  // Check if any transfer field is invalid
  const isTransferCategoryDisabled = (dayIndex) => {
    const transferFields = formDetails.transfers[dayIndex].seleted_transfer;

    // Check if any field is empty, undefined or null
    return transferFields.some(
      (transfer) =>
        !transfer.seleted_transfer_category ||
        !transfer.transfer_name ||
        !transfer.from_transfer ||
        !transfer.to_transfer
    );
  };

  // Check if all transfer fields are filled to enable the "Add Transfer Day" button
  const isAddTransferDayDisabled = () => {
    // Check if any transfer field in any day is empty
    return formDetails.transfers.some((day) => {
      return day.seleted_transfer.some(
        (transfer) =>
          !transfer.seleted_transfer_category ||
          !transfer.transfer_name ||
          !transfer.from_transfer ||
          !transfer.to_transfer
      );
    });
  };

  const handleBack = () => {
    navigate("/transfers");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = TransfersFormValidation(formDetails);
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
        setIsDropdownOpenTransfer(false);
      }
    };

    if (isDropdownOpen || isDropdownOpenTransfer) {
      window.addEventListener("click", handleOutsideClick);
    }

    // Clean up the event listener on component unmount or dependency changes
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen, isDropdownOpenTransfer]);

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
            {selectedTour && <> </>}
            {formDetails.transfers.map((transfer, dayIndex) => (
              <div key={dayIndex} className="space-y-4 pt-8">
                <h2 className="text-lg font-medium text-black-powder">
                  Day {transfer.transfer_day}
                </h2>
                <div className="">
                  <label className="block text-sm font-medium text-black-powder mb-1">
                    Transfer Title
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter transfer title`}
                    className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                    value={transfer.transfer_title}
                    onChange={(e) =>
                      handleTransferTitleChange(dayIndex, e.target.value)
                    }
                  />
                </div>

                {transfer.seleted_transfer.map(
                  (transferDetail, transferIndex) => (
                    <div key={transferIndex}>
                      <div className="mb-10">
                        <label className="block text-sm font-medium text-black-powder mb-1">
                          Transfer
                        </label>
                        <div className="relative  dropdown-container-tow w-full">
                          <button
                            type="button"
                            onClick={() =>
                              setIsDropdownOpenTransfer(!isDropdownOpenTransfer)
                            }
                            className="flex items-center justify-between px-3 py-2 border border-kings-ransom text-black-powder font-normal text-sm  transition w-full rounded"
                          >
                            {transferDetail.seleted_transfer_category
                              ? transferDetail.seleted_transfer_category
                              : "Select Transfer"}

                            {/* {addDesignerServiceDetail?.designer_service_category} */}
                            <motion.span
                              className="ml-2"
                              animate={{
                                rotate: isDropdownOpenTransfer ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown size={16} />
                            </motion.span>
                          </button>
                          {errorMessages?.seleted_transfer_category && (
                            <span className="label-text-alt text-red-500 text-xs">
                              {errorMessages?.seleted_transfer_category}
                            </span>
                          )}

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {isDropdownOpenTransfer && (
                              <SimpleBar
                                style={{ maxHeight: "100vh" }}
                                className={`absolute right-0 mt-2 bg-primary border border-black-powder/10 rounded shadow-lg  text-black-powder text-sm w-full max-h-max  bg-kings-ransom z-50 `}
                              >
                                <motion.ul
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {TransfersData?.length > 0 ? (
                                    TransfersData.map((transfer, index) => (
                                      <motion.li
                                        key={index}
                                        // onClick={() => {
                                        //   const selectedCategory =
                                        //     transfer?.transfers_name; // Assign the selected category name

                                        //   handleTransferCategoryChange(
                                        //     dayIndex,
                                        //     transferIndex,
                                        //     selectedCategory
                                        //   ); // Update the category

                                        //   setIsDropdownOpenTransfer(false); // Close the dropdown
                                        // }}
                                        onClick={(e) => {
                                          const selectedCategory =
                                            transfer?.transfers_name;
                                          const updatedTransfers = [
                                            ...formDetails.transfers,
                                          ];
                                          updatedTransfers[
                                            dayIndex
                                          ].seleted_transfer[
                                            transferIndex
                                          ].seleted_transfer_category =
                                            selectedCategory;
                                          setFormDetails({
                                            ...formDetails,
                                            transfers: updatedTransfers,
                                          });
                                          validateForm(); 
                                          setIsDropdownOpenTransfer(false);
                                        }}
                                        className={`px-6 py-2 ${
                                          transferDetail.seleted_transfer_category
                                            ? "bg-apple-cucumber/70"
                                            : "bg-kings-ransom"
                                        } hover:bg-apple-cucumber/70 cursor-pointer`}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        {transfer?.transfers_name}
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
                                      Transfers not available
                                    </motion.li>
                                  )}
                                </motion.ul>
                              </SimpleBar>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      {transferDetail.seleted_transfer_category ? (
                        <div className="rounded border border-dashed border-kings-ransom p-2">
                          <div className="space-y-4 ">
                            <div className="">
                              <div className="inline-block">
                                <div className="flex items-center gap-4 text-black-powder/70 border-b-2 border-kings-ransom">
                                  {" "}
                                  <CarFront size={18} />
                                  <h2 className="text-base font-medium">
                                    {transferDetail.seleted_transfer_category}
                                  </h2>
                                </div>
                              </div>
                              <div className="space-y-4 mt-4">
                                <div className="">
                                  <label className="block text-sm font-medium text-black-powder mb-1">
                                    {transferDetail.seleted_transfer_category}{" "}
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    placeholder={`Enter ${transferDetail.seleted_transfer_category}  Name`}
                                    value={transferDetail.transfer_name}
                                    onChange={(e) => {
                                      const updatedTransfers = [
                                        ...formDetails.transfers,
                                      ];
                                      updatedTransfers[
                                        dayIndex
                                      ].seleted_transfer[
                                        transferIndex
                                      ].transfer_name = e.target.value;
                                      setFormDetails({
                                        ...formDetails,
                                        transfers: updatedTransfers,
                                      });
                                      validateForm(); // Validate form on name change
                                    }}
                                    className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                                  />
                                </div>
                                <div className="">
                                  <label className="block text-sm font-medium text-black-powder mb-1">
                                    Form
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter From Location"
                                    value={transferDetail.from_transfer}
                                    onChange={(e) => {
                                      const updatedTransfers = [
                                        ...formDetails.transfers,
                                      ];
                                      updatedTransfers[
                                        dayIndex
                                      ].seleted_transfer[
                                        transferIndex
                                      ].from_transfer = e.target.value;
                                      setFormDetails({
                                        ...formDetails,
                                        transfers: updatedTransfers,
                                      });
                                      validateForm(); // Validate form on location change
                                    }}
                                    className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                                  />
                                </div>
                                {transferDetail.mid_transfer.map(
                                  (mid, midIndex) => (
                                    <div className="">
                                      <label className="block text-sm font-medium text-black-powder mb-1">
                                        Mid
                                      </label>
                                      <input
                                        key={midIndex}
                                        type="text"
                                        value={mid}
                                        placeholder="Enter Mid Location"
                                        onChange={(e) =>
                                          handleMidTransferChange(
                                            dayIndex,
                                            transferIndex,
                                            midIndex,
                                            e.target.value
                                          )
                                        }
                                        className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                                      />
                                    </div>
                                  )
                                )}

                                <div className="flex items-center gap-4">
                                  <div className="text-sm font-medium text-black-powder">
                                    Do you require another mid location?
                                  </div>
                                  <button
                                    className={`py-1 px-2 rounded transition-all duration-300 font-medium text-xs flex items-center ${
                                      transferDetail.mid_transfer.some(
                                        (mid) => mid.trim() === ""
                                      )
                                        ? "bg-kings-ransom text-black-powder cursor-not-allowed"
                                        : "bg-black-powder text-apple-cucumber hover:bg-kings-ransom hover:text-black-powder"
                                    }`}
                                    onClick={() =>
                                      addMidTransferInput(
                                        dayIndex,
                                        transferIndex
                                      )
                                    }
                                    disabled={
                                      // Disable button if any input field is empty
                                      transferDetail.mid_transfer.some(
                                        (mid) => mid.trim() === ""
                                      )
                                    }
                                  >
                                    Yes
                                  </button>
                                </div>

                                <div className="">
                                  <label className="block text-sm font-medium text-black-powder mb-1">
                                    To
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="To Location"
                                    value={transferDetail.to_transfer}
                                    onChange={(e) => {
                                      const updatedTransfers = [
                                        ...formDetails.transfers,
                                      ];
                                      updatedTransfers[
                                        dayIndex
                                      ].seleted_transfer[
                                        transferIndex
                                      ].to_transfer = e.target.value;
                                      setFormDetails({
                                        ...formDetails,
                                        transfers: updatedTransfers,
                                      });
                                      validateForm(); // Validate form on to location change
                                    }}
                                    className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  )
                )}
                <div className="flex justify-end">
                  <button
                    className={`  px-4 py-2 rounded  transition-all duration-300 font-medium text-sm flex items-center gap-2 ${
                      isTransferCategoryDisabled(dayIndex)
                        ? "bg-kings-ransom text-black-powder cursor-not-allowed"
                        : "bg-black-powder text-apple-cucumber hover:bg-kings-ransom hover:text-black-powder"
                    }`}
                    onClick={() => addTransferCategory(dayIndex)}
                    disabled={isTransferCategoryDisabled(dayIndex)}
                  >
                    <Plus size={16} />
                    Transfer Category
                  </button>
                </div>
              </div>
            ))}

            <div className="">
              {selectedTour &&
                formDetails.transfers.length < selectedTour.tours_days && (
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
                        {errorMessages?.transfer_day && (
                          <span className="label-text-alt text-red-500 text-xs">
                            {errorMessages.transfer_day}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <button
                          className={`  px-4 py-2 rounded  transition-all duration-300 font-medium text-sm flex items-center gap-2 ${
                            isAddTransferDayDisabled()
                              ? "bg-kings-ransom text-black-powder cursor-not-allowed"
                              : "bg-black-powder text-apple-cucumber hover:bg-kings-ransom hover:text-black-powder"
                          }`}
                          onClick={addTransferDay}
                          disabled={isAddTransferDayDisabled()}
                        >
                          <Plus size={16} />
                          Transfer Day
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

export default AddTransfersTour;
