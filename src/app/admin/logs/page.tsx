"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Calendar, Clock, ArrowUpDown } from 'lucide-react';
import { MOCK_LOGS } from '@/lib/mock-data';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export default function UsageLogsPage() {
  const [currentUser] = useState({
    displayName: "Admin User",
    email: "admin@neu.edu.ph",
    role: "admin" as const,
    photoURL: "https://picsum.photos/seed/admin/100/100"
  });

  const [search, setSearch] = useState('');
  const [roomFilter, setRoomFilter] = useState('all');

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesSearch = log.professorName.toLowerCase().includes(search.toLowerCase());
    const matchesRoom = roomFilter === 'all' || log.roomNumber === roomFilter;
    return matchesSearch && matchesRoom;
  });

  const rooms = Array.from(new Set(MOCK_LOGS.map(l => l.roomNumber)));

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={currentUser} />
      
      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 font-headline">Usage History</h1>
            <p className="text-muted-foreground">Comprehensive laboratory access logs and audit trails.</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Card className="shadow-md border-none">
          <CardHeader className="pb-3 border-b">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by professor name..." 
                  className="pl-10 h-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <Select value={roomFilter} onValueChange={setRoomFilter}>
                  <SelectTrigger className="w-[180px] h-10">
                    <SelectValue placeholder="All Rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rooms</SelectItem>
                    {rooms.map(room => (
                      <SelectItem key={room} value={room}>Room {room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Professor <ArrowUpDown className="inline h-3 w-3 ml-1 opacity-50" /></TableHead>
                  <TableHead className="font-semibold">Laboratory Room</TableHead>
                  <TableHead className="font-semibold">Check-In</TableHead>
                  <TableHead className="font-semibold">Check-Out</TableHead>
                  <TableHead className="font-semibold">Total Duration</TableHead>
                  <TableHead className="font-semibold">Session Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-medium text-slate-800">{log.professorName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono bg-slate-50">
                        {log.roomNumber}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{format(log.checkIn, 'MMM d, yyyy')}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {format(log.checkIn, 'hh:mm a')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {log.checkOut ? (
                        <div className="flex flex-col">
                          <span className="text-sm">{format(log.checkOut, 'MMM d, yyyy')}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {format(log.checkOut, 'hh:mm a')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs italic text-emerald-600 font-medium">Currently In-Lab</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{log.duration ? `${log.duration} minutes` : '--'}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={log.checkOut ? "secondary" : "default"} className={!log.checkOut ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : ""}>
                        {log.checkOut ? "Closed" : "Active Now"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredLogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No matching records found for the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
