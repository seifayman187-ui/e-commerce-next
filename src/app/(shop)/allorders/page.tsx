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
import { CartItem, Ordersdata } from "src/types/orders.type";

export default function Allorders() {
  const [data, setdata] = useState<Ordersdata>({} as Ordersdata);
  const [orderloading, setorderloading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);
  async function fetchOrders() {
    setorderloading(true);
    const data: Ordersdata = await getUserOrders();
    console.log(data);
    if (!data) {
      // toast.error("some thing went wrong", { position: "top-center" });
      
    } else toast.success("your orders is ready", { position: "top-center" });
    setdata(data);
    setorderloading(false);
  }

  return (
    <div>
      {orderloading ? (
        <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-gray-300/50 backdrop-blur-sm z-50">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {data ? (
            <>
              <div className="container max-w-6xl mx-auto my-5 ">
                <h1 className="text-3xl font-bold my-5 ">Your Orders </h1>
                {data?.map((gamal: Ordersdata) => (
                  <div key={gamal._id} className="border-b pb-5">
                    <div >
                      <h1 className="text-2xl font-bold my-5">
                        order id :
                        <span className="text-main text-xl">{gamal.id}</span>
                      </h1>
                      <div
                        className="flex flex-wrap gap-4 items-center my-5"
                        key={gamal._id}
                      >
                        {gamal.cartItems.map((order: CartItem) => (
                          <Card
                            key={order._id}
                            className="relative border bg-gray-300 group dark:bg-gray-800 hover:scale-102 transition-transform duration-300"
                          >
                            <CardHeader>
                              <Image
                                src={order.product.imageCover}
                                alt={order.product.title}
                                width={200}
                                height={200}
                                className="w-full rounded-2xl object-cover"
                              />
                            </CardHeader>
                            <CardContent>
                              <CardTitle className="text-main">
                                {order.product.category.name}
                              </CardTitle>
                              <CardTitle className="py-2 dark:text-gray-400">
                                {order.product.title
                                  .split(" ")
                                  .slice(0, 2)
                                  .join(" ")}
                              </CardTitle>

                              <div className="flex justify-between items-center my-1">
                                <span className="dark:text-gray-400">
                                  {order.price} EGP
                                </span>
                                <span className="dark:text-gray-400">
                                  <i className="fa-solid fa-star rating-color"></i>{" "}
                                  {order.product.ratingsAverage}
                                </span>
                              </div>
                            </CardContent>

                            <CardFooter>
                              <span className="dark:text-gray-400">
                                Quantity : {order.count}
                              </span>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <span className="font-bold">
                      Total Price :
                      <span className="text-red-500 text-2xl">
                        {gamal.totalOrderPrice}
                      </span>
                      EGP
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            //  empty orders

            <div className="min-h-[70vh]">
              <div
              id="alert-additional-content-2"
              className="mt-10 p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <div className="flex items-center">
                <svg
                  className="shrink-0 w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium">Your orders is Empty</h3>
              </div>
              <div className="mt-2 mb-4 text-sm">
                You have no orders yet. Start shopping to place your first
                order!
              </div>
              <div className="flex">
                <Link href={"/"}>
                  <button
                    type="button"
                    className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-3 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    <svg
                      className="me-2 h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 14"
                    >
                      <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    Go Back
                  </button>
                </Link>
              </div>
              </div>
            </div>  

          )}
        </>
      )}
    </div>
  );
}
