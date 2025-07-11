import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function MetricCard({ title, value, icon, trend, className }: MetricCardProps) {
  return (
    <Card className={cn("shadow-card hover:shadow-primary transition-shadow duration-200", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <p className={cn(
            "text-xs mt-1",
            trend.isPositive ? "text-success" : "text-destructive"
          )}>
            {trend.isPositive ? "+" : ""}{trend.value}
            <span className="text-muted-foreground"> vs mês anterior</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}