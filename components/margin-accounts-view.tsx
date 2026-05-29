'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui/card'

const marginAccounts = [
  {
    id: 'TK001',
    name: 'Nguyễn Văn A',
    netAsset: '5.2 Tỷ VNĐ',
    debt: '2.1 Tỷ VNĐ',
    ratio: '40.4%',
    status: 'Active',
  },
  {
    id: 'TK002',
    name: 'Trần Thị B',
    netAsset: '3.8 Tỷ VNĐ',
    debt: '1.8 Tỷ VNĐ',
    ratio: '47.3%',
    status: 'Warning',
  },
  {
    id: 'TK003',
    name: 'Lê Minh C',
    netAsset: '2.1 Tỷ VNĐ',
    debt: '1.5 Tỷ VNĐ',
    ratio: '71.4%',
    status: 'Force Sell',
  },
  {
    id: 'TK004',
    name: 'Phan Hữu D',
    netAsset: '4.5 Tỷ VNĐ',
    debt: '1.2 Tỷ VNĐ',
    ratio: '26.6%',
    status: 'Active',
  },
  {
    id: 'TK005',
    name: 'Hoàng Anh E',
    netAsset: '3.2 Tỷ VNĐ',
    debt: '1.6 Tỷ VNĐ',
    ratio: '50%',
    status: 'Warning',
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'Active':
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case 'Warning':
      return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
    case 'Force Sell':
      return <Badge className="bg-red-100 text-red-800">Force Sell</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export function MarginAccountsView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Quản lý Tài khoản Margin</h2>
        <Button className="bg-primary text-primary-foreground">+ Thêm tài khoản mới</Button>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Mã TK</TableHead>
              <TableHead>Tên Nhà Đầu Tư</TableHead>
              <TableHead>Tài sản ròng</TableHead>
              <TableHead>Dư nợ Margin</TableHead>
              <TableHead>Tỷ lệ Ký quỹ (%)</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marginAccounts.map((account) => (
              <TableRow key={account.id} className="hover:bg-muted transition-colors">
                <TableCell className="font-medium text-foreground">{account.id}</TableCell>
                <TableCell className="text-foreground">{account.name}</TableCell>
                <TableCell className="text-foreground">{account.netAsset}</TableCell>
                <TableCell className="text-foreground">{account.debt}</TableCell>
                <TableCell className={account.status === 'Force Sell' ? 'text-destructive font-bold' : 'text-foreground'}>
                  {account.ratio}
                </TableCell>
                <TableCell>{getStatusBadge(account.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {account.status === 'Force Sell' && (
                      <Button size="sm" variant="ghost" className="text-destructive hover:bg-red-50">
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                    )}
                    {account.status === 'Warning' && (
                      <Button size="sm" variant="ghost" className="text-destructive">
                        Gọi Margin
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
