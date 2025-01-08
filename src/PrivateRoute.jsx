import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "./Utils/Auth";
import SideBar from "./container/side-bar/SideBar";
import TopNavbar from "./container/top-navbar/TopNavbar";
import LogoutModal from "./components/logout-modal/LogoutModal";

export const PrivateRoute = ({
  open,
  setOpen,
  onButtonClick,
  logoutOpen,
  setLogoutOpen,
  onCloseLogout,
  onButtonLogOutClick,
}) => {
  const adminLogin = isLogin();

  return (
    <>
      {adminLogin ? (
        <>
          <div className="flex ">
            <SideBar
              open={open}
              setOpen={setOpen}
              logoutOpen={logoutOpen}
              setLogoutOpen={setLogoutOpen}
              onCloseLogout={onCloseLogout}
              onButtonLogOutClick={onButtonLogOutClick}
            />
            <div
              className={`w-full  ${open ? "md:ml-[14rem]" : "md:ml-[4rem]"}`}
            >
              {" "}
              <TopNavbar onButtonClick={onButtonClick} />
              <div className=" p-7 scrollable-content  ">
                {" "}
                <Outlet />
              </div>
            </div>
          </div>
          <LogoutModal
            isOpen={logoutOpen}
            setLogoutOpen={setLogoutOpen}
            OnClose={onCloseLogout}
          />
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};
