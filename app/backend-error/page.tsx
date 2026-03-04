export default function BackendError() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-6xl font-bold text-red-600">404</h1>

      <p className="mt-4 text-lg text-gray-700">
        Backend Not Connected
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Please try again later.
      </p>
    </div>
  );
}