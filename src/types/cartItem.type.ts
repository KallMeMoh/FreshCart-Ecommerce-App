import { ProductType } from './product.type';

export interface CartItemType {
  _id: string;
  count: number;
  product: ProductType;
  price: number;
}
