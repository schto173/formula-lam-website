import { getSiteSettings } from '@/lib/settings';
import { updateSettings } from '@/lib/admin-actions';

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Site Settings</h1>

      <form action={updateSettings} encType="multipart/form-data" className="max-w-xl space-y-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div>
          <label className="label">Team Name</label>
          <input className="input" name="teamName" defaultValue={settings.teamName} required />
        </div>
        <div>
          <label className="label">Tagline</label>
          <input className="input" name="tagline" defaultValue={settings.tagline} />
        </div>
        <div>
          <label className="label">About Text</label>
          <textarea className="input" name="aboutText" rows={5} defaultValue={settings.aboutText} />
        </div>
        <div>
          <label className="label">Contact Email</label>
          <input className="input" name="contactEmail" type="email" defaultValue={settings.contactEmail} />
        </div>
        <div>
          <label className="label">Hero Image</label>
          {settings.heroImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.heroImageUrl} alt="Hero" className="mb-2 h-32 w-full rounded object-cover" />
          )}
          <input className="input" name="heroImage" type="file" accept="image/*" />
        </div>
        <button type="submit" className="btn-primary">Save Settings</button>
      </form>
    </div>
  );
}
