import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Our Car' };

export default async function CarPage() {
  const vehicle = await prisma.vehicle.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  const photos = await prisma.vehiclePhoto.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold">{vehicle.name}</h1>
        {vehicle.category && <p className="mt-1 text-sm font-medium text-brand-600">{vehicle.category}</p>}
        {vehicle.tagline && <p className="mt-2 text-lg text-neutral-600">{vehicle.tagline}</p>}
      </div>

      {vehicle.heroImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={vehicle.heroImageUrl} alt={vehicle.name} className="w-full rounded-lg object-cover" />
      )}

      {vehicle.description && (
        <section className="card">
          <h2 className="mb-3 text-xl font-bold">About the Vehicle</h2>
          <p className="whitespace-pre-line text-neutral-700">{vehicle.description}</p>
        </section>
      )}

      {vehicle.specs && (
        <section className="card">
          <h2 className="mb-3 text-xl font-bold">Specs</h2>
          <p className="whitespace-pre-line text-sm text-neutral-700">{vehicle.specs}</p>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-xl font-bold">Gallery</h2>
        {photos.length === 0 ? (
          <p className="text-neutral-500">No photos yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <figure key={photo.id} className="card p-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt={photo.caption || vehicle.name} className="h-48 w-full object-cover" />
                {photo.caption && <figcaption className="p-3 text-sm text-neutral-600">{photo.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
