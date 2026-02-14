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
import { useState } from "react"
import { Cartdata } from "src/types/cart.type"
import { getUserToken } from "src/getToken"
import { getCartData } from "src/CartAction/CartAction"
import { CountContext } from "src/CountProvider"
import { useContext } from "react"




export default function LoginForm() {

  const [Btnloader, setBtnloader] = useState<boolean>(true)
  const {setCount} = useContext(CountContext)

  const LoginFormSchema = z.object({
  email: z.email({message:"Invalid email address"}),
  password: z.string('Password is required').min(8,{message:"Password must be at least 8 characters"})
})
  const form = useForm<LoginPayload>({resolver:zodResolver(LoginFormSchema), defaultValues: { email:"" , password:""}})

  type LoginPayload = z.infer<typeof LoginFormSchema>
  const router = useRouter()

async  function onSubmit(values:LoginPayload){
    setBtnloader(false)
    const data = await signIn("credentials",{
    email: values.email,
    password: values.password,
    redirect: false
  })
  // console.log(data);
  if(data?.ok){
    setBtnloader(true)
    toast.success("Login success !",{position:"top-center"})
     const token:unknown = await getUserToken()
        if(token){
        const data:Cartdata = await getCartData()
        const sum = data.data.products.reduce((total, item) => total + item.count, 0);
        setCount(sum)
        router.push("/")
      }
  }else{
    toast.error(data?.error , {position:"top-center"})
    setBtnloader(true)
  }
  

  
  }

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-bold text-2xl mb-8">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Username@domain.com" {...field} type="email"/>
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="**********" {...field} type="password"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="/forgetpassword" className="text-main py-2 block">Forget password ?</Link>
             {
                Btnloader ?  <Button className="bg-main text-white w-full" type="submit">Login</Button>
                : <Button className="bg-main text-white w-full" type="button"> <i className="fa-solid fa-spinner fa-spin"></i> </Button>
         
            }
           
          </form>
        </Form>
      </div>
    </section>
  )
}