import { SearchUser } from '@/components/SearchUser';
import Link from 'next/link';


export default function Home() {
  return (
    <main>
      <SearchUser />
      <div className='lg:w-1/4 md:w-1/2 p-4 m-4 rounded-md md:m-auto md:mt-4 border border-gray-600'>
        <Link href={`/about`}>
          <p className='text-sky-500 hover:underline decoration-2 underline-offset-2'>What is this website?</p>
        </Link>
      </div>
    </main>
  );
}
