import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="font-serif text-8xl font-bold text-brown-200 mb-4">404</p>
      <h1 className="font-serif text-3xl font-semibold text-brown-900 mb-3">
        Page not found
      </h1>
      <p className="text-brown-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
