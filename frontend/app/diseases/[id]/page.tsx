import { dataService } from '@/lib/dataService';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function DiseasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const disease = await dataService.getDiseaseById(id);

  if (!disease) {
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
              <Link href='/diseases' className='hover:text-gray-600 dark:hover:text-gray-300'>
                Diseases
              </Link>
              <span className='mx-2'>/</span>
              <span className='font-medium text-gray-700 dark:text-gray-200'>{disease.name}</span>
            </nav>

            <div className='mb-8'>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100'>{disease.name}</h1>
              {disease.commonNames.length > 0 && (
                <p className='text-sm italic text-gray-500 dark:text-gray-400'>
                  Also known as: {disease.commonNames.join(', ')}
                </p>
              )}
              <div className='mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400'>
                <span>Last updated: {disease.lastUpdated}</span>
                {disease.reviewer && (
                  <>
                    <span className='mx-2'>•</span>
                    <span>Reviewed by: {disease.reviewer}</span>
                  </>
                )}
              </div>
            </div>

            <div className='mb-8 rounded-xl bg-gray-50 p-6 dark:bg-gray-800'>
              <h2 className='mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100'>Quick Facts</h2>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                <div>
                  <h3 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Prevalence</h3>
                  <p className='text-base text-gray-900 dark:text-gray-100'>{disease.quickInfo.prevalence}</p>
                </div>
                <div>
                  <h3 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Age Group</h3>
                  <p className='text-base text-gray-900 dark:text-gray-100'>{disease.quickInfo.ageGroup}</p>
                </div>
                <div>
                  <h3 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Gender</h3>
                  <p className='text-base text-gray-900 dark:text-gray-100'>{disease.quickInfo.gender}</p>
                </div>
              </div>
            </div>

            <div className='mb-8'>
              <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Overview</h2>
              <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{disease.summary}</p>
            </div>

            {disease.ayurvedicPerspective && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Ayurvedic Perspective</h2>
                <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{disease.ayurvedicPerspective}</p>
              </div>
            )}

            {disease.symptoms.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Common Symptoms</h2>
                <ul className='space-y-2 text-gray-700 dark:text-gray-300'>
                  {disease.symptoms.map((symptom, index) => (
                    <li key={index} className='flex items-start'>
                      <span className='flex-shrink-0'>•</span>
                      <span className='ml-3'>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {disease.causes.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Possible Causes</h2>
                <ul className='space-y-2 text-gray-700 dark:text-gray-300'>
                  {disease.causes.map((cause, index) => (
                    <li key={index} className='flex items-start'>
                      <span className='flex-shrink-0'>•</span>
                      <span className='ml-3'>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(disease.diet.length > 0 || disease.lifestyle.length > 0) && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Diet & Lifestyle Recommendations</h2>
                <div className='grid gap-6 sm:grid-cols-2'>
                  {disease.diet.length > 0 && (
                    <div>
                      <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>Dietary Guidelines</h3>
                      <ul className='space-y-1 text-gray-700 dark:text-gray-300'>
                        {disease.diet.map((item, index) => (
                          <li key={index} className='flex items-start'>
                            <span className='flex-shrink-0'>•</span>
                            <span className='ml-3'>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {disease.lifestyle.length > 0 && (
                    <div>
                      <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>Lifestyle Recommendations</h3>
                      <ul className='space-y-1 text-gray-700 dark:text-gray-300'>
                        {disease.lifestyle.map((item, index) => (
                          <li key={index} className='flex items-start'>
                            <span className='flex-shrink-0'>•</span>
                            <span className='ml-3'>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {disease.precautions.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Precautions</h2>
                <ul className='space-y-2 text-gray-700 dark:text-gray-300'>
                  {disease.precautions.map((precaution, index) => (
                    <li key={index} className='flex items-start'>
                      <span className='flex-shrink-0'>•</span>
                      <span className='ml-3'>{precaution}</span>
                    </li>
                  ))}
                </ul>
                {disease.whenToSeekMedicalCare && (
                  <div className='mt-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800/20 dark:bg-red-900/20'>
                    <h3 className='mb-2 text-lg font-semibold text-red-800 dark:text-red-200'>When to Seek Medical Care</h3>
                    <p className='text-gray-700 dark:text-gray-300'>{disease.whenToSeekMedicalCare}</p>
                  </div>
                )}
              </div>
            )}

            {disease.desiNuskhe.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Traditional Home Remedies</h2>
                <div className='space-y-6'>
                  {disease.desiNuskhe.map((remedy) => (
                    <div key={remedy.id} className='rounded-xl bg-gray-50 p-6 dark:bg-gray-800'>
                      <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>{remedy.name}</h3>
                      <p className='mb-3 text-sm text-gray-500 dark:text-gray-400'>{remedy.purpose}</p>

                      {remedy.ingredients.length > 0 && (
                        <div className='mb-3'>
                          <h4 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Ingredients:</h4>
                          <div className='flex flex-wrap gap-2'>
                            {remedy.ingredients.map((ing, index) => (
                              <span key={`${remedy.id}-${index}`} className='rounded bg-blue-50 px-2.5 py-1 text-xs font-medium dark:bg-blue-900/20'>
                                {ing.item}{ing.quantity ? ` • ${ing.quantity}` : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {remedy.preparation && (
                        <div className='mb-3'>
                          <h4 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Preparation:</h4>
                          <p className='text-gray-700 dark:text-gray-300'>{remedy.preparation}</p>
                        </div>
                      )}

                      {remedy.howToUse && (
                        <div className='mb-3'>
                          <h4 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>How to Use:</h4>
                          <p className='text-gray-700 dark:text-gray-300'>{remedy.howToUse}</p>
                        </div>
                      )}

                      {remedy.timing && (
                        <div className='mb-2'>
                          <h4 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Timing:</h4>
                          <p className='text-gray-700 dark:text-gray-300'>{remedy.timing}</p>
                        </div>
                      )}

                      {remedy.frequency && (
                        <div className='mb-2'>
                          <h4 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Frequency:</h4>
                          <p className='text-gray-700 dark:text-gray-300'>{remedy.frequency}</p>
                        </div>
                      )}

                      {remedy.duration && (
                        <div className='mb-2'>
                          <h4 className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>Duration:</h4>
                          <p className='text-gray-700 dark:text-gray-300'>{remedy.duration}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {disease.faq.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Frequently Asked Questions</h2>
                <div className='space-y-4'>
                  {disease.faq.map((item, index) => (
                    <div key={index} className='border-b pb-4 last:border-0 last:pb-0'>
                      <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100'>{item.question}</h3>
                      <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {disease.references.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>References & Sources</h2>
                <ul className='space-y-1 text-sm text-gray-700 dark:text-gray-300'>
                  {disease.references.map((ref, index) => (
                    <li key={index} className='flex items-start'>
                      <span className='flex-shrink-0'>[{index + 1}]</span>
                      <span className='ml-2'>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(disease.relatedRemedies.length > 0 || disease.relatedIngredients.length > 0 || disease.relatedDiseases.length > 0) && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Related Content</h2>
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                  {disease.relatedRemedies.map((remedyId) => (
                    <Link key={remedyId} href={`/remedies/${remedyId}`} className='group'>
                      <div className='cursor-pointer rounded-xl bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'>
                        <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>Related Remedy</p>
                      </div>
                    </Link>
                  ))}
                  {disease.relatedIngredients.map((ingredientId) => (
                    <Link key={ingredientId} href={`/ingredients/${ingredientId}`} className='group'>
                      <div className='cursor-pointer rounded-xl bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'>
                        <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>Related Ingredient</p>
                      </div>
                    </Link>
                  ))}
                  {disease.relatedDiseases.map((relatedDiseaseId) => (
                    <Link key={relatedDiseaseId} href={`/diseases/${relatedDiseaseId}`} className='group'>
                      <div className='cursor-pointer rounded-xl bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'>
                        <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>Related Condition</p>
                      </div>
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

