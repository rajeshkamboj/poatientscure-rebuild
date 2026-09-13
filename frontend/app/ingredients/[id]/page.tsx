import { dataService } from '@/lib/dataService';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function IngredientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ingredient = await dataService.getIngredientById(id);

  if (!ingredient) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-background dark:bg-background-dark'>
      <main className='flex-1'>
        <div className='px-4 py-8 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl'>
            <nav className='mb-6 flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400'>
              <Link href='/' className='hover:text-gray-600 dark:hover:text-gray-300'>Home</Link>
              <span className='mx-2'>/</span>
              <Link href='/ingredients' className='hover:text-gray-600 dark:hover:text-gray-300'>Ingredients</Link>
              <span className='mx-2'>/</span>
              <span className='font-medium text-gray-700 dark:text-gray-200'>{ingredient.name}</span>
            </nav>

            <div className='mb-8'>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100'>{ingredient.name}</h1>
              {ingredient.commonNames.length > 0 && (
                <p className='text-sm italic text-gray-500 dark:text-gray-400'>
                  Also known as: {ingredient.commonNames.join(', ')}
                </p>
              )}
              {ingredient.hindiName && (
                <p className='text-sm italic text-gray-500 dark:text-gray-400'>Hindi: {ingredient.hindiName}</p>
              )}
              {ingredient.punjabiName && (
                <p className='text-sm italic text-gray-500 dark:text-gray-400'>Punjabi: {ingredient.punjabiName}</p>
              )}
              <div className='mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400'>
                <span>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <div className='mb-8'>
              <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Description</h2>
              <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{ingredient.description}</p>
            </div>

            {ingredient.traditionalUses.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Traditional Uses</h2>
                <ul className='space-y-2 text-gray-700 dark:text-gray-300'>
                  {ingredient.traditionalUses.map((use, index) => (
                    <li key={`${ingredient.id}-use-${index}`} className='flex items-start'>
                      <span className='flex-shrink-0'>•</span>
                      <span className='ml-3'>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ingredient.preparation.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Preparation Methods</h2>
                <ul className='space-y-2 text-gray-700 dark:text-gray-300'>
                  {ingredient.preparation.map((method, index) => (
                    <li key={`${ingredient.id}-prep-${index}`} className='flex items-start'>
                      <span className='flex-shrink-0'>•</span>
                      <span className='ml-3'>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ingredient.precautions.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Precautions</h2>
                <ul className='space-y-2 text-gray-700 dark:text-gray-300'>
                  {ingredient.precautions.map((precaution, index) => (
                    <li key={`${ingredient.id}-precaution-${index}`} className='flex items-start'>
                      <span className='flex-shrink-0'>•</span>
                      <span className='ml-3'>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(ingredient.relatedRemedies.length > 0 || ingredient.relatedDiseases.length > 0) && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Related Remedies & Conditions</h2>
                <div className='grid gap-3 sm:grid-cols-2'>
                  {ingredient.relatedRemedies.map((remedyId) => (
                    <Link key={remedyId} href={`/remedies/${remedyId}`} className='rounded bg-white p-3 text-center transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'>
                      <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>Related Remedy</p>
                    </Link>
                  ))}
                  {ingredient.relatedDiseases.map((diseaseId) => (
                    <Link key={diseaseId} href={`/diseases/${diseaseId}`} className='rounded bg-white p-3 text-center transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'>
                      <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>Related Condition</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

