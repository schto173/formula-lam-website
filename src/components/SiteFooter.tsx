export default function SiteFooter({ teamName, contactEmail }: { teamName: string; contactEmail: string }) {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-neutral-500">
        <p>&copy; {new Date().getFullYear()} {teamName}. All rights reserved.</p>
        {contactEmail && <p className="mt-1">Contact: <a className="text-brand-600 hover:underline" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>}
        <p className="mt-1">
          <a href="/admin" className="hover:underline">Admin</a>
        </p>
      </div>
    </footer>
  );
}
