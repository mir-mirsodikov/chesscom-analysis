'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchUser() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  return (
    <div className="lg:w-1/3 md:w-1/2 p-4 m-4 mt-16 bg-slate-300 rounded-md md:m-auto md:mt-36">
      <h1 className="text-3xl">Find user</h1>

      <div className="mt-4">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            const normalizedUsername = username.trim();
            if (!normalizedUsername) return;
            router.push(`/analyze?username=${encodeURIComponent(normalizedUsername)}`);
          }}
        >
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type={'text'}
            className="w-full p-2 m-auto rounded-md mt-1 bg-slate-200 shadow-inner focus:outline "
            placeholder="Chess.com username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-slate-600 hover:bg-slate-500 w-full mt-4 p-2 text-white rounded-md shadow-lg"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
