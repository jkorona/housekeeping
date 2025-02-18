import { redirect } from "next/navigation";
import { format } from "date-fns";

export default async function Page() {
  return redirect(`/schedule/day/${format(new Date(), "yyyy-MM-dd")}`);
}
