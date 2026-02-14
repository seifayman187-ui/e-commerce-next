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
import { useState } from "react";

export default function ResetPassword() {
  const [Btnloader, setBtnloader] = useState<boolean>(true);
  const ResetPasswordSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    newPassword: z
      .string("Password is required")
      .min(8, { message: "Password must be at least 8 characters" }),
  });

  const form = useForm<LoginPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: "", newPassword: "" },
  });

  type LoginPayload = z.infer<typeof ResetPasswordSchema>;
  const router = useRouter();

  async function onSubmit(values: LoginPayload) {
    setBtnloader(false);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await (await res).json();
    console.log(data);

    setBtnloader(true);
    console.log(data);
    if (data.token) {
      router.push("/login");
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-bold text-2xl mb-8">Reset Password</h1>
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
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {Btnloader ? (
              <Button className="bg-main text-white w-full" type="submit">
                {" "}
                Reset Password
              </Button>
            ) : (
              <Button className="bg-main text-white w-full" type="button">
                {" "}
                <i className="fa-solid fa-spinner fa-spin"></i>{" "}
              </Button>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
}
