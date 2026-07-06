import '../globals.css';

export const metadata = { title: 'Admin' };
export const dynamic = 'force-dynamic';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-100 text-neutral-900">{children}</body>
    </html>
  );
}
