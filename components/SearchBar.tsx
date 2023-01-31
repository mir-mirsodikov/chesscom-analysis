'use client';
import Link from 'next/link';
import { useState } from 'react';

export function SearchBar() {
  const [username, setUsername] = useState('');

  return (
    <div className="rounded-md flex">
      <input
        type="text"
        className="p-1 m-auto rounded-md mt-1 bg-slate-200 shadow-inner focus:outline"
        placeholder="Chess.com username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Link href={`/${username}`}>
        <button className="primary-button ml-2 w-24 py-1">Search</button>
      </Link>
    </div>
  );
}
