'use client';
import Product from '@/components/products/Product';
import { useWishlist } from '@/context/WishlistContext';
import { ProductType } from '@/types/product.type';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  if (typeof wishlist === 'number') {
    return (
      <div className="h-[90vh] flex flex-col items-center justify-center py-2">
        <span className="loader"></span>
      </div>
    );
  } else {
    if (wishlist.length === 0) {
      return (
        <div className="flex flex-col items-center py-2 min-h-[90vh]">
          <div className="w-[90%] lg:w-[70%] mx-auto my-4">
            <h1 className="w-full text-center text-gray-600 text-lg mt-8 lg:text-4xl">
              You have no products currently wishlisted!
            </h1>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center py-2 min-h-[90vh]">
        <div className="w-[90%] lg:w-[70%] mx-auto my-4">
          <div className="flex flex-wrap">
            {wishlist.map((item: ProductType) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
