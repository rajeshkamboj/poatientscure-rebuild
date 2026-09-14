'use client';

import { dataService } from '@/lib/dataService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { HeartIcon as Leaf, ShieldCheckIcon as ShieldCheck, ClockIcon as Clock, UserIcon as User } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

export default function IngredientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [ingredientData, setIngredientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ingredientId, setIngredientId] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const { id } = await params;
        setIngredientId(id);
        const ingredientData = await dataService.getIngredientById(id);

        if (!cancelled) {
          if (!ingredientData) {
            setError('Ingredient not found');
          } else {
            setIngredientData(ingredientData);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to fetch ingredient data');
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

  // Handle case where ingredient data is null (not found)
  if (!ingredientData) {
    notFound();
  }

  // Ingredient is guaranteed to be non-null here due to the checks above
  const ingredient = ingredientData;

  // Define sections for table of contents
  const sections = [
    { id: 'description', title: 'Description' },
    { id: 'traditional-uses', title: 'Traditional Uses' },
    { id: 'preparation', title: 'Preparation Methods' },
    { id: 'precautions', title: 'Precautions' },
    { id: 'related', title: 'Related Remedies & Conditions' },
  ].filter(section => {
    // Filter out sections that don't have content
    switch (section.id) {
      case 'description': return !!ingredient.description;
      case 'traditional-uses': return ingredient.traditionalUses.length > 0;
      case 'preparation': return ingredient.preparation.length > 0;
      case 'precautions': return ingredient.precautions.length > 0;
      case 'related': return ingredient.relatedRemedies.length > 0 || ingredient.relatedDiseases.length > 0;
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
              <Link href='/ingredients' className='hover:text-text/70 dark:hover:text-text/300'>
                Ingredients
              </Link>
              <span className='mx-2'>/</span>
              <span className='font-medium text-text/80 dark:text-text/200'>{ingredient.name}</span>
            </nav>

            {/* Title Area with Trust Signals */}
            <div className='mb-8'>
              <h1 className='mb-2 text-4xl font-bold text-text/90 dark:text-text'>
                {ingredient.name}
              </h1>
              {ingredient.commonNames.length > 0 && (
                <p className='text-sm italic text-text/60 dark:text-text/40'>
                  Also known as: {ingredient.commonNames.join(', ')}
                </p>
              )}
              {ingredient.hindiName && (
                <p className='text-sm italic text-text/60 dark:text-text/40'>Hindi: {ingredient.hindiName}</p>
              )}
              {ingredient.punjabiName && (
                <p className='text-sm italic text-text/60 dark:text-text/40'>Punjabi: {ingredient.punjabiName}</p>
              )}
              {/* Trust Signals - using available data */}
              <div className='mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-x-3 sm:space-x-6 space-y-3 sm:space-y-0'>
                <div className='flex items-center space-x-3'>
                  <Clock className='h-4 w-4 text-accent/80' />
                  <span className='text-text/60 dark:text-text/40'>Last updated: September 10, 2026</span>
                </div>
                {/* We don't have reviewer in ingredient data, but we can show if available */}
                {/* {ingredient.reviewer && (
                  <div className='flex items-center space-x-3'>
                    <ShieldCheck className='h-4 w-4 text-accent/80' />
                    <span className='text-text/60 dark:text-text/40'>Reviewed by: {ingredient.reviewer}</span>
                  </div>
                )} */}
                {/* We don't have author in ingredient data */}
              </div>
              {/* Hero Image */}
              <div className='mt-6'>
                <Image
                  src={`/hero-ingredient-${ingredientId}.jpg`} // Placeholder
                  alt={`${ingredient.name} hero image`}
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
              {/* Description */}
              {ingredient.description && (
                <section id='description'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Description
                  </h2>
                  <p className='mb-6 leading-relaxed text-text/70 dark:text-text/300'>
                    {ingredient.description}
                  </p>
                </section>
              )}

              {/* Traditional Uses - styled as pills with icon */}
              {ingredient.traditionalUses.length > 0 && (
                <section id='traditional-uses'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Traditional Uses
                  </h2>
                  <div className='flex flex-wrap gap-2 mb-6'>
                    {ingredient.traditionalUses.map((use, index) => (
                      <span key={index} className='inline-flex items-center px-3 py-1.5 text-xs font-medium bg-primary/10 dark:bg-primary/20 rounded-full'>
                        <Leaf className='h-3 w-3 mr-1.5 text-primary/80' />
                        {use}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Preparation Methods */}
              {ingredient.preparation.length > 0 && (
                <section id='preparation'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Preparation Methods
                  </h2>
                  <ul className='mb-6 space-y-2 list-disc list-inside text-text/70 dark:text-text/300'>
                    {ingredient.preparation.map((method, index) => (
                      <li key={index}>{method}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Precautions */}
              {ingredient.precautions.length > 0 && (
                <section id='precautions'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Precautions
                  </h2>
                  <ul className='mb-6 space-y-2 list-disc list-inside text-text/70 dark:text-text/300'>
                    {ingredient.precautions.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Related Remedies & Conditions - Image Cards */}
              {(ingredient.relatedRemedies.length > 0 || ingredient.relatedDiseases.length > 0) && (
                <section id='related'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Related Remedies & Conditions
                  </h2>
                  <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {/* Related Remedies */}
                    {ingredient.relatedRemedies.map((remedyId) => {
                      const remedyName = `Related Remedy ${remedyId}`;
                      return (
                        <Link key={remedyId} href={`/remedies/${remedyId}`} className='group block'>
                          <div className='cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-surface-dark border border-border/50 dark:border-border-dark/50 hover:shadow-md transition-all duration-300'>
                            <div className='aspect-w-4 aspect-h-3'>
                              <Image
                                src={`/placeholder-remedy-${remedyId}.jpg`}
                                alt={remedyName}
                                fill
                                className='object-cover'
                              />
                            </div>
                            <div className='p-4'>
                              <p className='text-sm font-medium text-text/80 dark:text-text/200'>
                                {remedyName}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    {/* Related Diseases */}
                    {ingredient.relatedDiseases.map((diseaseId) => {
                      const diseaseName = `Related Disease ${diseaseId}`;
                      return (
                        <Link key={diseaseId} href={`/diseases/${diseaseId}`} className='group block'>
                          <div className='cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-surface-dark border border-border/50 dark:border-border-dark/50 hover:shadow-md transition-all duration-300'>
                            <div className='aspect-w-4 aspect-h-3'>
                              <Image
                                src={`/placeholder-disease-${diseaseId}.jpg`}
                                alt={diseaseName}
                                fill
                                className='object-cover'
                              />
                            </div>
                            <div className='p-4'>
                              <p className='text-sm font-medium text-text/80 dark:text-text/200'>
                                {diseaseName}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}