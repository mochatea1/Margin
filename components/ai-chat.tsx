'use client'

import { useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Message {
  id: string
  sender: 'ai' | 'user'
  content: string | React.ReactNode
  timestamp: Date
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: '🤖 Xin chào Admin. Hôm nay thị trường biến động mạnh, có 3 tài khoản vừa rơi vào trạng thái Force Sell. Tôi có thể giúp gì cho bạn?',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: '2',
      sender: 'user',
      content: 'Liệt kê danh sách các tài khoản đó giúp tôi.',
      timestamp: new Date(Date.now() - 3 * 60000),
    },
  ])
  const [input, setInput] = useState('')

  const forceSellAccounts = [
    { account: 'TK003', investor: 'Lê Minh C', ratio: '89.5%', action: 'Giải chấp ngay' },
    { account: 'TK008', investor: 'Võ Văn F', ratio: '85.2%', action: 'Giải chấp ngay' },
    { account: 'TK012', investor: 'Trần Tuấn G', ratio: '92.1%', action: 'Giải chấp ngay' },
  ]

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          id: String(messages.length + 1),
          sender: 'user',
          content: input,
          timestamp: new Date(),
        },
      ])
      setInput('')

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: String(prev.length + 1),
            sender: 'ai',
            content: 'Đã xử lý yêu cầu của bạn. Hệ thống sẽ cập nhật thông tin sớm.',
            timestamp: new Date(),
          },
        ])
      }, 500)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-h-96 z-40 flex flex-col shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-semibold flex items-center gap-2">
              <span>🤖</span> Database AI Copilot
            </h3>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-primary/80 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {typeof message.content === 'string' ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <div className="text-sm">
                      <p className="font-semibold mb-3">Tài khoản cần xử lý ngay:</p>
                      <div className="overflow-x-auto">
                        <Table className="text-xs">
                          <TableHeader>
                            <TableRow className="border-none">
                              <TableHead className="p-1">TK</TableHead>
                              <TableHead className="p-1">Tỷ lệ</TableHead>
                              <TableHead className="p-1">Hành động</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {forceSellAccounts.map((acc) => (
                              <TableRow key={acc.account} className="border-none">
                                <TableCell className="p-1 text-white">{acc.account}</TableCell>
                                <TableCell className="p-1 text-white">{acc.ratio}</TableCell>
                                <TableCell className="p-1 text-red-300">{acc.action}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card flex gap-2 rounded-b-lg">
            <Input
              placeholder="Nhập câu lệnh SQL hoặc hỏi AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="text-sm"
            />
            <Button
              size="sm"
              onClick={handleSend}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}
