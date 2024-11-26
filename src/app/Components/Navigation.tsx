import Link from "next/link";
import Image from "next/image";
export default async function Navigation() {
  const userResponse = await (await fetch(`${process.env.NEXT_HOST_NAME}/api/login`,{ method: "GET"})).json();
  const user = userResponse && userResponse.success ? userResponse.user : false;
  return (
    <div className="fixed w-dvw h-16 top-0 left-0 z-[1000]">
      <nav className="w-full max-w-[1600px] m-auto h-full border-b-gray-500 border-b-1 flex items-center justify-between px-8 bg-white">
        {user && user.isRestaurant ? (
          <>
          </>
        ) : (
          <>
          <div className="flex-container flex w-full items-center gap-2 justify-between">
            <div className="first-nav flex items-center gap-2">
              <Link href="/"><Image src={"/assets/images/food-wagon.png"} alt="Food Wagon" width={300} height={100} className="w-[80px] object-contain" /></Link>
              <Link href={"/"} className="p-1.5 font-jost text-lg" >Home</Link>
              <Link href={"/about-us"} className="p-1.5 font-jost text-lg" >About Us</Link>
              <Link href={"/contact-us"} className="p-1.5 font-jost text-lg" >Contact Us</Link>
            </div>
            <div className="search-nav flex items-center gap-2">
              <div className="search-container">
                <input type="text" placeholder="Search..." name="q" className="bg-[#F5F5F5] text-black p-1.5 rounded-md outline-none w-[300px] font-jost" />
              </div>
            </div>
            <div className="last-nav flex items-center gap-2">
              {user ? (
                <div className="profile-container">
                  <Link href={"/orders"} ><Image src="/assets/images/user-profile.png" width={100} height={100} alt="Profile"  className="size-6 object-contain" /> </Link>
                </div>
              ) : (
                <>
                  <div className="login-container">
                    <Link href={"/login"} className="p-1.5 font-jost text-lg" >Login</Link>
                  </div>
                  <div className="register-container">
                    <Link href={"/register"} className="p-1.5 font-jost text-lg" >Register</Link>
                  </div>
                </>
              )}
              <div className="favorites-container">
                <Link href={"/favorites"} ><Image src="/assets/images/favorites-icon.png" width={50} height={100} alt="Favorites" className="size-6 object-contain" /></Link>
              </div>
              <div className="basket-container">
                <Link href={"/basket"} ><Image src="/assets/images/basket.png" width={100} height={100} alt="Basket"  className="size-7 object-contain" /> </Link>
              </div>
            </div>
          </div>
          </>
        )}
      </nav>
    </div>
  )
}
