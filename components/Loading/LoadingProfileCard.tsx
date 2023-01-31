export function LoadingProfileCard() {
  return (
    <div className="animate-pulse bg-slate-300 rounded-md p-4 w-1/2 m-auto flex my-10">
      <div className="bg-slate-700 w-[200px] h-[200px] p-4 animate-pulse"></div>
      <div className='ml-4 flex flex-col justify-center space-y-2'>
        <div className="bg-slate-700 h-4 w-32 rounded"></div>
        <div className="bg-slate-700 h-4 w-32 rounded"></div>
      </div>
    </div>
  );
}
