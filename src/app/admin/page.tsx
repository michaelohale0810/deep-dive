'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
// Admin operations now use API routes
import { getAllApprovedUsers, ApprovedUser } from '@/lib/whitelist';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Header />
        <main className="pt-16">
          <AdminPanel />
        </main>
      </div>
    </ProtectedRoute>
  );
}

function AdminPanel() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [approvedUsers, setApprovedUsers] = useState<ApprovedUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const users = await getAllApprovedUsers();
      setApprovedUsers(users);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Use API route to add user (handles UID lookup and whitelist addition)
      const response = await fetch('/api/admin/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add user');
      }

      const { uid, email: userEmail } = await response.json();
      setSuccess(`User ${userEmail} (UID: ${uid}) has been added to the whitelist.`);
      setEmail('');
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async (userUid: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to remove ${userEmail} from the whitelist?`)) {
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Use API route to remove user
      const response = await fetch('/api/admin/remove-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: userUid }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove user');
      }

      setSuccess(`User ${userEmail} has been removed from the whitelist.`);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to remove user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-8 md:p-12">
        <h1 className="text-4xl font-bold text-amber-900 mb-6">Admin Panel</h1>
        <p className="text-amber-700 mb-8">
          Manage the approved users whitelist for Divergent Distillery.
        </p>

        {/* Add User Form */}
        <div className="mb-8 pb-8 border-b border-amber-200">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Add User to Whitelist</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                placeholder="user@example.com"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </form>
        </div>

        {/* Approved Users List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-amber-900">Approved Users</h2>
            <button
              onClick={loadUsers}
              disabled={loadingUsers}
              className="text-amber-700 hover:text-amber-900 text-sm font-medium disabled:opacity-50"
            >
              {loadingUsers ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {approvedUsers.length === 0 ? (
            <p className="text-amber-600">No approved users yet.</p>
          ) : (
            <div className="space-y-2">
              {approvedUsers.map((user) => (
                <div
                  key={user.uid}
                  className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200"
                >
                  <div>
                    <p className="font-medium text-amber-900">{user.email}</p>
                    <p className="text-xs text-amber-500 font-mono">UID: {user.uid}</p>
                    {user.approvedAt && (
                      <p className="text-sm text-amber-600">
                        Approved: {new Date(user.approvedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveUser(user.uid, user.email)}
                    disabled={loading}
                    className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

