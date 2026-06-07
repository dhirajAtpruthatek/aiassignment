"use client";

import { usePathname } from "next/navigation";

type Props = {
     title?: string;
     description?: string;
};

const PAGE_CONFIG: Record<string, {
     title: string;
     description: string;
}> = {
     "/dashboard": {
          title: "Assignments",
          description: "Manage and create assignments for your classes.",
     },
     "/dashboard/assignment/create": {
          title: "Create Assignment",
          description: "Set up a new assignment for your students.",
     },
     "/dashboard/assignment/create/configuration": {
          title: "Assignment Configuration",
          description: "Configure assignment settings and question generation.",
     },
};

export default function PageHeadingSection({
     title,
     description,
}: Props) {
     const pathname = usePathname();

     const pageConfig = PAGE_CONFIG[pathname];

     const finalTitle = pageConfig?.title ?? title;
     const finalDescription = pageConfig?.description ?? description;

     return (
          <div className="flex items-center  gap-4 pl-1 pt-4 translate-x-2">
               <div className="hidden md:block size-3 rounded-full bg-[#4BC26D] outline-4 outline-[#4BC26D66]" />

               <div className="flex flex-col w-full md:w-auto">
                    <h2 className="text-center text-nowrap md:text-left text-[20px] font-bold text-TWO">
                         {finalTitle}
                    </h2>

                    <p className="hidden md:block text-[14px] font-normal text-[#5E5E5E8C]">
                         {finalDescription}
                    </p>
               </div>
          </div>
     );
}