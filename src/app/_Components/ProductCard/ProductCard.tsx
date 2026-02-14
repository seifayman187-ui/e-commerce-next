import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { product } from "../../../types/products.type";
import Link from "next/link";
import AddCartBtn from "./AddCartBtn";
import AddToWishlist from "./AddToWishlist";


export default function ProductCard({item}:{item:product}) {
  const {title, price, imageCover, category:{name}, ratingsAverage, _id} = item

  return (
    <Card className="p-0 overflow-hidden relative border bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 group">
      
      <div className="absolute top-3 right-3 z-10">
        <AddToWishlist id={_id}/>
      </div>

      <Link href={"/products/"+_id}>
        <CardHeader className="p-0">
          {/* حاوية الصورة لضمان ثبات المقاس */}
          <div className="relative w-full aspect-[4/5] overflow-hidden"> 
            <Image
              src={imageCover}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <p className="text-xs font-medium text-main uppercase tracking-wider">{name}</p>
          <h3 className="text-lg font-bold mt-1 leading-tight dark:text-white line-clamp-1">
            {title.split(' ').slice(0,2).join(' ')}
          </h3>

          <div className="flex justify-between items-center mt-3">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{price} EGP</span>
            <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
              <i className="fa-solid fa-star text-yellow-500 text-sm"></i> 
              <span className="text-sm font-bold dark:text-yellow-500">{ratingsAverage}</span>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <AddCartBtn id={_id}/>
      </CardFooter>
    </Card>
  );
}