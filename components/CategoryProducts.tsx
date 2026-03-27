'use client'
import { useEffect, useState } from 'react'
import Title from './Title';
import { Button } from './ui/button';
import {  Loader2 } from 'lucide-react';
import { AnimatePresence , motion} from 'motion/react';

import { fetchData } from '@/hooks/fetchData';
import ProductsList from './ProductsList';
import NoProductAvailable from './NoProductAvailable';
interface Props{
    categories:[string];
    id: string;
}

const CategoryProducts = ({categories, id}:Props) => {
    const [currentCategory, setCurrentCategory]=useState(id)
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const getData = async ()=>{
            const endpoint =`https://dummyjson.com/products/categories${currentCategory}`;
        setLoading(true)
        try{
            const data = await fetchData(endpoint);
            setProducts(data?.products);

        }catch(error){
            console.error("Error fetching products",error);
        }
        finally{
            setLoading(false)
        }
        };
        getData();
            
    },[id, currentCategory])
  return (
    <div>
        <Title className='text-xl' >
            Products by Category:{" "}<span className='font-bold text-green-600 capitalize tracking-wide'>{currentCategory}</span>
        </Title>
        <div className='py-5 flex items-start gap-5'>
            <div className='flex flex-col md:min-w-40 border border-amazonBlue/50'>
              {categories?.map((category)=>(
                <Button 
                key={category} 
                onClick={()=>setCurrentCategory(category)}
                className={`bg-transparent border-0 rounded-none
                    shadow-none capitalize text-amazonBlue/70
                    hover:bg-amazonLight hover:text-white font-semibold
                    hoverEffect border-b border-b-amazonBlue/50 last:border-b-0 
                    ${category===currentCategory&&
                        "bg-amazonBlue text-white border-amazonBlue"}`}>
                            {category}</Button>
              ))}
            </div>

            {loading ? (
            <div className='flex flex-col items-center justify-center
            py-10 min-h-80 space-y-4 text-center bg-amazonBlue/10 rounded-lg w-full'>
                <div className='flex items-center space-x-2 text-amazonOrangeDark'>
                    <Loader2 className='animate-spin'/>
                    <span className='text-lg font-semibold'>
                        Product is loading...
                    </span>
                </div>
            </div>
            ):(
                products?.length?(<AnimatePresence>
                    <motion.div layout initial={{opacity:0.2}} animate={{opacity:1}} exit={{opacity:0}}>
                       <ProductsList products={products}  className='px-0 flex-1'/>  
                    </motion.div>
                </AnimatePresence>

                ):(
                  <NoProductAvailable value={currentCategory}/>
                )
                
            )}
        </div>
    </div>
  )
}

export default CategoryProducts


 