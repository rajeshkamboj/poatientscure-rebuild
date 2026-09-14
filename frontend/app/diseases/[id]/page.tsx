'use client';

import { dataService } from '@/lib/dataService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { HeartIcon as Leaf, ShieldCheckIcon as ShieldCheck, ClockIcon as Clock, UserIcon as User } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

export default function DiseasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [diseaseId, setDiseaseId] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const { id } = await params;
        setDiseaseId(id);
        const diseaseData = await dataService.getDiseaseById(id);

        if (!cancelled) {
          if (!diseaseData) {
            setError('Disease not found');
          } else {
            setDisease(diseaseData);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to fetch disease data');
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

  // Handle case where disease data is null (not found)
  if (!disease) {
    notFound();
  }

  // Disease is guaranteed to be non-null here due to the checks above
  const diseaseData = disease;

  // Define sections for table of contents
  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'ayurvedic-perspective', title: 'Ayurvedic Perspective' },
    { id: 'symptoms', title: 'Common Symptoms' },
    { id: 'causes', title: 'Possible Causes' },
    { id: 'diet-lifestyle', title: 'Diet & Lifestyle Recommendations' },
    { id: 'precautions', title: 'Precautions' },
    { id: 'remedies', title: 'Traditional Home Remedies' },
    { id: 'faq', title: 'Frequently Asked Questions' },
    { id: 'references', title: 'References & Sources' },
    { id: 'related', title: 'Related Content' },
  ].filter(section => {
    // Filter out sections that don't have content
    switch (section.id) {
      case 'overview': return !!diseaseData.summary;
      case 'ayurvedic-perspective': return !!diseaseData.ayurvedicPerspective;
      case 'symptoms': return diseaseData.symptoms.length > 0;
      case 'causes': return diseaseData.causes.length > 0;
      case 'diet-lifestyle': return diseaseData.diet.length > 0 || diseaseData.lifestyle.length > 0;
      case 'precautions': return diseaseData.precautions.length > 0;
      case 'remedies': return diseaseData.desiNuskhe.length > 0;
      case 'faq': return diseaseData.faq.length > 0;
      case 'references': return diseaseData.references.length > 0;
      case 'related': return diseaseData.relatedRemedies.length > 0 || diseaseData.relatedIngredients.length > 0 || diseaseData.relatedDiseases.length > 0;
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
              <span className='font-medium text-text/80 dark:text-text/200'>{disease.name}</span>
            </nav>

            {/* Title Area with Hero Image */}
            <div className='mb-8'>
              <h1 className='mb-2 text-4xl font-bold text-text/90 dark:text-text'>
                {disease.name}
              </h1>
              {disease.commonNames.length > 0 && (
                <p className='text-sm italic text-text/60 dark:text-text/40'>
                  Also known as: {disease.commonNames.join(', ')}
                </p>
              )}
              {/* Trust Signals */}
              <div className='mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-x-3 sm:space-x-6 space-y-3 sm:space-y-0'>
                <div className='flex items-center space-x-3'>
                  <Clock className='h-4 w-4 text-accent/80' />
                  <span className='text-text/60 dark:text-text/40'>Last updated: {disease.lastUpdated}</span>
                </div>
                {disease.reviewer && (
                  <div className='flex items-center space-x-3'>
                    <ShieldCheck className='h-4 w-4 text-accent/80' />
                    <span className='text-text/60 dark:text-text/40'>Reviewed by: {disease.reviewer}</span>
                  </div>
                )}
                {disease.author && (
                  <div className='flex items-center space-x-3'>
                    <User className='h-4 w-4 text-accent/80' />
                    <span className='text-text/60 dark:text-text/40'>By: {disease.author}</span>
                  </div>
                )}
              </div>
              {/* Hero Image */}
              <div className='mt-6'>
                <Image
                  src={`/hero-disease-${diseaseId}.jpg`} // Placeholder - replace with actual image from WP
                  alt={`${disease.name} hero image`}
                  width={1200}
                  height={630}
                  className='rounded-xl object-cover shadow-lg'
                  placeholder='blur'
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' // transparent 1px blur placeholder
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
              {/* Overview */}
              {disease.summary && (
                <section id='overview'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Overview
                  </h2>
                  <p className='mb-6 leading-relaxed text-text/70 dark:text-text/300'>
                    {disease.summary}
                  </p>
                </section>
              )}

              {/* Ayurvedic Perspective */}
              {disease.ayurvedicPerspective && (
                <section id='ayurvedic-perspective'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Ayurvedic Perspective
                  </h2>
                  <p className='mb-6 leading-relaxed text-text/70 dark:text-text/300'>
                    {disease.ayurvedicPerspective}
                  </p>
                </section>
              )}

              {/* Common Symptoms */}
              {disease.symptoms.length > 0 && (
                <section id='symptoms'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Common Symptoms
                  </h2>
                  <ul className='mb-6 space-y-2 list-disc list-inside text-text/70 dark:text-text/300'>
                    {disease.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Possible Causes */}
              {disease.causes.length > 0 && (
                <section id='causes'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Possible Causes
                  </h2>
                  <ul className='mb-6 space-y-2 list-disc list-inside text-text/70 dark:text-text/300'>
                    {disease.causes.map((cause, index) => (
                      <li key={index}>{cause}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Diet & Lifestyle Recommendations */}
              {(disease.diet.length > 0 || disease.lifestyle.length > 0) && (
                <section id='diet-lifestyle'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Diet & Lifestyle Recommendations
                  </h2>
                  <div className='grid gap-6 sm:grid-cols-2'>
                    {disease.diet.length > 0 && (
                      <div>
                        <h3 className='mb-3 text-lg font-semibold text-text/80 dark:text-text/200'>
                          Dietary Guidelines
                        </h3>
                        <ul className='mb-4 space-y-1 list-disc list-inside text-text/70 dark:text-text/300'>
                          {disease.diet.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {disease.lifestyle.length > 0 && (
                      <div>
                        <h3 className='mb-3 text-lg font-semibold text-text/80 dark:text-text/200'>
                          Lifestyle Recommendations
                        </h3>
                        <ul className='mb-4 space-y-1 list-disc list-inside text-text/70 dark:text-text/300'>
                          {disease.lifestyle.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Precautions */}
              {disease.precautions.length > 0 && (
                <section id='precautions'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Precautions
                  </h2>
                  <ul className='mb-6 space-y-2 list-disc list-inside text-text/70 dark:text-text/300'>
                    {disease.precautions.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>
                </section>
              )}
              {disease.whenToSeekMedicalCare && (
                <div className='mt-6 rounded-lg border border-primary/20 bg-primary/5 dark:border-primary/10 dark:bg-primary/10'>
                  <h3 className='mb-2 text-lg font-semibold text-text/80 dark:text-text/200'>
                    When to Seek Medical Care
                  </h3>
                  <p className='text-text/70 dark:text-text/300'>
                    {disease.whenToSeekMedicalCare}
                  </p>
                </div>
              )}

              {/* Traditional Home Remedies */}
              {disease.desiNuskhe.length > 0 && (
                <section id='remedies'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Traditional Home Remedies
                  </h2>
                  <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {disease.desiNuskhe.map((remedy) => (
                      <Link key={remedy.id} href={`/remedies/${remedy.id}`} className='group block'>
                        <div className='cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-surface-dark border border-border/50 dark:border-border-dark/50 hover:shadow-md transition-all duration-300'>
                          <div className='aspect-w-4 aspect-h-3'>
                            <Image
                              src={`/placeholder-remedy-${remedy.id}.jpg`}
                              alt={remedy.name}
                              fill
                              className='object-cover'
                            />
                          </div>
                          <div className='p-4'>
                            <h3 className='mb-2 text-lg font-semibold text-text/90 dark:text-text'>
                              {remedy.name}
                            </h3>
                            <p className='text-text/60 dark:text-text/300 line-clamp-2'>
                              {remedy.purpose?.slice(0, 100)}...
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Frequently Asked Questions */}
              {disease.faq.length > 0 && (
                <section id='faq'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Frequently Asked Questions
                  </h2>
                  <div className='space-y-4'>
                    {disease.faq.map((faq, index) => (
                      <div key={index} className='border-b pb-4 last:border-b-0'>
                        <h3 className='mb-2 text-lg font-semibold text-text/90 dark:text-text'>
                          {faq.question}
                        </h3>
                        <p className='text-text/70 dark:text-text/300 leading-relaxed'>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* References & Sources */}
              {disease.references.length > 0 && (
                <section id='references'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    References & Sources
                  </h2>
                  <ol className='mb-6 space-y-2 list-decimal list-inside text-text/70 dark:text-text/300'>
                    {disease.references.map((ref, index) => (
                      <li key={index}>{ref}</li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Related Content */}
              {(disease.relatedRemedies.length > 0 || disease.relatedIngredients.length > 0 || disease.relatedDiseases.length > 0) && (
                <section id='related'>
                  <h2 className='mb-4 text-xl font-semibold text-text/90 dark:text-text'>
                    Related Content
                  </h2>
                  <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {/* Related Remedies */}
                    {disease.relatedRemedies.map((remedyId) => {
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
                    {/* Related Ingredients */}
                    {disease.relatedIngredients.map((ingredientId) => {
                      const ingredientName = `Related Ingredient ${ingredientId}`;
                      return (
                        <Link key={ingredientId} href={`/ingredients/${ingredientId}`} className='group block'>
                          <div className='cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-surface-dark border border-border/50 dark:border-border-dark/50 hover:shadow-md transition-all duration-300'>
                            <div className='aspect-w-4 aspect-h-3'>
                              <Image
                                src={`/placeholder-ingredient-${ingredientId}.jpg`}
                                alt={ingredientName}
                                fill
                                className='object-cover'
                              />
                            </div>
                            <div className='p-4'>
                              <p className='text-sm font-medium text-text/80 dark:text-text/200'>
                                {ingredientName}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    {/* Related Diseases */}
                    {disease.relatedDiseases.map((diseaseId) => {
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