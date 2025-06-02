'use client'
import { deleteCookie } from 'cookies-next/client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/dialog'
import { Button } from './button'
import { apiAuth } from '@/src/entities/auth/api'

export function SignOut() {
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'destructive'}>
          <div className='flex gap-x-2'>
            <LogOut />
            <span>Выйти</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вы уверены, что хотите выйти?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter className='sm:justify-end'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Отмена
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type='button'
              variant='destructive'
              onClick={async () => {
                await apiAuth.deactivateCurrentUserToken()
                deleteCookie('token')
                router.push('/login')
              }}
            >
              Да, уверен
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
