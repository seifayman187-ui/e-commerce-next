"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserOrders } from "src/app/OrdersAction/OrdersAction";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { CartItem } from "src/types/orders.type";

export default function Allorders() {
  
  const [data, setdata] = useState<any[]>([]); 
  const [orderloading, setorderloading] = useState(true);

  async function fetchOrders() {
    try {
      setorderloading(true);
      const res = await getUserOrders();
      
      
      if (res && Array.isArray(res)) {
        setdata(res);
        if(res.length > 0) toast.success("Your orders are ready", { position: "top-center" });
      } else {
        setdata([]);
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      toast.error("Failed to load orders", { position: "top-center" });
    } finally {
      setorderloading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen">
      {orderloading ? (
        <div className="flex justify-center items-center fixed inset-0 bg-gray-300/50 backdrop-blur-sm z-50">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container max-w-6xl mx-auto my-5 px-4">
          {/* 2. التعديل التاني: التحقق من طول المصفوفة عشان يظهر الـ Empty State صح */}
          {data && data.length > 0 ? (
            <>
              <h1 className="text-3xl font-bold my-5">Your Orders</h1>
              {data.map((gamal: any) => (
                <div key={gamal._id} className="border-b pb-10 mb-10 last:border-0">
                  <h2 className="text-2xl font-bold my-5">
                    Order ID: <span className="text-main text-xl">{gamal.id}</span>
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 items-center my-5">
                    {gamal.cartItems?.map((order: CartItem) => (
                      <Card
                        key={order._id}
                        className="w-full sm:w-[250px] relative border bg-gray-50 dark:bg-gray-800 hover:scale-[1.02] transition-transform duration-300"
                      >
                        <CardHeader>
                          <Image
                            src={order.product.imageCover}
                            alt={order.product.title}
                            width={200}
                            height={200}
                            className="w-full h-40 object-contain rounded-2xl"
                          />
                        </CardHeader>
                        <CardContent>
                          <CardTitle className="text-main text-sm">
                            {order.product.category.name}
                          </CardTitle>
                          <CardTitle className="py-2 text-md truncate dark:text-gray-400">
                            {order.product.title.split(" ").slice(0, 2).join(" ")}
                          </CardTitle>
                          <div className="flex justify-between items-center my-1 text-sm">
                            <span>{order.price} EGP</span>
                            <span>⭐ {order.product.ratingsAverage}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="text-sm text-gray-500">
                          Quantity: {order.count}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg inline-block">
                    <span className="font-bold text-lg">
                      Total Price: <span className="text-red-500 text-2xl ml-2">{gamal.totalOrderPrice}</span> EGP
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            /* 3. الـ Empty State هيظهر هنا لو مفيش أوردرات */
            <div className="min-h-[70vh] flex flex-col justify-center items-center">
              <div className="p-6 border border-red-300 rounded-lg bg-red-50 text-center max-w-md">
                <h3 className="text-xl font-bold text-red-800 mb-2">Your orders list is Empty</h3>
                <p className="text-red-700 mb-6">You have no orders yet. Start shopping to place your first order!</p>
                <Link href="/" className="bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-900 transition-colors">
                  Go Back to Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}