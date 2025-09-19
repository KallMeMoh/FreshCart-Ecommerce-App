import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";
import logo from "../../../public/freshcart-logo.svg";
import Image from "next/image";

export default function Register() {
  return (
    <div className='flex items-center justify-center h-[90vh] m-6 lg:m-0'>
      <div className='w-full md:w-[70%] mx-auto m-4 flex flex-col lg:flex-row items-stretch shadow-gray-400 shadow-md rounded-md overflow-hidden'>
        <div className='w-full lg:w-1/2 bg-gray-100'>
          <RegisterForm />
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
