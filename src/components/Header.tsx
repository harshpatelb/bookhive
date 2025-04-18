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
              href="/data-warehouse" 
              className={`text-sm font-medium ${router.pathname === '/data-warehouse' ? 'text-amber-400' : 'text-zinc-400 hover:text-amber-400'} transition-colors`}
            >
              Data Warehouse
            </a>
            <a 
              href="/etl-process" 
              className={`text-sm font-medium ${router.pathname === '/etl-process' ? 'text-amber-400' : 'text-zinc-400 hover:text-amber-400'} transition-colors`}
            >
              ETL Process
            </a>
            <a 
              href="/data-entry" 
              className={`text-sm font-medium ${router.pathname === '/data-entry' ? 'text-amber-400' : 'text-zinc-400 hover:text-amber-400'} transition-colors`}
            >
              Data Entry
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;