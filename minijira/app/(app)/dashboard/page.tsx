// app/(app)/dashboard/page.tsx
//
// Server Component — fetches all data in parallel before rendering.
// No loading spinners, no useEffect, no client-side fetch.

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth"; // your existing auth wrapper
import { getDashboardData } from "@/lib/dashboard/fetch";

import { GreetingBlock } from "@/components/dashboard/greetingcard";
import { AISummaryCard } from "@/components/dashboard/aiSummarycard";
import { NearestTasksCard } from "@/components/dashboard/nearestTaskCard";
import { UpcomingMeetingsCard } from "@/components/dashboard/UpcomingMeetings";
import { TaskBreakdownChart } from "@/components/dashboard/taskChartView";

export const metadata = {
  title: "Dashboard — MiniJira",
};

export default async function DashboardPage() {
  const user = await getCurrentUser ();
  if (!user) redirect("/");

  // All three fetches run in parallel
  const { tasks, meetings, stats } = await getDashboardData(user.id);

  return (
    <main className="flex-1 overflow-y-auto px-8 py-8 max-w-4xl">
      <GreetingBlock name={user.user_metadata?.full_name ?? user.email} />
      <AISummaryCard />
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <NearestTasksCard tasks={tasks} />
        <UpcomingMeetingsCard meetings={meetings} />
      </div>
      <TaskBreakdownChart stats={stats} />
    </main>
  );
}