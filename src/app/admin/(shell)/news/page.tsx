import { prisma } from '@/lib/prisma';
import { createNewsPost, updateNewsPost, deleteNewsPost } from '@/lib/admin-actions';

export default async function AdminNewsPage() {
  const posts = await prisma.newsPost.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">News Posts</h1>

      <details className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <summary className="cursor-pointer font-semibold">Add new post</summary>
        <form action={createNewsPost} encType="multipart/form-data" className="mt-4 space-y-4">
          <NewsFields />
          <button type="submit" className="btn-primary">Create Post</button>
        </form>
      </details>

      <div className="space-y-4">
        {posts.map((post) => (
          <details key={post.id} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-semibold">
              {post.title} {!post.published && <span className="text-xs text-neutral-400">(draft)</span>}
            </summary>
            <form action={updateNewsPost.bind(null, post.id)} encType="multipart/form-data" className="mt-4 space-y-4">
              <NewsFields post={post} />
              <button type="submit" className="btn-primary">Save Changes</button>
            </form>
            <form action={deleteNewsPost.bind(null, post.id)} className="mt-2">
              <button type="submit" className="btn-danger">Delete</button>
            </form>
          </details>
        ))}
        {posts.length === 0 && <p className="text-neutral-500">No posts yet.</p>}
      </div>
    </div>
  );
}

function NewsFields({ post }: { post?: { title: string; excerpt: string; body: string; published: boolean; coverImageUrl: string | null } }) {
  return (
    <>
      <div>
        <label className="label">Title</label>
        <input className="input" name="title" defaultValue={post?.title} required />
      </div>
      <div>
        <label className="label">Excerpt</label>
        <input className="input" name="excerpt" defaultValue={post?.excerpt} />
      </div>
      <div>
        <label className="label">Body</label>
        <textarea className="input" name="body" rows={8} defaultValue={post?.body} required />
      </div>
      <div>
        <label className="label">Cover image</label>
        {post?.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImageUrl} alt={post.title} className="mb-2 h-32 w-full rounded object-cover" />
        )}
        <input className="input" name="coverImage" type="file" accept="image/*" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} />
        Published
      </label>
    </>
  );
}
