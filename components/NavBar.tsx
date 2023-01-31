import { SearchBar } from './SearchBar';

export function NavBar() {
  return (
    <div className="bg-slate-300 w-full h-16 rounded-b-md flex flex-col justify-center">
      <div className="md:mr-16 flex flex-row-reverse justify-center md:justify-start">
        <SearchBar />
      </div>
    </div>
  );
}
