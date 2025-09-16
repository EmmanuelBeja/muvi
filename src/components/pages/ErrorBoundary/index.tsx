export default function ErrorBoundary({
  error,
}: {
  error?: { message?: string };
}) {
  return (
    <div className="bg-red-50 p-8 rounded h-[80vh] text-red-800">
      <h2 className="font-semibold text-lg">Something went wrong</h2>
      <pre className="mt-3 text-sm">
        {String(error?.message ?? error ?? 'Unknown error')}
      </pre>
    </div>
  );
}
