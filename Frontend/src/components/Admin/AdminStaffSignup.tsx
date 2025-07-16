import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Staff {
  name: string;
  email: string;
  department: string;
  position: string;
}

export default function AdminStaffSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>([
    { name: 'Asma Hannure', email: 'hannure@gmail.com', department: 'Computer Science', position: 'Assistant Professor' },
    { name: 'Kulkarni', email: 'kl@gmail.com', department: 'Computer Science', position: 'Professor' },
  ]);

  const departmentOptions = [
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'IT',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password && department && position) {
      setSuccess(editIndex === null ? 'Staff account created!' : 'Staff details updated!');
      setError('');
      if (editIndex === null) {
        setStaffList(prev => [...prev, { name, email, department, position }]);
      } else {
        setStaffList(prev => prev.map((staff, idx) => idx === editIndex ? { name, email, department, position } : staff));
        setEditIndex(null);
      }
      setName('');
      setEmail('');
      setPassword('');
      setDepartment('');
      setPosition('');
      // TODO: Call backend API to actually create/update staff
    } else {
      setError('Please fill in all fields.');
      setSuccess('');
    }
  };

  const handleEdit = (idx: number) => {
    const staff = staffList[idx];
    setName(staff.name);
    setEmail(staff.email);
    setPassword('');
    setDepartment(staff.department);
    setPosition(staff.position);
    setEditIndex(idx);
  };

  const handleDelete = (idx: number) => {
    setStaffList(prev => prev.filter((_, i) => i !== idx));
    if (editIndex === idx) setEditIndex(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-950 py-8">
      <Card className="w-full max-w-2xl bg-zinc-900 text-zinc-100 border-zinc-700 shadow-xl mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-100">{editIndex === null ? 'Create Staff Account' : 'Edit Staff Account'}</CardTitle>
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
            <div>
              <label className="block mb-1 text-zinc-200">Department</label>
              <select
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departmentOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-zinc-200">Current Position</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                value={position}
                onChange={e => setPosition(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            {success && <div className="text-green-400 text-sm">{success}</div>}
            <div className='flex justify-center'>
              <Button type="submit" className="w-4xs cursor-pointer bg-zinc-600 hover:bg-zinc-700 text-zinc-100 font-semibold rounded-xl py-2">{editIndex === null ? 'Create Staff' : 'Update Staff'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* Staff List */}
      <Card className="w-full max-6xl bg-zinc-900 text-zinc-100 border-zinc-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight text-zinc-100">Manage Staff Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {staffList.length === 0 ? (
            <div className="text-zinc-400">No staff created yet.</div>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {staffList.map((staff, idx) => (
                <li key={idx} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <span className="font-medium text-zinc-200">{staff.name}</span>
                    <span className="text-sm text-zinc-400 ml-2">{staff.email}</span>
                    <span className="text-sm text-zinc-400 ml-2">{staff.department}</span>
                    <span className="text-sm text-zinc-400 ml-2">{staff.position}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white px-3 py-1 rounded" onClick={() => handleEdit(idx)}>Edit</Button>
                    <Button size="sm" className="bg-red-700 hover:bg-red-800 cursor-pointer text-white px-3 py-1 rounded" onClick={() => handleDelete(idx)}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 