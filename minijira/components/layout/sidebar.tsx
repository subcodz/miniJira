'use client'
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "@/modules/auth/actions"
import { Bell, ChevronLeft, ChevronRight, CircleDot, FolderKanban, LayoutDashboard, Settings, LogOut, Calendar, PanelRight, PanelLeft } from "lucide-react"
import { Button } from "../ui/button"

const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Issues', href: '/my-issues', icon: CircleDot },
    { label: 'Projects', href: '/projects', icon: FolderKanban },
    { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Calendar', href: '/calendar', icon: Calendar },
    { label: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar({user}:{user:{email: string; full_name?: string}}) {
    const [collapsed, setCollapsed] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const pathname = usePathname()

    return(
        <aside 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`flex flex-col border-r border-gray-700 text-gray-600 font-sans bg-background transition-all duration-200 ${(collapsed && !isHovered) ? 'w-[52px]' : 'w-[230px]'}`}
        >
      
      {/* Top — logo + toggle */}
      <div className="flex h-[52px] items-center justify-between border-b border-gray-700 px-3">
        {(!collapsed || isHovered) && <span className="text-sm font-medium font-mono text-gray-300">MiniJira</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto flex h-6 w-6 items-center justify-center rounded-md border border-gray-700 text-gray-400 hover:bg-secondary hover:text-black"
        >
          {collapsed ? <PanelLeft size={12} /> : <PanelRight size={12} />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex  items-center gap-2.5 rounded-md px-2 py-1 text-sm transition-colors
                ${active ? 'bg-gray-100 text-primary' : 'text-neutral-400 hover:bg-blue-700/25 hover:text-neutral-300'}
                ${collapsed && !isHovered ? 'justify-center' : ''}`}
            >
              <Icon size={16} className="shrink-0" />
              {(!collapsed || isHovered) && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom — user + sign out */}
      <div className="border-t border-gray-700 p-2">
          <div
            className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-400 hover:bg-white hover:text-black
              ${collapsed && !isHovered ? 'justify-center' : ''}`}
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-800">
              {user.full_name?.[0] ?? user.email[0].toUpperCase()}
            </div>
            {(!collapsed || isHovered) && (
              <div className="flex flex-col items-start overflow-hidden">
                <span className="truncate text-xs font-medium">{user.full_name ?? 'User'}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            )}
          </div>

        <Button variant="clean_dark" onClick={signOut} className="w-full mt-2 hover:bg-red-500/50 text-gray-400 hover:text-gray-300">
          <LogOut size={16} />
          {(!collapsed || isHovered) && <span>Sign Out</span>}
        </Button>
      </div>

    </aside>
    )
}