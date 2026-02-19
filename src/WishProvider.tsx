"use client"
import { createContext, Dispatch, SetStateAction, useEffect, useState, ReactNode } from "react";
import { getUserToken } from 'src/getToken';
import { Wishlistdata } from "./types/wishlist.type";
import { getWishData } from "./WishlistAction/WishlistAction";


type WishContextType = {
  wishCount: number;
  setWishCount: Dispatch<SetStateAction<number>>;
};

export const WishContext = createContext<WishContextType | undefined>(undefined);

export default function WishProvider({ children }: { children: ReactNode }) {
  const [wishCount, setWishCount] = useState(0);

  async function fetchWishCount() {
    try {
      const token = await getUserToken();
      if (token) {
        const data: Wishlistdata = await getWishData();
    
        setWishCount(data?.count || 0);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist count:", error);
      setWishCount(0);
    }
  }

  useEffect(() => {
    fetchWishCount();
  }, []);

  return (
    <WishContext.Provider value={{ wishCount, setWishCount }}>
      {children}
    </WishContext.Provider>
  );
}