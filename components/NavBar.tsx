import Link from 'next/link';
import { SearchBar } from './SearchBar';

export function NavBar() {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/about',
      name: 'About',
    },
  ];

  return (
    <div className="bg-slate-300 w-full h-16 rounded-b-md flex flex-col justify-center">
      <div className="flex justify-between">
        <ul className='space-x-4 ml-16'>
          {routes.map((route) => (
            <Link href={route.path} key={route.path} className='text-slate-800 text-xl font-medium'>
              {route.name}
            </Link>
          ))}
        </ul>
        <div className='mr-16'>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
