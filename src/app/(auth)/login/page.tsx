"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState, useContext } from "react"
import { Cartdata } from "src/types/cart.type"
import { getCartData } from "src/CartAction/CartAction"
import { CountContext } from "src/CountProvider"


const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
})

type LoginPayload = z.infer<typeof LoginFormSchema>

export default function LoginForm() {
  const [Btnloader, setBtnloader] = useState<boolean>(true) 
  const { setCount } = useContext(CountContext)
  const router = useRouter()

  const form = useForm<LoginPayload>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" }
  })

  async function onSubmit(values: LoginPayload) {
    setBtnloader(false) 
    
    try {
      const data = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false 
      })

      if (data?.ok) {
        toast.success("Login success!", { position: "top-center" });

       
        const cartRes: Cartdata = await getCartData();
        if (cartRes?.status === "success") {
         const sum = cartRes?.data?.products?.reduce((total: number, item: any) => total + (item.count || 0), 0) || 0;
          setCount(sum);
        }

        router.push("/");
        router.refresh(); 
      } else {
        toast.error(data?.error || "Invalid email or password", { position: "top-center" });
        setBtnloader(true);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setBtnloader(true);
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h1 className="font-black text-3xl mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-gray-500 mb-8">Please enter your details to login</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email Address</FormLabel>
                  <FormControl>
                    <Input className="rounded-xl h-12" placeholder="name@example.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Password</FormLabel>
                  <FormControl>
                    <Input className="rounded-xl h-12" placeholder="**********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between">
              <Link href="/forgetpassword" shaking-text="true" className="text-sm font-semibold text-main hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              disabled={!Btnloader} 
              className="bg-main hover:bg-main/90 text-white w-full h-12 rounded-xl font-bold text-lg transition-all active:scale-95" 
              type="submit"
            >
              {Btnloader ? "Login" : <i className="fa-solid fa-spinner fa-spin"></i>}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account? 
              <Link href="/register" className="text-main font-bold ml-1 hover:underline">Register Now</Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  )
}