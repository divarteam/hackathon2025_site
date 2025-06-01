"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/src/shared/utils/shadcn"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full cursor-pointer",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn( // bg-muted
        "bg-[#9B3BE5] text-white flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

function fullnameAvatar(str: string | undefined) {
    console.log(str)
    if (!str) {
        return ''
    }

    const arr = str!.split(' ')
    return arr[0].charAt(0) + arr[1].charAt(0)
}

export { Avatar, AvatarImage, AvatarFallback, fullnameAvatar }
