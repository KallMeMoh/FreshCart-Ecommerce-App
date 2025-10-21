"use client";
import Product from "@/components/products/Product";
import { ProductType } from "@/types/product.type";
import React, { useContext } from "react";
import image from "../../../public/error.svg";
import Image from "next/image";
import { WishlistContext } from "@/context/WishlistContext";

export default function WishlistPage() {
  const context = useContext(WishlistContext);
  if (!context) {
    return (
      <div className='w-[90%] lg:w-[70%] mx-auto p-4 flex flex-col items-center gap-2 mt-8'>
        <h1 className='text-gray-600 mb-0'>Something went wrong!</h1>
        <span>Please try again later.</span>
        <Image src={image} alt='404 Products Not Found!' width={800} />
      </div>
    );
  }

  const { wishlist } = context;
  if (typeof wishlist === "number") {
    return (
      <div className='h-[90vh] flex flex-col items-center justify-center py-2'>
        <span className='loader'></span>
      </div>
    );
  } else {
    if (wishlist.length === 0) {
      return (
        <div className='flex flex-col items-center py-2 min-h-[90vh]'>
          <div className='w-[90%] lg:w-[70%] mx-auto my-4'>
            <h1 className='w-full text-center text-gray-600 text-lg mt-8 lg:text-4xl'>
              You have no products currently wishlisted!
            </h1>
          </div>
        </div>
      );
    }

    return (
      <div className='flex flex-col items-center py-2 min-h-[90vh]'>
        <div className='w-[90%] lg:w-[70%] mx-auto my-4'>
          <div className='flex flex-wrap'>
            {wishlist.map((item: ProductType) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
