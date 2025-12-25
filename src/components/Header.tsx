'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout, onAuthStateChanged } from '@/lib/auth';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import QuirkIcon from './QuirkIcon';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Icon and App Name */}
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <QuirkIcon className="w-12 h-12 text-amber-600" />
            <h1 className="text-3xl font-bold text-amber-900">Divergent Distillery</h1>
          </button>

          {/* Right: About Icon, Examples Icon, and User Icon with Dropdown */}
          <div className="flex items-center gap-3">
            {/* About Icon */}
            <button
              onClick={() => router.push('/about')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 transition-colors"
              aria-label="About Divergent Distillery"
              title="About Divergent Distillery"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            {/* Examples Icon */}
            <button
              onClick={() => router.push('/examples')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 transition-colors"
              aria-label="View examples"
              title="View examples"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </button>

            {/* User Icon with Dropdown */}
            <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 transition-colors font-semibold"
              aria-label={user?.email ? `User menu - ${user.email}` : 'User menu'}
              title={user?.email || 'User menu'}
            >
              {user?.email ? (
                <span className="text-lg">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-amber-200 py-1">
                {user?.email && (
                  <div className="px-4 py-2 text-xs text-amber-900 border-b border-amber-100">
                    {user.email}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors"
                >
                  Log out
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

