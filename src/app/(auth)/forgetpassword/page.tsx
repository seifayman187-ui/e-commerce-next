"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  // ...
  const ForgetPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
  });

  const form = useForm<LoginPayload>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: { email: "" },
  });

  type LoginPayload = z.infer<typeof ForgetPasswordSchema>;
  const router = useRouter();

  async function onSubmit(values: LoginPayload) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();
    console.log(data);
    if (data.statusMsg == "success") {
      toast.success("Code sent to your email !", { position: "top-center" });
      router.push("/verifypassword");
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-bold text-2xl mb-8">Forget Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username@domain.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="bg-main text-white w-full" type="submit">
              Send Code
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
