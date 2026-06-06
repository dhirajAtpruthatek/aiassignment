"use client"
import { usePathname } from "next/navigation";
import React from "react"
type Props = { children: React.ReactNode }
export default function layout({ children }: Props) {
     const pathname = usePathname();
     const isConfigPage = pathname.includes("/configuration");
     return (
          <div>
               <div className=" mt-2 pr-3 h-full  w-full  relative">
                    
                    {/* assignments heading */}
                    <div className=" flex items-center pl-1 pt-3 gap-4 translate-x-2">
                         <div className=" size-3 rounded-full outline-4 outline-[#4BC26D66] bg-[#4BC26D]">
                         </div>
                         <div className="flex flex-col gap-0">
                              <h2 className=" text-[20px] font-bold text-TWO">Create Assignments</h2>
                              <p className=" text-[14px] font-normal text-[#5E5E5E8C]">Set up a new assignment for your students</p>
                         </div>

                    </div>
               </div>

               <div className=" w-205 mx-auto  mt-7 space-y-5">
                    <div className=" flex flex-row justify-between gap-4">
                         <div className=" w-1/2 h-1.25   rounded-2xl"
                              style={{ backgroundColor: isConfigPage ? "#DADADA" : "#5E5E5E" }}></div>
                         <div className=" w-1/2 h-1.25   rounded-2xl"
                              style={{ backgroundColor: isConfigPage ? "#5E5E5E" : "#DADADA" }}></div>
                    </div>
                    {children}

               </div>
          </div>
     )
}