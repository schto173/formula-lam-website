import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getSiteSettings } from '@/lib/settings';

export default async function HomePage() {
  const settings = await getSiteSettings();
  const latestNews = await prisma.newsPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return (
    <div className="space-y-16">
      {settings.heroImageUrl && (
        <div className="overflow-hidden rounded-xl bg-neutral-200">
          <Image
            src={settings.heroImageUrl}
            alt={settings.teamName}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      <section className="text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          {settings.teamName}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">{settings.tagline}</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/join" className="btn-primary">Join the Team</Link>
          <Link href="/team" className="btn-secondary">Meet the Team</Link>
        </div>
      </section>

      {settings.aboutText && (
        <section className="card">
          <h2 className="mb-3 text-xl font-bold">About Us</h2>
          <p className="whitespace-pre-line text-neutral-700">{settings.aboutText}</p>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Latest News</h2>
          <Link href="/news" className="text-sm font-medium text-brand-600 hover:underline">View all</Link>
        </div>
        {latestNews.length === 0 ? (
          <p className="text-neutral-500">No news posted yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {latestNews.map((post) => (
              <Link key={post.id} href={`/news/${post.slug}`} className="card block hover:shadow-md">
                <h3 className="font-semibold text-neutral-900">{post.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <Link href="/car" className="card block hover:shadow-md">
          <h2 className="text-xl font-bold">Our Car</h2>
          <p className="mt-2 text-sm text-neutral-600">See the vehicle we're building &mdash; specs, photos, and progress.</p>
        </Link>
        <Link href="/sponsors" className="card block hover:shadow-md">
          <h2 className="text-xl font-bold">Our Sponsors</h2>
          <p className="mt-2 text-sm text-neutral-600">The partners who make this project possible.</p>
        </Link>
      </section>
    </div>
  );
}
