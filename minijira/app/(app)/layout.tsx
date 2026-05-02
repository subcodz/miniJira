import  { redirect } from 'next/navigation'
import { getCurrentUserr } from '@/lib/auth'
import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUserr()
  if (!user) redirect('/')

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar user={{email: user.email!, full_name: user.user_metadata?.full_name }} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
      
    </div>
  )
}