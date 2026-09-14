import { dataService } from '@/lib/dataService';
import Link from 'next/link';

export default async function Home() {
  const [diseases, remedies, ingredients] = await Promise.all([
    dataService.getDiseases(),
    dataService.getRemedies(),
    dataService.getIngredients()
  ]);

  return (
    <div className='min-h-screen bg-background dark:bg-background-dark'>
      {/* Header is already in layout */}
      <main className='flex-1'>
        {/* Hero Section - Enhanced */}
        <section className='relative pt-20 pb-28'>
          <div className='container px-4'>
            <div className='text-center'>
              <h1 className='text-5xl font-bold text-text/90 dark:text-text mb-4 md:text-6xl lg:text-7xl'>
                Discover Authentic Ayurvedic Wisdom
              </h1>
              <p className='text-base text-text/70 dark:text-text/300 max-w-2xl mx-auto mb-8 md:text-lg lg:text-xl'>
                Explore time-tested remedies, natural ingredients, and holistic approaches to health and wellness.
              </p>
              <div className='flex flex-col sm:flex-row sm:justify-center sm:gap-6'>
                <Link
                  href='/diseases'
                  className='btn-primary w-full sm:w-auto px-6 py-3 text-base font-medium hover:bg-primary/90 transition-colors'
                >
                  Browse Diseases
                </Link>
                <Link
                  href='/remedies'
                  className='btn-outline mt-4 sm:mt-0 border-primary/50 text-primary/80 hover:border-primary/30 hover:text-primary w-full sm:w-auto px-6 py-3 text-base font-medium hover:border-primary/30 hover:text-primary transition-all'
                >
                  Explore Remedies
                </Link>
              </div>
            </div>
            {/* Subtle decorative element */}
            <div className='absolute inset-0 pointer-events-none'>
              <div className='absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-primary/5 to-transparent'></div>
              <div className='absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-primary/5 to-transparent'></div>
            </div>
          </div>
        </section>

        {/* Featured Health Topics */}
        <section className='px-4 py-16 sm:px-6 lg:px-8 bg-background/50 dark:bg-surface-dark/50'>
          <div className='container'>
            <h2 className='sr-only'>Featured health topics</h2>
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Disease Card */}
              {diseases.slice(0, 4).map((disease) => (
                <Link
                  key={disease.id}
                  href={`/diseases/${disease.id}`}
                  className='group'
                >
                  <div className='card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer border rounded-lg bg-white dark:bg-surface-dark border-border/50 dark:border-border-dark/50'>
                    <div className='p-6'>
                      <div className='flex items-center space-x-3 mb-4'>
                        <div className='w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center'>
                          <svg className='h-5 w-5 text-primary' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                            <path d='M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0-2 2z'></path>
                            <path d='M12 7V4a5 5 0 0 1 5-5h2a2 2 0 0 1 2 2v1.5a7 7 0 0 0-11 0V6a2 2 0 0 1 2-2h2a5 5 0 0 1 5 5z'></path>
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-1'>
                          {disease.name}
                        </h3>
                        <p className='text-xs text-text/50 dark:text-text/40'>
                          Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <p className='mt-3 text-sm text-text/70 dark:text-text/60 line-clamp-3'>
                        {disease.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              {/* Remedy Card */}
              {remedies.slice(0, 4).map((remedy) => (
                <Link
                  key={remedy.id}
                  href={`/remedies/${remedy.id}`}
                  className='group'
                >
                  <div className='card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer border rounded-lg bg-white dark:bg-surface-dark border-border/50 dark:border-border-dark/50'>
                    <div className='p-6'>
                      <div className='flex items-center space-x-3 mb-4'>
                        <div className='w-9 h-9 bg-secondary/10 rounded-xl flex items-center justify-center'>
                          <svg className='h-5 w-5 text-secondary' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                            <path d='M12 22s-4-1.5-4-4V8c0-6 5-8 8-8s8 2 8 8v2c0 2.5-2.5 4.5-4 5v7'></path>
                            <path d='M16 16v1.5a2.5 2.5 0 0 1-2.5 2.5h1.5a.75.75 0 0 1 0 1.5h-1.5a2.5 2.5 0 0 1-2.5-2.5z'></path>
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-1'>
                          {remedy.name}
                        </h3>
                        <p className='text-xs text-text/50 dark:text-text/40'>
                          Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <p className='mt-3 text-sm text-text/70 dark:text-text/60 line-clamp-3'>
                        {remedy.purpose}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className='px-4 py-16 sm:px-6 lg:px-8'>
          <div className='container'>
            <h2 className='sr-only'>Our highlights</h2>
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Trusted Source */}
              <div className='p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
                    <svg className='h-5 w-5 text-primary' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M9 12l2 2 4-4M7 20h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z'></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-2'>
                      Trusted Source
                    </h3>
                    <p className='text-text/70 dark:text-text/300'>
                      Our content is sourced from ancient Ayurvedic texts and verified by modern practitioners.
                    </p>
                  </div>
                </div>
              </div>

              {/* Evidence-Based Approach */}
              <div className='p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
                    <svg className='h-5 w-5 text-primary' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0-2 2z'></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-2'>
                      Evidence-Based Approach
                    </h3>
                    <p className='text-text/70 dark:text-text/300'>
                      We combine traditional wisdom with scientific research for accurate, reliable information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Expert Reviewed */}
              <div className='p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
                    <svg className='h-5 w-5 text-primary' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <circle cx='12' cy='12' r={10} stroke='currentColor' strokeWidth='2'></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-2'>
                      Expert Reviewed
                    </h3>
                    <p className='text-text/70 dark:text-text/300'>
                      All content is reviewed by qualified Ayurvedic practitioners and medical professionals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Traditional Wisdom */}
              <div className='p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
                    <svg className='h-5 w-5 text-primary' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M2 12s3-8 6-8 6 8-3 8-6 8z'></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-2'>
                      Traditional Wisdom
                    </h3>
                    <p className='text-text/70 dark:text-text/300'>
                      We preserve and share authentic Ayurvedic knowledge passed down through generations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - Subtle Highlight */}
        <section className='px-6 py-24 sm:px-8 lg:px-10 bg-primary/5 dark:bg-primary/10'>
          <div className='container'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-text/90 dark:text-text mb-6'>
                Begin Your Wellness Journey
              </h2>
              <p className='text-lg text-text/70 dark:text-text/300 max-w-2xl mx-auto mb-10'>
                Start exploring our comprehensive library of diseases, remedies, and natural ingredients to find authentic, time-tested solutions for your health and wellbeing.
              </p>
              <div className='flex justify-center gap-6'>
                <Link
                  href='/diseases'
                  className='btn-primary px-8 py-3 text-base font-medium hover:bg-primary/90'
                >
                  Browse All Conditions
                </Link>
                <Link
                  href='/remedies'
                  className='btn-outline border-primary/50 text-primary/80 hover:border-primary/30 hover:text-primary px-8 py-3 text-base font-medium'
                >
                  Discover Remedies
                </Link>
                <Link
                  href='/ingredients'
                  className='btn-outline border-primary/50 text-primary/80 hover:border-primary/30 hover:text-primary px-8 py-3 text-base font-medium'
                >
                  Explore Ingredients
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer is already in layout */}
    </div>
  );
}
