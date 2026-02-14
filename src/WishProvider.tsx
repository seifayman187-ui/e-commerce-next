"use client"
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { getUserToken } from 'src/getToken';
import { Wishlistdata } from "./types/wishlist.type";
import { getWishData } from "./WishlistAction/WishlistAction";

export const WishContext = createContext<WishContextType>(null!);
type WishContextType = {
        wishCount: number;
        setWishCount: Dispatch<SetStateAction<number>>;
      };


export default function WishProvider({children}: {children: React.ReactNode}) {
    const [wishCount , setWishCount] = useState(0);

   async function getWishCount(){
    const token = await getUserToken();
    if(token){
    const data:Wishlistdata = await getWishData();
    
    const sum = data.count;
    setWishCount(sum);
      } 
    }

    useEffect(()=>{
         getWishCount();
  
    },[])

    
      
    return (
        <WishContext.Provider value={{wishCount: wishCount, setWishCount: setWishCount}}>
            {children}
        </WishContext.Provider>
    )
}

