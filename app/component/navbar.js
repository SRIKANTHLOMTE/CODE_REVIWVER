"use client"
import { redirect } from 'next/dist/server/api-utils'
import linkdin from "@/public/linkdin.svg"
import instagram from "@/public/instagram.svg"
import github from "@/public/github.svg"
import profile from "@/public/profile.svg"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const component = () => {
   const router = useRouter();

  const handlelinkedin = () => {
    router.push("https://www.linkedin.com/in/srikanth-lomte-6a9974223//");
  };
  const handlelinsta= () => {
    router.push("https://www.instagram.com/sachingiri.01");
  };
  const handlegithub = () => {
    router.push("https://github.com/sachingiri01");
  };
  const handleprofile = () => {
    router.push("https://sachingiri");
  };
  return (
    <div className='h-[8vh] bg-purple-700 text-white flex items-center justify-between px-10'>
      <p className='font-mono hover:cursor-pointer'>Code Viewer</p>
      <div className='flex gap-4 '>
        <Image
        className='invert hover:scale-125 cursor-pointer duration-150'
        src={linkdin}
         alt="Linkdin" 
         onClick={handlelinkedin}
         height={25}
         width={25}

        ></Image>
         <Image
        className='invert hover:scale-125 cursor-pointer duration-150'
        src={github}
         alt="Linkdin" 
         onClick={handlegithub}
         height={25}
         width={25}

        ></Image>
         <Image
        className='invert hover:scale-125 cursor-pointer duration-150'
        src={instagram}
         alt="Linkdin" 
         onClick={handlelinsta}
         height={25}
         width={25}

        ></Image>
         <Image
        className='invert hover:scale-125 cursor-pointer duration-150'
        src={profile}
         alt="Linkdin" 
         onClick={handleprofile}
         height={25}
         width={25}

        ></Image>
  
      </div>
    </div>
  )
}

export default component
