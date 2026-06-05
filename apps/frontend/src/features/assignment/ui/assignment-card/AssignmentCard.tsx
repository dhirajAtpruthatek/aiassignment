"use client";

import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import AssignmentCardUI from "./AssignmentCardUI";

interface AssignmentCardProps {
     article: any;

}


export default function AssignmentCard({ article }: AssignmentCardProps) {
     const router = useRouter();
     const [isPending, startTransition] = useTransition();

     const openAssignment = useCallback(() => {
          startTransition(() => {
               router.push(`/dashboard/assignments/${"article"}`);
          });
     }, [router, article]);

     return (
          <div
               onMouseEnter={() => router.prefetch(`/article/${"article"}`)}
               onClick={openAssignment}
               className={`cursor-pointer  relative  `}
          >
               {isPending &&
                    <div className=" font-bricolage font-medium text-TWO h-full w-full absolute  top-0 left-0 z-10 flex justify-center text-lg  items-center">
                         Opening. . .
                    </div>
               }
               
               <div className={`relative z-0 ${isPending ? " blur-[6px]" : ""}`}>
                    <AssignmentCardUI />
               </div>

          </div >

     );
}
