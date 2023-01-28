'use client';

import { useState } from 'react';

export function SearchUser() {
  const [username, setUsername] = useState('');


  return (
    <div className="w-1/4 p-4 bg-slate-300 rounded-md m-auto mt-36">
      <h1 className="text-3xl">Find user</h1>

      <div className="mt-4">
        <form action="">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type={'text'}
            className="w-full p-2 m-auto rounded-md mt-1 bg-slate-200 shadow-inner focus:outline "
            placeholder='Chess.com username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="bg-slate-600 hover:bg-slate-500 w-full mt-4 p-2 text-white rounded-md shadow-lg">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
