import { SearchUser } from '@/components/SearchUser';

export default function Home() {
  return (
    <main>
      <SearchUser />
      <div className="lg:w-1/3 md:w-1/2 p-4 m-4 rounded-md md:m-auto md:mt-4 border border-gray-600">
        <p className="">
          This website connects Chess.com and ChessCompass to provide a free and
          convenient access to analyze your games. It does not store any data
          and does not require any registration. It is open source and you can
          find the code on
          <a
            href="https://github.com/mir-mirsodikov/chesscom-analysis"
            target={'_blank'}
            className="text-blue-500"
            rel="noreferrer"
          >
            {' '}
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  );
}
