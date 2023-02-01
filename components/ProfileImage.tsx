import Image from 'next/image';

export default function ProfileImage({src}: {src: string}) {
  return (
    <Image alt="Chess.com profile image" src={src} width={175} height={175}/>
  )
}