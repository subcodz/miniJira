// components/dashboard/GreetingBlock.tsx

import { getGreeting } from "@/lib/dashboard/greeting";

interface GreetingBlockProps {
  name: string;
}

export function GreetingBlock({ name }: GreetingBlockProps) {
  // On the server, Date reflects the server timezone.
  // If you want user-local time, pass the hour from a Client Component instead.
  const hour = new Date().getHours();
  const { label, sub } = getGreeting(hour);

  // First name only for the greeting
  const firstName = (name && typeof name === "string") ? name.split(" ")[0] : "User";

  return (
    <div className="mb-8 font-sans">
      <p className="text-[11px] font-medium tracking-[0.09em] uppercase text-neutral-500 mb-1.5">
        {label}
      </p>
      <h1 className="text-2xl font-medium text-neutral-400 leading-snug">
        Hey,{" "}
        <span className="text-white">{firstName}</span>{" "}
        
      </h1>
      <p className="text-sm text-neutral-500 mt-1.5">{sub}</p>
    </div>
  );
}