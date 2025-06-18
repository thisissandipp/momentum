import Link from 'next/link';

export const SiteFooter = () => {
  return (
    <footer className="w-fullpy-8 py-10 text-center text-sm">
      <div className="mx-auto max-w-6xl px-4">
        <p>&copy; {new Date().getFullYear()} Momentum. All rights reserved.</p>
        <div className="mt-4 space-x-6">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            Follow Our Journey
          </Link>
        </div>
      </div>
    </footer>
  );
};
