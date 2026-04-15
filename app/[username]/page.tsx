'use client';

import { DatePicker } from '@/components/DatePicker';
import { GameList } from '@/components/GameList';
import { LoadingGameList } from '@/components/Loading/LoadingGameList';
import { LoadingProfileCard } from '@/components/Loading/LoadingProfileCard';
import { UserProfileCard } from '@/components/UserProfileCard';
import { UserInfo } from '@/model';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

async function getUserInfo(username: string): Promise<UserInfo> {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`);

  if (!res.ok) {
    throw new Error(`Unable to find user "${username}"`);
  }

  const userInfo = await res.json();

  return {
    avatar: userInfo.avatar,
    name: userInfo.name,
    last_online: userInfo.last_online,
    username: userInfo.url.split('/').pop() as string,
    url: userInfo.url,
  };
}

export default function Page() {
  const params = useParams<{ username: string }>();
  const searchParams = useSearchParams();
  const rawUsername = params?.username;
  const username = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername ?? '';

  const [data, setData] = useState<UserInfo | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const year = useMemo(() => {
    const value = searchParams?.get('year');
    return value ? parseInt(value) : new Date().getFullYear();
  }, [searchParams]);

  const month = useMemo(() => {
    const value = searchParams?.get('month');
    return value ? parseInt(value) : new Date().getMonth() + 1;
  }, [searchParams]);

  useEffect(() => {
    let isCancelled = false;

    const loadUser = async () => {
      setIsLoadingProfile(true);
      try {
        const user = await getUserInfo(username);
        if (!isCancelled) {
          setData(user);
        }
      } catch {
        if (!isCancelled) {
          setData(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingProfile(false);
        }
      }
    };

    loadUser();

    return () => {
      isCancelled = true;
    };
  }, [username]);

  return (
    <main>
      {isLoadingProfile && <LoadingProfileCard />}
      {!isLoadingProfile && data && (
        <UserProfileCard
          {...{
            avatar: data.avatar ?? null,
            name: data.name,
            username: data.username,
            last_online: data.last_online,
            url: data.url,
          }}
        />
      )}
      <div className="mx-2 md:m-auto md:w-2/3">
        <DatePicker
          {...{
            year,
            month,
            username,
          }}
        />
      </div>
      {isLoadingProfile ? (
        <LoadingGameList />
      ) : (
        <GameList
          {...{
            username: data?.username ?? username,
            year,
            month,
          }}
        />
      )}
    </main>
  );
}
