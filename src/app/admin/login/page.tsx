import { loginAction } from '@/lib/admin-actions';

export const metadata = { title: 'Admin Login' };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-xl font-bold text-neutral-900">Admin Login</h1>
        {params.error && (
          <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800">
            Invalid username or password.
          </p>
        )}
        <form action={loginAction} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700" htmlFor="username">Username</label>
            <input className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" id="username" name="username" required autoFocus />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700" htmlFor="password">Password</label>
            <input className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" id="password" name="password" type="password" required />
          </div>
          <button type="submit" className="w-full rounded-md bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
