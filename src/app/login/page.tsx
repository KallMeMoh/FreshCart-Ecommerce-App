import Image from "next/image";
import React from "react";
import logo from "../../../public/freshcart-logo.svg";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <div className='flex items-center justify-center mx-6 my-12 lg:my-0 lg:min-h-[90vh]'>
      <div className='w-full md:w-[70%] h-[400px] mx-auto m-4 flex flex-col lg:flex-row items-stretch shadow-gray-400 shadow-md rounded-md overflow-hidden'>
        <div className='w-full h-full lg:w-1/2 bg-gray-100'>
          <LoginForm />
        </div>
        <div className='w-full lg:w-1/2 bg-gray-100'>
          <div className='hidden lg:flex flex-col h-full justify-center items-center gap-12 bg-slate-400 text-gray-200'>
            <Image src={logo} alt='FreshCart Logo' width={300} />
            <div className='moto text-center text-xl'>
              <h1>Easier, Faster, Most Secure</h1>
              <h2>Shoping Experience</h2>
            </div>
            <h1 className='text-lg'>Register Now!</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
