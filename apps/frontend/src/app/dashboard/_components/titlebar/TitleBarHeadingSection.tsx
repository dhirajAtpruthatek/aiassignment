"use client";

import { LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { BsStars } from "react-icons/bs";
import Link from "next/link";
type Props = {
     title?: string;
     description?: string;
};

const PAGE_CONFIG: {
     pattern: RegExp;
     title: string;
     component: React.JSX.Element;
     description: string;
}[] = [
          {
               pattern: /^\/dashboard$/,
               title: "Assignments",
               description: "Manage and create assignments for your classes.",
               component: <div className=" text-[#A9A9A9] flex items-center gap-2">
                    <LayoutGrid className="size-5" />
                    <span className=" text-[16px]">Assignment</span>
               </div>,
          },
          {
               pattern: /^\/dashboard\/assignment\/create$/,
               title: "Create Assignment",
               description: "Set up a new assignment for your students.",
               component: <div className=" text-[#A9A9A9] flex items-center gap-2">
                    <LayoutGrid className="size-5" />
                    <span className=" text-[16px]">Assignment</span>
               </div>,
          },
          {
               pattern: /^\/dashboard\/assignment\/create\/configuration(\/[^/]+)?$/,
               title: "Assignment Configuration",
               description: "Configure assignment settings and question generation.",
               component: <div className=" text-[#A9A9A9] flex items-center gap-2">
                    <LayoutGrid className="size-5" />
                    <span className=" text-[16px]">Assignment</span>
               </div>,
          },
          {
               pattern: /^\/dashboard\/assignment(\/[^/]+)?$/,
               title: 'Assignments',
               description: "",
               component: <Link href="/dashboard/assignment/create" className=" text-[#A9A9A9] flex items-center gap-2">
                    <BsStars className="size-5" />
                    <span className=" text-[16px]">Create New</span>
               </Link>,
          },

     ];

export default function TitleBarHeadingSection({
     title,
     description,
}: Props) {
     const pathname = usePathname();

     const pageConfig = PAGE_CONFIG.find((route) =>
          route.pattern.test(pathname)
     );
     const finalTitle = pageConfig?.title ?? title;
     if (!finalTitle) {
          return null;
     }

     return (
          <div className="  ">
               {pageConfig?.component}
          </div>
     );
}