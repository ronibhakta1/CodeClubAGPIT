import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StaffLogin({ onLogin }: { onLogin?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: accept any non-empty credentials
    if (email && password) {
      setError('');
      if (onLogin) onLogin();
      // Redirect to dashboard in router
      window.location.href = '/staff/dashboard';
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950">
      <Card className="w-full max-w-md bg-zinc-900 text-zinc-100 border-zinc-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-100">Staff Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-zinc-200">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-zinc-200">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-zinc-100 font-semibold rounded-xl py-2">Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 