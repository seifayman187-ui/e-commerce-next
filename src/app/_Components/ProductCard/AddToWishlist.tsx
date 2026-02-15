"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { item, Wishlistdata } from "src/types/wishlist.type";
import { addToWish, getWishData } from "src/WishlistAction/WishlistAction";
import { WishContext } from "src/WishProvider";
import { Heart } from "lucide-react"; 

export default function AddToWishlist({ id }: { id: string }) {
  const { setWishCount } = useContext(WishContext);
  const [heart, setheart] = useState(false);
  const [loading, setLoading] = useState(false); 
  async function Add(id: string) {
    if (loading) return;
    setLoading(true);
    try {
      const data = await addToWish(id);
      if (data.status === "success") {
        toast.success(data.message, { position: "top-center" });
        setWishCount(data.count);
        setheart(true);
      }
    } catch (error) {
      toast.error("Please log in first", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  async function getdata() {
    try {
      const check: Wishlistdata | undefined = await getWishData();
      const wishItems = check?.data || [];
      if (wishItems.find((item) => item._id === id)) {
        setheart(true);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  useEffect(() => {
    getdata();
  }, [id]);

  return (
 

<button
  onClick={(e) => {
    e.preventDefault();
    Add(id);
  }}
  
  className="absolute top-2 right-2 transition-all duration-300 hover:scale-110 z-20 hover:cursor-pointer group/heart"
>
  {heart ? (
    
    <i className="fa-solid fa-heart text-red-500 text-xl"></i>
  ) : (
  
    <i className="fa-regular fa-heart text-gray-400 text-xl group-hover/heart:text-red-400 transition-colors"></i>
  )}
</button>
  );
}