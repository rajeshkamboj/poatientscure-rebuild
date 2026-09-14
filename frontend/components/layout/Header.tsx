'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('q') as string;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className={`header-fixed ${isScrolled ? 'border-b border-border/20 dark:border-border-dark/20' : ''}`}>
      <div className='container'>
        <div className='flex flex-wrap items-center justify-between h-14'>
          {/* Logo */}
          <div className='flex items-center space-x-3'>
            <Link href='/' className='flex items-center space-x-2'>
              {/* Logo icon - we can use a simple leaf or abstract mark */}
              <div className='w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center'>
                <svg className='h-5 w-5 text-primary' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0-2 2z'></path>
                  <path d='M12 7V4a5 5 0 0 1 5-5h2a2 2 0 0 1 2 2v1.5a7 7 0 0 0-11 0V6a2 2 0 0 1 2-2h2a5 5 0 0 1 5 5z'></path>
                </svg>
              </div>
              <span className='text-xl font-bold text-primary dark:text-primary'>
                PatientScure
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block flex items-baseline space-x-6'>
            <Link
              href='/'
              className='px-3 py-2 rounded-md text-sm font-medium text-text/70 hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus-ring-offset-2 focus-ring-primary dark:hover:text-primary-dark dark:hover:bg-primary-dark/20'
            >
              Home
            </Link>
            <Link
              href='/diseases'
              className='px-3 py-2 rounded-md text-sm font-medium text-text/70 hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus-ring-offset-2 focus-ring-primary dark:hover:text-primary-dark dark:hover:bg-primary-dark/20'
            >
              Diseases
            </Link>
            <Link
              href='/remedies'
              className='px-3 py-2 rounded-md text-sm font-medium text-text/70 hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus-ring-offset-2 focus-ring-primary dark:hover:text-primary-dark dark:hover:bg-primary-dark/20'
            >
              Remedies
            </Link>
            <Link
              href='/ingredients'
              className='px-3 py-2 rounded-md text-sm font-medium text-text/70 hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus-ring-offset-2 focus-ring-primary dark:hover:text-primary-dark dark:hover:bg-primary-dark/20'
            >
              Ingredients
            </Link>
          </div>

          {/* Desktop Search and Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            {/* Search Form */}
            <form onSubmit={handleSearch} className='relative w-64'>
              <input
                name='q'
                type='text'
                placeholder='Search for health topics...'
                className='block w-full rounded-xl border-0 px-8 py-3 text-text/90 placeholder:text-text/50 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background dark:bg-surface-dark dark:border-surface-dark/50 dark:text-text dark:placeholder-text-text/40'
              />
              <button
                type='submit'
                className='absolute inset-y-0 right-0 flex items-center px-3 text-primary/80 hover:text-primary'
              >
                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <circle cx='11' cy='11' r='8' stroke='currentColor' strokeWidth='2'></circle>
                  <path d='m21 21-4.35-4.35'></path>
                </svg>
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className='flex items-center md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='p-2 rounded-md text-text/60 hover:text-primary hover:bg-primary/10'
            >
              {/* Menu icon */}
              <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M4 6h16M4 12h16M4 18h16'></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (hidden by default) */}
        <div className={isOpen ? 'md:hidden block' : 'md:hidden hidden'}>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <Link
              href='/'
              className='block px-3 py-2 rounded-md text-base font-medium text-text/70 hover:text-primary hover:bg-primary/10'
            >
              Home
            </Link>
            <Link
              href='/diseases'
              className='block px-3 py-2 rounded-md text-base font-medium text-text/70 hover:text-primary hover:bg-primary/10'
            >
              Diseases
            </Link>
            <Link
              href='/remedies'
              className='block px-3 py-2 rounded-md text-base font-medium text-text/70 hover:text-primary hover:bg-primary/10'
            >
              Remedies
            </Link>
            <Link
              href='/ingredients'
              className='block px-3 py-2 rounded-md text-base font-medium text-text/70 hover:text-primary hover:bg-primary/10'
            >
              Ingredients
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}