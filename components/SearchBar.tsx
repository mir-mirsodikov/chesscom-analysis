'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  return (
    <div className="rounded-md flex">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          const normalizedUsername = username.trim();
          if (!normalizedUsername) return;
          router.push(`/analyze?username=${encodeURIComponent(normalizedUsername)}`);
        }}
      >
        <input
          type="text"
          className="p-1 m-auto rounded-md mt-1 bg-slate-200 shadow-inner focus:outline"
          placeholder="Chess.com username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="primary-button ml-2 w-24 py-1" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
