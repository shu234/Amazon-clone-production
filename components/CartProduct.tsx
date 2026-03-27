import { store } from '@/lib/store'
import { Product } from '@/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PriceFormat from './PriceFormat'
import AddToCardBtn from './AddToCardBtn'
import {IoClose} from "react-icons/io5"
import toast from 'react-hot-toast'
import { FaCheck } from 'react-icons/fa'

const CartProduct = ({product}:{product:Product}) => {
  const{removeFromCart}=store();
  
  return (
   <div className='flex py-6 sm:py-10'>
    <Link href={{pathname:`/product/${product?.id}`,
  query:{id:product?.id},
  
   }} className='h-24 w-24 sm:h-48 sm:w-48 border border-amazonBlue/20
   hover:border-amazonYellowDark hoverEffect overflow-hidden flex items-center justify-center rounded-md group'>
    <Image src={product?.images[0]} 
    alt="productImage"
    width={300}
    height={300}
    className='h-[90%] w-[90%] rounded-md object-contain object-center group-hover:scale-110 hoverEffect'
    />
    </Link>
    <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
      <div className='relative pr-9 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:pr-0'>
        <div className='col-span-3 flex flex-col gap-1'>
          <h3 className='text-base font-semibold flex-1'>{product?.title.substring(0,80)}</h3>
          <p className='text-xs'>
            Brand: <span className='font-medium'>{product?.category}</span>
          </p>
          <p className='text-xs'>
            Category: <span className='font-medium'>{product?.category}</span>
          </p>
          <div className='flex items-center gap-6 mt-2'>
            <p>
              {product?.quantity&&(<PriceFormat className='text-base font-semibold' amount={product?.price*product?.quantity}/>)}
            </p>
            <AddToCardBtn product={product} showSubtotal={false}/>
          </div>
        </div>
        <div className='mt-4 sm:mt-0 sm:pr-9 '>
          <div className='absolute right-0 top-0'>
            <button onClick={()=>{
              removeFromCart(product.id);
              toast.success(
                `${product?.title.substring(0,20)}
                deleted successfully`
              )

            }}
            className='-m-2 inline-flex p-2 text-gray-600 hover:text-red-600
            hoverEffect text-xl'>
              <IoClose/>
            </button>
          </div>
        </div>
      </div>
      <div>
        {product?.availabilityStatus&&(
          <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
            <FaCheck className='text-lg text-green-500'/>{" "}
            <span>In Stock</span>
          </p>
        )}
        <p>
          You are saving{" "}
          <span className='text-sm font-semibold text-green-500'>
            {product?.quantity &&(
              <PriceFormat
              amount={
                product?.price*
                (product?.discountPercentage/100)*
                product?.quantity
              }/>
            )}

          </span>{" "}
          upon purchase
        </p>
      </div>
    </div>
   </div>
  );
};

export default CartProduct