import Image from 'next/image'
import LogoImg from "@/public/moneyguard.png"




function Logo({ small }: { small?: boolean }) {
   if (small) {
      return (
         <div className="flex items-center justify-center flex-col">
            <Image src={LogoImg} alt="" width={24} height={24} />
            <h1 className={"text-[18px] drop-shadow-md"}>
               Money Guard
            </h1>
         </div>
      )
   }

   return (
      <div className="flex items-center justify-center flex-col">
         <Image src={LogoImg} alt="" width={36} height={36} />
         <h1 className={"text-[27px] drop-shadow-md"}>
            Money Guard
         </h1>
      </div>
   )
}

export default Logo