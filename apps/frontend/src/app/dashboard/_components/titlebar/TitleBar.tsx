import { ArrowLeft, Bell, ChevronDown } from "lucide-react";

type Props = {};

export default function TitleBar({ }: Props) {
  return (
    <div className="w-full  relative z-999  md:pt-3 md:pr-3">
      <div className="w-full flex  border border-white  flex-row items-center justify-between rounded-[16px] bg-[#FFFFFFBF] px-6 py-2 sidebarShadow  ">

        {/* Left */}
        <div>
          {/* Back button */}
          <div className=" p-2 bg-white rounded-full text-TWO w-fit">
            <ArrowLeft />
          </div>
        </div>
        
        {/* Right */}
        <div className=" flex flex-row gap-8 items-center">
          {/* Notification */}
          <div className=" p-2 bg-[#f3f3f3] rounded-full text-TWO w-fit">
            <Bell />
          </div>
          
          {/* Profile */}
          <div className=" flex sidebarShadow p-2 rounded-2xl flex-row text-TWO gap-2 items-center">
            <div className=" size-7 rounded-full  bg-[#4BC26D]">
            </div>
            <span>John Doe</span>
            <ChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
}
