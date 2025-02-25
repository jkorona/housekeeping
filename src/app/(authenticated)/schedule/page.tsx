import { format } from "date-fns";
import { redirect } from "next/navigation";

export default function SchedulePage() {
  return redirect(`/schedule/day/${format(new Date(), "yyyy-MM-dd")}`);
}
