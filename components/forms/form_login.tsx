"use client";

import { Spacer } from "@nextui-org/react";

import { RedirectGoogleAuth } from "@/common/api/sso/google/auth.redirect";
import ButtonLogin from "../buttons/ButtonLogin";

import { FaFacebook } from "react-icons/fa6";
import { IoLogoMicrosoft } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const FormLogin = () => {
  return (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <div className="md:block hidden w-1/2 h-[80vh] overflow-hidden ">
        <img
          className="w-full h-full object-cover object-center"
          src="https://i.pinimg.com/564x/4a/90/33/4a903338c0e478248153bd8f3f6f6745.jpg"
          alt="login"
        />
      </div>
      <div className="md:w-[50%] sm:px-10 w-full px-0">
        <div className="flex gap-5">
          <p className="text-[32px] text-gray-500 font-medium mb-5">Register</p>
          <p className="text-[32px] font-medium mb-5">Login</p>
        </div>
        <ButtonLogin
          onClick={RedirectGoogleAuth}
          icon={<FcGoogle />}
          content={"Login with Google"}
        />
        <Spacer y={4} />
        <ButtonLogin
          icon={<FaFacebook className="text-blue-600" />}
          content={"Login with Facebook"}
        />
        <Spacer y={4} />
        <ButtonLogin
          icon={<IoLogoMicrosoft className="text-blue-500" />}
          content={"Login with Microsoft"}
        />
        <Spacer y={4} />

        <p>
          Don't have an account? <a className="text-blue-500">Sign up</a> now!
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
