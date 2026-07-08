import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getSiteSettings } from '@/lib/settings';

export const metadata = { title: 'Team' };

export default async function TeamPage() {
  const [members, settings] = await Promise.all([
    prisma.member.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    }),
    getSiteSettings(),
  ]);

  return (
    <div>
      {settings.teamPhotoUrl && (
        <div className="mb-10 overflow-hidden rounded-xl bg-neutral-200">
          <Image
            src={settings.teamPhotoUrl}
            alt="The team"
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
            unoptimized
          />
        </div>
      )}
      <h1 className="font-display mb-8 text-3xl font-bold">Our Team</h1>
      {members.length === 0 ? (
        <p className="text-neutral-500">No team members listed yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div key={member.id} className="card text-center">
              <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full bg-neutral-200">
                {member.photoUrl && (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                )}
              </div>
              <h3 className="font-semibold text-neutral-900">{member.name}</h3>
              <p className="text-sm font-medium text-brand-600">{member.role}</p>
              {member.bio && <p className="mt-2 text-sm text-neutral-600">{member.bio}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
