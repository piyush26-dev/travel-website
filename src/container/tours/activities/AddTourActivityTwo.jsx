import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, X } from "lucide-react";

const AddTourActivity = () => {
  const [formDetails, setFormDetails] = useState({
    tour_id: "",
    days: [],
  });

  const [dayInput, setDayInput] = useState("");
  const [selectedTour, setSelectedTour] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleTourSelect = (event) => {
    const tourId = event.target.value;
    const selectedTour = toursData.find(
      (tour) => tour.id.toString() === tourId
    );
    setSelectedTour(selectedTour);
    setFormDetails((prev) => ({
      ...prev,
      tour_id: tourId,
      days: [], // Reset days when changing tour
    }));
  };

  const handleDayInput = (e) => {
    const value = e.target.value;
    if (value > selectedTour?.tours_days || value <= 0) return; // Prevent invalid input
    setDayInput(value);
  };

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
      setErrorMessages({ activity_day: `Day ${dayNumber} is already added.` });
      return;
    }

    const newDay = {
      activity_day: dayNumber.toString(),
      activities: [
        { activity_id: "", attraction_id: [], ticket_included: false },
      ],
    };

    setFormDetails((prev) => ({
      ...prev,
      days: [...prev.days, newDay],
    }));
    setDayInput(""); // Clear input after adding
    setErrorMessages({});
  };

  const addActivity = (dayIndex) => {
    const updatedDays = [...formDetails.days];
    updatedDays[dayIndex].activities.push({
      activity_id: "",
      attraction_id: [],
      ticket_included: false,
    });
    setFormDetails({ ...formDetails, days: updatedDays });
  };

  const handleAttractionSelect = (dayIndex, activityIndex, attractionId) => {
    const updatedDays = [...formDetails.days];
    const activity = updatedDays[dayIndex].activities[activityIndex];

    // Convert attractionId to a string and add it if it's not already present
    const attractionIdString = attractionId.toString();
    if (!activity.attraction_id.includes(attractionIdString)) {
      activity.attraction_id.push(attractionIdString);
    }

    setFormDetails({ ...formDetails, days: updatedDays });
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

  const handleActivitySelect = (dayIndex, activityIndex, activityId) => {
    const updatedDays = [...formDetails.days];
    updatedDays[dayIndex].activities[activityIndex].activity_id = activityId;
    setFormDetails({ ...formDetails, days: updatedDays });
  };

  return (
    <div className="p-6">
      {/* Tour Select Dropdown */}
      <div className="mb-6">
        <label
          htmlFor="tourSelect"
          className="block text-lg font-medium text-gray-700"
        >
          Select a Tour
        </label>
        <select
          id="tourSelect"
          className="mt-2 p-2 border border-gray-300 rounded-md"
          value={formDetails.tour_id}
          onChange={handleTourSelect}
        >
          <option value="">Select a tour</option>
          {toursData.map((tour) => (
            <option key={tour.id} value={tour.id}>
              {tour.tours_name}
            </option>
          ))}
        </select>
      </div>

      {/* Day Input */}
      {selectedTour && (
        <div className="mb-6">
          <label
            htmlFor="dayInput"
            className="block text-lg font-medium text-gray-700"
          >
            Day Number (Max: {selectedTour.tours_days})
          </label>
          <input
            type="number"
            id="dayInput"
            className="mt-2 p-2 border border-gray-300 rounded-md"
            max={selectedTour.tours_days}
            value={dayInput}
            onChange={handleDayInput}
          />
          {errorMessages.activity_day && (
            <div className="text-red-500 text-sm">
              {errorMessages.activity_day}
            </div>
          )}
          <motion.button
            className="mt-2 p-2 bg-black-powder text-white rounded-md"
            disabled={dayInput <= 0 || dayInput > selectedTour.tours_days}
            onClick={addActivityDay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Tour Day
          </motion.button>
        </div>
      )}

      {/* Display Days and Activities */}
      {formDetails.days.map((activity, dayIndex) => (
        <div key={dayIndex} className="space-y-6 pt-8">
          <h2 className="text-xl font-medium text-gray-700">
            Day {activity.activity_day}
          </h2>

          {/* Remove Day Button */}
          <motion.button
            className="p-2 bg-red-500 text-white rounded-md"
            onClick={() => removeDay(dayIndex)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Remove Day
          </motion.button>

          {/* Activities for the Day */}
          {activity.activities.map((act, activityIndex) => (
            <div
              key={activityIndex}
              className="p-4 border rounded-lg shadow-md space-y-4"
            >
              {/* Activity Selection */}
              <select
                className="w-full p-2 border rounded-md"
                value={act.activity_id}
                onChange={(e) =>
                  handleActivitySelect(dayIndex, activityIndex, e.target.value)
                }
              >
                <option value="">Select Activity</option>
                {activitiesData.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.title}
                  </option>
                ))}
              </select>

              {/* Attractions for the Activity */}
              <div>
                <label className="block text-lg font-medium">
                  Select Attractions
                </label>
                <div className="space-x-2">
                  {attractionsData.map((attraction) => (
                    <button
                      key={attraction.id}
                      type="button"
                      className="bg-gray-200 p-2 rounded-lg"
                      onClick={() =>
                        handleAttractionSelect(
                          dayIndex,
                          activityIndex,
                          attraction.id
                        )
                      }
                    >
                      {attraction.name}
                    </button>
                  ))}
                </div>
                <div className="mt-4 space-x-2">
                  {act.attraction_id.map((attId) => (
                    <div
                      key={attId}
                      className="inline-flex items-center space-x-2 bg-blue-100 p-2 rounded-lg"
                    >
                      <span>
                        {attractionsData.find((att) => att.id === attId)?.name}
                      </span>
                      <button
                        className="text-red-500"
                        onClick={() =>
                          removeAttraction(dayIndex, activityIndex, attId)
                        }
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
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
                      setFormDetails({ ...formDetails, days: updatedDays });
                    }}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Ticket Included</span>
                </label>
              </div>

              {/* Add Activity Button */}
              <motion.button
                className="mt-4 p-2 bg-green-500 text-white rounded-md"
                disabled={!act.activity_id || act.attraction_id.length === 0}
                onClick={() => addActivity(dayIndex)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Activity
              </motion.button>

              {/* Remove Activity Button */}
              <motion.button
                className="mt-2 p-2 bg-red-500 text-white rounded-md"
                onClick={() => removeActivity(dayIndex, activityIndex)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Remove Activity
              </motion.button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AddTourActivity;
