import { prisma } from '@/lib/prisma';
import { updateVehicle, addVehiclePhoto, deleteVehiclePhoto } from '@/lib/admin-actions';

export default async function AdminVehiclePage() {
  const vehicle = await prisma.vehicle.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  const photos = await prisma.vehiclePhoto.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Our Car</h1>

      <form action={updateVehicle} encType="multipart/form-data" className="max-w-xl space-y-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div>
          <label className="label">Name</label>
          <input className="input" name="name" defaultValue={vehicle.name} required />
        </div>
        <div>
          <label className="label">Category</label>
          <input className="input" name="category" defaultValue={vehicle.category} placeholder="e.g. Electric Autonomous Prototype" />
        </div>
        <div>
          <label className="label">Tagline</label>
          <input className="input" name="tagline" defaultValue={vehicle.tagline} />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea className="input" name="description" rows={5} defaultValue={vehicle.description} />
        </div>
        <div>
          <label className="label">Specs (one per line)</label>
          <textarea className="input" name="specs" rows={6} defaultValue={vehicle.specs} placeholder={'Category: Prototype\nEnergy class: Battery Electric\nWeight: TBD'} />
        </div>
        <div>
          <label className="label">Hero image</label>
          {vehicle.heroImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={vehicle.heroImageUrl} alt={vehicle.name} className="mb-2 h-32 w-full rounded object-cover" />
          )}
          <input className="input" name="heroImage" type="file" accept="image/*" />
        </div>
        <button type="submit" className="btn-primary">Save Vehicle Info</button>
      </form>

      <div>
        <h2 className="mb-4 text-xl font-bold">Gallery Photos</h2>

        <details className="mb-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <summary className="cursor-pointer font-semibold">Add new photo</summary>
          <form action={addVehiclePhoto} encType="multipart/form-data" className="mt-4 space-y-4">
            <div>
              <label className="label">Photo</label>
              <input className="input" name="photo" type="file" accept="image/*" required />
            </div>
            <div>
              <label className="label">Caption (optional)</label>
              <input className="input" name="caption" />
            </div>
            <div>
              <label className="label">Sort order</label>
              <input className="input" name="sortOrder" type="number" defaultValue={0} />
            </div>
            <button type="submit" className="btn-primary">Add Photo</button>
          </form>
        </details>

        {photos.length === 0 ? (
          <p className="text-neutral-500">No photos yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <div key={photo.id} className="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt={photo.caption || ''} className="mb-2 h-32 w-full rounded object-cover" />
                {photo.caption && <p className="mb-2 text-sm text-neutral-600">{photo.caption}</p>}
                <form action={deleteVehiclePhoto.bind(null, photo.id)}>
                  <button type="submit" className="btn-danger w-full text-xs">Delete</button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
