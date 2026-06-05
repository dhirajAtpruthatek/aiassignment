import AssignmentCard from "@/features/assignment/ui/assignment-card/AssignmentCard"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
type Props = {}

export default function page({ }: Props) {
  return (
    <div className=" mt-2 pr-3 h-full  w-full  relative">



      {/* assignments heading */}
      <div className=" flex items-center gap-4 translate-x-2">
        <div className=" size-3 rounded-full outline-4 outline-[#4BC26D66] bg-[#4BC26D]">
        </div>
        <div className="flex flex-col gap-0">
          <h2 className=" text-[20px] font-bold text-TWO">Assignments</h2>
          <p className=" text-[14px] font-normal text-[#5E5E5E8C]">Manage and create assignments for your classes.</p>
        </div>

      </div>

      {/* Filter Bar */}
      <div className="  rounded-[24px]  h-16 flex flex-row justify-between bg-white">
      </div>

      {/* Assignment List */}
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <AssignmentCard article={null} />
        <AssignmentCard article={null} />
        <AssignmentCard article={null} />
        <AssignmentCard article={null} />
        <AssignmentCard article={null} />
        <AssignmentCard article={null} />
        <AssignmentCard article={null} />
        <AssignmentCard article={null} />
        <AssignmentCard article={null} />
      </div>

      <div className="fixed bottom-0  w-[81%] right-0 h-20 pointer-events-none footerGradient z-20" />

      <div className="fixed bottom-2  right-0 flex   w-[81%] justify-center z-30">
        <Button className="flex createAssignButton px-6 py-5 flex-row justify-center gap-2 rounded-2xl ">
          <Plus color='#fff' size={28} />
          <span className=' leading-[140%] font-medium text-white text-[16px]'>Create Assignment</span> </Button>
      </div>
    </div>
  )
}