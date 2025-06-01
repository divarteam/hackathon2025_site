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
import { Button } from '../ui/button'

export function Navbar() {

  return (
    <NavigationMenu
      className={`py-2 sm:px-10 px-3 sm:mx-10 mx-0 sticky top-0 flex h-[60px] max-w-[full] justify-between bg-opacity-80 bg-clip-padding bg-transparent rounded-b-xl transition-all duration-500`}
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
      <div className='flex gap-x-4'>
        <LinkNext href={'/confidant'}>
            <Button variant={'ghost'}>Управление доверенными лицами</Button>
        </LinkNext>
        <LinkNext href={'/profile'}>
            <Button variant={'ghost'}>Профиль</Button>
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
