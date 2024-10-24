"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const foodSlides = ["food-slider-1.png", "food-slider-2.png", "food-slider-3.png", "food-slider-4.png", "food-slider-5.png", "food-slider-6.png"]
export default function LoginPage(){
  const [showEye, setShowEye] = useState<boolean>(false);
  const [slideNo, setSlideNo] = useState<number>(0)
  useEffect(()=>{
    const sliderInterval = setInterval(() => {
      setSlideNo(prev=>(prev === foodSlides.length - 1) ? 0 : (prev + 1));
    }, 4000);
    return()=>{
      clearInterval(sliderInterval)
    }
  }, [])
  
  return(
    <>
    <section id="login-page">
      <div className="bg-[transparent] w-dvw h-dvh fixed top-0 left-0 justify-center items-center z-10 flex">
        <div id="login-container" className="border-1 border-gray-400 p-4 rounded-2xl bg-primary">
          <form id="login-form" className="w-[445px] max-w-[90dvw]">
            <h1 className="form-title font-bold font-jost text-3xl">Welcome 👋 </h1>
            <div className="text-context font-normal font-jost text-base">Please login here</div>
            <div className="login-input-container mt-8 flex flex-col">
              <label htmlFor="email" className="text-sm font-jost ">Email Address</label>
              <input type="email" name="email" className="outline-none border-1 border-primary rounded-xl p-4 w-full text-base font-jost font-semibold" />
            </div>
            <div className="login-input-container mt-4 flex flex-col relative">
              <label htmlFor="password" className="text-sm font-jost ">Password</label>
              <input type={showEye ? "text" : "password"} name="password" className="outline-none border-1 border-primary rounded-xl p-4 w-full text-base font-jost font-semibold autofill:bg-primary" />
              <div className="eye-container absolute right-2 bottom-4 cursor-pointer z-50">
                <Image className="aria-hidden:hidden" src="/assets/images/password-eye-close.png" width={25} height={25} alt="Eye" aria-hidden={showEye} onClick={()=>setShowEye(prev=>!prev)} />
                <Image className="aria-hidden:hidden" src="/assets/images/password-eye-open.png" width={25} height={25} alt="Eye" aria-hidden={!showEye} onClick={()=>setShowEye(prev=>!prev)} />
              </div>
            </div>
            <div className="remember-me-context my-6 flex justify-between">
              <div className="checkbox-container flex gap-2 ">
                <input type="checkbox" name="remember-me" className="size-5 accent-black cursor-pointer" />
                <label htmlFor="remember-me" className="font-jost font-normal text-base cursor-pointer">Remember Me</label>
              </div>
              <Link href={"forgot-passord"} className="">Forgot Password?</Link>
            </div>
            <button type="submit" className="w-full p-4 bg-black text-white rounded-xl">Login</button>
          </form>
        </div>
      </div>
      <div className="auto-sliding-conatiner w-full h-full max-md:hidden">
        <div className="sliding-images fixed w-full h-full">
          <div className="circular-border w-[100dvh] aspect-square fixed top-[25dvh] -left-[25dvh] border-2 border-[#FF922C] border-dashed rounded-full"></div>
          <div className="circular-border w-[100dvh] aspect-square fixed top-[25dvh] -left-[25dvh] rounded-full flex">
            {[...foodSlides, ...foodSlides, ...foodSlides].slice(slideNo -1 + foodSlides.length, slideNo + 2 + foodSlides.length).map((img, index)=>(
              <img src={`/assets/images/${img}`} key={index} alt="Food Image" className={`w-[100px] aspect-square object-contain rounded-full bg-transparent absolute top-[calc(50%-50px)] right-[calc(50%-50px)] ${""}`} style={{transform: index === 0 ? "translate(50dvh,0dvh)" : (index === 2 ? "translate(0dvh,-50dvh)": "translate(35dvh,-35dvh)") }} />
            ))}
          </div>
        </div>
        <div className="main-image fixed bottom-0 left-0 w-[20dvw] bg-[#FF922C] aspect-square rounded-tr-full max-w-[90%]">
          {foodSlides.map((img, index)=>(
            <img src={`/assets/images/${img}`} key={index} alt="Food Image" className="w-full aspect-square object-contain rounded-full bg-transparent float-right absolute -left-[100%] -bottom-[100%] transition-all ease-in-out duration-1000 aria-selected:left-[16%] aria-selected:bottom-[16%]" aria-hidden={index !== slideNo} aria-selected={index === slideNo} />
          ))}
        </div>
      </div>
    </section>
    </>
  )
}