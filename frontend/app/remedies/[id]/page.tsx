import { dataService } from '@/lib/dataService';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function RemedyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const remedy = await dataService.getRemedyById(id);

  if (!remedy) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-background dark:bg-background-dark'>
      <main className='flex-1'>
        <div className='px-4 py-8 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl'>
            <nav className='mb-6 flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400'>
              <Link href='/' className='hover:text-gray-600 dark:hover:text-gray-300'>
                Home
              </Link>
              <span className='mx-2'>/</span>
              <Link href='/remedies' className='hover:text-gray-600 dark:hover:text-gray-300'>
                Remedies
              </Link>
              <span className='mx-2'>/</span>
              <span className='font-medium text-gray-700 dark:text-gray-200'>{remedy.name}</span>
            </nav>

            <div className='mb-8'>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100'>{remedy.name}</h1>
              <div className='mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400'>
                <span>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <div className='mb-8'>
              <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Purpose & Benefits</h2>
              <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{remedy.purpose}</p>
            </div>

            {remedy.ingredients.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Ingredients</h2>
                <div className='space-y-4'>
                  {remedy.ingredients.map((ing, index) => (
                    <div key={`${remedy.id}-ingredient-${index}`} className='flex items-start'>
                      <span className='flex-shrink-0'>•</span>
                      <span className='ml-3'>{ing.item}{ing.quantity ? ` — ${ing.quantity}` : ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {remedy.preparation && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Preparation Method</h2>
                <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{remedy.preparation}</p>
              </div>
            )}

            {remedy.howToUse && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>How to Use</h2>
                <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{remedy.howToUse}</p>
              </div>
            )}

            {(remedy.timing || remedy.frequency || remedy.duration) && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Usage Guidelines</h2>
                <div className='grid gap-4 sm:grid-cols-2'>
                  {remedy.timing && (
                    <div>
                      <h3 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Timing</h3>
                      <p className='text-gray-700 dark:text-gray-300'>{remedy.timing}</p>
                    </div>
                  )}
                  {remedy.frequency && (
                    <div>
                      <h3 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Frequency</h3>
                      <p className='text-gray-700 dark:text-gray-300'>{remedy.frequency}</p>
                    </div>
                  )}
                  {remedy.duration && (
                    <div>
                      <h3 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Duration</h3>
                      <p className='text-gray-700 dark:text-gray-300'>{remedy.duration}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {remedy.precautions.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Precautions</h2>
                <ul className='space-y-2 text-gray-700 dark:text-gray-300'>
                  {remedy.precautions.map((precaution, index) => (
                    <li key={`${remedy.id}-precaution-${index}`} className='flex items-start'>
                      <span className='flex-shrink-0'>•</span>
                      <span className='ml-3'>{precaution}</span>
                    </li>
                  ))}
                </ul>
                {remedy.whoShouldAvoid.length > 0 && (
                  <div className='mt-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800/20 dark:bg-red-900/20'>
                    <h3 className='mb-2 text-lg font-semibold text-red-800 dark:text-red-200'>Who Should Avoid</h3>
                    <ul className='space-y-1 text-gray-700 dark:text-gray-300'>
                      {remedy.whoShouldAvoid.map((person, index) => (
                        <li key={`${remedy.id}-avoid-${index}`} className='flex items-start'>
                          <span className='flex-shrink-0'>•</span>
                          <span className='ml-3'>{person}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {remedy.references.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>References & Sources</h2>
                <ul className='space-y-1 text-sm text-gray-700 dark:text-gray-300'>
                  {remedy.references.map((ref, index) => (
                    <li key={`${remedy.id}-ref-${index}`} className='flex items-start'>
                      <span className='flex-shrink-0'>[{index + 1}]</span>
                      <span className='ml-2'>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

