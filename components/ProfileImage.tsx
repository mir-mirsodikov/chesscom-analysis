'use client';
import Image from 'next/image';

export default function ProfileImage({src}: {src: string}) {
  return (
    <Image alt="woop" src={src} width={200} height={200}/>
  )
}