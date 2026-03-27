'use client'


import { db } from "@/lib/firebase";
import { collection, query ,deleteDoc,doc} from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useState } from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import OrderLoader from "./OrderLoader";
import Title from "./Title";
import { format } from "date-fns";
import Link from "next/link";
import {motion , AnimatePresence} from "framer-motion";
import toast from "react-hot-toast";
import { FileX } from "lucide-react";

import { Card, CardContent , CardHeader , CardTitle} from "./ui/card";
import PriceFormat from "./PriceFormat";
import { Badge } from "./ui/badge";
import {Table , TableBody, TableCell, TableHead, TableHeader,TableRow,} from "./ui/table"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { MdClose,MdExpandLess, MdExpandMore } from "react-icons/md";
import Image from "next/image";
import { Order } from "@/type";
const Orders = () => {
  const {data:session}=useSession();
  const [expandedOrderId, setExpandedOrderId] =useState<string | null> (null)
  const [orderLoading,setOrderLoading] = useState(false);
  const toggleDetails = (orderId:string)=>{
    setExpandedOrderId((prev)=>(prev === orderId?null:orderId));
  }
  const handleDeleteOrder = async(id:string) => {
    const confirmed = window.confirm("Are you sure to delete this order?");
    if(confirmed){
      setOrderLoading(true)
      try{
        await deleteDoc(
  doc(db, "users", session?.user?.email as string, "orders", id)
);

      }catch(error:unknown){
        if(error instanceof Error){
          toast.error(error.message);
        }else{
          toast.error("An Unexpected error occurred.");
        }

      }finally{
        toast.success('Order deleted successfully')
        setOrderLoading(false);
      }
    }
  };
  const[ordersSnapshot,loading]=useCollection(
    session?.user &&
    query(collection(db,"users",session?.user?.email as string,"orders"))
  );
  const orders = ordersSnapshot?.docs.map((doc)=>({
    id: doc.id,
    ...doc.data(),

  })) as Order[];
  

  return (
    <div>
     {loading||orderLoading?(
      <OrderLoader/>
     ):(
      <div>{orders?.length > 0 && <Title>My Orders List:</Title>}</div>
     )}
     {orders?.length?(
      orders?.map((item)=>(
        <div key={item?.id}>
          <Card className ={
            expandedOrderId === item.id ? "border-amazonOrangeDark/30"
            :""
          }>
            <CardContent className="p-2">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Order ID

                  </p>
                  <p className="text-base font-semibold">
                    {item.id.slice(-10)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Amount 

                  </p>
                  <PriceFormat amount={item?.value?.amount}
                  className="text-lg font-semibold"/>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Payment Status

                  </p>
                  <Badge variant="default">Paid</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Order Date

                  </p>
                  <p className="text-base">
                    {format(new Date(Date.now()),"MM ,dd,YYYY")}

                  </p>

                </div>
                <div className="flex justify-end gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant ="outline"
                        size="icon"
                        onClick={()=>toggleDetails(item.id)}
                        >
                          {expandedOrderId===item.id?(
                            <MdExpandLess size={20}/>
                          ):(
                            <MdExpandMore size={20}/>
                          )}

                        </Button>


                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {expandedOrderId ? "Hide Details" :"Show Details"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                        variant ="destructive"
                        size="icon"
                        onClick={()=>handleDeleteOrder(item?.id)}>

                          <MdClose size={20}/>

                        </Button>

                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Order</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
            <AnimatePresence>
              {expandedOrderId=== item.id && (
                <motion.div initial={{opacity:0,height:0}}
                animate={{opacity:1,height:"auto"}}
                exit={{opacity:0,height:0}}
                transition={{duration:0.3}}>
                  <Card className="border-0 border-t rounded-none">
                    <CardHeader>
                      <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-center">Price</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {item?.value?.items?.map((product)=>(
                            <TableRow key={product?.id}>
                              <TableCell className="text-sm font-semibold flex
                              items-center gap-2">
                                {product?.product_details?.images&&(<Image
                                src={product?.product_details?.images[0]}
                                alt="productImages"
                                width={100}
                                height={100}
                                className="w-14 h-14 border rounded-md overflow-hidden object-cover hidden md:inline-flex"/>)}

                                <p className="line-clamp-1">
                                  {product?.name}
                                </p>
                              </TableCell>
                              <TableCell className="text-center">
                                <PriceFormat amount={product?.price }/>
                              </TableCell>
                              <TableCell className="text-center">
                                {product?.quantity}
                              </TableCell>
                              <TableCell className="text-right font-semibold">
                                <PriceFormat amount={(product?.price*product?.quantity as number)}/>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>

                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      ))
     ):(
      <div className="flex flex-col items-center justify-center py-5 md:py-10 px-4">
        <FileX className="h-24 w-24 text-gray-400 mb-4"/>
        <Title className="text-amazonBlue"> No Orders found</Title>
        <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
          It looks like you have&apos;t placed any orders yet. Start 
          shoping to see your orders here
        </p>
        <Button asChild className="mt-6">
          <Link href={"/"}>Browse Products</Link>
        </Button>
      </div>
     )}
    </div>
  );
};

export default Orders