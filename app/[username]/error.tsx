'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='text-center mt-24'>
      <p className='text-3xl font-bold'>Something went wrong.</p>
      <p>{error.message}</p>
      <button onClick={reset} className='primary-button w-36 mt-4'>Try again</button>
    </div>
  );
}