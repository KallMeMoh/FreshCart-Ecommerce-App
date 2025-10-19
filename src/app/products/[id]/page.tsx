import checkWishlist from "@/utilities/Wishlist/checkWishlist";
import getProductDetails from "@/utilities/Product/getProductDetails";
import getRelatedProducts from "@/utilities/Product/getRelatedProducts";
import CartBtn from "@/components/products/CartBtn";
import Product from "@/components/products/Product";
import WishlistBtn from "@/components/products/WishlistBtn";
import { ProductType } from "@/types/product.type";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import image from "../../../../public/error.svg";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id: productId } = await params;

    const {
      payload: { data: product },
      error: productError,
    } = await getProductDetails(productId);

    if (productError) throw new Error(productError.message);

    const { payload: relatedProducts, error: relatedProductsError } =
      await getRelatedProducts(productId, product.category._id);
    if (relatedProductsError) throw new Error(relatedProductsError.message);

    if (relatedProducts.length > 4) relatedProducts.pop();
    const inWishlist: boolean = await checkWishlist(productId);

    return (
      <div className='w-[70%] mx-auto my-12 min-h-[90vh]'>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-2/5 lg:w-1/4 p-4'>
            <div className='relative'>
              <div className='absolute top-4 left-4'>
                <WishlistBtn productId={product._id} state={inWishlist} />
              </div>
              <Image
                src={product.imageCover}
                className='w-full'
                alt='product cover image'
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className='w-full md:w-3/5 lg:w-3/4 p-4 flex flex-col justify-between'>
            <div>
              <h1 className='my-4 font-bold text-3xl'>{product.title}</h1>
              <p className='text-slate-500 mb-4'>{product.description}</p>
              <div className='flex gap-2'>
                <p className='text-gray-600'>
                  <Link href={`/categories/${product.category._id}`}>
                    {product.category.name}
                  </Link>
                </p>
                {" | "}
                <p className='text-emerald-600'>
                  <Link href={`/brands/${product.brand._id}`}>
                    {product.brand.name}
                  </Link>
                </p>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-4'>
              <div className='flex justify-between w-full lg:w-3/4 mt-4 bg-slate-100 p-2 rounded-lg'>
                <span>{product.price} EGP</span>
                <span>
                  {product.ratingsAverage}
                  <i className='fas fa-star text-yellow-500'></i>
                </span>
              </div>
              <div className='w-full lg:w-1/4 mt-0 lg:mt-4'>
                <CartBtn productId={product._id} />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <h2 className='text-gray-600'>You may also like:</h2>
        </div>
        <div className='flex overflow-x-scroll'>
          {relatedProducts.map((currProd: ProductType) => (
            <Product key={currProd._id} product={currProd} />
          ))}
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    if (err instanceof Error)
      return (
        <div className='w-[90%] lg:w-[70%] mx-auto p-4 flex flex-col items-center gap-2 mt-8'>
          <h1 className='text-gray-600 mb-0'>{err.message}</h1>
          <span>Please try again later.</span>
          <Image src={image} alt='404 Products Not Found!' width={800} />
        </div>
      );
  }
}
