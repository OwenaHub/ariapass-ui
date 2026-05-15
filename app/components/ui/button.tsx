import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "group/button rounded! inline-flex shrink-0 items-center justify-center rounded-lg cursor-pointer bg-clip-padding text-xs font-medium whitespace-nowrap transition-all duration-75 outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-[#303030] to-[#1a1a1a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_0_0_1px_#000000,_0_2px_0_0_#000000] active:not-aria-[haspopup]:translate-y-[2px] active:not-aria-[haspopup]:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_0_0_1px_#000000,_0_0px_0_0_#000000] hover:opacity-90",
        outline:
          "bg-gradient-to-b from-white to-[#f6f6f7] text-[#202223] shadow-[inset_0_1px_0_white,_0_0_0_1px_#c9cccf,_0_2px_0_0_#c9cccf] active:not-aria-[haspopup]:translate-y-[2px] active:not-aria-[haspopup]:shadow-[inset_0_1px_0_white,_0_0_0_1px_#c9cccf,_0_0px_0_0_#c9cccf] hover:from-[#f9f9fb] hover:to-[#f0f0f1]",
        secondary:
          "bg-gradient-to-b from-white to-[#f6f6f7] text-[#202223] shadow-[inset_0_1px_0_white,_0_0_0_1px_#c9cccf,_0_2px_0_0_#c9cccf] active:not-aria-[haspopup]:translate-y-[2px] active:not-aria-[haspopup]:shadow-[inset_0_1px_0_white,_0_0_0_1px_#c9cccf,_0_0px_0_0_#c9cccf] hover:from-[#f9f9fb] hover:to-[#f0f0f1]",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 active:not-aria-[haspopup]:translate-y-px",
        destructive:
          "bg-gradient-to-b from-[#e32c2b] to-[#c32423] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_0_0_0_1px_#a31a12,_0_2px_0_0_#a31a12] active:not-aria-[haspopup]:translate-y-[2px] active:not-aria-[haspopup]:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_0_0_0_1px_#a31a12,_0_0px_0_0_#a31a12] hover:opacity-90",
        link: 
          "text-primary underline-offset-4 hover:underline active:not-aria-[haspopup]:translate-y-px",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
        xs: "h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
        icon: "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }