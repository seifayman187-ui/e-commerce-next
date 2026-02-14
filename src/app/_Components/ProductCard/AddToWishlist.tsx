
"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { item, Wishlistdata } from "src/types/wishlist.type";
import { addToWish, getWishData } from "src/WishlistAction/WishlistAction";
import { WishContext } from "src/WishProvider";

export default function AddToWishlist({ id }: { id: string }) {
  const { setWishCount } = useContext(WishContext);
  const [heart, setheart] = useState(false);
  const [data, setdata] = useState<item[]>([]); // default array

  async function Add(id: string) {
    try {
      const data = await addToWish(id);
      if (data.status === "success") {
        toast.success(data.message, { position: "top-center" });
        setWishCount(data.count);
        setheart(true);
      } else {
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error("please log in first", { position: "top-center" });
    }
  }

  async function getdata() {
    try {
      const check: Wishlistdata | undefined = await getWishData();
      const wishItems = check?.data || [];
      setdata(wishItems);

      if (wishItems.find((item) => item._id === id)) {
        setheart(true);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setdata([]);
    }
  }

  useEffect(() => {
    getdata(); // استدعي دايمًا عند تغيير id
  }, [id]);

  return (
    <button
      onClick={() => Add(id)}
      className="absolute top-2 right-1 opacity-0  group-hover:opacity-100 transition duration-300 hover:cursor-pointer"
    >
      {heart ? (
        <i className="fa-solid fa-heart text-red-500 text-2xl drop-shadow-lg"></i>
      ) : (
        <i className="fa-regular fa-heart text-white text-2xl drop-shadow-lg"></i>
      )}
    </button>
  );
}
