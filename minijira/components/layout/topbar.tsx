'use client'
import { usePathname } from 'next/navigation'
import { Bell, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/my-issues': 'My Issues',
  '/projects': 'Projects',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
}

export function Topbar() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? 'MiniJira'

  return (
    <header className="sticky top-7 z-10 flex rounded-[10px] mx-35 text-gray-300 h-[38px] font-sans items-center gap-3 border border-gray-600 bg-gray-700/40 px-1 py-4">
      
      {/* Page title */}
      <span className=" text-sm hover:bg-white px-2 py-1 rounded-sm duration-200 hover:text-black font-medium">{title}</span>
      <div className="h-5 w-px bg-gray-700" />

      {/* Search */}
      <div className="relative flex-1 max-w-[200px]">
        <svg className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          className="h-7 w-full rounded-full border border-gray-600 bg-transparent pl-7 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none "
          placeholder="Search issues, projects..."
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        <Button size="sm" variant="clean_dark" className="gap-1.5 text-sm">
          <Plus size={14} />
          Create Issue
        </Button>
        <Button size="icon" variant="clean_dark" className="relative h-8 w-8">
          <Bell size={16} />
          {/* swap this with real unread count later */}
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
        </Button>
      </div>

    </header>
  )
}