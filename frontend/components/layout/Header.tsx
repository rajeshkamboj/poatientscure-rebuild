import Link from 'next/link';

export default function Header() {
  return (
    <header className='header-fixed'>
      <div className='container'>
        <div className='flex flex-wrap items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center space-x-3'>
              <span className='text-xl font-bold text-primary dark:text-primary'>
                PatientScure
              </span>
            </Link>
          </div>
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
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
          </div>
          <div className='flex items-center md:hidden'>
            {/* Mobile menu button would go here */}
            <button className='p-2 rounded-md text-text/60 hover:text-primary hover:bg-primary/10'>
              {/* Menu icon */}
              <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M4 6h16M4 12h16M4 18h16'></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

