"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
      className
    )}
    ref={ref}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 translate-x-0 data-[state=checked]:translate-x-5"
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = "Switch"

export { Switch }
