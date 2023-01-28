import { SearchUser } from '@/components/SearchUser';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <SearchUser />
    </main>
  );
}
