import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Staff {
  name: string;
  email: string;
}

export default function AdminStaffSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [staffList, setStaffList] = useState<Staff[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      setSuccess('Staff account created!');
      setError('');
      setStaffList(prev => [...prev, { name, email }]);
      setName('');
      setEmail('');
      setPassword('');
      // TODO: Call backend API to actually create staff
    } else {
      setError('Please fill in all fields.');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-950 py-8">
      <Card className="w-full max-w-2xl bg-zinc-900 text-zinc-100 border-zinc-700 shadow-xl mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-100">Create Staff Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-zinc-200">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-zinc-200">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-zinc-200">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            {success && <div className="text-green-400 text-sm">{success}</div>}
            <div className='flex justify-center'>
              <Button type="submit" className="w-4xs cursor-pointer bg-zinc-600 hover:bg-zinc-700 text-zinc-100 font-semibold rounded-xl py-2">Create Staff</Button>

            </div>
          </form>
        </CardContent>
      </Card>
      {/* Staff List */}
      <Card className="w-full max-w-6xl bg-zinc-900 text-zinc-100 border-zinc-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight text-zinc-100">Staff List</CardTitle>
        </CardHeader>
        <CardContent>
          {staffList.length === 0 ? (
            <div className="text-zinc-400">No staff created yet.</div>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {staffList.map((staff, idx) => (
                <li key={idx} className="py-2 flex flex-col">
                  <span className="font-medium text-zinc-200">{staff.name}</span>
                  <span className="text-sm text-zinc-400">{staff.email}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 