'use client';
import { useWishlist } from '@/context/WishlistContext';
import { addToWishlist } from '@/lib/wishlist/addToWishlist';
import { getLoggedUserWishlist } from '@/lib/wishlist/getLoggedUserWishlist';
import { removeFromWishlist } from '@/lib/wishlist/removeFromWishlist';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function WishlistBtn({ productId }: { productId: string }) {
  const { wishlist, setWishlist } = useWishlist();

  const wishlisted = useMemo(() => {
    if (typeof wishlist === 'number') return false;
    return wishlist.find((prod) => productId === prod._id) !== undefined;
  }, [wishlist, productId]);

  const [disabled, setDisabled] = useState(false);

  async function handleClick() {
    setDisabled(true);

    toast.promise(
      async () => {
        const updateWishlistRes = wishlisted
          ? await removeFromWishlist(productId)
          : await addToWishlist(productId);

        if (updateWishlistRes.success) {
          const { success, payload, error } = await getLoggedUserWishlist();

          if (success) {
            setWishlist(payload.data);
            setDisabled(false);
            return;
          }

          throw new Error(error?.message);
        }

        throw new Error(updateWishlistRes.error?.message);
      },
      {
        position: 'bottom-right',
        loading: 'Updating your wishlist...',
        success: 'Successfully updated your wishlist.',
        error: (err) => {
          setDisabled(false);
          return err.message;
        },
      },
    );
  }

  return (
    <button
      className="text-pink-700 cursor-pointer text-xl hover:scale-110 transition-all disabled:cursor-not-allowed disabled:opacity-70"
      onClick={handleClick}
      disabled={disabled}
    >
      <i
        className={`${wishlisted ? 'fas' : 'far'} fa-heart text-sm lg:text-lg`}
      ></i>
    </button>
  );
}
