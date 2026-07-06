import { prisma } from '@/lib/prisma';
import { submitApplication } from '@/lib/public-actions';

export const metadata = { title: 'Join Us' };

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; error?: string }>;
}) {
  const params = await searchParams;
  const positions = await prisma.position.findMany({
    orderBy: [{ active: 'desc' }, { createdAt: 'asc' }],
  });
  const openPositions = positions.filter((position) => position.active);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold">Join Us</h1>
        <p className="mt-2 text-neutral-600">
          We're always looking for motivated students to join the team. Check out our open
          positions below, or apply generally and tell us how you'd like to contribute.
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-bold">Positions</h2>
        {positions.length === 0 ? (
          <p className="text-neutral-500">No positions listed yet &mdash; feel free to apply generally below.</p>
        ) : (
          <div className="space-y-3">
            {positions.map((position) => (
              <details key={position.id} className="card">
                <summary className="flex cursor-pointer flex-wrap items-center gap-2">
                  <span className="font-semibold text-neutral-900">{position.title}</span>
                  <span
                    className={
                      position.active
                        ? 'rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800'
                        : 'rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600'
                    }
                  >
                    {position.active ? 'Open' : 'Closed'}
                  </span>
                  <span className="text-xs text-neutral-400">{position.teamSize}</span>
                  {position.department && (
                    <span className="text-xs font-medium uppercase tracking-wide text-brand-600">{position.department}</span>
                  )}
                </summary>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{position.description}</p>
              </details>
            ))}
          </div>
        )}
      </section>

      <section className="card max-w-xl">
        <h2 className="mb-4 text-xl font-bold">Application</h2>

        {params.submitted && (
          <p className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-800">
            Thanks for applying! We'll be in touch soon.
          </p>
        )}
        {params.error === 'missing' && (
          <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800">
            Please fill in your name, email, and a short message.
          </p>
        )}
        {params.error === 'email' && (
          <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800">
            Please enter a valid email address.
          </p>
        )}

        <form action={submitApplication} className="space-y-4">
          <div>
            <label className="label" htmlFor="name">Name</label>
            <input className="input" id="name" name="name" required />
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input className="input" id="email" name="email" type="email" required />
          </div>
          <div>
            <label className="label" htmlFor="phone">Phone (optional)</label>
            <input className="input" id="phone" name="phone" />
          </div>
          {openPositions.length > 0 && (
            <div>
              <label className="label" htmlFor="positionId">Position</label>
              <select className="input" id="positionId" name="positionId" defaultValue="">
                <option value="">General application</option>
                {openPositions.map((position) => (
                  <option key={position.id} value={position.id}>{position.title}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="label" htmlFor="message">Why do you want to join?</label>
            <textarea className="input" id="message" name="message" rows={5} required />
          </div>
          <button type="submit" className="btn-primary w-full">Submit Application</button>
        </form>
      </section>
    </div>
  );
}
