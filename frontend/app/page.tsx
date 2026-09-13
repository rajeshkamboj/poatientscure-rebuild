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
        {/* Hero Section */}
        <section className='relative bg-gradient-to-b from-primary/95 to-background pt-20 pb-16'>
          <div className='container'>
            <div className='text-center'>
              <h1 className='text-5xl font-bold text-white mb-4'>
                Discover Authentic Ayurvedic Wisdom
              </h1>
              <p className='text-xl text-text/80 max-w-2xl mx-auto mb-8'>
                Explore time-tested remedies, natural ingredients, and holistic approaches to health and wellness.
              </p>
              <div className='flex justify-center gap-4'>
                <Link
                  href='/diseases'
                  className='btn-primary hover:bg-primary/90'
                >
                  Browse Diseases
                </Link>
                <Link
                  href='/remedies'
                  className='btn-outline border-white hover:bg-primary/20'
                >
                  Explore Remedies
                </Link>
              </div>
            </div>
          </div>
          {/* Decorative element */}
          <div className='absolute inset-0 pointer-events-none'>
            <div className='absolute top-0 left-0 w-full h-16 bg-gradient-to-t from-primary/10 to-transparent'></div>
            <div className='absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-primary/10 to-transparent'></div>
          </div>
        </section>

        {/* Search Bar */}
        <section className='px-4 py-8 sm:px-6 lg:px-8'>
          <div className='container'>
            <div className='max-w-2xl mx-auto'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search for diseases, remedies, ingredients...'
                  className='block w-full rounded-xl border-0 px-8 py-4 text-text/90 placeholder:text-text/50 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background dark:bg-surface-dark dark:border-surface-dark/50 dark:text-text dark:placeholder-text-text/40'
                />
                <button
                  className='absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none'
                  aria-label='Search'
                >
                  {/* Search icon - simplified */}
                  <svg className='h-5 w-5 text-text/50' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <circle cx='11' cy='11' r='8' stroke='currentColor' strokeWidth='2'></circle>
                    <path d='m21 21-4.35-4.35'></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Health Topics */}
        <section className='px-4 py-16 sm:px-6 lg:px-8 bg-background/50 dark:bg-surface-dark/50'>
          <div className='container'>
            <h2 className='sr-only'>Featured health topics</h2>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Disease Card */}
              {diseases.slice(0, 4).map((disease) => (
                <Link
                  key={disease.id}
                  href={`/diseases/${disease.id}`}
                  className='group'
                >
                  <div className='card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer'>
                    <div className='p-6'>
                      <div className='flex items-center space-x-3 mb-4'>
                        <div className='w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center'>
                          <svg className='h-5 w-5 text-primary' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                            <path d='M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0-2 2z'></path>
                            <path d='M12 7V4a5 5 0 0 1 5-5h2a2 2 0 0 1 2 2v1.5a7 7 0 0 0-11 0V6a2 2 0 0 1 2-2h2a5 5 0 0 1 5 5z'></path>
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-text/90 dark:text-text'>
                          {disease.name}
                        </h3>
                      </div>
                      <p className='mt-2 text-sm text-text/70 dark:text-text/60 line-clamp-3'>
                        {disease.summary}
                      </p>
                      <div className='mt-4 flex items-center text-xs text-text/50 dark:text-text/40'>
                        <span>Last updated: {disease.lastUpdated}</span>
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
                  className='group'
                >
                  <div className='card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer'>
                    <div className='p-6'>
                      <div className='flex items-center space-x-3 mb-4'>
                        <div className='w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center'>
                          <svg className='h-5 w-5 text-secondary' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                            <path d='M12 22s-4-1.5-4-4V8c0-6 5-8 8-8s8 2 8 8v2c0 2.5-2.5 4.5-4 5v7'></path>
                            <path d='M16 16v1.5a2.5 2.5 0 0 1-2.5 2.5H9'></path>
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-text/90 dark:text-text'>
                          {remedy.name}
                        </h3>
                      </div>
                      <p className='mt-2 text-sm text-text/70 dark:text-text/60 line-clamp-3'>
                        {remedy.purpose}
                      </p>
                      <div className='mt-4 flex flex-wrap gap-2'>
                        {remedy.ingredients.map((ing) => (
                          <span
                            key={ing.item}
                            className='bg-secondary/20 text-secondary px-2.5 py-1 rounded text-xs font-medium'
                          >
                            {ing.item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {/* Ingredient Card */}
              {ingredients.slice(0, 4).map((ingredient) => (
                <Link
                  key={ingredient.id}
                  href={`/ingredients/${ingredient.id}`}
                  className='group'
                >
                  <div className='card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer'>
                    <div className='p-6'>
                      <div className='flex items-center space-x-3 mb-4'>
                        <div className='w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center'>
                          <svg className='h-5 w-5 text-accent' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                            <path d='M12 22s-4-1.5-4-4V8c0-6 5-8 8-8s8 2 8 8v2c0 2.5-2.5 4.5-4 5v7'></path>
                            <path d='M16 11.2a4 4 0 1 1-5.6 5.6'></path>
                            <path d='M12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z'></path>
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-text/90 dark:text-text'>
                          {ingredient.name}
                        </h3>
                      </div>
                      <p className='mt-2 text-sm text-text/70 dark:text-text/60 line-clamp-3'>
                        {ingredient.description}
                      </p>
                      <div className='mt-4 flex flex-wrap gap-2'>
                        {ingredient.traditionalUses.slice(0, 2).map((use) => (
                          <span
                            key={use}
                            className='bg-accent/20 text-accent px-2.5 py-1 rounded text-xs font-medium'
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest/Featured Content */}
        <section className='px-4 py-16 sm:px-6 lg:px-8'>
          <div className='container'>
            <h2 className='text-3xl font-bold text-text/90 dark:text-text mb-8'>
              Latest Health Articles
            </h2>
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Placeholder for articles - we'll use disease cards for now */}
              {diseases.slice(0, 6).map((disease) => (
                <Link
                  key={disease.id}
                  href={`/diseases/${disease.id}`}
                  className='group'
                >
                  <div className='h-full card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer'>
                    <div className='p-6'>
                      <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-3'>
                        {disease.name}
                      </h3>
                      <p className='text-sm text-text/70 dark:text-text/60 line-clamp-3'>
                        {disease.summary}
                      </p>
                      <div className='mt-4 flex items-center text-xs text-text/50 dark:text-text/40'>
                        <span>Last updated: {disease.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trust/Editorial Information */}
        <section className='px-4 py-16 sm:px-6 lg:px-8 bg-background/50 dark:bg-surface-dark/50'>
          <div className='container'>
            <h2 className='text-3xl font-bold text-text/90 dark:text-text mb-8'>
              Trusted Ayurvedic Knowledge
            </h2>
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              <div className='card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer'>
                <div className='p-6'>
                  <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-4'>
                    Evidence-Based Approach
                  </h3>
                  <p className='text-text/70 dark:text-text/60'>
                    Our content combines traditional Ayurvedic wisdom with modern scientific research to provide accurate, reliable health information.
                  </p>
                </div>
              </div>
              <div className='card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer'>
                <div className='p-6'>
                  <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-4'>
                    Expert Reviewed
                  </h3>
                  <p className='text-text/70 dark:text-text/60'>
                    All articles are reviewed by qualified Ayurvedic practitioners and medical professionals to ensure accuracy and safety.
                  </p>
                </div>
              </div>
              <div className='card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer'>
                <div className='p-6'>
                  <h3 className='text-lg font-semibold text-text/90 dark:text-text mb-4'>
                    Traditional Wisdom
                  </h3>
                  <p className='text-text/70 dark:text-text/60'>
                    We preserve and share authentic Ayurvedic knowledge passed down through generations, adapted for modern lifestyles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense-ready placeholder (optional) */}
        {/* <section className='px-4 py-16 sm:px-6 lg:px-8'>
          <div className='container'>
            <div className='bg-surface/50 dark:bg-surface-dark/50 h-96 rounded-xl flex items-center justify-center'>
              <p className='text-text/50 dark:text-text/40 text-center'>Advertisement</p>
            </div>
          </div>
        </section> */}
      </main>
      {/* Footer is already in layout */}
    </div>
  );
}

