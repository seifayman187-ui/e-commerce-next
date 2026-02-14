'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { cashOrder, creditOrder } from 'src/app/OrdersAction/OrdersAction'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { CountContext } from 'src/CountProvider'
import z from 'zod'

export default function CheckOutSession() {

    const {setCount} = useContext(CountContext)
 const {cartId}:{cartId:string} =   useParams()
 const router = useRouter()

    const checkoutschema = z.object({
        details: z.string().min(10,{message:"Details is required"}),
       phone: z.string().nonempty("phone is required").regex(/^01[0-2,5]{1}[0-9]{8}$/,"enter valid phone number"),
        city: z.string().nonempty("city is required"),
    })
    const shippingform = useForm<ShippingPayload>({
        resolver: zodResolver(checkoutschema),
        defaultValues:{
            details:'',
            phone:'',
            city:'',
        }
    })

    type ShippingPayload = z.infer<typeof checkoutschema>

    async function checkoutsessionpayment(values: ShippingPayload){
        const data = await creditOrder(cartId, values)
       
        if(data?.session?.url){
            window.open(data.session.url , '_blank')
            setCount(0)
        }
        else{toast.error(data.message , {position:'top-center'})}
        
        
    }

  async  function cashPay(values: ShippingPayload){
        const data = await cashOrder(cartId, values)
        // console.log(data);
        if(data?.status == 'success'){
            toast.success('order created successfully' , {position:'top-center'})
            router.push('/allorders')
            setCount(0)
        }
        else{toast.error(data.message , {position:'top-center'})}
    }

  return (
    <div className='max-w-2xl mx-auto my-10'>
      <h1 className='text-3xl font-bold my-5'>check out payment</h1>
      <Form {...shippingform}>
       <form className='space-y-8' onSubmit={shippingform.handleSubmit(checkoutsessionpayment)}>
         <FormField
            control={shippingform.control}
            name="details"
            render={({field }) => (
            <FormItem> 
                <FormLabel>Details</FormLabel>
                <FormControl>
                <Input {...field} />
                </FormControl>
               
                <FormMessage />
            </FormItem>
            )}
        />
         <FormField
            control={shippingform.control}
            name="phone"
            render={({field}) => (
            <FormItem>
                <FormLabel>phone</FormLabel>
                <FormControl>
                <Input {...field} />
                </FormControl>
               
                <FormMessage />
            </FormItem>
            )}
        />
         <FormField
            control={shippingform.control}
            name="city"
            render={({field}) => (
            <FormItem>
                <FormLabel>city</FormLabel>
                <FormControl>
                <Input {...field} />
                </FormControl>
               
                <FormMessage />
            </FormItem>
            )}
        />

        <Button className='my-5 mr-5'>payment with card</Button>
        <Button
          type="button"
          onClick={() => cashPay(shippingform.getValues())}
          className='my-5 mx-5x'
        >
          Cash payment
        </Button>

       </form>
        </Form>
    </div>
  )
}
