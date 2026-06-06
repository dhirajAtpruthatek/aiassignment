import { Assignment } from '@/features/assignment/api/assignment.types';
import { Funnel, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import AssignmentList from './AssignmentList';
import { CreateAssignmentField } from '@/components/common/create-assignment-form/FormField';
type Props = {
  data: Assignment[];
};

export default function AssignmentRender({ data }: Props) {
  return (
    <div>
      <div className=" mt-2   md:pr-3 h-full  w-full  relative">

        {/* assignments heading */}
        <div className=" flex items-center pl-1 pt-4 gap-4 translate-x-2">
          <div className=" size-3 rounded-full outline-4 outline-[#4BC26D66] bg-[#4BC26D]"></div>
          <div className="flex flex-col gap-0">
            <h2 className=" text-[20px] font-bold text-TWO">Assignments</h2>
            <p className=" text-[14px] font-normal text-[#5E5E5E8C]">
              Manage and create assignments for your classes.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="  rounded-[24px] mt-3  h-16 flex items-center  px-4 flex-row justify-between bg-white">
          <div className=" flex flex-row gap-2 text-[14px]  font-semibold text-[#A9A9A9] items-center">
            <Funnel className="size-5" />
            <span>Filter By</span>
          </div>
          <div className=" relative  border-2 rounded-3xl border-[#dfdfdf] w-96 flex flex-row  justify-end">
            <Search  className=" absolute left-3 text-[#848484] size-5 top-1/2 -translate-y-1/2"/>
            <CreateAssignmentField.Input  className=' w-[calc(384px-50px)] h-11  bg-white rounded-3xl border-none outline-none focus-visible:ring-0    text-[14px]  font-medium text-[#A9A9A9]' placeholder='Search Assignment'/>
          </div>
        </div>

        {/* Assignment List */}
        <AssignmentList data={data} />

        <div className=" fixed bottom-0   w-full md:w-[81%] right-0 h-20 pointer-events-none footerGradient z-20" />

        <div className="  fixed  bottom-10 md:bottom-2  right-3 md:right-0 flex   w-full md:w-[81%]  justify-end md:justify-center z-30">
          <Link
            href="/dashboard/assignment/create"
            className="flex createAssignButton  px-2 md:px-5  py-2 sidebarShadow md:py-1.5 items-center flex-row justify-center gap-2 rounded-2xl bg-white md:bg-TWO"
          >
            <Plus className=" text-orange-600 md:text-white" size={28} />
            <span className="   hidden md:block leading-[140%] font-medium text-white text-[16px]">
              Create Assignment
            </span>{' '}
          </Link>
        </div>
      </div>
    </div>
  );
}
