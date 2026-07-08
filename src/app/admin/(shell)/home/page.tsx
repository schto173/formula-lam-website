import { prisma } from '@/lib/prisma';
import { createHomeTopic, updateHomeTopic, deleteHomeTopic } from '@/lib/admin-actions';

export default async function AdminHomePage() {
  const topics = await prisma.homeTopic.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Home Page &mdash; &ldquo;What It&rsquo;s All About&rdquo;</h1>
      <p className="text-sm text-neutral-500">
        These topics appear as image-and-text rows on the public home page, ordered by sort order.
      </p>

      <details className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <summary className="cursor-pointer font-semibold">Add new topic</summary>
        <form action={createHomeTopic} encType="multipart/form-data" className="mt-4 space-y-4">
          <TopicFields />
          <button type="submit" className="btn-primary">Add Topic</button>
        </form>
      </details>

      <div className="space-y-4">
        {topics.map((topic) => (
          <details key={topic.id} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-semibold">
              {topic.title} {!topic.active && <span className="text-xs text-neutral-400">(hidden)</span>}
            </summary>
            <form action={updateHomeTopic.bind(null, topic.id)} encType="multipart/form-data" className="mt-4 space-y-4">
              <TopicFields topic={topic} />
              <button type="submit" className="btn-primary">Save Changes</button>
            </form>
            <form action={deleteHomeTopic.bind(null, topic.id)} className="mt-2">
              <button type="submit" className="btn-danger">Delete</button>
            </form>
          </details>
        ))}
        {topics.length === 0 && <p className="text-neutral-500">No topics yet.</p>}
      </div>
    </div>
  );
}

function TopicFields({
  topic,
}: {
  topic?: { title: string; description: string; sortOrder: number; active: boolean; imageUrl: string | null };
}) {
  return (
    <>
      <div>
        <label className="label">Title</label>
        <input className="input" name="title" defaultValue={topic?.title} required />
      </div>
      <div>
        <label className="label">Description</label>
        <textarea className="input" name="description" rows={4} defaultValue={topic?.description} required />
      </div>
      <div>
        <label className="label">Sort order</label>
        <input className="input" name="sortOrder" type="number" defaultValue={topic?.sortOrder ?? 0} />
      </div>
      <div>
        <label className="label">Image</label>
        {topic?.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={topic.imageUrl} alt={topic.title} className="mb-2 h-32 w-full rounded object-cover" />
        )}
        <input className="input" name="image" type="file" accept="image/*" />
        <p className="mt-1 text-xs text-neutral-500">Leave empty to keep a labeled placeholder box on the site.</p>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={topic?.active ?? true} />
        Visible on public site
      </label>
    </>
  );
}
