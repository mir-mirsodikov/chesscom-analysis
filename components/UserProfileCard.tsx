import { UserInfo } from '@/model';
import ProfileImage from './ProfileImage';

export function UserProfileCard({
  avatar,
  name,
  username,
}: UserInfo) {
  return (
    <div className="bg-slate-600 rounded-md p-4 w-1/2 m-auto flex my-10">
      <ProfileImage src={avatar} />
      <div className='ml-4 flex flex-col justify-center'>
        <h1 className="text-2xl font-bold text-white">{username}</h1>
        <h1 className="text-xl font-bold text-gray-300">{name}</h1>
      </div>
    </div>
  );
}