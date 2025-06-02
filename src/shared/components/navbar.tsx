'use client'

import ImageNext from 'next/image'
import LinkNext from 'next/link'
import * as React from 'react'

import logo from '@/src/shared/assets/images/logo.png'
import { cn } from '@/src/shared/utils/shadcn'
import {
  NavigationMenu,
  NavigationMenuLink,
} from '@/src/shared/ui/navigation-menu'
import { Button } from '@/src/shared/ui/button'
import { Avatar, AvatarFallback, AvatarImage, fullnameAvatar } from '@/src/shared/ui/avatar'
import { useEffect, useState } from 'react'
import { UserType } from '@/src/entities/user/schemas'
import { apiUser } from '@/src/entities/user/api'
import { Skeleton } from '../ui/skeleton'
import { ThemeToggle } from '../ui/theme-toggle'

export function Navbar() {
  const [currentUser, setCurrentUser] = useState<UserType | undefined>()

  const [loadingCurrentUser, setLoadingCurrentUser] = useState<boolean>(true)

  async function getCurrentUser() {
      setLoadingCurrentUser(true)
      const currentUser = await apiUser.getCurrentUser()
      setCurrentUser(currentUser)
      setLoadingCurrentUser(false)
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <NavigationMenu
      className={`py-2 sm:px-10 px-3 sticky top-0 flex h-[60px] max-w-[full] justify-between items-center bg-opacity-80 bg-clip-padding bg-background rounded-b-xl z-50 transition-all duration-150 `}
    >
      <div className='flex'>
        <LinkNext href='/'>
          <ImageNext
            src={logo}
            alt='logo'
            width={124}
            height={22}
            priority={true}
          />
        </LinkNext>
      </div>
      <div className='flex items-center'>
        <div className='md:block hidden'>
          <LinkNext href={'/confidant'}>
              <Button className='px-[14px]' variant={'ghost'}>Управление доверенными лицами</Button>
          </LinkNext>
          <LinkNext href={'/profile'}>
              <Button className='px-[24px]' variant={'ghost'}>Профиль</Button>
          </LinkNext>
        </div>
        <div className='pr-5'>
          <ThemeToggle />
        </div>
        <LinkNext href={'/profile'}>
          {!loadingCurrentUser && <Avatar className="w-[36px] h-[36px]">
              <AvatarImage src='#'/>
              <AvatarFallback>{fullnameAvatar(currentUser?.fullname)}</AvatarFallback>
              {/* <AvatarFallback>BB</AvatarFallback> */}
          </Avatar>}
          {loadingCurrentUser && <Skeleton className='w-[36px] h-[36px] rounded-full' />}
        </LinkNext>
      </div>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
