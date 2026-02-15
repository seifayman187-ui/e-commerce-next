import { product, ProductData } from "./../types/products.type";
import ProductCard from "./_Components/ProductCard/ProductCard";
import MainSlider from "./_Components/MainSlider/MainSlider";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`,
    { next: { revalidate: 3600 } } 
  );

  const data: ProductData = await res.json();
  const ProductList: product[] = data?.data || [];

  return (
    <>
      <MainSlider />

      <h1 className="text-3xl font-bold text-center p-8 text-gray-800">
        Latest Products
      </h1>

      
      <div className="container mx-auto px-4"> 
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-5">
          {ProductList.map((item) => (
             <ProductCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}