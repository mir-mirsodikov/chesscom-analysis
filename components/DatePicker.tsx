'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DatePickerProps {
  year: number;
  month: number;
  username: string;
}

export function DatePicker({
  year: inputYear,
  month: inputMonth,
  username,
}: DatePickerProps) {
  const [year, setYear] = useState(inputYear);
  const [month, setMonth] = useState(inputMonth);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const router = useRouter();

  return (
    <div className="flex">
      <div className='bg-slate-500 p-2 rounded-md'>
        <select
          className="bg-slate-500 text-slate-100 focus:outline-none"
          onChange={(e) => {
            setYear(parseInt(e.target.value));
          }}
          value={year}
        >
          {/* List all years since 2007 */}
          {Array.from(
            { length: new Date().getFullYear() - 2007 + 1 },
            (_, i) => i + 2007,
          )
            .reverse()
            .map((_year) => (
              <option
                key={_year}
                value={_year}
                defaultValue={inputYear.toString()}
              >
                {_year}
              </option>
            ))}
        </select>
      </div>
      <div className='bg-slate-500 p-2 ml-4 rounded-md'>
        <select
          className='bg-slate-500 text-slate-100 focus:outline-none'
          onChange={(e) => {
            setMonth(parseInt(e.target.value));
          }}
          value={month}
        >
          {/* List all months */}
          {months.map((_month, i) => (
            <option
              key={_month}
              value={i + 1}
              defaultValue={months[inputMonth - 1]}
            >
              {_month}
            </option>
          ))}
        </select>
      </div>
      {/* <Link href={`/${username}?year=${year}&month=${month}`}> */}
        <button onClick={() => {
          router.push(`/${username}?year=${year}&month=${month}`);
        }} className="primary-button w-32 ml-4">Go</button>
      {/* </Link> */}
    </div>
  );
}
