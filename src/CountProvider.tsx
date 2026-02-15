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

type CountContextType = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  loadingCount: boolean; 
};

export const CountContext = createContext<CountContextType>(null!);

export default function CountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true);

  async function getCart() {
    try {
      setLoadingCount(true);
      const token = await getUserToken();
      
      if (token) {
        const data: Cartdata = await getCartData();
        
        
        if (data?.status === "success" && data.data?.products) {
          const sum = data.data.products.reduce((total, item) => total + item.count, 0);
          setCount(sum);
        } else {
          setCount(0);
        }
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCount(0);
    } finally {
      setLoadingCount(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CountContext.Provider value={{ count, setCount, loadingCount }}>
      {children}
    </CountContext.Provider>
  );
}