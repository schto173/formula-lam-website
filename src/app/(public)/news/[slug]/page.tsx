import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.newsPost.findUnique({ where: { slug } });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article>
      <p className="text-xs text-neutral-500">
        {post.publishedAt?.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <h1 className="mt-1 text-3xl font-bold">{post.title}</h1>
      {post.coverImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImageUrl} alt={post.title} className="mt-6 w-full rounded-lg object-cover" />
      )}
      <div className="mt-6 max-w-none whitespace-pre-line leading-relaxed text-neutral-800">{post.body}</div>
    </article>
  );
}
