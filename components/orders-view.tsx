'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const orders = [
  {
    id: 'ORD001',
    account: 'TK001',
    symbol: 'VCB',
    type: 'BUY',
    quantity: '100',
    price: '85,500',
    time: '09:30:45',
    status: 'Matched',
  },
  {
    id: 'ORD002',
    account: 'TK002',
    symbol: 'HPG',
    type: 'SELL',
    quantity: '500',
    price: '28,450',
    time: '10:15:20',
    status: 'Waiting',
  },
  {
    id: 'ORD003',
    account: 'TK003',
    symbol: 'FPT',
    type: 'BUY',
    quantity: '250',
    price: '142,500',
    time: '10:45:30',
    status: 'Cancelled',
  },
  {
    id: 'ORD004',
    account: 'TK004',
    symbol: 'MWG',
    type: 'BUY',
    quantity: '1000',
    price: '65,200',
    time: '11:20:15',
    status: 'Waiting',
  },
  {
    id: 'ORD005',
    account: 'TK005',
    symbol: 'BID',
    type: 'SELL',
    quantity: '200',
    price: '32,800',
    time: '11:50:00',
    status: 'Matched',
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'Matched':
      return <Badge className="bg-green-100 text-green-800">Khớp lệnh</Badge>
    case 'Waiting':
      return <Badge className="bg-blue-100 text-blue-800">Chờ khớp</Badge>
    case 'Cancelled':
      return <Badge className="bg-gray-100 text-gray-800">Hủy</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export function OrdersView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Sổ lệnh</h2>
        <p className="text-sm text-muted-foreground mt-2">Danh sách các lệnh giao dịch hôm nay</p>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Mã lệnh</TableHead>
              <TableHead>Mã TK</TableHead>
              <TableHead>Mã CK</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Khối lượng</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted transition-colors">
                <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                <TableCell className="text-foreground">{order.account}</TableCell>
                <TableCell className="font-bold text-primary">{order.symbol}</TableCell>
                <TableCell>
                  <Badge className={order.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {order.type === 'BUY' ? 'MUA' : 'BÁN'}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground">{order.quantity}</TableCell>
                <TableCell className="text-foreground">{order.price}</TableCell>
                <TableCell className="text-muted-foreground">{order.time}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
