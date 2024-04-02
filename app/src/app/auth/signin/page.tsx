'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginFormData } from "../auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/validation/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "@/app/redux/slices/auth.slice";
import CircularProgress from '@mui/material/CircularProgress';
import delay from "delay";
import { redirect, useRouter } from "next/navigation";

const SigninPage = () => {
  
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })
  const [loginStatus, setStatus] = useState<{error: any, isLoading: boolean}>({
    error: null,
    isLoading: false
  })
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    setStatus({
      error: null,
      isLoading: true,
    })
    try{
      
      // TODO: Call auth service
      // const loginResult = await axios.get()
      await delay(2000)
      const loginResult = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.j7o5o8GBkybaYXdFJIi8O6mPF50E-gJWZ3reLfMQD68'
      if(!loginResult) {
        return setStatus({
          error: 'Error happened while signin',
          isLoading: false,
        })
      }
      setStatus({
        error: null,
        isLoading: false,
      })
      dispatch(loginAction(loginResult))
      router.replace('/')
    } catch(error: any) {
      console.log(error)
      return setStatus({
        error: error.message,
        isLoading: false,
      })
    }
  })
  return (
    
    <div className="flex flex-col h-screen md:flex-row">
      <div className="w-full md:w-1/2  h-full text-black bg-bgMainDark flex items-center justify-center">

      </div>
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="w-full max-h-3/4 max-w-md p-8 rounded shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-8 text-textPrimary">Join Managers Now!</h2>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="py-3 px-4 block w-full bg-bg border-gray-200 rounded-lg text-sm"
              {...register('email')}
              />
              {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="py-3 px-4 block w-full bg-mainBody border-gray-200 rounded-lg text-sm"
              {...register('password')}
            />
            {errors.password && <span className="text-red-500">{errors.password?.message}</span>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Login
          </button>
          <div className='text-black'>New to CodeCLA. <Link href={"/auth/signup"}>Signup</Link> </div>
          {loginStatus.isLoading && <div className="flex justify-center"><CircularProgress className="text-center"/></div>}
          {loginStatus.error && <span className="text-red-500">{loginStatus.error}</span>}
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
