import Products from '@/components/products/Products';
import Categories from '@/components/home/categories/Categories';
import MainSlider from '@/components/home/main-slider/MainSlider';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <MainSlider />
      <Categories />
      <Products />
    </div>
  );
}
