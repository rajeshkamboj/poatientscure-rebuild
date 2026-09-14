import { dataService } from '@/lib/dataService';
import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon, EyeDropperIcon, UserIcon, BookOpenIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

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
        {/* Hero Section - Enhanced with Background Image */}
        <section className='relative pt-20 pb-28'>
          <div className='container px-4'>
            {/* Background Image */}
            <div className='absolute inset-0 -z-10'>
              <Image
                src='/hero-bg.jpg' // Placeholder - replace with actual hero image
                alt='Ayurvedic wellness background'
                fill
                className='object-cover opacity-80'
                priority
              />
              {/* Overlay for better text readability */}
              <div className='absolute inset-0 bg-gradient-to-b from-background/70 to-background/90 dark:from-background-dark/80 dark:to-background-dark/90'></div>
            </div>

            <div className='relative z-10'>
              <div className='text-center'>
                <h1 className='text-[40px] leading-[48px] font-bold text-text/90 dark:text-text mb-4 md:text-5xl lg:text-6xl'>
                  Discover Authentic Ayurvedic Wisdom
                </h1>
                <p className='text-base text-text/70 dark:text-text/300 max-w-2xl mx-auto mb-8 md:text-lg lg:text-xl'>
                  Explore time-tested remedies, natural ingredients, and holistic approaches to health and wellbeing.
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
                  className='group block'
                >
                  <div className='card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer border rounded-lg bg-white dark:bg-surface-dark border-border/50 dark:border-border-dark/50 h-full'>
                    <div className='p-6 space-y-4'>
                      {/* Image Thumbnail */}
                      <div className='aspect-w-4 aspect-h-3'>
                        <Image
                          src={`/placeholder-disease-${disease.id}.jpg`} // Placeholder
                          alt={`${disease.name} illustration`}
                          fill
                          className='object-cover rounded-lg'
                        />
                      </div>

                      <div className='flex items-center space-x-3 mb-2'>
                        <div className='w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center'>
                          <HeartIcon className='h-5 w-5 text-primary' />
                        </div>
                        <div>
                          <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-1'>
                            {disease.name}
                          </h3>
                          <p className='text-xs text-text/50 dark:text-text/40'>
                            {disease.lastUpdated}
                          </p>
                        </div>
                      </div>

                      <p className='mt-2 text-sm text-text/70 dark:text-text/60 line-clamp-3 flex-1'>
                        {disease.summary}
                      </p>

                      {/* Read more indicator */}
                      <div className='mt-4 flex items-center text-sm text-accent/80 hover:text-accent'>
                        Read more
                        <ArrowRightIcon className='ml-2 h-4 w-4' />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Remedy Card */}
              {remedies.slice(0, 4).map((remedy) => (
                <Link
                  key={remedy.id}
                  href={`/remedies/${remedy.id}`}
                  className='group block'
                >
                  <div className='card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer border rounded-lg bg-white dark:bg-surface-dark border-border/50 dark:border-border-dark/50 h-full'>
                    <div className='p-6 space-y-4'>
                      {/* Image Thumbnail */}
                      <div className='aspect-w-4 aspect-h-3'>
                        <Image
                          src={`/placeholder-remedy-${remedy.id}.jpg`} // Placeholder
                          alt={`${remedy.name} illustration`}
                          fill
                          className='object-cover rounded-lg'
                        />
                      </div>

                      <div className='flex items-center space-x-3 mb-2'>
                        <div className='w-8 h-8 bg-secondary/10 rounded-xl flex items-center justify-center'>
                          <EyeDropperIcon className='h-5 w-5 text-secondary' />
                        </div>
                        <div>
                          <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-1'>
                            {remedy.name}
                          </h3>
                          <p className='text-xs text-text/50 dark:text-text/40'>
                            Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      <p className='mt-2 text-sm text-text/70 dark:text-text/60 line-clamp-3 flex-1'>
                        {remedy.purpose}
                      </p>

                      {/* Read more indicator */}
                      <div className='mt-4 flex items-center text-sm text-accent/80 hover:text-accent'>
                        Read more
                        <ArrowRightIcon className='ml-2 h-4 w-4' />
                      </div>
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
              <div className='p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-flex flex-col'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
                    <UserIcon className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-2'>
                      Trusted Source
                    </h3>
                    <p className='text-text/70 dark:text-text/300 flex-1'>
                      Our content is sourced from ancient Ayurvedic texts and verified by modern practitioners.
                    </p>
                  </div>
                </div>
              </div>

              {/* Evidence-Based Approach */}
              <div className='p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-flex flex-col'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
                    <EyeDropperIcon className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-2'>
                      Evidence-Based Approach
                    </h3>
                    <p className='text-text/70 dark:text-text/300 flex-1'>
                      We combine traditional wisdom with scientific research for accurate, reliable information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Expert Reviewed */}
              <div className='p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-flex flex-col'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
                    <HeartIcon className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-2'>
                      Expert Reviewed
                    </h3>
                    <p className='text-text/70 dark:text-text/300 flex-1'>
                      All content is reviewed by qualified Ayurvedic practitioners and medical professionals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Traditional Wisdom */}
              <div className='p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-flex flex-col'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
                    <HeartIcon className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-2'>
                      Traditional Wisdom
                    </h3>
                    <p className='text-text/70 dark:text-text/300 flex-1'>
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

// Helper ArrowRight icon (simple version)
function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
  );
}