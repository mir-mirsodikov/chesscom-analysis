import { NavBar } from '@/components/NavBar'

export default function Page() {
  return (
    <main>
      <NavBar />
      <section className='ml-8 mt-8'>
        <h1 className='text-3xl'>About</h1>
        <p className='mt-4 w-1/2'>
          This website connects Chess.com and ChessCompass to provide a free and convenient access to analyze your games. 
          It does not store any data and does not require any registration. It is open source and you can find the code on 
          <a href="https://github.com/mir-mirsodikov/chesscom-analysis" className="text-blue-500"> GitHub</a>.
        </p>
      </section>
    </main>
  );
}
