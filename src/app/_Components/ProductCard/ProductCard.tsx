import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { product } from "../../../types/products.type";
import Link from "next/link";
import AddCartBtn from "./AddCartBtn";
import AddToWishlist from "./AddToWishlist";

export default function ProductCard({ item }: { item: product }) {
  const { title, price, imageCover, category: { name }, ratingsAverage, _id } = item;

  return (
    <Card className="p-0 overflow-hidden relative border bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      
     
      <div className="absolute top-3 right-3 z-30">
        <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-100 dark:border-gray-700">
          <AddToWishlist id={_id} />
        </div>
      </div>

      <Link href={"/products/" + _id} className="flex-grow">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50 dark:bg-gray-800">
            <Image
              src={imageCover}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <p className="text-[10px] font-bold text-main uppercase tracking-widest">{name}</p>
          <h3 className="text-sm md:text-base font-bold mt-1 leading-tight dark:text-white line-clamp-2 min-h-[2.5rem]">
            {title.split(' ').slice(0, 3).join(' ')}
          </h3>

          <div className="flex justify-between items-center mt-3">
            <span className="text-lg font-black text-gray-900 dark:text-gray-100">{price} <span className="text-[10px]">EGP</span></span>
            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded-md border border-yellow-100 dark:border-yellow-900/30">
              <i className="fa-solid fa-star text-yellow-500 text-[10px]"></i> 
              <span className="text-xs font-bold dark:text-yellow-500">{ratingsAverage}</span>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0 z-10">
        <AddCartBtn id={_id} />
      </CardFooter>
    </Card>
  );
}