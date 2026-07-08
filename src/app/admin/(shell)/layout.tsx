import Link from 'next/link';
import { logoutAction } from '@/lib/admin-actions';

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/home', label: 'Home Page' },
  { href: '/admin/members', label: 'Members' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/positions', label: 'Positions' },
  { href: '/admin/applications', label: 'Applications' },
  { href: '/admin/sponsors', label: 'Sponsors' },
  { href: '/admin/vehicle', label: 'Car' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r border-neutral-200 bg-white">
        <div className="border-b border-neutral-200 px-4 py-4 font-bold text-brand-700">Admin</div>
        <nav className="flex flex-col p-2 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100">
              {item.label}
            </Link>
          ))}
          <form action={logoutAction}>
            <button type="submit" className="mt-2 w-full rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-50">
              Log out
            </button>
          </form>
        </nav>
        <div className="px-4 py-3 text-xs text-neutral-400">
          <Link href="/" target="_blank">View site &rarr;</Link>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
