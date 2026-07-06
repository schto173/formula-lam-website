import { prisma } from '@/lib/prisma';
import { createMember, updateMember, deleteMember } from '@/lib/admin-actions';

export default async function AdminMembersPage() {
  const members = await prisma.member.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Team Members</h1>

      <details className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <summary className="cursor-pointer font-semibold">Add new member</summary>
        <form action={createMember} encType="multipart/form-data" className="mt-4 space-y-4">
          <MemberFields />
          <button type="submit" className="btn-primary">Add Member</button>
        </form>
      </details>

      <div className="space-y-4">
        {members.map((member) => (
          <details key={member.id} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-semibold">
              {member.name} &mdash; {member.role} {!member.active && <span className="text-xs text-neutral-400">(hidden)</span>}
            </summary>
            <form action={updateMember.bind(null, member.id)} encType="multipart/form-data" className="mt-4 space-y-4">
              <MemberFields member={member} />
              <button type="submit" className="btn-primary">Save Changes</button>
            </form>
            <form action={deleteMember.bind(null, member.id)} className="mt-2">
              <button type="submit" className="btn-danger">Delete</button>
            </form>
          </details>
        ))}
        {members.length === 0 && <p className="text-neutral-500">No members yet.</p>}
      </div>
    </div>
  );
}

function MemberFields({ member }: { member?: { name: string; role: string; bio: string; sortOrder: number; active: boolean; photoUrl: string | null } }) {
  return (
    <>
      <div>
        <label className="label">Name</label>
        <input className="input" name="name" defaultValue={member?.name} required />
      </div>
      <div>
        <label className="label">Role</label>
        <input className="input" name="role" defaultValue={member?.role} required />
      </div>
      <div>
        <label className="label">Bio</label>
        <textarea className="input" name="bio" rows={3} defaultValue={member?.bio} />
      </div>
      <div>
        <label className="label">Sort order</label>
        <input className="input" name="sortOrder" type="number" defaultValue={member?.sortOrder ?? 0} />
      </div>
      <div>
        <label className="label">Photo</label>
        {member?.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.photoUrl} alt={member.name} className="mb-2 h-20 w-20 rounded-full object-cover" />
        )}
        <input className="input" name="photo" type="file" accept="image/*" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={member?.active ?? true} />
        Visible on public site
      </label>
    </>
  );
}
