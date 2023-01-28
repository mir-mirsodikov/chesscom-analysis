import ProfileImage from './ProfileImage';

interface UserProfileCardProps {
  avatar: string;
  name: string;
  username: string;
}

export function UserProfileCard({
  avatar,
  name,
  username,
}: UserProfileCardProps) {
  return (
    <div className="flex flex-col items-center">
      <ProfileImage src={avatar} />
      <h1 className="text-2xl font-bold">{name}</h1>
      <h2 className="text-xl font-bold text-gray-500">{username}</h2>
    </div>
  );
}