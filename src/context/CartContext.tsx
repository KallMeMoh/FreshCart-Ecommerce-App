'use client';
import { getLoggedUserCart } from '@/lib/cart/getLoggedUserCart';
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';

type CartContextType = {
  numberOfItems: number;
  setNumberOfItems: React.Dispatch<React.SetStateAction<number>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(-1);

  async function getUserCart() {
    try {
      const { success, payload, error } = await getLoggedUserCart();

      if (success) {
        return setNumberOfItems(
          payload.data.products.reduce(
            (acc: number, currVal: { count: number }) => acc + currVal.count,
            0,
          ),
        );
      }
      throw new Error(error?.message);
    } catch (_) {
      setNumberOfItems(-1);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfItems, setNumberOfItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error('useWishlist must be within a WishlistContextProvider');

  return context;
}
