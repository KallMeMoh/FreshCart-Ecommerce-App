import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Popover, PopoverTrigger } from '../ui/popover';

export default function CartSummary({
  amount,
  price,
}: {
  amount: number;
  price: number;
}) {
  console.log(price, 500 - price);
  return (
    <Card className="sticky top-25 rounded-2xl p-5 overflow-clip">
      <div className="absolute inset-0 w-full h-15 bg-emerald-600 flex items-center justify-between p-5">
        <h2 className="text-white font-bold">Order Summary</h2>
        <Badge className="bg-emerald-700">{amount} items in cart</Badge>
      </div>
      <CardHeader className="mt-10 w-full p-0 py-5 ">
        {price > 499 ? (
          <div className="outline-1 outline-emerald-100 bg-emerald-50 p-5 flex gap-2 rounded-xl">
            <div>
              <i className="fa-regular fa-truck"></i>
            </div>
            <div>
              <p>Free Shipping!</p>
              <span className="text-emerald-500">
                Your order is eligible for free shipping.
              </span>
            </div>
          </div>
        ) : (
          <div className="outline-1 outline-amber-100 bg-amber-50 p-5 flex flex-col gap-4 rounded-lg">
            <div>
              <i className="fa-regular fa-truck text-amber-500"></i> You are{' '}
              {500 - price} short of free shipping.
            </div>
            <Progress
              value={Math.min((price / 500) * 100, 100)}
              className="[&>div]:bg-amber-500"
            />
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal: </span>
          <span>{price} EGP</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Shipping:</span>
          <span>
            {' '}
            {price > 499 ? (
              <Badge className="bg-emerald-600">free</Badge>
            ) : (
              '50 EGP'
            )}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between items-end">
          <span className="font-bold">Total:</span>
          <span className="text-emerald-600 text-4xl font-bold">
            {price > 499 ? price : price + 50}{' '}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-2 items-center">
        <div className="flex h-5 items-center gap-2 text-sm text-gray-500">
          <div>
            <i className="fa-solid fa-table-cells-row-lock text-cyan-600"></i>{' '}
            Secure Payment
          </div>
          <Separator orientation="vertical" />
          <div>
            <i className="fa-solid fa-truck-fast text text-orange-400"></i> Fast
            Delivery
          </div>
          <Separator orientation="vertical" />
          <div>
            <i className="fa-solid fa-truck-ramp-box text-emerald-500"></i> Easy
            Returns
          </div>
        </div>
        <Link
          href={`/checkout`}
          className="w-full cursor-pointer bg-emerald-600 p-4 text-center text-2xl rounded-md text-white hover:bg-emerald-600"
        >
          Proceed to Checkout
        </Link>
      </CardContent>
    </Card>
  );
}
