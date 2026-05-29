'use client'

import { TrendingUp, AlertCircle, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  trend?: 'up' | 'down' | 'stable'
  color?: 'primary' | 'destructive' | 'accent'
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend = 'stable',
  color = 'primary',
}: MetricCardProps) {
  const getIcon = () => {
    if (color === 'destructive') return <AlertCircle className="w-5 h-5 text-destructive" />
    if (color === 'accent') return <Zap className="w-5 h-5 text-accent" />
    return <TrendingUp className="w-5 h-5 text-primary" />
  }

  return (
    <Card className="p-6 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="p-2 bg-muted rounded-lg">{getIcon()}</div>
      </div>
    </Card>
  )
}
