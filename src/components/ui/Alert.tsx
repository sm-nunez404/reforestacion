import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'success' | 'error' | 'warning'
  }
>(({ className, variant = "default", children, ...props }, ref) => {
  const icons = {
    default: Info,
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
  }

  const Icon = icons[variant]

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4",
        {
          "bg-gray-50 text-gray-900 border-gray-200": variant === "default",
          "bg-green-50 text-green-900 border-green-200": variant === "success",
          "bg-red-50 text-red-900 border-red-200": variant === "error",
          "bg-yellow-50 text-yellow-900 border-yellow-200": variant === "warning",
        },
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        {Icon && <Icon className="h-5 w-5" />}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
})
Alert.displayName = "Alert"

export { Alert }
