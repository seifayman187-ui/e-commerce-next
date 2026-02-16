import React from 'react'
import { ProductItem, ProductDetails } from '@/types/productdetails.type';
import ProductDetailsCard from 'src/app/_Components/ProductDetailsCard/ProductDetailsCard';
import { notFound } from 'next/navigation';


export default async function page({ params }: { params: Promise<{ id: string }> }) {
    
    
    const resolvedParams = await params;
    const { id } = resolvedParams;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`, {
            next: { revalidate: 3600 } 
        });

        
        if (!res.ok) {
            notFound();
        }

        const data: ProductDetails = await res.json();
        const product: ProductItem = data.data;

        if (!product) {
            notFound();
        }

        return (
            <div className="container mx-auto">
                <ProductDetailsCard product={product} />
            </div>
        )
    } catch (error) {
        console.error("Error fetching product details:", error);
        notFound();
    }
}