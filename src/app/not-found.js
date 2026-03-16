import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--background) px-6">
      <div className="text-center max-w-md">
        
        <h1 className="text-7xl font-bold text-(--primaryColor) drop-shadow-[2px_2px_0.75px_rgba(0,0,0,0.75)]">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-black">
          Page Not Found
        </h2>

        <p className="mt-2 text-black">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-md bg-(--primaryColor) text-(--quartenaryColor) font-medium hover:bg-(--secondaryColor) transition"
        >
          Back to Dashboard
        </Link>

      </div>
    </div>
  );
}