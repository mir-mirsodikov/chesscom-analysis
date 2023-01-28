import { UserInfo } from '@/model';
import ProfileImage from './ProfileImage';

export function UserProfileCard({
  avatar,
  name,
  username,
}: UserInfo) {
  return (
    <div className="flex flex-col items-center">
      <ProfileImage src={avatar} />
      <h1 className="text-2xl font-bold">{name}</h1>
      <h2 className="text-xl font-bold text-gray-500">{username}</h2>
    </div>
  );
}