"use client"
 
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

type Props = {
  value?: Date 
  onChange: (date?: Date) => void
}

export function Datepicker({ value, onChange }: Props) {

  return (
    <Field className="w-full">
      <FieldLabel>Date</FieldLabel>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start font-normal w-full"
          >
            {value ? format(value, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
    
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            defaultMonth={value}
          />
        </PopoverContent>
      </Popover>

    </Field>
  )
}