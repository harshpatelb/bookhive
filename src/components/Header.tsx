import { useRouter } from 'next/router';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full border-b border-amber-500/20 bg-black">
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="cursor-pointer flex items-center space-x-3" onClick={() => router.push("/")}>
          <Logo />
        </div>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="/" 
              className={`text-sm font-medium ${router.pathname === '/' ? 'text-amber-400' : 'text-zinc-400 hover:text-amber-400'} transition-colors`}
            >
              Dashboard
            </a>
            <a 
              href="/architecture" 
              className={`text-sm font-medium ${router.pathname === '/architecture' ? 'text-amber-400' : 'text-zinc-400 hover:text-amber-400'} transition-colors`}
            >
              Architecture
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors"
            >
              Documentation
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors"
            >
              Support
            </a>
          </nav>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="hidden sm:flex border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
            onClick={() => alert('Login functionality would be implemented here')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;