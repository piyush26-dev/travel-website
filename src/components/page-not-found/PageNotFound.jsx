import React from "react";
import { useNavigate } from "react-router-dom";
import PageNotFoundImg from "../../assets/page-not-found.gif";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goToPage = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[500px] h-[500px] space-y-6 ">
        <img
          src={PageNotFoundImg}
          alt="Side Image"
          className="w-full h-full rounded-lg object-cover"
        />
        <div className="flex items-center justify-center">
          {" "}
          <button
            className="bg-black-powder text-apple-cucumber w-[15rem] h-[2.7rem] flex items-center justify-center rounded hover:bg-kings-ransom hover:text-black-powder transition-all duration-300 font-medium text-base gap-2"
            onClick={goToPage}
          >
            Go To Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
