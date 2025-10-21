"use client";
import { ProductType } from "@/types/product.type";
import getLoggedUserWishlist from "@/utilities/Wishlist/getLoggedUserWishlist";
import { createContext, useEffect, useState, ReactNode } from "react";

export type WishlistContextType = {
  wishlist: ProductType[] | number;
  setWishlist: React.Dispatch<React.SetStateAction<ProductType[] | number>>;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

type WishlistContextProviderType = {
  children: ReactNode;
};

export default function WishlistContextProvider({
  children,
}: WishlistContextProviderType) {
  const [wishlist, setWishlist] = useState<ProductType[] | number>(0);

  async function getUserWishlist() {
    try {
      const {
        success,
        payload: { data },
        error,
      } = await getLoggedUserWishlist();

      if (success) return setWishlist(data);

      throw new Error(error?.message);
    } catch (_) {
      setWishlist(0);
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
