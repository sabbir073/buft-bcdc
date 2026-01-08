'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  users: number;
  memberships: number;
  activities: number;
  executives: number;
  jobPosts: number;
  successStories: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    memberships: 0,
    activities: 0,
    executives: 0,
    jobPosts: 0,
    successStories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.users,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'bg-blue-500',
      link: '/admin/dashboard/users',
    },
    {
      title: 'Membership Submissions',
      value: stats.memberships,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-green-500',
      link: '/admin/dashboard/memberships',
    },
    {
      title: 'Activities',
      value: stats.activities,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-purple-500',
      link: '/admin/dashboard/activities',
    },
    {
      title: 'Executive Members',
      value: stats.executives,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-yellow-500',
      link: '/admin/dashboard/executive-board',
    },
    {
      title: 'Job Posts',
      value: stats.jobPosts,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-red-500',
      link: '/admin/dashboard/career-resources',
    },
    {
      title: 'Success Stories',
      value: stats.successStories,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'bg-pink-500',
      link: '/admin/dashboard/success-stories',
    },
  ];

  const quickActions = [
    {
      title: 'Create User',
      description: 'Add a new admin user',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      link: '/admin/dashboard/users',
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
    },
    {
      title: 'Add Activity',
      description: 'Create a new event or activity',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      link: '/admin/dashboard/activities',
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
    },
    {
      title: 'Post Job',
      description: 'Create a new job opportunity',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: '/admin/dashboard/career-resources',
      color: 'text-green-600 bg-green-50 hover:bg-green-100',
    },
    {
      title: 'View Memberships',
      description: 'Manage membership applications',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      link: '/admin/dashboard/memberships',
      color: 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to BCDC Admin Dashboard</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.color} text-white`}>
                {card.icon}
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? (
                <span className="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse"></span>
              ) : (
                card.value
              )}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.link}
              className={`p-6 rounded-xl transition-all ${action.color} border border-transparent hover:border-current`}
            >
              <div className="mb-3">{action.icon}</div>
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm opacity-75">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to BCDC Admin Dashboard</h2>
        <p className="text-blue-100 mb-6">
          Manage your website content, users, and resources all in one place. Use the sidebar navigation to access different sections.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/dashboard/users"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Manage Users
          </Link>
          <Link
            href="/admin/dashboard/activities"
            className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Manage Activities
          </Link>
        </div>
      </div>
    </div>
  );
}
