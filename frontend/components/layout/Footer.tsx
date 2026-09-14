export default function Footer() {
  return (
    <footer className='bg-primary'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 py-12'>
          <div>
            <h3 className='mb-4 font-bold text-white'>
              PatientScure
            </h3>
            <p className='text-white'>
              Providing authentic Ayurvedic health information and traditional remedies.
            </p>
          </div>
          <div>
            <h4 className='mb-3 font-medium text-white'>Quick Links</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <a href='#' className='text-white/80 hover:text-accent transition-colors duration-200'>
                  About Us
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-accent transition-colors duration-200'>
                  Contact
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-accent transition-colors duration-200'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-accent transition-colors duration-200'>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-3 font-medium text-white'>Explore</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <a href='#' className='text-white/80 hover:text-accent transition-colors duration-200'>
                  Diseases
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-accent transition-colors duration-200'>
                  Remedies
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-accent transition-colors duration-200'>
                  Ingredients
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-accent transition-colors duration-200'>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-3 font-medium text-white'>Follow Us</h4>
            <div className='flex space-x-4'>
              <a href='#' className='text-white/80 hover:text-white transition-colors duration-200'>
                Facebook
              </a>
              <a href='#' className='text-white/80 hover:text-white transition-colors duration-200'>
                Twitter
              </a>
              <a href='#' className='text-white/80 hover:text-white transition-colors duration-200'>
                Instagram
              </a>
              <a href='#' className='text-white/80 hover:text-white transition-colors duration-200'>
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className='mt-8 pt-6 border-t border-primary/30 text-center text-sm text-white/80'>
          &copy; {new Date().getFullYear()} PatientScure. All rights reserved.
        </div>
      </div>
    </footer>
  );
}