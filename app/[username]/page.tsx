import { DatePicker } from '@/components/DatePicker';
import { GameList } from '@/components/GameList';
import { LoadingGameList } from '@/components/Loading/LoadingGameList';
import { LoadingProfileCard } from '@/components/Loading/LoadingProfileCard';
import { UserProfileCard } from '@/components/UserProfileCard';
import { UserInfo } from '@/model';
import { Suspense } from 'react';

async function getUserInfo(username: string): Promise<UserInfo> {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Unable to find user "${username}"`);
  }

  const userInfo = await res.json();

  return {
    avatar: userInfo.avatar,
    name: userInfo.name,
    last_online: userInfo.last_online,
    username: userInfo.url.split('/').pop() as string,
    url: userInfo.url
  }
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
  };
}) {
  const year = searchParams?.year
    ? parseInt(searchParams.year)
    : new Date().getFullYear();
  const month = searchParams?.month
    ? parseInt(searchParams.month)
    : new Date().getMonth() + 1;

  const data = await getUserInfo(params.username);

  return (
    <main>
      <Suspense fallback={<LoadingProfileCard />}>
        <UserProfileCard
          {...{
            avatar: data.avatar,
            name: data.name,
            username: data.username,
            last_online: data.last_online,
            url: data.url
          }}
        />
      </Suspense>
      <div className="mx-2 md:m-auto md:w-2/3">
        <DatePicker
          {...{
            year,
            month,
            username: params.username,
          }}
        />
      </div>
      <Suspense fallback={<LoadingGameList />}>
        {/* @ts-expect-error React Server Component */}
        <GameList
          {...{
            username: data.username,
            year,
            month,
          }}
        />
      </Suspense>
    </main>
  );
}
