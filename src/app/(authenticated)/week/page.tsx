import { format } from "date-fns";
import { redirect } from "next/navigation";

export default function DefaultWeekPage() {
  const currentWeek = format(new Date(), "I-R");
  return redirect(`/week/${currentWeek}`);
}
