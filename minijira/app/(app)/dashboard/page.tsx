import { getCurrentUserr } from '@/lib/auth'

export default async function DashboardPage() {
  const user = await getCurrentUserr()
  const fullName = user?.user_metadata?.full_name ?? 'User'
  
  return (
    <div>
      
    </div>
  )
}