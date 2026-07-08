import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'News' };

export default async function NewsListPage() {
  const posts = await prisma.newsPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-bold">News</h1>
      {posts.length === 0 ? (
        <p className="text-neutral-500">No news posted yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/news/${post.slug}`} className="card flex gap-4 hover:shadow-md">
              {post.coverImageUrl && (
                <div className="hidden h-24 w-32 shrink-0 overflow-hidden rounded-md bg-neutral-200 sm:block">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    width={128}
                    height={96}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs text-neutral-500">
                  {post.publishedAt?.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-neutral-900">{post.title}</h2>
                <p className="mt-2 text-sm text-neutral-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
