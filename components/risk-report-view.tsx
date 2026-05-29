'use client'

import { AlertTriangle, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const riskReports = [
  {
    id: 1,
    account: 'TK001',
    investor: 'Nguyễn Văn A',
    riskLevel: 'High',
    marginRatio: '71.5%',
    exposure: '2.8 Tỷ VNĐ',
    recommendation: 'Cần gọi margin hoặc giải chấp',
  },
  {
    id: 2,
    account: 'TK002',
    investor: 'Trần Thị B',
    riskLevel: 'Medium',
    marginRatio: '47.3%',
    exposure: '1.8 Tỷ VNĐ',
    recommendation: 'Giám sát chặt chẽ',
  },
  {
    id: 3,
    account: 'TK003',
    investor: 'Lê Minh C',
    riskLevel: 'Critical',
    marginRatio: '89.5%',
    exposure: '1.5 Tỷ VNĐ',
    recommendation: 'Cần giải chấp ngay lập tức',
  },
  {
    id: 4,
    account: 'TK004',
    investor: 'Phan Hữu D',
    riskLevel: 'Low',
    marginRatio: '26.6%',
    exposure: '1.2 Tỷ VNĐ',
    recommendation: 'Bình thường',
  },
  {
    id: 5,
    account: 'TK005',
    investor: 'Hoàng Anh E',
    riskLevel: 'Medium',
    marginRatio: '50%',
    exposure: '1.6 Tỷ VNĐ',
    recommendation: 'Theo dõi thị trường',
  },
]

function getRiskColor(level: string) {
  switch (level) {
    case 'Critical':
      return 'text-white bg-red-600'
    case 'High':
      return 'text-white bg-red-500'
    case 'Medium':
      return 'text-white bg-yellow-600'
    case 'Low':
      return 'text-white bg-green-600'
    default:
      return 'text-white bg-gray-600'
  }
}

export function RiskReportView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Báo cáo rủi ro</h2>
        <p className="text-sm text-muted-foreground mt-2">Đánh giá rủi ro tài khoản và khuyến cáo xử lý</p>
      </div>

      <div className="grid gap-6">
        {riskReports.map((report) => (
          <Card key={report.id} className="p-6 border-l-4 border-l-primary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{report.account} - {report.investor}</h3>
                    <p className="text-sm text-muted-foreground">Mã tài khoản</p>
                  </div>
                  <Badge className={getRiskColor(report.riskLevel)}>
                    {report.riskLevel === 'Critical' ? '⚠️' : ''} {report.riskLevel}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Tỷ lệ Ký quỹ</p>
                    <p className="text-lg font-bold text-foreground">{report.marginRatio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dư nợ</p>
                    <p className="text-lg font-bold text-foreground">{report.exposure}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <p className="text-xs font-semibold text-foreground">Khuyến cáo xử lý</p>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{report.recommendation}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
