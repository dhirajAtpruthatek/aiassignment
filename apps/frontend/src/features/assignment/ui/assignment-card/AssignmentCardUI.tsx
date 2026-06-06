'use client';

import { memo } from 'react';

import { EllipsisVertical } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useDeleteAssignment } from '../../api/assignment.query';
import type { Assignment } from '../../api/assignment.types';

interface Props {
  assignment: Assignment;
  statusConfig: {
    label: string;
    color: string;
  };
}

function AssignmentCardUI({ assignment, statusConfig }: Props) {
  const router = useRouter();
  const { mutate, isPending } = useDeleteAssignment();

  return (
    <div className="h-40 w-full rounded-[24px] bg-white p-6 flex justify-between">
      <div className="flex flex-col flex-1 justify-between">
        <h4 className="text-2xl font-extrabold leading-[120%] tracking-[-4%] text-TWO">
          {assignment.title}
        </h4>
        <div>
          <div
            className={cn(
              '  rounded-full  w-fit mb-1 px-3 py-1 text-sm font-medium',
              statusConfig.color,
            )}
          >
            {statusConfig.label}
          </div>
          <p className="space-x-2">
            <span className="text-[16px] font-extrabold text-TWO">
              Assigned On
            </span>

            <span className="text-[16px]">
              :{' '}
              {assignment.assignmentDate
                ? new Date(assignment.assignmentDate).toLocaleDateString()
                : '-'}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
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
              onClick={(e) => {
                e.stopPropagation();
                if (assignment.generationStatus === 'COMPLETED') {
                  router.push(`/dashboard/assignment/${assignment._id}`);
                } else {
                  router.push(
                    `/dashboard/assignment/create/configuration/${assignment._id}`,
                  );
                }
              }}
            >
              {assignment.generationStatus === 'COMPLETED'
                ? ' View Assignment'
                : 'Edit Assignment'}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                mutate({ id: assignment._id });
              }}
              className="text-red-600 focus:text-red-600"
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <p className="space-x-2">
          <span className="text-[16px] font-extrabold text-TWO">Due</span>

          <span className="text-[16px]">
            :{' '}
            {assignment.dueDate
              ? new Date(assignment.dueDate).toLocaleDateString()
              : '-'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default memo(AssignmentCardUI);
