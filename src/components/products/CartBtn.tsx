'use client';
import { useCart } from '@/context/CartContext';
import { addToCart } from '@/lib/cart/addToCart.action';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function CartBtn({ productId }: { productId: string }) {
  const { setNumberOfItems } = useCart();

  async function handleClick() {
    toast.promise(
      async () => {
        const { success, payload, error } = await addToCart(productId);

        if (success && payload) return payload;

        throw new Error(error?.message);
      },
      {
        position: 'bottom-right',
        loading: 'Updating your cart...',
        success: (res) => {
          setNumberOfItems((p) => p + 1);
          return res.message;
        },
        error: (err) => err.message,
      },
    );
  }

  return (
    <Button
      className="bg-black text-white cursor-pointer w-full"
      onClick={handleClick}
    >
      Add To Cart
    </Button>
  );
}
