'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, changePassword, register } from '@/lib/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isUserApproved } from '@/lib/whitelist';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userCredential;
      
      if (isRegistering) {
        userCredential = await register(email, password);
      } else {
        userCredential = await login(email, password);
      }

      // After authentication, check if user is approved by UID
      const uid = userCredential.user.uid;
      const approved = await isUserApproved(uid);
      
      if (!approved) {
        // Sign out the user if not approved
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
        setError('Your account is not on the approved users list. Please contact an administrator.');
        setLoading(false);
        return;
      }

      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await changePassword(newPassword);
      setShowChangePassword(false);
      setNewPassword('');
      setConfirmPassword('');
      alert('Password changed successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Divergent Distillery</h1>
          <p className="text-amber-700">Your curiosity journey begins here</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
          {!showChangePassword ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-amber-900 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? 'Loading...' : isRegistering ? 'Sign Up' : 'Sign In'}
                </button>
              </form>

              <div className="mt-4 text-center space-y-2">
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-sm text-amber-700 hover:text-amber-900"
                >
                  {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
                <div>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="text-sm text-amber-700 hover:text-amber-900"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <h2 className="text-xl font-bold text-amber-900 mb-4">Change Password</h2>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-amber-900 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-900 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassword(false);
                    setError('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="flex-1 px-4 py-2 border border-amber-300 text-amber-900 rounded-lg hover:bg-amber-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

