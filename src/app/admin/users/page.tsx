"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Search, UserX, UserCheck } from 'lucide-react';
import { MOCK_USERS } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export default function UserManagementPage() {
  const [currentUser] = useState({
    displayName: "Admin User",
    email: "admin@neu.edu.ph",
    role: "admin" as const,
    photoURL: "https://picsum.photos/seed/admin/100/100"
  });

  const [users, setUsers] = useState(MOCK_USERS.filter(u => u.role === 'professor'));
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const handleToggleBlock = (userId: string, currentStatus: 'active' | 'blocked') => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    setUsers(prev => prev.map(u => u.uid === userId ? { ...u, status: newStatus } : u));
    
    toast({
      title: newStatus === 'blocked' ? "User Blocked" : "Access Restored",
      description: `Access for this professor has been ${newStatus === 'blocked' ? 'revoked' : 'granted'} instantly.`,
    });
  };

  const filteredUsers = users.filter(u => 
    u.displayName.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={currentUser} />
      
      <main className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 font-headline">Professor Access Control</h1>
          <p className="text-muted-foreground">Manage laboratory privileges for faculty members.</p>
        </div>

        <Card className="shadow-md border-none">
          <CardHeader className="pb-3 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or institutional email..." 
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>{users.filter(u => u.status === 'active').length} Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span>{users.filter(u => u.status === 'blocked').length} Blocked</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[80px]"></TableHead>
                  <TableHead>Professor Details</TableHead>
                  <TableHead>ID Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Grant Access</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.uid} className="group transition-colors">
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={user.photoURL} />
                        <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold">{user.displayName}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono text-muted-foreground">{user.employeeId || 'N/A'}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? "outline" : "destructive"} className={user.status === 'active' ? "border-emerald-200 text-emerald-700 bg-emerald-50" : ""}>
                        {user.status === 'active' ? <UserCheck className="h-3 w-3 mr-1" /> : <UserX className="h-3 w-3 mr-1" />}
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-xs text-muted-foreground italic opacity-0 group-hover:opacity-100 transition-opacity">
                          {user.status === 'active' ? 'Revoke Access' : 'Grant Access'}
                        </span>
                        <Switch 
                          checked={user.status === 'active'} 
                          onCheckedChange={() => handleToggleBlock(user.uid, user.status)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No professors found matching your search.
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
