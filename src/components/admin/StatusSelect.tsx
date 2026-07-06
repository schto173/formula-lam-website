'use client';

const STATUSES = ['new', 'reviewed', 'contacted', 'accepted', 'rejected'];

export default function StatusSelect({
  action,
  defaultValue,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValue: string;
}) {
  return (
    <form action={action}>
      <select
        name="status"
        defaultValue={defaultValue}
        className="input"
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      >
        {STATUSES.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </form>
  );
}
