"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cashOrder, creditOrder } from "src/app/OrdersAction/OrdersAction";
import { Button } from "src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { CountContext } from "src/CountProvider";
import z from "zod";

export default function CheckOutSession() {
  const { setCount } = useContext(CountContext);
  const { cartId } = useParams() as { cartId: string };
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const checkoutschema = z.object({
    details: z.string().min(10, { message: "Details must be at least 10 characters" }),
    phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, "Enter a valid Egyptian phone number"),
    city: z.string().min(2, "City is required"),
  });

  type ShippingPayload = z.infer<typeof checkoutschema>;

  const shippingform = useForm<ShippingPayload>({
    resolver: zodResolver(checkoutschema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  
  async function onSubmit(values: ShippingPayload, paymentType: 'credit' | 'cash') {
    setLoading(true);
    try {
      if (paymentType === 'credit') {
        const data = await creditOrder(cartId, values);
        if (data?.session?.url) {
          setCount(0);
          window.location.href = data.session.url; 
        } else {
          toast.error(data.message || "Payment session failed",{ position: "top-center" });
        }
      } else {
        const data = await cashOrder(cartId, values);
        if (data?.status === "success") {
          toast.success("Order created successfully", { position: "top-center" });
          setCount(0);
          router.push("/allorders");
        } else {
          toast.error(data.message || "Order failed",{ position: "top-center" });
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.",{ position: "top-center" });
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="max-w-2xl mx-auto my-10 px-5">
      <h1 className="text-3xl font-bold my-5 text-main">Checkout Payment</h1>
      
      <Form {...shippingform}>
        <form className="space-y-8">
          <FormField
            control={shippingform.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Details</FormLabel>
                <FormControl>
                  <Input placeholder="Example: 123 Street, Building 4, Flat 5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={shippingform.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="01xxxxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={shippingform.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Cairo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              disabled={loading}
              onClick={shippingform.handleSubmit((values) => onSubmit(values, 'credit'))}
              className="bg-main text-white px-6 py-3 rounded-xl flex-1"
            >
              {loading ? "Processing..." : "Pay with Card"}
            </Button>

            <Button
              type="button"
              disabled={loading}
              variant="outline"
              onClick={shippingform.handleSubmit((values) => onSubmit(values, 'cash'))}
              className="px-6 py-3 rounded-xl flex-1 border-main text-main hover:bg-main/10"
            >
              {loading ? "Processing..." : "Cash Payment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}