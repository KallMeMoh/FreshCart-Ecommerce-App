'use client';
import { removeCartItem } from '@/lib/cart/removeCartItem';
import { updateCartItem } from '@/lib/cart/updateCartItem';
import { CartItemType } from '@/types/cartItem.type';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function CartItem({
  cartItem,
  setNumberOfItems,
}: {
  cartItem: CartItemType;
  setNumberOfItems: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [actionsDisabled, setActionsDisabled] = useState(false);
  const { count, product, price } = cartItem;

  async function handleUpdate(incremental: boolean) {
    setActionsDisabled(true);
    const { success, payload, error } = await updateCartItem(
      product._id,
      incremental ? count + 1 : count - 1,
    );
    if (success && payload.status === 'success') {
      setNumberOfItems((prev) => (incremental ? prev + 1 : prev - 1));
      toast.success('Product was updated successfully!', {
        position: 'bottom-right',
        duration: 2000,
      });
    } else {
      toast.error(error?.message, {
        position: 'bottom-right',
        duration: 2000,
      });
    }
    setActionsDisabled(false);
  }

  async function handleDelete() {
    setActionsDisabled(true);
    const { success, payload, error } = await removeCartItem(product._id);
    if (success && payload.status === 'success') {
      setNumberOfItems((prev: number) => prev - count);
      toast.success('Product was removed successfully!', {
        position: 'bottom-right',
        duration: 2000,
      });
    } else {
      toast.error(error?.message, {
        position: 'bottom-right',
        duration: 2000,
      });
    }
    setActionsDisabled(false);
  }

  return (
    <div className="overflow-hidden shadow-md border-2 shadow-gray-300 flex flex-col md:flex-row rounded-lg p-4 lg:p-2">
      <div className="w-full md:w-2/12 my-auto relative h-30">
        <Image
          src={cartItem.product.imageCover}
          alt="Product Image"
          className="object-contain h-50 md:h-37.5 lg:h-50"
          fill
        />
      </div>
      <div className="flex flex-1 items-center justify-between md:px-4">
        <div className="w-full">
          <h1 className="mb-2 font-bold line-clamp-2 text-xl md:text-2xl">
            <Link href={`/products/${product._id}`}>{product.title}</Link>
          </h1>
          <p className="text-gray-500">
            <Link
              href={`/categories/${product.category._id}`}
              className="text-emerald-600"
            >
              {product.category.name}
            </Link>
            {' | '}
            <Link href={`/brands/${product.brand._id}`}>
              {product.brand.name}
            </Link>
          </p>
          <div className="flex justify-between">
            <span className="text-gray-700">{price} EGP</span>
            <span>
              {product.ratingsAverage}{' '}
              <i className="fas fa-star text-amber-500"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/12 flex flex-col items-center justify-center gap-2">
        <div className="w-full flex items-center justify-center">
          <span className="underline underline-offset-4">
            {price * count} EGP
          </span>
        </div>
        <div className="w-full flex md:flex-col gap-2 items-center justify-center">
          <div className="w-35 md:w-full flex gap-2 items-center justify-center bg-white rounded-sm p-1 border-2 border-gray-200">
            <button
              className="w-1/3 aspect-square bg-gray-100 rounded-sm cursor-pointer hover:bg-gray-200"
              onClick={() => handleUpdate(false)}
              disabled={actionsDisabled}
            >
              {actionsDisabled ? (
                <i className="fas fa-spinner rotate-360 animate-spin"></i>
              ) : (
                <i className="fas fa-minus"></i>
              )}
            </button>
            <div className="w-1/3 aspect-square mx-2 text-lg flex items-center justify-center">
              {count}
            </div>
            <button
              className="w-1/3 aspect-square bg-emerald-500 rounded-sm cursor-pointer hover:bg-emerald-600"
              onClick={() => handleUpdate(true)}
              disabled={actionsDisabled}
            >
              {actionsDisabled ? (
                <i className="fas fa-spinner rotate-360 animate-spin"></i>
              ) : (
                <i className="fas fa-plus text-white"></i>
              )}
            </button>
          </div>

          <button
            onClick={handleDelete}
            className="w-5 md:w-full h-5 bg-red-100 text-red-500 rounded-lg border-2 border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer flex items-center justify-center p-5 text-sm md:text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={actionsDisabled}
          >
            {actionsDisabled ? (
              <i className="fas fa-spinner rotate-360 animate-spin"></i>
            ) : (
              <i className="fas fa-trash"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
