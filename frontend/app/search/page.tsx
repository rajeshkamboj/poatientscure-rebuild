import Link from 'next/link';

export default function Search() {
  return (
    <div className='min-h-screen bg-background dark:bg-background-dark'>
      <main className='flex-1 flex items-center justify-center'>
        <div className='container text-center'>
          <h1 className='mb-6'>
            Search
          </h1>
          <p className='mb-8'>
            Search functionality coming soon.
          </p>
          <div className='relative w-64'>
            <input
              type='text'
              placeholder='Search for health topics...'
              className='input mb-4'
            />
            <button
              className='btn-primary w-full'
              aria-label='Search'
            >
              Search
            </button>
          </div>
          <Link
            href='/'
            className='btn-outline w-full'
          >
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
}