import { prisma } from '@/lib/prisma';
import { createSponsor, updateSponsor, deleteSponsor } from '@/lib/admin-actions';

const TIERS = ['platinum', 'gold', 'silver', 'supporter'];

export default async function AdminSponsorsPage() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Sponsors</h1>

      <details className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <summary className="cursor-pointer font-semibold">Add new sponsor</summary>
        <form action={createSponsor} encType="multipart/form-data" className="mt-4 space-y-4">
          <SponsorFields />
          <button type="submit" className="btn-primary">Add Sponsor</button>
        </form>
      </details>

      <div className="space-y-4">
        {sponsors.map((sponsor) => (
          <details key={sponsor.id} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-semibold">
              {sponsor.name} {!sponsor.active && <span className="text-xs text-neutral-400">(hidden)</span>}
            </summary>
            <form action={updateSponsor.bind(null, sponsor.id)} encType="multipart/form-data" className="mt-4 space-y-4">
              <SponsorFields sponsor={sponsor} />
              <button type="submit" className="btn-primary">Save Changes</button>
            </form>
            <form action={deleteSponsor.bind(null, sponsor.id)} className="mt-2">
              <button type="submit" className="btn-danger">Delete</button>
            </form>
          </details>
        ))}
        {sponsors.length === 0 && <p className="text-neutral-500">No sponsors yet.</p>}
      </div>
    </div>
  );
}

function SponsorFields({
  sponsor,
}: {
  sponsor?: { name: string; websiteUrl: string; tier: string; sortOrder: number; active: boolean; logoUrl: string | null };
}) {
  return (
    <>
      <div>
        <label className="label">Name</label>
        <input className="input" name="name" defaultValue={sponsor?.name} required />
      </div>
      <div>
        <label className="label">Website URL</label>
        <input className="input" name="websiteUrl" defaultValue={sponsor?.websiteUrl} placeholder="https://" />
      </div>
      <div>
        <label className="label">Tier</label>
        <select className="input" name="tier" defaultValue={sponsor?.tier ?? 'supporter'}>
          {TIERS.map((tier) => (
            <option key={tier} value={tier}>{tier}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Sort order</label>
        <input className="input" name="sortOrder" type="number" defaultValue={sponsor?.sortOrder ?? 0} />
      </div>
      <div>
        <label className="label">Logo</label>
        {sponsor?.logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sponsor.logoUrl} alt={sponsor.name} className="mb-2 h-16 object-contain" />
        )}
        <input className="input" name="logo" type="file" accept="image/*" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={sponsor?.active ?? true} />
        Visible on public site
      </label>
    </>
  );
}
