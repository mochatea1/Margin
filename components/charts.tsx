'use client'

import { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'

const marginDebtData = [
  { day: 'T2', debt: 48.5 },
  { day: 'T3', debt: 49.2 },
  { day: 'T4', debt: 47.8 },
  { day: 'T5', debt: 50.1 },
  { day: 'T6', debt: 52.3 },
  { day: 'T7', debt: 51.5 },
  { day: 'CN', debt: 50.5 },
]

const accountStatusData = [
  { name: 'Active', value: 1245, fill: '#22c55e' },
  { name: 'Warning', value: 189, fill: '#eab308' },
  { name: 'Force Sell', value: 56, fill: '#ef4444' },
]

const stockPriceData = [
  { time: '09:00', price: 52.1 },
  { time: '10:00', price: 51.8 },
  { time: '11:00', price: 53.2 },
  { time: '12:00', price: 52.9 },
  { time: '13:00', price: 54.5 },
  { time: '14:00', price: 53.8 },
  { time: '15:00', price: 55.2 },
]

export function MarginDebtChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Biến động Dư nợ Margin 7 ngày qua</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={marginDebtData}>
          <defs>
            <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
          <Area type="monotone" dataKey="debt" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorDebt)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function AccountStatusChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Tỷ trọng trạng thái tài khoản</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={accountStatusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {accountStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function StockPriceChart() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Biểu đồ giá cổ phiếu</h3>
          <div className="flex gap-4 mt-4">
            <div className="bg-muted px-3 py-1 rounded text-sm font-medium">VCB</div>
            <div className="text-lg font-bold text-primary">55.20 VNĐ</div>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stockPriceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
          <Line type="monotone" dataKey="price" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: 'var(--color-primary)', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
