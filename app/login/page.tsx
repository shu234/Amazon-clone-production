
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { auth, signIn } from '@/auth' 
import { Button } from '@/components/ui/button'

import { FcGoogle } from "react-icons/fc";
import { Facebook, Github } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/dist/client/components/navigation';

const LoginPage = async() => {
  const session = await auth()
  if(session?.user) return redirect("/")
  return (
    <div className='flex flex-col items-center justify-center py-5 md:py-10 gap-5'>
      <div className='bg-gray-100 flex items-center justify-center'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center '>
              Sign In
            </CardTitle>
          <CardDescription className='text-center'>
            Choose your preferred sign in method
          </CardDescription >
          </CardHeader>
          <CardContent className='space-y-4 w-full min-w-[420px] max-w-md'>
            <div className='space-y-2'>
              <form
              action={async()=>{
                "use server";
                await signIn("google");
              }}  >
      <Button type='submit' variant={'outline'}
       className="w-full justify-start space-x-2 bg-white hover:bg-gray-100 hoverEffect"   >
        <FcGoogle/> <span>Sign in with Google</span>
      </Button>
    </form>
      <form
              action={async()=>{
                "use server";
                await signIn("github");
              }}  >
      <Button type='submit' variant={'outline'}
       className="w-full justify-start space-x-2 bg-white hover:bg-gray-100 hoverEffect"   >
        <Github/> <span>Sign in with Github</span>
      </Button>
    </form>
    <Button type='submit' variant={'outline'}
       className="w-full justify-start space-x-2 bg-white hover:bg-gray-100 "   >
        <Facebook className='w-5 h-5'/> 
        <span>Sign in with Facebook</span>
      </Button>
      </div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-white px-2 text-gray-500'>
              Or continue with
            </span>
          </div>
           </div>
           <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='Enter your email' />
           </div>
           <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' placeholder='Enter your password' />
           </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full bg-orange-500 hover:bg-orange-600 hoverEffect'>Sign In</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage