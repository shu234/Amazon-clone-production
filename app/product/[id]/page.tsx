import Container from '@/components/Container';
import SingleProduct from '@/components/SingleProduct';
// import Container_ from 'postcss/lib/container';
import React from 'react'

const SingleProductPage = async({params,}:{params:Promise<{id:string}>;

}) => {
     const {id} =await params;
    if(!id){
        return <Container className='py-10'>
            <p className='text-center text-red-500'>No Product ID Provided </p>
        </Container>
    }
    try{
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if(!res.ok){
            throw new Error("Failed to fetch product data");
        }
        const product = await res.json();
        return <Container className='py-10'>
            <SingleProduct product={product}/>
        </Container>
    } catch(error){
        console.error('Error fetching product',error)

        return (
            <Container className='py-10'>
                <p className='text-center text-red-500'> Failed to load the product. Please try again</p>
            </Container>
        )
    }
 
}

export default SingleProductPage