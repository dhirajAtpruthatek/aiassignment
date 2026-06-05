
import { format } from "date-fns";
 
 
export function datetoString(
     date: Date | string
) {
     return format(date, "dd-MM-yyyy");
}