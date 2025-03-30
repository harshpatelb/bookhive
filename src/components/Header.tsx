import { useRouter } from 'next/router';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full border-b border-slate-700 bg-slate-900">
      <div className="flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="cursor-pointer flex items-center space-x-3" onClick={() => router.push("/")}>
          <Logo />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Library Management System</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Support</a>
          </nav>
          
          <Button size="sm" variant="outline" className="hidden sm:flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;