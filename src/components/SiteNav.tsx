import Link from 'next/link';
import Image from 'next/image';

export default function SiteNav({ teamName }: { teamName: string }) {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/brand/logo.png" alt={teamName} width={495} height={175} className="h-10 w-auto" priority />
        </Link>
        <div className="flex flex-wrap justify-end gap-x-5 gap-y-1 text-sm font-medium text-neutral-700">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <Link href="/team" className="hover:text-brand-600">Team</Link>
          <Link href="/car" className="hover:text-brand-600">Car</Link>
          <Link href="/news" className="hover:text-brand-600">News</Link>
          <Link href="/sponsors" className="hover:text-brand-600">Sponsors</Link>
          <Link href="/join" className="hover:text-brand-600">Join Us</Link>
        </div>
      </nav>
    </header>
  );
}
