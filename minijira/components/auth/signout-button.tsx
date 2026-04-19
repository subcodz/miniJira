'use client'
import { signOut } from '@/modules/auth/actions'
import { Button } from '@/components/ui/button'

export function SignOutButton() {
  return (
    <form action={signOut}>
      <Button type="submit" variant="clean_dark" className='font-sans'>
        Sign Out
      </Button>
    </form>
  )
}