
export function DatePicker() {
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

  return (
    <div className="flex">
      <select>
        {/* List all years since 2007 */}
        {Array.from({ length: 14 }, (_, i) => i + 2007).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select>
        {/* List all months */}
        {months.map((month, i) => (
          <option key={month} value={i + 1}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}