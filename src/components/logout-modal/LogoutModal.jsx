import React from 'react'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { clearLocalStorage, setItemLocalStorage } from '../../Utils/browserServices';
import { useDispatch } from 'react-redux';

const LogoutModal = ({ isOpen,setLogoutOpen, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

 

        // const handleLogout = () => {
        //   const fcmToken = localStorage.getItem("fcm_token");
        //   clearLocalStorage();

        //   if (fcmToken) {
        //     setItemLocalStorage("fcm_token", fcmToken);
        //   }
        //   dispatch({ type: "RESET" });
        //   navigate("/login");
        //   onClose();
        //   //  window.location.reload();
        // };

    const handleCloseLogoutModal = () => {
        setLogoutOpen(!isOpen);
    }

       const handleLogout = (event) => {
         event.preventDefault(); // Prevent form submission causing page reload
         const fcmToken = localStorage.getItem("fcm_token");
         clearLocalStorage();

         if (fcmToken) {
           setItemLocalStorage("fcm_token", fcmToken);
         }
         dispatch({ type: "RESET" });
         navigate("/login");
         handleCloseLogoutModal();
       };
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <motion.form
          className="bg-apple-cucumber p-6 rounded-lg shadow-lg w-[25rem] relative"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onSubmit={handleLogout}
        >
          <h2 className="text-lg font-semibold mb-4 text-black-powder">
            Logout
          </h2>
          <p className="text-sm font-medium text-black-powder">
            Are you sure you want to logout?
          </p>
          <div className=" space-y-4">
            <div className="flex justify-center items-center space-x-4 !mt-8">
              <button
                className="bg-black-powder text-apple-cucumber w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm gap-2"
                type="submit"
              >
                Yes
              </button>
              <button
                className=" bg-transparent text-black-powder border border-black-powder/70 w-[4.5rem] h-[2.2rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-sm  gap-2"
                onClick={handleCloseLogoutModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    )
  );
};

export default LogoutModal