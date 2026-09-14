import { dataService } from '@/lib/dataService';
import Link from 'next/link';
import { EyeDropperIcon } from '@heroicons/react/24/solid';

export default async function RemediesPage() {
  const remedies = await dataService.getRemedies();

  return (
    <div className='min-h-screen bg-background dark:bg-background-dark'>
      <main className='flex-1'>
        <div className='px-4 py-8 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-7xl'>
            {/* Breadcrumbs */}
            <nav className='mb-6 flex items-center space-x-1 text-sm text-text/50 dark:text-text/40'>
              <Link href='/' className='hover:text-text/70 dark:hover:text-text/300'>
                Home
              </Link>
              <span className='mx-2'>/</span>
              <span className='font-medium text-text/80 dark:text-text/200'>Remedies</span>
            </nav>

            {/* Title */}
            <h1 className='mb-8 text-4xl font-bold text-text/90 dark:text-text'>
              Remedies
            </h1>

            {/* Remedies Grid - capped width and sensible columns */}
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {remedies.map((remedy) => (
                <Link
                  key={remedy.id}
                  href={`/remedies/${remedy.id}`}
                  className='group'
                >
                  <div className='rounded-xl bg-primary/10 p-6 text-center transition-colors hover:bg-primary/20 dark:hover:bg-primary/20'>
                    <div className='mb-4'>
                      <div className='w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3'>
                        <EyeDropperIcon className='h-5 w-5 text-primary' />
                      </div>
                    </div>
                    <h3 className='mb-2 text-xl font-semibold text-text/90 dark:text-text'>
                      {remedy.name}
                    </h3>
                    <p className='text-text/60 dark:text-text/300 line-clamp-2'>
                      {remedy.purpose?.slice(0, 100)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Show message if no remedies */}
            {remedies.length === 0 && (
              <p className='text-text/50 dark:text-text/40 text-center py-12'>
                No remedies found.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}