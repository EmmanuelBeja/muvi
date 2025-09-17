/**
 * ErrorBoundary component
 * Displays an error message when something goes wrong in the app.
 * @param error - Optional error object to display.
 */
export default function ErrorBoundary({
  error,
}: {
  error?: { message?: string };
}) {
  // Render a styled error message box
  return (
    <div className="bg-red-50 p-8 rounded h-[80vh] text-red-800">
      {/* Error title */}
      <h2 className="font-semibold text-lg">Something went wrong</h2>
      {/* Show error message or fallback to 'Unknown error' */}
      <pre className="mt-3 text-sm">
        {String(error?.message ?? error ?? 'Unknown error')}
      </pre>
    </div>
  );
}
