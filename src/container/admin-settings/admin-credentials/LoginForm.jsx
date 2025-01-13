import { motion } from "framer-motion";
import LoginImg from "../../../assets/login-form.gif";
import ForgotImg from "../../../assets/forgot-password.gif";
import VerifyImg from "../../../assets/verify-otp.gif";
import NewPasswordImg from "../../../assets/new-password.gif";
import bgLoginForm from "../../../assets/travel-bg.jpg";
import { useEffect, useState } from "react";
import {
  LoginFormValidation,
  ResandPasswordValidation,
} from "../../../Utils/validation";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useNavigate } from "react-router-dom";
// import {
//   loginFormData,
//   profileDetails,
// } from "../../Redux/features/adminAuth/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
// import { setItemLocalStorage } from "../../Utils/browserServices";
import OtpInput from "react-otp-input";
import { Eye, EyeOff, KeyRound, LoaderCircle, Mail } from "lucide-react";
import {
  loginFormData,
  profileDetails,
} from "../../../Redux/features/adminAuth/authSlice";
import { setItemLocalStorage } from "../../../Utils/browserServices";
// import {
//   forgotAdminPasswordService,
//   passwordResetService,
//   verifyOtpService,
// } from "../../Services/AdminServices";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customId = "custom-id-yes";
  const [formType, setFormType] = useState("login");
  const [loginFormDetail, setLoginFormDetail] = useState({
    email: "",
    password: "",
  });
  const [fromDetail, setFormDetail] = useState({
    email: "",
  });
  const [fromDetailNewPassword, setFormDetailNewPassword] = useState({
    password: "",
    confirm_password: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingForgot, setLoadingForgot] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [resandloading, setResandLoading] = useState(false);
  const [otp, setOtp] = useState(""); // Initialize with an empty string
  const [resendTimer, setResendTimer] = useState(0); // Set initial timer to 0
  const [resentCode, setResentCode] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmShowPassword, seConfirmtShowPassword] = useState(false);
  const [loadingNewPassword, setLoadingNewPassword] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleForgotPassword = () => setFormType("forgot");
  const handleContinue = () => setFormType("verify");
  const handleVerify = () => setFormType("setNewPassword");
  const handleSave = () => setFormType("login");

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((prevState) => !prevState);
  };
  const toggleShowConfirmPassword = () => {
    seConfirmtShowPassword((prevState) => !prevState);
  };

  const handleChangeForgot = (e) => {
    const { name, value } = e.target;
    const newData = { [name]: value };

    setFormDetail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    const { errors } = LoginFormValidation(newData);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { [name]: value };

    setLoginFormDetail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    const { errors } = LoginFormValidation(newData);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
  };

  const handleChangeOtp = (newValue) => {
    setOtp(newValue);
  };

  const handleChangeNewPassword = (e) => {
    const { name, value } = e.target;
    setFormDetailNewPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate the form data after state update
    const newData = { ...fromDetailNewPassword, [name]: value };
    const { errors } = ResandPasswordValidation(newData);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = LoginFormValidation(loginFormDetail);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
    if (!isValid) return;
    setLoading(true);
    try {
      const response = await dispatch(loginFormData(loginFormDetail));
      if (response?.payload?.status === 200) {
        setItemLocalStorage("userRole", response?.payload?.role);
        toast.success(response?.payload?.message);
        setItemLocalStorage("admin_token", response?.payload?.token);
        const response2 = await dispatch(profileDetails());
        navigate("/");
      } else {
        toast.error(
          response.payload?.message || "Email or Password Does Not Exist"
        );
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (isLoading) => {
    try {
      const payload = {
        email: fromDetail?.email,
      };
      const response = await forgotAdminPasswordService(payload);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      isLoading(false);
    }
  };

  const handleSubmitForgot = async (e) => {
    e.preventDefault();
    const { errors, isValid } = LoginFormValidation(fromDetail);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
    if (!isValid) return;
    setLoadingForgot(true);
    await handleForgot(setLoadingForgot);
    handleContinue();
  };

  const ResendOptDataSubmit = async () => {
    setResandLoading(true);
    await handleForgot(setResandLoading);
    setResendTimer(60);
    setResentCode(false);
    const intervalId = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId);
          setResentCode(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast.error("Please enter the 4 digit OTP", {
        toastId: customId,
      });
      return;
    }
    setLoadingVerify(true);
    try {
      const payload = {
        email: fromDetail?.email,
        otp: Number(otp),
      };
      const response = await verifyOtpService(payload);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        handleVerify();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    const { errors, isValid } = ResandPasswordValidation(fromDetailNewPassword);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
    if (!isValid) return;
    setLoadingNewPassword(true);
    try {
      const payload = {
        email: fromDetail?.email,
        password: fromDetailNewPassword?.password,
        confirm_password: fromDetailNewPassword?.confirm_password,
      };
      const response = await passwordResetService(payload);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        handleSave();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoadingNewPassword(false);
    }
  };

  const handleInputFocus = (index) => {
    setFocusedInput(index);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  useEffect(() => {
    if (resendTimer === 0) {
      clearInterval(resendTimer);
    }
  }, [resendTimer]);

  return (
    <div
      className="relative w-full md:h-screen bg-gradient-to-r from-kings-ransom to-dark-olive-green flex items-center"
      // style={{ backgroundImage: `url(${bgLoginForm})` }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="md:max-w-6xl md:mx-auto bg-apple-cucumber shadow-xl rounded-lg md:p-8 grid grid-cols-12 gap-6 p-4"      >
        {/* Form Section (col-md-8) */}
        <SimpleBar className="p-6 md:h-[500px] md:w-[350px] border border-kings-ransom rounded-lg col-span-12 md:col-span-4">
          {/* login */}
          {formType === "login" && (
            <>
              <div className="mx-auto max-w-xl flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black-powder">
                  Welcome
                </h1>
                <p className="mt-3 text-base text-black-powder/70">
                  We are glad to see you back with us
                </p>
              </div>
              <form
                className="mx-auto mt-8 max-w-xl sm:mt-8"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <div className="mb-4">
                      <label className="input input-bordered flex items-center gap-2 w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-black-powder">
                        <Mail size={15} />
                        <input
                          type="text"
                          className="w-full bg-apple-cucumber border-none appearance-none outline-none focus:outline-none"
                          name="email"
                          value={loginFormDetail.email}
                          onChange={handleChange}
                          placeholder="Email"
                        />
                      </label>
                      {errorMessages?.email && (
                        <span className="label-text-alt text-red-500 text-xs">
                          {errorMessages?.email}
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="input input-bordered flex items-center gap-2 w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-black-powder">
                        <KeyRound size={15} />
                        <input
                          value={loginFormDetail.password}
                          onChange={handleChange}
                          type={showPassword ? "text" : "password"}
                          className="bg-apple-cucumber w-full border-none appearance-none outline-none focus:outline-none"
                          name="password"
                          placeholder="Password"
                        />
                        {loginFormDetail.password && (
                          <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="flex items-center justify-center"
                          >
                            {showPassword ? (
                              <Eye size={15} />
                            ) : (
                              <EyeOff size={15} />
                            )}
                          </button>
                        )}
                      </label>
                      {errorMessages?.password && (
                        <span className="label-text-alt text-red-500 text-xs">
                          {errorMessages?.password}
                        </span>
                      )}
                    </div>
                    <p className="flex flex-row flex-nowrap items-center justify-end mb-3">
                      <span className="flex-none block  px-1 text-sm leading-none  text-black-powder  text-end">
                        <a
                          className="font-medium  hover:underline cursor-pointer hover:text-kings-ransom duration-300 transition-all"
                          onClick={handleForgotPassword}
                        >
                          Forgot Password
                        </a>
                      </span>
                      {/* <span className="flex-grow block border-t"></span> */}
                    </p>
                  </div>
                </div>

                <div className="mt-2">
                  <button
                    className="bg-black-powder text-apple-cucumber w-full h-[2.7rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-base"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Forgot Password */}
          {formType === "forgot" && (
            <>
              <div className="mx-auto max-w-xl flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black-powder">
                  Forgot Password
                </h1>
                <p className="mt-3 text-base text-black-powder">
                  Enter your email for the verification process. We will send a
                  4 digit code to your email.
                </p>
              </div>
              <form
                className="mx-auto mt-8 max-w-xl sm:mt-8"
                onSubmit={handleSubmitForgot}
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <div className="mb-4">
                      <label className="input input-bordered flex items-center gap-2 w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-black-powder">
                        <Mail size={15} />
                        <input
                          type="text"
                          className="bg-apple-cucumber border-none appearance-none outline-none focus:outline-none"
                          name="email"
                          value={fromDetail.email}
                          onChange={handleChangeForgot}
                          placeholder="Email"
                        />
                      </label>
                      {errorMessages?.email && (
                        <span className="label-text-alt text-red-500 text-xs">
                          {errorMessages?.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    className="bg-black-powder text-apple-cucumber w-full h-[2.7rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-base"
                    type="submit"
                    disabled={loadingForgot}
                  >
                    {loadingForgot ? (
                      <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Verify email */}
          {formType === "verify" && (
            <>
              <div className="mx-auto max-w-xl flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black-powder">
                  Enter 4 digit code
                </h1>
                <p className="mt-3 text-base text-black-powder/70">
                  Enter the 4-digit code sent to your email
                </p>
              </div>
              <form
                className="mx-auto mt-8 max-w-xl sm:mt-8"
                onSubmit={handleSubmitOtp}
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <div className="mb-4">
                      <OtpInput
                        value={otp}
                        onChange={handleChangeOtp}
                        numInputs={4}
                        separator={<span className="mx-1">-</span>}
                        isInputNum
                        containerStyle="flex justify-between my-4 px-10"
                        renderInput={(props, index) => (
                          <input
                            {...props}
                            onFocus={() => handleInputFocus(index)}
                            onBlur={handleInputBlur}
                            style={{
                              width: "3rem",
                              height: "3rem",
                              background: "#D8DBBD",
                              border:
                                focusedInput === index
                                  ? "1px solid #B59F78"
                                  : "1px solid #B59F78",
                              borderRadius: "0.375rem",
                              textAlign: "center",
                              fontSize: "1.125rem",
                              fontWeight: 500, // Set font weight to 500
                              color: "#33372C", // Set text color
                              appearance: "none",
                              outline: "none",
                              boxShadow:
                                focusedInput === index
                                  ? "0 0 0 1px #B59F78"
                                  : "none", // Focus ring effect
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    className="bg-black-powder text-apple-cucumber w-full h-[2.7rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-base"
                    type="submit"
                    disabled={loadingVerify}
                  >
                    {loadingVerify ? (
                      <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
                <div className="mt-4">
                  <button
                    className={`${
                      resentCode
                        ? "bg-transparent text-black-powder border border-black-powder/70 hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 "
                        : "bg-kings-ransom/10 text-kings-ransom border border-kings-ransom/70 cursor-not-allowed"
                    } w-full h-[2.7rem] flex items-center justify-center rounded font-medium text-base`}
                    disabled={!resentCode}
                    onClick={ResendOptDataSubmit}
                  >
                    {resentCode ? "Resend" : `Resend in ${resendTimer}s`}
                    {resandloading ? (
                      <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                    ) : (
                      ""
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* set new password */}
          {formType === "setNewPassword" && (
            <>
              <div className="mx-auto max-w-xl flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black-powder">
                  Change Password
                </h1>
                <p className="mt-3 text-base text-black-powder/70">
                  Enter some new password
                </p>
              </div>
              <form
                className="mx-auto mt-8 max-w-xl sm:mt-8"
                onSubmit={handleSubmitNewPassword}
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <div className="mb-4">
                      <label className="input input-bordered flex items-center gap-2 w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-black-powder">
                        <KeyRound size={15} />
                        <input
                          value={fromDetailNewPassword.password}
                          onChange={handleChangeNewPassword}
                          type={showNewPassword ? "text" : "password"}
                          className="bg-apple-cucumber w-full border-none appearance-none outline-none focus:outline-none"
                          name="password"
                          placeholder="New Password"
                        />
                        {fromDetailNewPassword.password && (
                          <button
                            type="button"
                            onClick={toggleShowNewPassword}
                            className="flex items-center justify-center"
                          >
                            {showNewPassword ? (
                              <Eye size={15} />
                            ) : (
                              <EyeOff size={15} />
                            )}
                          </button>
                        )}
                      </label>
                      {errorMessages?.password && (
                        <span className="label-text-alt text-red-500 text-xs">
                          {errorMessages?.password}
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="input input-bordered flex items-center gap-2 w-full px-3 py-2 border border-kings-ransom rounded focus:outline-none focus:border-kings-ransom hover:border-kings-ransom bg-transparent text-sm font-normal text-black-powder">
                        <KeyRound size={15} />
                        <input
                          value={fromDetailNewPassword.confirm_password}
                          onChange={handleChangeNewPassword}
                          type={confirmShowPassword ? "text" : "password"}
                          className="bg-apple-cucumber w-full border-none appearance-none outline-none focus:outline-none"
                          name="confirm_password"
                          placeholder="Confirm Password"
                        />
                        {fromDetailNewPassword.confirm_password && (
                          <button
                            type="button"
                            onClick={toggleShowConfirmPassword}
                            className="flex items-center justify-center"
                          >
                            {confirmShowPassword ? (
                              <Eye size={15} />
                            ) : (
                              <EyeOff size={15} />
                            )}
                          </button>
                        )}
                      </label>
                      {errorMessages?.confirm_password && (
                        <span className="label-text-alt text-red-500 text-xs">
                          {errorMessages?.confirm_password}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    className="bg-black-powder text-apple-cucumber w-full h-[2.7rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-base"
                    type="submit"
                    disabled={loadingNewPassword}
                  >
                    {loadingNewPassword ? (
                      <LoaderCircle className="animate-spin w-4 h-4 text-apple-cucumber" />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </SimpleBar>

        {/* Image Section (col-md-4) */}
        <div className="p-6 md:h-[500px] border border-kings-ransom rounded-lg col-span-12 md:col-span-8 flex justify-center items-center">
          <div className="w-[500px] h-[450px] ">
            {formType === "login" && (
              <img
                src={LoginImg}
                alt="Side Image"
                className="w-full h-full rounded-lg object-cover"
              />
            )}
            {formType === "forgot" && (
              <img
                src={ForgotImg}
                alt="Side Image"
                className="w-full h-full rounded-lg object-cover"
              />
            )}
            {formType === "verify" && (
              <img
                src={VerifyImg}
                alt="Side Image"
                className="w-full h-full rounded-lg object-cover"
              />
            )}
            {formType === "setNewPassword" && (
              <img
                src={NewPasswordImg}
                alt="Side Image"
                className="w-full h-full rounded-lg object-cover"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
