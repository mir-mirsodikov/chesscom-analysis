'use client';

import { DatePicker } from '@/components/DatePicker';
import { GameList } from '@/components/GameList';
import { LoadingGameList } from '@/components/Loading/LoadingGameList';
import { LoadingProfileCard } from '@/components/Loading/LoadingProfileCard';
import { UserProfileCard } from '@/components/UserProfileCard';
import { UserInfo } from '@/model';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

function parseNumber(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export function AnalyzePageClient() {
  const searchParams = useSearchParams();
  const username = searchParams?.get('username')?.trim() ?? '';
  const year = parseNumber(searchParams?.get('year') ?? null, new Date().getFullYear());
  const month = parseNumber(searchParams?.get('month') ?? null, new Date().getMonth() + 1);

  const [data, setData] = useState<UserInfo | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    if (!username) {
      setData(null);
      setIsLoadingProfile(false);
      return () => {
        isCancelled = true;
      };
    }

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

  if (!username) {
    return (
      <main>
        <p className="text-center font-bold text-gray-200 p-8">
          Enter a username using /analyze?username=your-name
        </p>
      </main>
    );
  }

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
