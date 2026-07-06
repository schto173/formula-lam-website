import { prisma } from '@/lib/prisma';
import { updateApplicationStatus, deleteApplication } from '@/lib/admin-actions';
import StatusSelect from '@/components/admin/StatusSelect';

export default async function AdminApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: 'desc' },
    include: { position: true },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Applications</h1>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-neutral-900">{app.name}</p>
                <p className="text-sm text-neutral-500">
                  <a className="hover:underline" href={`mailto:${app.email}`}>{app.email}</a>
                  {app.phone && ` · ${app.phone}`}
                </p>
                {app.position && (
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-600">
                    Applying for: {app.position.title}
                  </p>
                )}
                <p className="mt-3 whitespace-pre-line text-sm text-neutral-700">{app.message}</p>
                <p className="mt-2 text-xs text-neutral-400">
                  Submitted {app.createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <StatusSelect action={updateApplicationStatus.bind(null, app.id)} defaultValue={app.status} />
                <form action={deleteApplication.bind(null, app.id)}>
                  <button type="submit" className="btn-danger text-xs">Delete</button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {applications.length === 0 && <p className="text-neutral-500">No applications yet.</p>}
      </div>
    </div>
  );
}
