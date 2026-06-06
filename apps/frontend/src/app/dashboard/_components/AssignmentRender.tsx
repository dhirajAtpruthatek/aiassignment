import { Assignment } from '@/features/assignment/api/assignment.types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import AssignmentList from './AssignmentList';
type Props = {
  data: Assignment[];
};

export default function AssignmentRender({ data }: Props) {
  return (
    <div>
      <div className=" mt-2 px-3  md:pr-3 h-full  w-full  relative">
        {/* assignments heading */}
        <div className=" flex items-center pl-1 pt-3 gap-4 translate-x-2">
          <div className=" size-3 rounded-full outline-4 outline-[#4BC26D66] bg-[#4BC26D]"></div>
          <div className="flex flex-col gap-0">
            <h2 className=" text-[20px] font-bold text-TWO">Assignments</h2>
            <p className=" text-[14px] font-normal text-[#5E5E5E8C]">
              Manage and create assignments for your classes.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="  rounded-[24px]  h-16 flex flex-row justify-between bg-white"></div>

        {/* Assignment List */}
        <AssignmentList data={data} />

        <div className="fixed bottom-0  w-[81%] right-0 h-20 pointer-events-none footerGradient z-20" />

        <div className="fixed bottom-2  right-0 flex   w-[81%] justify-center z-30">
          <Link
            href="/dashboard/assignment/create"
            className="flex createAssignButton px-5 py-1.5 items-center flex-row justify-center gap-2 rounded-2xl bg-TWO"
          >
            <Plus color="#fff" size={28} />
            <span className=" leading-[140%] font-medium text-white text-[16px]">
              Create Assignment
            </span>{' '}
          </Link>
        </div>
      </div>
    </div>
  );
}
