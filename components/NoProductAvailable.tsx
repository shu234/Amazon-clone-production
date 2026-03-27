import { cn } from '@/lib/utils';
import React from 'react'
import { animate, motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

const NoProductAvailable = (
  {value,className}:{
    value:string;
    className?:string;
  }
) => {

  return (
    <div className={cn("flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full",className)}>
      <motion.div 
      initial={{opacity:0,y:-20}}
      animate={{opacity:1,y: 0}}
      transition={{duration:0.5}}>

        <h2 className='text-2xl font-bold text-gray-800'>No Product Available</h2>
      </motion.div>
      <motion.p
      className='text-gray-600'
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.2, duration:0.5}}
      >
        We &apos;re sorry, but there are no product matching no{" "}
        <span className='text-base font-semibold text-darkColor capitalize'>{value}</span>{" "}
        criteria at the moment.

      </motion.p>
      <motion.div
      animate={{scale:[1,1.1,1]}}
      transition={{repeat:Infinity,duration:1.5}}
      className='flex items-center space-x-2 text-amazonOrangeDark'>

        <Loader2 className='w-4 h-4 animate-spin'/>
        <span>We&apos;re restocking shortly</span>
      </motion.div>
      <motion.p
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.4, duration:0.5}}
      className='text-sm text-gray-600'>
        Please check back later or explore our other product categories

      </motion.p>

    </div>
  )
}

export default NoProductAvailable