'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { StockPriceChart } from '@/components/charts'

const securities = [
  {
    id: 'VCB',
    company: 'Vietcombank',
    currentPrice: '85,500',
    ceiling: '88,000',
    floor: '83,000',
    loanRatio: '45%',
  },
  {
    id: 'HPG',
    company: 'Hòa Phát',
    currentPrice: '28,450',
    ceiling: '29,000',
    floor: '27,900',
    loanRatio: '52%',
  },
  {
    id: 'FPT',
    company: 'FPT Software',
    currentPrice: '142,500',
    ceiling: '145,000',
    floor: '140,000',
    loanRatio: '38%',
  },
  {
    id: 'MWG',
    company: 'Mobile World',
    currentPrice: '65,200',
    ceiling: '67,000',
    floor: '63,400',
    loanRatio: '48%',
  },
  {
    id: 'BID',
    company: 'BIDV',
    currentPrice: '32,800',
    ceiling: '33,500',
    floor: '32,100',
    loanRatio: '50%',
  },
]

export function SecuritiesView() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Quản lý Mã Chứng khoán</h2>
        <Button className="bg-primary text-primary-foreground">+ Thêm mã chứng khoán mới</Button>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Mã CK</TableHead>
              <TableHead>Tên Công ty</TableHead>
              <TableHead>Giá Hiện Tại</TableHead>
              <TableHead>Giá Trần</TableHead>
              <TableHead>Giá Sàn</TableHead>
              <TableHead>Tỷ lệ cho vay (%)</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {securities.map((security) => (
              <>
                <TableRow key={security.id} className="hover:bg-muted transition-colors">
                  <TableCell>
                    <button
                      onClick={() => setExpandedRow(expandedRow === security.id ? null : security.id)}
                      className="p-1"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedRow === security.id ? 'rotate-180' : ''}`} />
                    </button>
                  </TableCell>
                  <TableCell className="font-bold text-foreground">{security.id}</TableCell>
                  <TableCell className="text-foreground">{security.company}</TableCell>
                  <TableCell className="text-primary font-bold">{security.currentPrice}</TableCell>
                  <TableCell className="text-foreground">{security.ceiling}</TableCell>
                  <TableCell className="text-foreground">{security.floor}</TableCell>
                  <TableCell className="text-foreground">{security.loanRatio}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRow === security.id && (
                  <TableRow>
                    <TableCell colSpan={8} className="bg-muted p-6">
                      <div className="max-w-2xl">
                        <StockPriceChart />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
