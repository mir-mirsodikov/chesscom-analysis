export function LoadingGameList() {
  return (
    <div className="animate-pulse bg-slate-300 w-2/3 m-auto mt-12">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="p-4 space-y-1">
            <div className="bg-slate-700 h-2 w-full animate-pulse rounded"></div>
            <div className="bg-slate-700 h-2 w-1/2 animate-pulse rounded"></div>
          </div>
        ))}
    </div>
  );
}
