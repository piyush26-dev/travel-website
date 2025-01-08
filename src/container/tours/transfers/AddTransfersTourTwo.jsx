import React, { useState } from "react";

const AddTransfersTourTow = () => {
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tour Planner</h1>

      {/* Tour Selection */}
      <select
        className="mb-4 p-2 border"
        onChange={(e) => {
          const selected = toursData.find(
            (tour) => tour.id === parseInt(e.target.value)
          );
          handleTourSelect(selected);
        }}
      >
        <option value="">Select a Tour</option>
        {toursData.map((tour) => (
          <option key={tour.id} value={tour.id}>
            {tour.tours_name}
          </option>
        ))}
      </select>

      {/* Show day input field and button only after tour selection */}
      {selectedTour && (
        <>
          {/* Day Input */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Enter Day"
              value={dayInput}
              onChange={handleDayInputChange}
              className="p-2 border w-full"
            />
            {errorMessages?.transfer_day && (
              <span className="label-text-alt text-red-500 text-xs">
                {errorMessages.transfer_day}
              </span>
            )}
          </div>

          {/* Add Day Button */}
          <button
            className="bg-blue-500 text-white p-2"
            onClick={addTransferDay}
            disabled={isAddTransferDayDisabled()} // Disable if any transfer field is empty
          >
            Add Transfer Day
          </button>
        </>
      )}

      {/* Transfer Days */}
      {formDetails.transfers.map((transfer, dayIndex) => (
        <div key={dayIndex} className="mb-6 border p-4">
          <h2 className="text-lg font-semibold">Day {transfer.transfer_day}</h2>

          {/* Transfer Title */}
          <input
            type="text"
            placeholder="Enter Transfer Title"
            value={transfer.transfer_title}
            onChange={(e) =>
              handleTransferTitleChange(dayIndex, e.target.value)
            }
            className="mb-4 p-2 border w-full"
          />

          {/* Add Transfer Category Button */}
          <button
            className="p-2 border bg-blue-500 text-white"
            onClick={() => addTransferCategory(dayIndex)}
            disabled={isTransferCategoryDisabled(dayIndex)} // Disable the button if any transfer field is invalid
          >
            Add Transfer Category
          </button>

          {/* Display Transfer Details */}
          {transfer.seleted_transfer.map((transferDetail, transferIndex) => (
            <div key={transferIndex} className="ml-4 mt-4">
              <h3 className="text-md font-semibold">Transfer Details</h3>

              {/* Select Transfer Category */}
              <select
                className="p-2 border w-full mb-2"
                value={transferDetail.seleted_transfer_category}
                onChange={(e) => {
                  const updatedTransfers = [...formDetails.transfers];
                  updatedTransfers[dayIndex].seleted_transfer[
                    transferIndex
                  ].seleted_transfer_category = e.target.value;
                  setFormDetails({
                    ...formDetails,
                    transfers: updatedTransfers,
                  });
                  validateForm(); // Validate form on category change
                }}
              >
                <option value="">Select Transfer Category</option>
                {TransfersData.map((transfer) => (
                  <option
                    key={transfer.transfers_name}
                    value={transfer.transfers_name}
                  >
                    {transfer.transfers_name}
                  </option>
                ))}
              </select>

              {/* Editable Transfer Data */}
              <div className="ml-4">
                <input
                  type="text"
                  placeholder="Transfer Name"
                  value={transferDetail.transfer_name}
                  onChange={(e) => {
                    const updatedTransfers = [...formDetails.transfers];
                    updatedTransfers[dayIndex].seleted_transfer[
                      transferIndex
                    ].transfer_name = e.target.value;
                    setFormDetails({
                      ...formDetails,
                      transfers: updatedTransfers,
                    });
                    validateForm(); // Validate form on name change
                  }}
                  className="p-2 border w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="From Location"
                  value={transferDetail.from_transfer}
                  onChange={(e) => {
                    const updatedTransfers = [...formDetails.transfers];
                    updatedTransfers[dayIndex].seleted_transfer[
                      transferIndex
                    ].from_transfer = e.target.value;
                    setFormDetails({
                      ...formDetails,
                      transfers: updatedTransfers,
                    });
                    validateForm(); // Validate form on location change
                  }}
                  className="p-2 border w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="To Location"
                  value={transferDetail.to_transfer}
                  onChange={(e) => {
                    const updatedTransfers = [...formDetails.transfers];
                    updatedTransfers[dayIndex].seleted_transfer[
                      transferIndex
                    ].to_transfer = e.target.value;
                    setFormDetails({
                      ...formDetails,
                      transfers: updatedTransfers,
                    });
                    validateForm(); // Validate form on to location change
                  }}
                  className="p-2 border w-full mb-2"
                />

                {/* Mid Locations */}
                <div className="mb-2">
                  <h4 className="font-semibold">Mid Locations:</h4>
                  {transferDetail.mid_transfer.map((mid, midIndex) => (
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
                      className="p-2 border w-full mb-2"
                    />
                  ))}
                  <button
                    className="p-2 border bg-gray-200"
                    onClick={() => addMidTransferInput(dayIndex, transferIndex)}
                  >
                    Add Mid Location
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AddTransfersTourTow;
