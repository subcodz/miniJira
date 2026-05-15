'use client'
import { usePathname } from 'next/navigation'
import { Bell, Plus, Logs, LayoutDashboard, ListTodo, FolderOpen, Settings, Calendar, Pen, CircleDot} from 'lucide-react'
import { Button } from '@/components/ui/button'

const pageTitles: Record<string, { icon: React.ReactNode; label: string }> = {
  '/dashboard': { icon: <LayoutDashboard size={14} />, label: 'Dashboard' },
  '/my-issues': { icon: <ListTodo size={14} />, label: 'My Issues' },
  '/projects': { icon: <FolderOpen size={14} />, label: 'Projects' },
  '/notifications': { icon: <Bell size={14} />, label: 'Notifications' },
  '/settings': { icon: <Settings size={14} />, label: 'Settings' },
}

export function Topbar() {
  const pathname = usePathname()
  const pageInfo = pageTitles[pathname] ?? { icon: null, label: 'MiniJira' }

  return (
    <header className="sticky top-7 text-xs z-10 flex rounded-[10px] mx-55 text-gray-200 h-[38px] font-sans items-center gap-2 border border-gray-600 bg-neutral-800/60 px-1 py-4">
      
      {/* Page title */}
      <Button size="sm" variant="clean_dark" className="group text-xs transition-all duration-300 gap-0 hover:gap-2">
          {pageInfo.icon}
          <span className="max-w-0 opacity-0 transition-all duration-300 whitespace-nowrap group-hover:max-w-[60px] group-hover:opacity-100">{pageInfo.label}</span>
        </Button>
      <div className="h-4 w-px bg-gray-600" />
      {/* Search */}
      <div className="relative flex-1 max-w-[200px]">
        <svg className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          className="h-6 w-30 rounded-sm bg-neutral-700/80 pl-7 pr-3 text-sm placeholder:text-gray-400 focus:outline-1 focus:outline-blue-500"
          placeholder="Ctrl + K"
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-1">
        <Button size="sm" variant="clean_dark" className="group text-xs transition-all duration-300 gap-0 hover:gap-2">
          <Calendar size={13} />
          <span className="max-w-0 opacity-0 transition-all duration-300 whitespace-nowrap group-hover:max-w-[50px] group-hover:opacity-100">Calendar</span>
        </Button>
        <Button size="sm" variant="clean_dark" className="group text-xs transition-all duration-300 gap-0 hover:gap-2">
          <Pen size={13} />
          <span className="max-w-0 opacity-0 transition-all duration-300 whitespace-nowrap group-hover:max-w-[50px] group-hover:opacity-100">Note</span>
        </Button>
        <Button size="sm" variant="clean_dark" className="group text-xs transition-all duration-300 gap-0 hover:gap-2">
          <ListTodo size={13} />
          <span className="max-w-0 opacity-0 transition-all duration-300 whitespace-nowrap group-hover:max-w-[50px] group-hover:opacity-100">Issues </span>
        </Button>
        <Button
          size="sm"
          variant="clean_dark"
          className="group text-xs transition-all duration-300 gap-0 hover:gap-2"
        >
          <Logs size={13} />

          <span
            className="
              max-w-0
              overflow-hidden
              opacity-0
              whitespace-nowrap
              transition-all
              duration-300
              group-hover:max-w-[50px]
              group-hover:opacity-100
          "
        >
             Log
          </span>
        </Button>
        <Button size="sm" variant="clean_dark" className="gap-1.5 text-xs bg-blue-800">
          <Plus size={14} />
          Create Issue
        </Button>
        <Button size="icon" variant="clean_dark" className="group text-xs transition-all duration-300 gap-0 hover:gap-2 relative h-8 w-8">
          <Bell size={14} />
          {/* swap this with real unread count later */}
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
        </Button>
      </div>

    </header>
  )
}