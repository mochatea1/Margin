'use client'

import { MetricCard } from '@/components/metric-card'
import { MarginDebtChart, AccountStatusChart } from '@/components/charts'

export function DashboardView() {
  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Tổng dư nợ Margin toàn sàn"
          value="50.5 Tỷ VNĐ"
          subtitle="Tăng 2.3% so với hôm qua"
          trend="up"
          color="primary"
        />
        <MetricCard
          title="Tài khoản vi phạm tỷ lệ"
          value="12"
          subtitle="Cần giải chấp ngay"
          trend="up"
          color="destructive"
        />
        <MetricCard
          title="Số lệnh chờ khớp"
          value="345"
          subtitle="Lệnh chưa được thực thi"
          color="accent"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarginDebtChart />
        <AccountStatusChart />
      </div>
    </div>
  )
}
