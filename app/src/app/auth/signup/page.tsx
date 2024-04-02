'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterFormData } from "../auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/validation/auth";


const SigninPage = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    
  })
  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="w-full md:w-1/2  h-full bg-bgMainDark flex items-center justify-center">
        {/* <img
          className="max-w-xs mx-auto"
          src={codeImage}
          alt="App Image"
          height={300}
          width={300}
        /> */}
      </div>
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="w-full max-h-3/4 max-w-md p-8 bg-white rounded shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-8 text-textPrimary">Join Managers Now!</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="First name"
              className="py-3 px-4 block w-full text-white bg-mainBody border-gray-200 rounded-lg text-sm"
              {...register('first_name')}
              />
              {errors.first_name && <span className="text-red-500">{errors.first_name?.message}</span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Last name"
              className="py-3 px-4 block w-full text-white bg-mainBody border-gray-200 rounded-lg text-sm"
              {...register('last_name')}
              />
              {errors.last_name && <span className="text-red-500">{errors.last_name?.message}</span>}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="py-3 px-4 block w-full text-white bg-mainBody border-gray-200 rounded-lg text-sm"
              {...register('email')}
              />
              {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="py-3 px-4 block w-full text-white bg-mainBody border-gray-200 rounded-lg text-sm"
              {...register('password')}
            />
            {errors.password && <span className="text-red-500">{errors.password?.message}</span>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Login
          </button>
          <div className='text-black'>Already have an account? <Link href={"/auth/signin"}>Signin</Link> </div>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
