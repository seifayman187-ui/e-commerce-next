"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import * as z from 'zod'
import {zodResolver} from "@hookform/resolvers/zod" 
import { Input } from "src/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default  function Register() {
     const [Btnloader, setBtnloader] = useState<boolean>(true)

  const router = useRouter()

  const registerSchema = z.object({
    name: z.string().nonempty("name is required").min(3,"must be at least 3 char"),
    email: z.email("enter valid email"),
    password: z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    rePassword: z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"enter valid password"),
    phone: z.string().nonempty("phone is required").regex(/^01[0-2,5]{1}[0-9]{8}$/,"enter valid phone number"),
  }).refine((obj)=>{
    return obj.password == obj.rePassword;
  },{
    path:['rePassword'],
    error:"confirm password not match"
  })

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    
    resolver: zodResolver(registerSchema),
  });

 async  function  handleRegister(values:z.infer<typeof registerSchema>){
    
    setBtnloader(false)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
      method: "post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // console.log(data);
    if(data.message == "success"){
      setBtnloader(true)
      toast.success("Account Created !",{position:"top-center"})
      router.push("/login")
    }
    else{
      setBtnloader(true)
      toast.error(data.message , {position:"top-center"})
      
    }
    
  }

  


  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold my-5"> Register Now </h1>

      <div >
        <Form  {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleRegister)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name :</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email :</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
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
                <FormLabel>password :</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>rePassword :</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>phone :</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

            {
                Btnloader ? <Button className="w-full bg-main text-white">Register </Button>
                 : <Button className="bg-main text-white w-full" type="button"> <i className="fa-solid fa-spinner fa-spin"></i> </Button>
         
            }
          
        </form>
      </Form>
      </div>
    </div>
  );
}
