import { DatePicker } from '@/components/DatePicker';
import { GameList } from '@/components/GameList';
import { LoadingGameList } from '@/components/Loading/LoadingGameList';
import { LoadingProfileCard } from '@/components/Loading/ProfileCard';
import { UserProfileCard } from '@/components/UserProfileCard';
import { UserInfo } from '@/model';
import profilePic from '@/public/profile.jpg';
import { Suspense } from 'react';
import Loading from './loading';

async function getUserInfo(username: string): Promise<UserInfo> {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`An error has occurred: ${res.status}`);
  }

  return (await res.json()) as Promise<UserInfo>;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    username: string;
  };
  searchParams?: {
    year: string;
    month: string;
  },
}) {
  const year = searchParams?.year ? parseInt(searchParams.year) : new Date().getFullYear();
  const month = searchParams?.month ? parseInt(searchParams.month) : new Date().getMonth() + 1;

  const data = await getUserInfo(params.username);

  return (
    <main>
      <Suspense fallback={<LoadingProfileCard />}>
        <UserProfileCard
          {...{
            avatar: data.avatar,
            name: data.name,
            username: params.username,
            last_online: data.last_online,
          }}
        />
      </Suspense>
      <div className='m-auto w-2/3'>
        <DatePicker {...{
          year,
          month,
          username: params.username
        }} />
      </div>
      <Suspense fallback={<LoadingGameList />}>
        {/* @ts-expect-error React Server Component */}
        <GameList {...{
          username: params.username,
          year,
          month,
        }} />
      </Suspense>
    </main>
  );
}
