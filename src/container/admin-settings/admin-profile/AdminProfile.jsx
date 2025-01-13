import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  Eye,
  EyeOff,
  ImageUp,
  KeyRound,
  LoaderCircle,
  MoveLeft,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import dummyProfile from "../../../assets/dummy-profile.png";
import { AdminValidation } from "../../../Utils/validation";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const adminProfileDetails = {
    profile: dummyProfile,
    name: "Mark Deo",
    email: "markdeo148@gmail.com",
  };

  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(dummyProfile);
  const [proImgUrl, setProImgUrl] = useState(null);
  const [isEditable, setIsEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [loadingInput, setLoadingInput] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [validPassWord, setValidPassWord] = useState(null);

  const [editAdminDetails, setEditAdminDetails] = useState({
    admin_profile: adminProfileDetails?.profile || "",
    admin_full_name: adminProfileDetails?.name || "",
    admin_email_address: adminProfileDetails?.email || "",
  });

  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { [name]: value };

    setEditAdminDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    const { errors } = AdminValidation(newData);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfileUrl(URL.createObjectURL(file));
    setSelectedFile(file);
    setAvatarSrc(URL.createObjectURL(file));
    setEditAdminDetails((prevDetails) => ({
      ...prevDetails,
      admin_profile: file,
    }));

    const xyz = {
      target: {
        value: file,
        name: "admin_profile",
      },
    };
    handleChange(xyz);
  };

  const handleEditOn = () => {
    setIsLoading(true); // Start loading
    setTimeout(() => {
      setIsEditable(false); // End loading and toggle editable state
      setIsLoading(false);
      toast.success("Edit profile"); // Trigger success toast
    }, 2000); // 2 minutes delay
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value === "") {
      setErrorMessages({
        ...errorMessages,
        password: "Please enter your current password.",
      });
    } else {
      setErrorMessages({
        ...errorMessages,
        password: "",
      });
    }
  };

  const handleResetPassword = async () => {
    setLoadingButton(true); // Button ko loading state me set karna

    // 2-second delay
    setTimeout(() => {
      toast.success("Password matched!");
      setIsModalPasswordOpen(false); // Modal close karna
      setIsPasswordModalOpen(true); // Password modal open karna
      setLoadingButton(false); // Loading button state reset karna
    }, 2000);
  };

  //   const handleResetPassword = async () => {
  //     setLoadingButton(true);
  //     try {
  //       const payload = {
  //         email: adminProfileDetails?.email,
  //         password: password,
  //       };
  //       const response = await checkPasswordService(payload);
  //       if (response?.status === 200) {
  //         toast.success(response?.data?.message);
  //         setIsModalPasswordOpen(false);
  //         setIsPasswordModalOpen(true);
  //         setPassword("");
  //       } else {
  //         toast.error(response?.data?.message);
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //       toast.error("An error occurred. Please try again.");
  //     } finally {
  //       setLoadingButton(false);
  //     }
  //   };

    const handleSave = async () => {
      if (newPassword && confirmPassword && newPassword === confirmPassword) {
        setLoadingPassword(true);
        // try {
        //   const payload = {
        //     email: adminProfileDetails?.email,
        //     password: newPassword,
        //   };
        //   const response = await changePasswordService(payload);
        //   if (response?.status === 200) {
        //     toast.success(response?.data?.message);
        //     setIsPasswordModalOpen(false);
        //     setIsModalPasswordOpen(false);
        //     setNewPassword("");
        //     setConfirmPassword("");
        //   } else {
        //     toast.error(response?.data?.message);
        //   }
        // } catch (error) {
        //   console.log("error", error);
        //   toast.error("An error occurred. Please try again.");
        // } finally {
        //   setLoadingPassword(false);
        // }
        setLoadingPassword(true);
        setIsPasswordModalOpen(false);
        setIsModalPasswordOpen(false);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setValidPassWord(
          "Almost there! Just make sure both passwords match to proceed."
        );
      }
      
    };

  useEffect(() => {
    if (editAdminDetails?.admin_profile instanceof File) {
      const imgURL = URL.createObjectURL(editAdminDetails?.admin_profile);
      setProImgUrl(imgURL);
    } else {
      setProImgUrl(null);
    }
  }, [editAdminDetails?.admin_profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = AdminValidation(editAdminDetails);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
    if (!isValid) return;
    setLoading(true);

    // const {
    //   admin_profile,
    //   admin_full_name,
    //   admin_email_address,
    //   admin_phone_number,
    // } = editAdminDetails;

    // const newData = new FormData();
    // newData.append("profile", admin_profile);
    // newData.append("full_name", admin_full_name);
    // newData.append("address", admin_email_address);
    // newData.append("phone_no", admin_phone_number);

    // try {
    //   const response = await adminProfileUpdate(newData);
    //   if (response?.status === 200) {
    //     await dispatch(profileDetails());
    //     toast.success(response?.data?.message);
    //     setIsProfileEdit(false);
    //   } else {
    //     toast.error(response?.data?.message);
    //   }
    // } catch (error) {
    //   console.log("error", error);
    //   toast.error("An error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  const PasswordModalOpen = () => {
    setIsModalPasswordOpen(true);
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
          <div className="flex items-center justify-end mb-4 space-x-4">
            <button
              className="bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm flex items-center gap-2"
              onClick={PasswordModalOpen}
            >
              <KeyRound size={16} />
            </button>

            <div className="flex items-center">
              {!isEditable ? (
                <>
                  <button
                    className="bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm flex items-center gap-2"
                    onClick={() => setIsEditable(!isEditable)}
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className=" bg-black-powder text-apple-cucumber justify-center w-8 h-8 rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm flex items-center gap-2"
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-8 relative">
              <label
                htmlFor="profilePhotoUpload"
                className="flex flex-col items-center"
              >
                <motion.div
                  className="relative flex items-center justify-center w-28 h-w-28 rounded-full overflow-hidden border-4 border-kings-ransom cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="file"
                    id="profilePhotoUpload"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    name="admin_profile"
                    className="hidden"
                    disabled={isEditable}
                  />
                  {proImgUrl ? (
                    <img
                      src={proImgUrl}
                      alt="Profile Avatar"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <img
                      src={
                        adminProfileDetails?.profile ||
                        dummyProfile ||
                        avatarSrc
                      }
                      alt="Profile Avatar"
                      className="object-cover w-full h-full"
                    />
                  )}
                  {isEditable ? (
                    <div className=" cursor-not-allowed"></div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-25">
                      <ImageUp size={50} className="text-white" />
                    </div>
                  )}
                </motion.div>
                {/* Error Message for admin_profile */}
                {errorMessages?.admin_profile && (
                  <span className="label-text-alt text-red-500">
                    {errorMessages?.admin_profile}
                  </span>
                )}
                {!isEditable && (
                  <label className="flex items-center justify-center text-gray-700 my-2 font-medium">
                    Profile <span className="text-red-500">*</span>
                  </label>
                )}
              </label>
            </div>
            <div className="">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Name
                {!isEditable && <span className="text-red-500"> *</span>}
              </label>

              <input
                type="text"
                name="admin_full_name"
                onChange={handleChange}
                value={editAdminDetails?.admin_full_name}
                placeholder="Enter Your Name"
                readOnly={isEditable}
                className={`${
                  isEditable && "cursor-not-allowed"
                } w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal`}
              />
              {errorMessages?.full_name && (
                <span className="label-text-alt text-red-500 text-xs">
                  {errorMessages?.full_name}
                </span>
              )}
            </div>
            <div className="">
              <label className="block text-sm font-medium text-black-powder mb-1">
                Email
              </label>
              <input
                type="text"
                name="admin_email_address"
                onChange={handleChange}
                value={editAdminDetails?.admin_email_address}
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal cursor-not-allowed"
                readOnly
              />
              {errorMessages?.admin_email_address && (
                <span className="label-text-alt text-red-500 text-xs">
                  {errorMessages?.admin_email_address}
                </span>
              )}
            </div>

            {!isEditable && (
              <div className="flex justify-center items-center space-x-4 !mt-8">
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
                <button
                  className=" bg-transparent text-black-powder border border-black-powder/70 w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm  gap-2"
                  onClick={() => setIsEditable(!isEditable)}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
      {isModalPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.form
            className="bg-apple-cucumber p-6 rounded-lg shadow-lg w-[25rem] relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-lg font-semibold mb-4 text-black-powder">
              Password Verification
            </h2>
            <div className=" space-y-4">
              <div className="relative mb-4">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="New Password"
                  className={` w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal`}
                />

                {loadingInput ? (
                  <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                ) : (
                  <button
                    type="button"
                    className="absolute right-3 top-[0.8rem] text-black-powder"
                    onClick={() => setOldShowPassword(!showOldPassword)}
                  >
                    {showOldPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                )}
                {errorMessages?.password && (
                  <span className="label-text-alt text-red-500">
                    {errorMessages?.password}
                  </span>
                )}
              </div>
              <div className="flex justify-center items-center space-x-4  !mt-8">
                <motion.button
                  className={`${
                    password
                      ? "bg-black-powder hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 "
                      : "bg-kings-ransom/70 cursor-not-allowed text-black-powder"
                  } text-apple-cucumber w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded font-medium text-sm gap-2`}
                  whileHover={password ? { scale: 1.05 } : {}}
                  whileTap={password ? { scale: 0.95 } : {}}
                  onClick={handleResetPassword}
                  disabled={!password}
                >
                  {loadingButton ? (
                    <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                  ) : (
                    "Verify"
                  )}
                </motion.button>
                <button
                  className=" bg-transparent text-black-powder border border-black-powder/70 w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm  gap-2"
                  onClick={() => setIsModalPasswordOpen(!isModalPasswordOpen)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      )}
      {/* new password */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.form
            className="bg-apple-cucumber p-6 rounded-lg shadow-lg w-[25rem] relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-lg font-semibold mb-4 text-black-powder">
              Change New Password
            </h2>

            <div className="relative mb-4">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setValidPassWord("");
                }}
                className={` w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal`}
              />
              <button
                type="button"
                className="absolute right-3 top-[0.8rem] text-black-powder"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setValidPassWord("");
                }}
                className={` w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal`}
              />
              <button
                type="button"
                className="absolute right-3 top-[0.8rem] text-black-powder"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {validPassWord && (
              <span className="label-text-alt text-red-500 text-xs">
                {validPassWord}
              </span>
            )}

            <div className="flex justify-center items-center  !mt-8">
              <motion.button
                className={`bg-black-powder hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 text-apple-cucumber w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded font-medium text-sm gap-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={loading}
              >
                {loadingPassword ? (
                  <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                ) : (
                  "Save"
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      )}
    </>
  );
};

export default AdminProfile;
