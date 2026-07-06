import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Sponsors' };

const TIER_LABELS: Record<string, string> = {
  platinum: 'Platinum Sponsors',
  gold: 'Gold Sponsors',
  silver: 'Silver Sponsors',
  supporter: 'Supporters',
};

const TIER_ORDER = ['platinum', 'gold', 'silver', 'supporter'];

export default async function SponsorsPage() {
  const sponsors = await prisma.sponsor.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: 'asc' }],
  });

  const byTier = TIER_ORDER.map((tier) => ({
    tier,
    label: TIER_LABELS[tier] ?? tier,
    sponsors: sponsors.filter((s) => s.tier === tier),
  })).filter((group) => group.sponsors.length > 0);

  const otherTiers = sponsors.filter((s) => !TIER_ORDER.includes(s.tier));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold">Our Sponsors</h1>
        <p className="mt-2 text-neutral-600">
          Our project would not be possible without the generous support of our sponsors and partners.
        </p>
      </div>

      {sponsors.length === 0 ? (
        <p className="text-neutral-500">No sponsors listed yet.</p>
      ) : (
        <>
          {byTier.map((group) => (
            <section key={group.tier}>
              <h2 className="mb-4 text-xl font-bold">{group.label}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.sponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            </section>
          ))}
          {otherTiers.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-bold">Other Partners</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {otherTiers.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function SponsorCard({ sponsor }: { sponsor: { name: string; logoUrl: string | null; websiteUrl: string } }) {
  const content = (
    <div className="card flex h-28 items-center justify-center text-center">
      {sponsor.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-16 max-w-full object-contain" />
      ) : (
        <span className="text-sm font-medium text-neutral-500">{sponsor.name}</span>
      )}
    </div>
  );

  if (sponsor.websiteUrl) {
    return (
      <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="block hover:shadow-md">
        {content}
      </a>
    );
  }
  return content;
}
