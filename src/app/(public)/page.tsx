import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getSiteSettings } from '@/lib/settings';

export default async function HomePage() {
  const settings = await getSiteSettings();
  const [latestNews, projectTopics] = await Promise.all([
    prisma.newsPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    prisma.homeTopic.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    }),
  ]);

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

      {projectTopics.length > 0 && (
      <section>
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">What It&apos;s All About</h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
            From the first sketch to the finish line — here&apos;s a look at everything that goes into
            our Shell Eco-marathon project, on and off the track.
          </p>
        </div>

        <div className="space-y-12">
          {projectTopics.map((topic, i) => (
            <div
              key={topic.id}
              className={`flex flex-col gap-6 md:items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <div className="md:w-1/2">
                {topic.imageUrl ? (
                  <div className="overflow-hidden rounded-xl bg-neutral-200">
                    <Image
                      src={topic.imageUrl}
                      alt={topic.title}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-100">
                    <div className="px-4 text-center text-sm text-neutral-400">
                      <p className="font-medium text-neutral-500">{topic.title}</p>
                      <p className="mt-1">Photo coming soon</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="md:w-1/2">
                <h3 className="font-display text-xl font-bold text-neutral-900">{topic.title}</h3>
                <p className="mt-3 text-neutral-600">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>
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
              <Link key={post.id} href={`/news/${post.slug}`} className="card block overflow-hidden hover:shadow-md">
                {post.coverImageUrl && (
                  <div className="mb-3 -mx-6 -mt-6 aspect-video overflow-hidden bg-neutral-200">
                    <Image
                      src={post.coverImageUrl}
                      alt={post.title}
                      width={400}
                      height={225}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                )}
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
