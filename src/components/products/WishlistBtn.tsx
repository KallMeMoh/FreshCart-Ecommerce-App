"use client";
import addToWishlist from "@/actions/addToWishlist.action";
import removeFromWishlist from "@/actions/removeFromWishlist.action";
import { WishlistContext } from "@/context/WishlistContext";
import getLoggedUserWishlist from "@/utilities/Wishlist/getLoggedUserWishlist";
import React, { useContext, useMemo, useState } from "react";
import { toast } from "sonner";

export default function WishlistBtn({ productId }: { productId: string }) {
  const context = useContext(WishlistContext);

  if (!context)
    throw new Error("A server error occured while loading wishlist!");

  const { wishlist, setWishlist } = context;
  const wishlisted = useMemo(() => {
    if (typeof wishlist === "number") return false;
    return wishlist.find((prod) => productId === prod._id) !== undefined;
  }, [wishlist, productId]);

  const [disabled, setDisabled] = useState(false);

  async function handleClick() {
    setDisabled(true);

    toast.promise(
      async () => {
        const updateWhislistRes = wishlisted
          ? await removeFromWishlist(productId)
          : await addToWishlist(productId);

        if (updateWhislistRes.success) {
          const { success, payload, error } = await getLoggedUserWishlist();

          if (success) {
            setWishlist(payload.data);
            setDisabled(false);
            return;
          }

          throw new Error(error?.message);
        }

        throw new Error(updateWhislistRes.error?.message);
      },
      {
        position: "bottom-right",
        loading: "Updating your wishlist...",
        success: "Successfuly updated your wishlist.",
        error: (err) => {
          setDisabled(false);
          return err.message;
        },
      }
    );
  }

  return (
    <button
      className='text-pink-700 cursor-pointer text-xl hover:scale-110 transition-all disabled:cursor-not-allowed disabled:opacity-70'
      onClick={handleClick}
      disabled={disabled}
    >
      <i
        className={`${wishlisted ? "fas" : "far"} fa-heart text-sm lg:text-lg`}
      ></i>
    </button>
  );
}
