import React, { useState } from "react";

const AddStayTwo = () => {
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
  const [selectedTour, setSelectedTour] = useState(null);
  const [currentDay, setCurrentDay] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTourSelection = (e) => {
    const selectedId = e.target.value;
    const tour = toursData.find((t) => t.id === parseInt(selectedId));
    setSelectedTour(tour);
    setFormDetails({
      tour_name: tour.tours_name,
      tour_id: tour.id,
      days: [],
    });
    setErrorMessage("");
    setCurrentDay("");
  };

  const handleAddDay = () => {
    const dayNumber = parseInt(currentDay);
    if (
      isNaN(dayNumber) ||
      dayNumber <= 0 ||
      dayNumber > selectedTour.tours_days
    ) {
      setErrorMessage(
        `Day must be a valid number between 1 and ${selectedTour.tours_days}.`
      );
      return;
    }
    if (formDetails.days.some((day) => day.stay_day === currentDay)) {
      setErrorMessage(`Day ${currentDay} is already added.`);
      return;
    }
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      days: [
        ...prevDetails.days,
        {
          stay_day: currentDay.toString(),
          stay_day_title: "",
          stays: [],
        },
      ],
    }));
    setErrorMessage("");
    setCurrentDay("");
  };

  const handleDayTitleChange = (index, value) => {
    const updatedDays = [...formDetails.days];
    updatedDays[index].stay_day_title = value;
    setFormDetails({ ...formDetails, days: updatedDays });
  };

  const handleAddStay = (dayIndex) => {
    const updatedDays = [...formDetails.days];
    updatedDays[dayIndex].stays.push({
      stay_name: "",
      check_in: "",
      check_out: "",
      hotels: [],
      breakfast: false,
      lunch: false,
      dinner: false,
    });
    setFormDetails({ ...formDetails, days: updatedDays });
  };

  const handleStayFieldChange = (dayIndex, stayIndex, field, value) => {
    const updatedDays = [...formDetails.days];
    updatedDays[dayIndex].stays[stayIndex][field] = value;
    setFormDetails({ ...formDetails, days: updatedDays });
  };

  const handleAddHotel = (dayIndex, stayIndex) => {
    const updatedDays = [...formDetails.days];
    updatedDays[dayIndex].stays[stayIndex].hotels.push({
      hotel_images: [],
      hotel_title: "",
      hotel_reating: "",
    });
    setFormDetails({ ...formDetails, days: updatedDays });
  };

  const handleRemoveHotel = (dayIndex, stayIndex, hotelIndex) => {
    const updatedDays = [...formDetails.days];
    updatedDays[dayIndex].stays[stayIndex].hotels.splice(hotelIndex, 1);
    setFormDetails({ ...formDetails, days: updatedDays });
  };

  const handleHotelFieldChange = (
    dayIndex,
    stayIndex,
    hotelIndex,
    field,
    value
  ) => {
    const updatedDays = [...formDetails.days];
    updatedDays[dayIndex].stays[stayIndex].hotels[hotelIndex][field] = value;
    setFormDetails({ ...formDetails, days: updatedDays });
  };

  const handleRemoveStay = (dayIndex, stayIndex) => {
    const updatedDays = [...formDetails.days];
    updatedDays[dayIndex].stays.splice(stayIndex, 1);
    setFormDetails({ ...formDetails, days: updatedDays });
  };

  const handleRemoveDay = (dayIndex) => {
    const updatedDays = [...formDetails.days];
    updatedDays.splice(dayIndex, 1);
    setFormDetails({ ...formDetails, days: updatedDays });
  };

  return (
    <div>
      <h1>Tour Planner</h1>
      <select onChange={handleTourSelection} defaultValue="">
        <option value="" disabled>
          Select a Tour
        </option>
        {toursData.map((tour) => (
          <option key={tour.id} value={tour.id}>
            {tour.tours_name}
          </option>
        ))}
      </select>

      {selectedTour && (
        <div>
          <h2>{selectedTour.tours_name}</h2>
          <p>Max Days: {selectedTour.tours_days}</p>
          <input
            type="number"
            value={currentDay}
            onChange={(e) => setCurrentDay(e.target.value)}
            placeholder="Enter Day Number"
          />
          <button onClick={handleAddDay}>Add Day</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          {formDetails.days.map((day, dayIndex) => (
            <div
              key={dayIndex}
              style={{ border: "1px solid black", margin: "10px" }}
            >
              <h3>Day {day.stay_day}</h3>
              <input
                type="text"
                placeholder="Day Title"
                value={day.stay_day_title}
                onChange={(e) => handleDayTitleChange(dayIndex, e.target.value)}
              />
              <button onClick={() => handleAddStay(dayIndex)}>Add Stay</button>
              <button onClick={() => handleRemoveDay(dayIndex)}>
                Remove Day
              </button>

              {day.stays.map((stay, stayIndex) => (
                <div
                  key={stayIndex}
                  style={{ border: "1px solid gray", margin: "10px" }}
                >
                  <h4>Stay {stayIndex + 1}</h4>
                  <input
                    type="text"
                    placeholder="Stay Name"
                    value={stay.stay_name}
                    onChange={(e) =>
                      handleStayFieldChange(
                        dayIndex,
                        stayIndex,
                        "stay_name",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="time"
                    value={stay.check_in}
                    onChange={(e) =>
                      handleStayFieldChange(
                        dayIndex,
                        stayIndex,
                        "check_in",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="time"
                    value={stay.check_out}
                    onChange={(e) =>
                      handleStayFieldChange(
                        dayIndex,
                        stayIndex,
                        "check_out",
                        e.target.value
                      )
                    }
                  />
                  <label>
                    Breakfast
                    <input
                      type="radio"
                      checked={stay.breakfast}
                      onChange={() =>
                        handleStayFieldChange(
                          dayIndex,
                          stayIndex,
                          "breakfast",
                          !stay.breakfast
                        )
                      }
                    />
                  </label>
                  <label>
                    Lunch
                    <input
                      type="radio"
                      checked={stay.lunch}
                      onChange={() =>
                        handleStayFieldChange(
                          dayIndex,
                          stayIndex,
                          "lunch",
                          !stay.lunch
                        )
                      }
                    />
                  </label>
                  <label>
                    Dinner
                    <input
                      type="radio"
                      checked={stay.dinner}
                      onChange={() =>
                        handleStayFieldChange(
                          dayIndex,
                          stayIndex,
                          "dinner",
                          !stay.dinner
                        )
                      }
                    />
                  </label>
                  <button onClick={() => handleAddHotel(dayIndex, stayIndex)}>
                    Add Hotel
                  </button>
                  <button onClick={() => handleRemoveStay(dayIndex, stayIndex)}>
                    Remove Stay
                  </button>

                  {stay.hotels.map((hotel, hotelIndex) => (
                    <div
                      key={hotelIndex}
                      style={{ border: "1px solid lightgray", margin: "10px" }}
                    >
                      <input
                        type="text"
                        placeholder="Hotel Title"
                        value={hotel.hotel_title}
                        onChange={(e) =>
                          handleHotelFieldChange(
                            dayIndex,
                            stayIndex,
                            hotelIndex,
                            "hotel_title",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="number"
                        placeholder="Hotel Rating"
                        value={hotel.hotel_reating}
                        onChange={(e) =>
                          handleHotelFieldChange(
                            dayIndex,
                            stayIndex,
                            hotelIndex,
                            "hotel_reating",
                            e.target.value
                          )
                        }
                      />
                      <button
                        onClick={() =>
                          handleRemoveHotel(dayIndex, stayIndex, hotelIndex)
                        }
                      >
                        Remove Hotel
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <h3>Final Form Details:</h3>
      <pre>{JSON.stringify(formDetails, null, 2)}</pre>
    </div>
  );
};

export default AddStayTwo;
