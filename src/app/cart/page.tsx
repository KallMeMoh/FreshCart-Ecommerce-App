'use client';
import CartItem from '@/components/cart/CartItem';
import React, { useContext, useEffect, useState } from 'react';
import { getLoggedUserCart } from '@/lib/cart/getLoggedUserCart';
import CartCheckoutBtn from '@/components/cart/CartSummary';
import { CartItemType } from '@/types/cartItem.type';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import CartSummary from '@/components/cart/CartSummary';

export default function Cart() {
  const { numberOfItems, setNumberOfItems } = useCart();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{
    _id: string;
    products: CartItemType[];
  }>({ _id: '', products: [] });

  async function init() {
    const { success, payload, error } = await getLoggedUserCart();

    if (success) {
      setCart({ _id: payload.cartId, products: payload.data.products });
      setLoading(false);
      return;
    }

    toast.error(error?.message, {
      position: 'bottom-right',
      duration: 2000,
    });
  }

  useEffect(() => {
    init();
  }, [numberOfItems]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-8 min-h-[90vh]">
        <span className="loader"></span>
      </div>
    );

  let total = 0;
  return (
    <div className="w-[90%] xl:w-[70%] mx-auto py-8 min-h-[90vh] flex gap-8 flex-col lg:flex-row">
      <div className="lg:w-8/12 flex flex-col gap-4">
        {cart.products.length > 0 ? (
          cart.products.map((cartItem: CartItemType) => {
            total += cartItem.count * cartItem.price;
            return (
              <CartItem
                key={cartItem._id}
                cartItem={cartItem}
                setNumberOfItems={setNumberOfItems}
              />
            );
          })
        ) : (
          <div className="mt-24 text-center">
            <h1 className="text-3xl md:text-5xl">Your cart is empty!</h1>
            <Link href="/products" className="text-gray-600 text-xl underline">
              Ready to start shopping?
            </Link>
          </div>
        )}
      </div>
      {cart.products.length > 0 && (
        <div className="lg:w-4/12">
          <CartSummary amount={numberOfItems} price={total} />
        </div>
      )}
    </div>
  );
}
