import type { Metadata } from 'next';
import '../globals.css';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getSiteSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.teamName,
    description: settings.tagline,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col">
        <SiteNav teamName={settings.teamName} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
        <SiteFooter teamName={settings.teamName} contactEmail={settings.contactEmail} />
      </body>
    </html>
  );
}
