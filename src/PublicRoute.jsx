import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "./Utils/Auth";

export const PublicRoute = () => {
  const adminLogin = isLogin();
  return <>{!adminLogin ? <Outlet /> : <Navigate replace to={`/`} />}</>;
};
