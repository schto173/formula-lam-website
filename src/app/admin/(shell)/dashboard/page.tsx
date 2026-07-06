import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const [memberCount, newsCount, positionCount, newApplicationCount] = await Promise.all([
    prisma.member.count(),
    prisma.newsPost.count(),
    prisma.position.count({ where: { active: true } }),
    prisma.application.count({ where: { status: 'new' } }),
  ]);

  const cards = [
    { label: 'Team Members', value: memberCount, href: '/admin/members' },
    { label: 'News Posts', value: newsCount, href: '/admin/news' },
    { label: 'Open Positions', value: positionCount, href: '/admin/positions' },
    { label: 'New Applications', value: newApplicationCount, href: '/admin/applications' },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md">
            <p className="text-sm text-neutral-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-brand-700">{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
