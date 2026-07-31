'use client';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import logo from '../../public/freshcart-logo.svg';
import AvatarDropdown from './AvatarDropdown';

export default function Navbar() {
  const pathname = usePathname();
  const [menuToggle, setMenuToggle] = useState(false);
  const { data: session } = useSession();
  const { numberOfItems } = useCart();

  return (
    <nav className="bg-white shadow-sm shadow-gray-300 fixed z-50 w-full">
      <div className="w-full lg:w-[90%] mx-auto p-4 flex gap-4">
        <div>
          <Link href="/">
            <Image src={logo} alt="Fresh Cart Logo" width="200" />
          </Link>
        </div>

        <div className="grow">
          <div className="hidden md:flex gap-4 h-full">
            <div className="grow flex justify-between h-full">
              <ul className="flex gap-4 items-center text-gray-600">
                <li className="hover:underline hover:text-emerald-600">
                  <Link
                    href="/"
                    className={pathname === '/' ? 'text-emerald-600' : ''}
                  >
                    Home
                  </Link>
                </li>
                {session && (
                  <li className="hover:underline hover:text-emerald-600">
                    <Link
                      href="/cart"
                      className={`relative ${
                        pathname === '/cart' && 'text-emerald-600'
                      }`}
                    >
                      Cart
                      {numberOfItems! > 0 ? (
                        <span className="absolute -top-2.5 -right-2.5 bg-black text-white size-5 rounded-full text-center text-sm">
                          {numberOfItems}
                        </span>
                      ) : (
                        ''
                      )}
                    </Link>
                  </li>
                )}
                <li className="hover:underline hover:text-emerald-600">
                  <Link
                    href="/products"
                    className={
                      pathname === '/products' ? 'text-emerald-600' : ''
                    }
                  >
                    Products
                  </Link>
                </li>
                <li className="hover:underline hover:text-emerald-600">
                  <Link
                    href="/categories"
                    className={
                      pathname === '/categories' ? 'text-emerald-600' : ''
                    }
                  >
                    Categories
                  </Link>
                </li>
                <li className="hover:underline hover:text-emerald-600">
                  <Link
                    href="/brands"
                    className={pathname === '/brands' ? 'text-emerald-600' : ''}
                  >
                    Brands
                  </Link>
                </li>
              </ul>
              <ul className="hidden lg:flex gap-2 text-lg items-center">
                <li>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 hover:text-pink-500 fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 hover:text-blue-600 fab fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 fab fa-tiktok"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 fab fa-x-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 hover:text-blue-900 fab fa-linkedin"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 hover:text-red-600 fab fa-youtube"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="flex gap-2 text-gray-600 items-center">
              {!session ? (
                <>
                  <li>
                    <Link href="/login" className="hover:text-emerald-600">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="hover:text-emerald-600">
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <AvatarDropdown />
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuToggle(!menuToggle)}
            className="hover:bg-gray-50 rounded-md p-2 block relative"
          >
            <i className="fas fa-bars text-2xl font-bold text-gray-600 cursor-pointer"></i>
            {numberOfItems! > 0 ? (
              <span className="absolute -top-1.25 -right-1.25 bg-black text-white size-5 rounded-full text-center text-sm">
                {numberOfItems}
              </span>
            ) : (
              ''
            )}
          </button>
        </div>
      </div>

      {menuToggle && (
        <div className="absolute w-full z-50 md:hidden">
          <div className="w-[95%] mx-auto p-4 bg-white rounded-lg mt-2 shadow-md shadow-gray-200">
            <ul className="flex flex-col text-center">
              <li
                onClick={() => setMenuToggle(false)}
                className="mb-2 rounded-md overflow-hidden text-white bg-black hover:bg-gray-950"
              >
                <Link className="block p-2" href="/">
                  Home
                </Link>
              </li>
              {session && (
                <li
                  onClick={() => setMenuToggle(false)}
                  className="mb-2 rounded-md overflow-hidden text-white bg-black hover:bg-gray-950"
                >
                  <Link
                    className="flex items-center gap-2 justify-center p-2"
                    href="/cart"
                  >
                    Cart
                    {numberOfItems! > 0 ? (
                      <span className="block bg-white text-black size-5 rounded-full text-center text-sm">
                        {numberOfItems}
                      </span>
                    ) : (
                      ''
                    )}
                  </Link>
                </li>
              )}
              <li
                onClick={() => setMenuToggle(false)}
                className="mb-2 rounded-md overflow-hidden text-white bg-black hover:bg-gray-950"
              >
                <Link className="block p-2" href="/products">
                  Products
                </Link>
              </li>
              <li
                onClick={() => setMenuToggle(false)}
                className="mb-2 rounded-md overflow-hidden text-white bg-black hover:bg-gray-950"
              >
                <Link className="block p-2" href="/categories">
                  Categories
                </Link>
              </li>
              <li
                onClick={() => setMenuToggle(false)}
                className="mb-2 rounded-md overflow-hidden text-white bg-black hover:bg-gray-950"
              >
                <Link className="block p-2" href="/brands">
                  Brands
                </Link>
              </li>
            </ul>
            <hr className="mb-4" />
            <div className="flex justify-between px-2">
              <ul className="flex gap-1 text-sm items-center">
                <li onClick={() => setMenuToggle(false)}>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 hover:text-pink-500 fab fa-instagram"></i>
                  </Link>
                </li>
                <li onClick={() => setMenuToggle(false)}>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 hover:text-blue-600 fab fa-facebook"></i>
                  </Link>
                </li>
                <li onClick={() => setMenuToggle(false)}>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 fab fa-tiktok"></i>
                  </Link>
                </li>
                <li onClick={() => setMenuToggle(false)}>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 fab fa-x-twitter"></i>
                  </Link>
                </li>
                <li onClick={() => setMenuToggle(false)}>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 hover:text-blue-900 fab fa-linkedin"></i>
                  </Link>
                </li>
                <li onClick={() => setMenuToggle(false)}>
                  <Link href="#">
                    <i className="hover:text-xl hover:mx-0.5 mx-1 hover:text-red-600 fab fa-youtube"></i>
                  </Link>
                </li>
              </ul>
              <ul className="flex gap-2 text-gray-600 items-center">
                {!session ? (
                  <>
                    <li onClick={() => setMenuToggle(false)}>
                      <Link href="/login" className="hover:text-emerald-600">
                        Login
                      </Link>
                    </li>
                    <li onClick={() => setMenuToggle(false)}>
                      <Link href="/register" className="hover:text-emerald-600">
                        Signup
                      </Link>
                    </li>
                  </>
                ) : (
                  <li onClick={() => setMenuToggle(false)}>
                    <AvatarDropdown />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
