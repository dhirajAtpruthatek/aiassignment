"use client";

import { useAssignments } from "@/features/assignment/api/assignment.query";
import AssignmentRender from "./_components/AssignmentRender";
import AssignmentNotFound from "./_components/assignmentNotfound/AssignmentNofound";
type Props = {}

export default function page({ }: Props) {
  const {
    data: assignments,
    isLoading,
  } = useAssignments();

  return (
    <>
      {
        assignments && !isLoading && assignments?.length > 0 ? (
          <AssignmentRender data={assignments} />
        ) : (
          <AssignmentNotFound />
        )
      }
    </>
  )
}