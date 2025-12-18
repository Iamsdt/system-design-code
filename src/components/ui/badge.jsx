import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
        outline:
          "border-slate-200 text-slate-900 dark:border-slate-700 dark:text-slate-100",
        subtle:
          "border-transparent bg-slate-200/60 text-slate-700 dark:bg-slate-700/30 dark:text-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(badgeVariants({ variant, className }))}
    {...props}
  />
))
Badge.displayName = "Badge"

export { Badge, badgeVariants }
