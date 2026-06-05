import { EllipsisVertical } from "lucide-react";
import { memo } from "react";
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function AssignmentCardUI() {

     return (
          <div className=" h-40 w-full rounded-[24px]  flex flex-row justify-between bg-white p-6">
               <div className="flex flex-col justify-between">
                    <h4 className="text-2xl font-extrabold leading-[120%] tracking-[-4%] text-TWO">
                         Quiz on Electricity
                    </h4>
                    <p className="space-x-2">
                         <span className="text-[16px] font-extrabold leading-[120%] tracking-[-4%] text-TWO">Assigned on</span>
                         <span className="text-[16px]   leading-[120%] tracking-[-4%] ">: 20-06-2025</span>
                    </p>
               </div>
               <div className="flex flex-col justify-between items-end">
                    <div className="">
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <button
                                        className="rounded-md p-1 hover:bg-muted"
                                        onClick={(e) => e.stopPropagation()}
                                   >
                                        <EllipsisVertical className="h-5 w-5" />
                                   </button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                   align="end"
                                   className="sidebarShadow p-2 w-40"
                                   onClick={(e) => e.stopPropagation()}
                              >
                                   <DropdownMenuItem
                                        className=" text-[14px] px-2.5 py-2.5  text-TWO font-bricolage font-medium"
                                        onClick={() => {
                                             alert("View assignment");
                                        }}
                                   >
                                        View Assignment
                                   </DropdownMenuItem>

                                   <DropdownMenuItem
                                        className="text-red-600 px-2.5 py-2.5  text-[14px]   font-bricolage font-medium  bg-[#F6F6F6] focus:text-red-600"
                                        onClick={() => {
                                             alert("Delete assignment");
                                        }}
                                   >
                                        Delete
                                   </DropdownMenuItem>
                              </DropdownMenuContent>
                         </DropdownMenu>

                    </div>
                    <p className="space-x-2">
                         <span className="text-[16px] font-extrabold leading-[120%] tracking-[-4%] text-TWO">Due</span>
                         <span className="text-[16px]   leading-[120%] tracking-[-4%] ">: 20-06-2025</span>
                    </p>

               </div>
          </div>
     );
}
export default memo(AssignmentCardUI);