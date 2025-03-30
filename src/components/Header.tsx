import { useRouter } from 'next/router';
import Logo from './Logo';

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full border-b">
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="cursor-pointer flex items-center space-x-3" onClick={() => router.push("/")}>
          <Logo />
          <h1 className="text-xl font-bold">Library Management System</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;