"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
} from "@/components/ui/form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"



export default function VerifyPassword() {
  // ...
  const VerifyPasswordSchema = z.object({
  resetCode: z.string().nonempty("Reset code is required"),
})
  const form = useForm<LoginPayload>({resolver:zodResolver(VerifyPasswordSchema), defaultValues: { resetCode:"" }})

  type LoginPayload = z.infer<typeof VerifyPasswordSchema>
  const router = useRouter()

async  function onSubmit(values:LoginPayload){
    // console.log(values)
  const res =  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,{
      method:"POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await (await res).json()
    console.log(data);
    if(data.status == "Success"){
     
      router.push("/resetpassword")
    }
    else{
      toast.error(data.message , {position:"top-center"})
    }

  }

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-bold text-2xl mb-8">Verify Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField 
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <InputOTP maxLength={6} {...field} className="mx-auto w-2xl">
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                 </InputOTP>
              )}
            />
            
            <Button className="bg-main text-white w-full" type="submit">Verify Code</Button>
          </form>
        </Form>
      </div>
    </section>
  )
}