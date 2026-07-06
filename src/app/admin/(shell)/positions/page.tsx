import { prisma } from '@/lib/prisma';
import { createPosition, updatePosition, deletePosition } from '@/lib/admin-actions';

export default async function AdminPositionsPage() {
  const positions = await prisma.position.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Positions</h1>

      <details className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <summary className="cursor-pointer font-semibold">Add new position</summary>
        <form action={createPosition} className="mt-4 space-y-4">
          <PositionFields />
          <button type="submit" className="btn-primary">Add Position</button>
        </form>
      </details>

      <div className="space-y-4">
        {positions.map((position) => (
          <details key={position.id} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-semibold">
              {position.title} {!position.active && <span className="text-xs text-neutral-400">(closed)</span>}
            </summary>
            <form action={updatePosition.bind(null, position.id)} className="mt-4 space-y-4">
              <PositionFields position={position} />
              <button type="submit" className="btn-primary">Save Changes</button>
            </form>
            <form action={deletePosition.bind(null, position.id)} className="mt-2">
              <button type="submit" className="btn-danger">Delete</button>
            </form>
          </details>
        ))}
        {positions.length === 0 && <p className="text-neutral-500">No positions yet.</p>}
      </div>
    </div>
  );
}

function PositionFields({ position }: { position?: { title: string; teamSize: string; department: string; description: string; active: boolean } }) {
  return (
    <>
      <div>
        <label className="label">Title</label>
        <input className="input" name="title" defaultValue={position?.title} required />
      </div>
      <div>
        <label className="label">Team size</label>
        <input className="input" name="teamSize" defaultValue={position?.teamSize ?? '1 student'} placeholder="e.g. 1 student" />
      </div>
      <div>
        <label className="label">Department / category</label>
        <input className="input" name="department" defaultValue={position?.department} />
      </div>
      <div>
        <label className="label">Description</label>
        <textarea className="input" name="description" rows={10} defaultValue={position?.description} required />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={position?.active ?? true} />
        Open (shows as "Open" on the Join page; unchecked shows as "Closed" but stays visible)
      </label>
    </>
  );
}
