
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
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
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
=======
import * as React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  children?: React.ReactNode; // ✅ Allow children inside Avatar
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback = "?", className = "", children }) => {
  return (
    <div className={`relative w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span className="text-gray-600 font-semibold">{fallback}</span>
      )}
      {children} {/* ✅ Ensure children can be rendered inside */}
    </div>
  );
};

