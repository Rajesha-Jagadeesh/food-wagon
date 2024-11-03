"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { emailRegEx } from "@/utils/utils";
import { pageLoading } from "@/utils/SVG";
import { useRouter } from "next/navigation";
const foodSlides = ["food-slider-1.png", "food-slider-2.png", "food-slider-3.png", "food-slider-4.png", "food-slider-5.png", "food-slider-6.png"]
export default function RegisterPage(props:{searchParams?:{role?: "restaurant" | "customer"}}){
  const [showEye, setShowEye] = useState<boolean>(false);
  const [slideNo, setSlideNo] = useState<number>(0);
  const [agreeToTerms, setAgree] = useState<boolean>(false)
  const [isRestaurant, setIsRestaurant]=useState(props.searchParams && props.searchParams.role === "restaurant");
  const router = useRouter();
  useEffect(()=>{
    const sliderInterval = setInterval(() => {
      setSlideNo(prev=>(prev === foodSlides.length - 1) ? 0 : (prev + 1));
    }, 4000);
    return()=>{
      clearInterval(sliderInterval)
    }
  }, []);
  
  const RegisterUser = (e:any):void =>{
    try {
      e.preventDefault();
      const {email, password, name} = e.target.form.elements;
      if (email.value.trim("") !== "" && password.value.trim("") && name.value.trim("") !== "") {
        if(emailRegEx.test(email.value)){
          if (!agreeToTerms) {
            Swal.fire({
              text: "Please read and accept the terms and conditions",
              icon: "info",
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#000"
            })
            return;
          }
          Swal.fire({
            html: `<div class="flex justify-center">${pageLoading}</div>`,
            showConfirmButton: false,
            allowOutsideClick: false,
            background: "transparent"
          })
          fetch('/api/register', {
            method: "POST",
            body: JSON.stringify({email: email.value, name: name.value, password: password.value, isRestaurant: isRestaurant})
          }).then(res=>res.json().then(result=>{
            Swal.fire({
              text: result.message,
              icon: result.success ? "success" : "error",
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#000"
            })
            if (result.success) {
              setTimeout(() => {
                Swal.close();
                if (result.isRestaurant) {
                  router.push("/dashboard");
                }else{
                  router.push("/basket");
                }
              }, 2500);
            }
          }))
        }else {
          Swal.fire({
            text: "Please enter a valid email",
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "#000"
          })
        }
      }else{
        Swal.fire({
          text: "Please fill required fields",
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#000"
        })
      }
    } catch (error) {
      Swal.fire({
        text: "An error occured, please try again later",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#000"
      })
    }
  }
  
  return(
    <>
    <section id="register-page" className="overflow-x-hidden">
      <div className="bg-[transparent] w-dvw min-h-dvh relative top-0 left-0 justify-center items-center pt-28 pb-10 z-10 flex h-auto overflow-y-auto">
        <div id="register-container" className="w-[445px] border-1 border-gray-400 p-4 rounded-2xl bg-primary max-w-[90dvw]">
          <form id="register-form" className="max-w-full" onSubmit={RegisterUser}>
            <h1 className="form-title font-bold font-jost text-3xl">Create New Account</h1>
            <div className="text-context font-normal font-jost text-base">Please enter details</div>
            <div className="register-input-container mt-5 flex flex-col">
              <label htmlFor="name" className="text-sm font-jost ">{isRestaurant ? "Restaurant Name" : "Full Name"} <span className="text-red-600">*</span></label>
              <input type="text" name="name" className="outline-none border-1 border-primary rounded-xl p-4 w-full text-base font-jost font-semibold" />
            </div>
            <div className="register-input-container mt-4 flex flex-col relative">
              <label htmlFor="email" className="text-sm font-jost ">Email Address <span className="text-red-600">*</span></label>
              <input type="email" name="email" className="outline-none border-1 border-primary rounded-xl p-4 w-full text-base font-jost font-semibold" />
            </div>
            <div className="register-input-container mt-4 flex flex-col relative">
              <label htmlFor="password" className="text-sm font-jost ">Password <span className="text-red-600">*</span></label>
              <input type={showEye ? "text" : "password"} name="password" className="outline-none border-1 border-primary rounded-xl p-4 w-full text-base font-jost font-semibold autofill:bg-primary" />
              <div className="eye-container absolute right-2 bottom-4 cursor-pointer z-50">
                <Image className="aria-hidden:hidden" src="/assets/images/password-eye-close.png" width={25} height={25} alt="Eye" aria-hidden={showEye} onClick={()=>setShowEye(prev=>!prev)} />
                <Image className="aria-hidden:hidden" src="/assets/images/password-eye-open.png" width={25} height={25} alt="Eye" aria-hidden={!showEye} onClick={()=>setShowEye(prev=>!prev)} />
              </div>
            </div>
            <div className="terms-and-condition-context my-6 flex justify-between">
              <div className="checkbox-container flex gap-2 ">
                <input type="checkbox" name="terms-and-condition" className="size-5 accent-black cursor-pointer" onChange={()=>setAgree(prev=>!prev)} checked={agreeToTerms}/>
                <label htmlFor="terms-and-condition" className="font-jost font-normal text-base cursor-pointer" onClick={()=>setAgree(prev=>!prev)}>I agree to the <b><Link href="terms-and-condition" >Terms & Conditions </Link></b></label>
              </div>
              <Link href={"login"}>have an account?</Link>
            </div>
            <button type="submit" className="w-full p-4 bg-black text-white rounded-xl" onClick={RegisterUser}>Signup</button>
            <div className="w-full border-1 border-black rounded-xl flex justify-center mt-2">
              <Link href={isRestaurant ? "register?role=restaurant" : "register?role=customer"} className="w-full text-center m-auto p-4" onClick={()=>setIsRestaurant(prev=>!prev)}>Register as {isRestaurant ? "Customer" : "Restaurant"}</Link>
            </div>
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