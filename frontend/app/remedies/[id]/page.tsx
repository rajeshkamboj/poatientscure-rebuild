'use client';

import { dataService } from '@/lib/dataService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { HeartIcon as Leaf, ShieldCheckIcon as ShieldCheck, ClockIcon as Clock, UserIcon as User } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

export default function RemedyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [remedyData, setRemedyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remedyId, setRemedyId] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const { id } = await params;
        setRemedyId(id);
        const remedyData = await dataService.getRemedyById(id);

        if (!cancelled) {
          if (!remedyData) {
            setError('Remedy not found');
          } else {
            setRemedyData(remedyData);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to fetch remedy data');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [params]);

  const [isTocOpen, setIsTocOpen] = useState(false);

  if (loading) {
    return (
      <div className='min-h-screen bg-background dark:bg-background-dark flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (error) {
    notFound();
  }

  // Handle case where remedy data is null (not found)
  if (!remedyData) {
    notFound();
  }

  // Remedy is guaranteed to be non-null here due to the checks above
  const remedy = remedyData;

  // Define sections for table of contents
  const sections = [
    { id: 'purpose', title: 'Purpose & Benefits' },
    { id: 'ingredients', title: 'Ingredients' },
    { id: 'preparation', title: 'Preparation Method' },
    { id: 'how-to-use', title: 'How to Use' },
    { id: 'usage-guidelines', title: 'Usage Guidelines' },
    { id: 'precautions', title: 'Precautions' },
    { id: 'who-should-avoid', title: 'Who Should Avoid' },
    { id: 'references', title: 'References & Sources' },
  ].filter(section => {
    // Filter out sections that don't have content
    switch (section.id) {
      case 'purpose': return !!remedy.purpose;
      case 'ingredients': return remedy.ingredients.length > 0;
      case 'preparation': return !!remedy.preparation;
      case 'how-to-use': return !!remedy.howToUse;
      case 'usage-guidelines': return !!remedy.timing || !!remedy.frequency || !!remedy.duration;
      case 'precautions': return remedy.precautions.length > 0;
      case 'who-should-avoid': return remedy.whoShouldAvoid.length > 0;
      case 'references': return remedy.references.length > 0;
      default: return true;
    }
  });

  return (
    <div className='min-h-screen bg-background dark:bg-background-dark'>
      <main className='flex-1'>
        <div className='px-4 py-8 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl'>
            {/* Breadcrumbs */}
            <nav className='mb-6 flex items-center space-x-1 text-sm text-text/50 dark:text-text/40'>
              <Link href='/' className='hover:text-text/70 dark:hover:text-text/300'>
                Home
              </Link>
              <span className='mx-2'>/</span>
              <span className='font-medium text-text/80 dark:text-text/200'>{remedy.name}</span>
            </nav>

            {/* Title Area with Trust Signals */}
            <div className='mb-8'>
              <h1 className='mb-2 text-4xl font-bold text-text/90 dark:text-text'>
                {remedy.name}
              </h1>
              {/* Trust Signals - using available data */}
              <div className='mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-x-3 sm:space-x-6 space-y-3 sm:space-y-0'>
                <div className='flex items-center space-x-3'>
                  <Clock className='h-4 w-4 text-accent/80' />
                  <span className='text-text/60 dark:text-text/40'>Last updated: September 10, 2026</span>
                </div>
                {/* We don't have reviewer in remedy data, but we can show if available */}
                {/* {remedy.reviewer && (
                  <div className='flex items-center space-x-3'>
                    <ShieldCheck className='h-4 w-4 text-accent/80' />
                    <span className='text-text/60 dark:text-text/40'>Reviewed by: {remedy.reviewer}</span>
                  </div>
                )} */}
                {/* We don't have author in remedy data */}
              </div>
              {/* Hero Image */}
              <div className='mt-6'>
                <Image
                  src={`/hero-remedy-${remedyId}.jpg`} // Placeholder
                  alt={`${remedy.name} hero image`}
                  width={1200}
                  height={630}
                  className='rounded-xl object-cover shadow-lg'
                  placeholder='blur'
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
                />
              </div>
            </div>

            {/* Table of Contents - Mobile Toggle and Desktop Sidebar */}
            <div className='mb-8'>
              {/* Mobile TOC Button */}
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className='w-full flex justify-between items-center px-4 py-3 text-left text-text/80 dark:text-text/200 bg-surface/50 dark:bg-surface-dark/50 rounded-lg border border-border/50 dark:border-border-dark/50 hover:bg-surface/100 dark:hover:bg-surface-dark/100 lg:hidden'
              >
                <div className='flex items-center space-x-3'>
                  <h3 className='text-lg font-semibold text-text/90 dark:text-text'>
                    In this article
                  </h3>
                  {isTocOpen ? (
                    <svg className='h-4 w-4 text-text/60 dark:text-text/40' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M6 9l6 6 6-6' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  ) : (
                    <svg className='h-4 w-4 text-text/60 dark:text-text/40' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M18 15l-6-6-6 6' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  )}
                </div>
              </button>

              {/* Mobile TOC Dropdown */}
              {isTocOpen && (
                <div className='mt-2 w-full max-w-md px-4 py-3 bg-surface/80 dark:bg-surface-dark/80 rounded-lg border border-border/50 dark:border-border-dark/50'>
                  <nav className='space-y-2 text-sm'>
                    {sections.map((section) => (
                      <Link
                        key={section.id}
                        href={`#${section.id}`}
                        className='block px-3 py-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20'
                      >
                        {section.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}

              {/* Desktop TOC Sidebar */}
              <aside className='hidden lg:block lg:w-64 lg:pr-8 lg:mb-0 lg:sticky lg:top-16'>
                <h3 className='mb-3 text-lg font-semibold text-text/80 dark:text-text/200'>
                  In this article
                </h3>
                <nav className='space-y-2 text-sm'>
                  {sections.map((section) => (
                    <Link
                      key={section.id}
                      href={`#${section.id}`}
                      className='block px-3 py-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20'
                    >
                      {section.title}
                    </Link>
                  ))}
                </nav>
              </aside>
            </div>

            {/* Main Content */}
            <div className='prose lg:prose-xl dark:prose-invert'>
              {/* Purpose & Benefits */}
              {remedy.purpose && (
                <section id='purpose'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Purpose & Benefits
                  </h2>
                  <p className='mb-6 leading-relaxed text-text/70 dark:text-text/300'>
                    {remedy.purpose}
                  </p>
                </section>
              )}

              {/* Ingredients */}
              {remedy.ingredients.length > 0 && (
                <section id='ingredients'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Ingredients
                  </h2>
                  <div className='space-y-4'>
                    {remedy.ingredients.map((ing, index) => (
                      <div key={`${remedy.id}-ingredient-${index}`} className='flex items-start'>
                        <span className='flex-shrink-0'>•</span>
                        <span className='ml-3'>{ing.item}{ing.quantity ? ` — ${ing.quantity}` : ''}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Preparation Method */}
              {remedy.preparation && (
                <section id='preparation'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Preparation Method
                  </h2>
                  <p className='mb-6 leading-relaxed text-text/70 dark:text-text/300'>
                    {remedy.preparation}
                  </p>
                </section>
              )}

              {/* How to Use */}
              {remedy.howToUse && (
                <section id='how-to-use'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    How to Use
                  </h2>
                  <p className='mb-6 leading-relaxed text-text/70 dark:text-text/300'>
                    {remedy.howToUse}
                  </p>
                </section>
              )}

              {/* Usage Guidelines */}
              {(remedy.timing || remedy.frequency || remedy.duration) && (
                <section id='usage-guidelines'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Usage Guidelines
                  </h2>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    {remedy.timing && (
                      <div>
                        <h3 className='mb-1 text-sm font-medium text-text/60 dark:text-text/40'>
                          Timing
                        </h3>
                        <p className='text-text/70 dark:text-text/300'>
                          {remedy.timing}
                        </p>
                      </div>
                    )}
                    {remedy.frequency && (
                      <div>
                        <h3 className='mb-1 text-sm font-medium text-text/60 dark:text-text/40'>
                          Frequency
                        </h3>
                        <p className='text-text/70 dark:text-text/300'>
                          {remedy.frequency}
                        </p>
                      </div>
                    )}
                    {remedy.duration && (
                      <div>
                        <h3 className='mb-1 text-sm font-medium text-text/60 dark:text-text/40'>
                          Duration
                        </h3>
                        <p className='text-text/70 dark:text-text/300'>
                          {remedy.duration}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Precautions */}
              {remedy.precautions.length > 0 && (
                <section id='precautions'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Precautions
                  </h2>
                  <ul className='mb-6 space-y-2 list-disc list-inside text-text/70 dark:text-text/300'>
                    {remedy.precautions.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>
                </section>
              )}
              {remedy.whoShouldAvoid.length > 0 && (
                <div className='mt-6 rounded-lg border border-primary/20 bg-primary/5 dark:border-primary/10 dark:bg-primary/10'>
                  <h3 className='mb-2 text-lg font-semibold text-text/80 dark:text-text/200'>
                    Who Should Avoid
                  </h3>
                  <ul className='space-y-1 list-disc list-inside text-text/70 dark:text-text/300'>
                    {remedy.whoShouldAvoid.map((person, index) => (
                      <li key={index}>{person}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}