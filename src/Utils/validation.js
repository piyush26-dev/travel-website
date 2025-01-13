import moment from "moment";


export const LoginFormValidation = (userData) => {
  let errors = {};
  let isValid = true;

  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;
  var PasswordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{8,16})"
  );
  if (userData?.email !== undefined && !userData?.email) {
    errors.email = "Please enter email";
    isValid = false;
  } else if (
    userData?.email !== undefined &&
    !emailregex.test(userData?.email)
  ) {
    errors.email = "Please enter valid email";
    isValid = false;
  } else if (userData?.email) {
    errors.email = "";
  }

  if (userData.password !== undefined && !userData.password) {
    errors.password = "Please enter password";
    isValid = false;
  } else if (
    userData.password !== undefined &&
    !PasswordRegex.test(userData.password)
  ) {
    errors.password =
      "Password must be 8 to 16 characters long alphanumeric, must contain at least 1 special character and upper case / lower case letters";
    isValid = false;
  } else if (userData.password) {
    errors.password = "";
  }

  return { errors, isValid };
};

// Sign Up Me Validation
export const SignUpFormValidation = (userData) => {
  let errors = {};
  let isValid = true;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;
  let capitalRegex = /^[a-zA-Z\s]*$/;
  const phoneNumber = parsePhoneNumberFromString(`+${userData?.phone_number}`);

  if (userData.first_name !== undefined && !userData.first_name) {
    errors.first_name = "First name is required .";
    isValid = false;
  } else if (
    userData.first_name !== undefined &&
    !capitalRegex.test(userData?.first_name)
  ) {
    errors.first_name = "First name cannot contain numbers.";
    isValid = false;
  } else if (userData?.first_name) {
    errors.first_name = "";
  }

  if (userData.last_name !== undefined && !userData.last_name) {
    errors.last_name = "Last name is required .";
    isValid = false;
  } else if (
    userData.last_name !== undefined &&
    !capitalRegex.test(userData?.last_name)
  ) {
    errors.last_name = "Last name cannot contain numbers.";
    isValid = false;
  } else if (userData?.last_name) {
    errors.last_name = "";
  }

  if (userData?.email_address !== undefined && !userData?.email_address) {
    errors.email_address = "Please enter email address";
    isValid = false;
  } else if (
    userData?.email_address !== undefined &&
    !emailregex.test(userData?.email_address)
  ) {
    errors.email_address = "Please enter valid email address";
    isValid = false;
  } else if (userData?.email_address) {
    errors.email_address = "";
  }

  if (userData?.phone_number !== undefined) {
    if (phoneNumber !== undefined && !phoneNumber) {
      errors.phone_number = "Phone number is required.";
      isValid = false;
    } else if (!phoneNumber || !phoneNumber?.isValid()) {
      (errors.phone_number = "Phone number not valid"), (isValid = false);
    } else if (userData?.phone_number) {
      errors.phone_number = "";
    }
  }

  return { errors, isValid };
};

export const ResandPasswordValidation = (userData) => {
  let errors = {};
  let isValid = true;

  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;
  var PasswordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{8,16})"
  );

  if (userData?.email !== undefined && !userData?.email) {
    errors.email = "Please enter email";
    isValid = false;
  } else if (
    userData?.email !== undefined &&
    !emailregex.test(userData?.email)
  ) {
    errors.email = "Please enter valid email";
    isValid = false;
  } else if (userData?.email) {
    errors.email = "";
  }

  if (userData.password !== undefined && !userData.password) {
    errors.password = "Please enter password";
    isValid = false;
  } else if (
    userData.password !== undefined &&
    !PasswordRegex.test(userData.password)
  ) {
    errors.password =
      "Password must be 8 to 16 characters long alphanumeric, must contain at least 1 special character and upper case / lower case letters";
    isValid = false;
  } else if (userData.password) {
    errors.password = "";
  }

  if (userData.confirm_password !== undefined && !userData.confirm_password) {
    errors.confirm_password = "Please confirm password";
    isValid = false;
  } else if (userData.confirm_password !== userData.password) {
    errors.confirm_password = "Passwords do not match";
    isValid = false;
  } else {
    errors.confirm_password = "";
  }

  return { errors, isValid };
};

export const PlaceFormValidation = (userData) => {
  let errors = {};
  let isValid = true;

  if (userData.place_icon !== undefined && !userData.place_icon) {
    errors.place_icon = "Palce image icon !";
    isValid = false;
  } else if (userData?.place_icon) {
    errors.place_icon = "";
  }

  if (userData.place_image !== undefined && !userData.place_image) {
    errors.place_image = "Palce image required !";
    isValid = false;
  } else if (userData?.place_image) {
    errors.place_image = "";
  }

  if (userData.place_name !== undefined && !userData.place_name) {
    errors.place_name = "Palce name required !";
    isValid = false;
  } else if (userData?.place_name) {
    errors.place_name = "";
  }

  if (
    Array.isArray(userData.place_tags) && userData.place_tags.length === 0
  ) {
    errors.place_tags = "Place tags are required!";
    isValid = false;
  } else if (userData?.place_tags) {
    errors.place_tags = "";
  }


  return { errors, isValid };
};

export const ToursFormValidation = (userData) => {
  let errors = {};
  let isValid = true;
  const requiredFields = [
    "tour_tags",
    "tour_facilities",
    "tour_categories",
    "tour_highlight",
    "tour_included",
    "excluded_included",
  ];

  if (userData.palce_id !== undefined && !userData.palce_id) {
    errors.palce_id = "This field is required";
    isValid = false;
  } else if (userData?.palce_id) {
    errors.palce_id = "";
  }

  if (userData.tour_name !== undefined && !userData.tour_name) {
    errors.tour_name = "This field is required";
    isValid = false;
  } else if (userData?.tour_name) {
    errors.tour_name = "";
  }

  if (userData.tour_title !== undefined && !userData.tour_title) {
    errors.tour_title = "This field is required";
    isValid = false;
  } else if (userData?.tour_title) {
    errors.tour_title = "";
  }

  if (userData.description !== undefined && !userData.description) {
    errors.description = "This field is required";
    isValid = false;
  } else if (userData?.description) {
    errors.description = "";
  }

  if (userData.price !== undefined && !userData.price) {
    errors.price = "This field is required";
    isValid = false;
  } else if (userData?.price) {
    errors.price = "";
  }

  if (userData.dicout !== undefined && !userData.dicout) {
    errors.dicout = "This field is required";
    isValid = false;
  } else if (userData?.dicout) {
    errors.dicout = "";
  }
  if (userData.duration_days !== undefined && !userData.duration_days) {
    errors.duration_days = "This field is required";
    isValid = false;
  } else if (userData?.duration_days) {
    errors.duration_days = "";
  }
  if (userData.duration_nights !== undefined && !userData.duration_nights) {
    errors.duration_nights = "This field is required";
    isValid = false;
  } else if (userData?.duration_nights) {
    errors.duration_nights = "";
  }
  if (
    Array.isArray(userData.tour_tags) && userData.tour_tags.length === 0
  ) {
    errors.tour_tags = "This field is required";
    isValid = false;
  } else if (userData?.tour_tags) {
    errors.tour_tags = "";
  }
  if (
    Array.isArray(userData.tour_facilities) && userData.tour_facilities.length === 0
  ) {
    errors.tour_facilities = "This field is required";
    isValid = false;
  } else if (userData?.tour_facilities) {
    errors.tour_facilities = "";
  }
  if (
    Array.isArray(userData.tour_categories) && userData.tour_categories.length === 0
  ) {
    errors.tour_categories = "This field is required";
    isValid = false;
  } else if (userData?.tour_categories) {
    errors.tour_categories = "";
  }
  if (
    Array.isArray(userData.tour_highlight) && userData.tour_highlight.length === 0
  ) {
    errors.tour_highlight = "This field is required";
    isValid = false;
  } else if (userData?.tour_highlight) {
    errors.tour_highlight = "";
  }
  if (
    Array.isArray(userData.tour_included) && userData.tour_included.length === 0
  ) {
    errors.tour_included = "This field is required";
    isValid = false;
  } else if (userData?.tour_included) {
    errors.tour_included = "";
  }
  if (
    Array.isArray(userData.excluded_included) && userData.excluded_included.length === 0
  ) {
    errors.excluded_included = "This field is required";
    isValid = false;
  } else if (userData?.excluded_included) {
    errors.excluded_included = "";
  }

  if (userData.start_point !== undefined && !userData.start_point) {
    errors.start_point = "This field is required";
    isValid = false;
  } else if (userData?.start_point) {
    errors.start_point = "";
  }


  if (userData.end_point !== undefined && !userData.end_point) {
    errors.end_point = "This field is required";
    isValid = false;
  } else if (userData?.end_point) {
    errors.end_point = "";
  }


  return { errors, isValid };
};

export const ActivityFormValidation = (userData) => {
  let errors = {};
  let isValid = true;

  if (userData.opening_hours !== undefined && !userData.opening_hours) {
    errors.opening_hours = "This filed required !";
    isValid = false;
  } else if (userData?.opening_hours) {
    errors.opening_hours = "";
  }

  if (userData.closing_hours !== undefined && !userData.closing_hours) {
    errors.closing_hours = "This field is required!";
    isValid = false;
  } else if (userData?.closing_hours) {
    if (
      moment(userData.closing_hours, "HH:mm").isSameOrBefore(
        moment(userData.opening_hours, "HH:mm")
      )
    ) {
      errors.closing_hours = "Closing hours must be after opening hours.";
      isValid = false;
    } else {
      errors.closing_hours = "";
    }
  }


  return { errors, isValid };
};

export const SummarizedFormValidation = (userData) => {
  let errors = {};
  let isValid = true;




  return { errors, isValid };
};

export const TransfersFormValidation = (userData) => {
  let errors = {};
  let isValid = true;




  return { errors, isValid };
};

export const StaysFormValidation = (userData) => {
  let errors = {};
  let isValid = true;




  return { errors, isValid };
};

export const AttractionValidation = (userData) => {
  let errors = {};
  let isValid = true;




  return { errors, isValid };
};


// admin profile validation


export const AdminValidation = (userData) => {
  let errors = {};
  let isValid = true;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;
  let capitalRegex = /^[a-zA-Z\s]*$/;

  if (userData.admin_profile !== undefined && !userData.admin_profile) {
    errors.admin_profile = "Admin profile is required.";
    isValid = false;
  } else if (userData?.admin_profile) {
    errors.admin_profile = "";
  }

  if (userData.admin_full_name !== undefined && !userData.admin_full_name) {
    errors.admin_full_name = "Full name is required .";
    isValid = false;
  } else if (
    userData.admin_full_name !== undefined &&
    !capitalRegex.test(userData?.admin_full_name)
  ) {
    errors.admin_full_name = "Full name cannot contain numbers.";
    isValid = false;
  } else if (userData?.admin_full_name) {
    errors.admin_full_name = "";
  }


  if (
    userData?.admin_email_address !== undefined &&
    !userData?.admin_email_address
  ) {
    errors.admin_email_address = "Please enter email address";
    isValid = false;
  } else if (
    userData?.admin_email_address !== undefined &&
    !emailregex.test(userData?.admin_email_address)
  ) {
    errors.admin_email_address = "Please enter valid email address";
    isValid = false;
  } else if (userData?.admin_email_address) {
    errors.admin_email_address = "";
  }


  return { errors, isValid };
};

