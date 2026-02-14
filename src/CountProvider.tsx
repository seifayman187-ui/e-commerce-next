"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getUserToken } from "src/getToken";
import { getCartData } from "./CartAction/CartAction";
import { Cartdata } from "./types/cart.type";

export const CountContext = createContext<CountContextType>(null!);
type CountContextType = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

export default function CountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

  async function getCart() {
    const token: unknown = await getUserToken();
    if (token) {
      const data: Cartdata = await getCartData();
      const sum =
        data.data?.products?.reduce((total, item) => total + item.count, 0) ||
        0;
      setCount(sum);

      //     let sum = 0;
      //    data.data.products.forEach((item)=>{
      //     sum += item.count
      //    })
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}
