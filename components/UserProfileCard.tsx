import { UserInfo } from '@/model';
import { LaunchIcon } from './Icons';
import ProfileImage from './ProfileImage';

export function UserProfileCard({ avatar, name, username, url }: UserInfo) {
  return (
    <div className="bg-slate-300 rounded-md p-4 md:w-2/3 lg:w-1/2 mx-4 my-10 md:m-auto flex flex-col md:flex-row md:my-10">
      <div className="flex justify-center">
        <ProfileImage src={avatar} />
      </div>
      <div className="text-center md:text-left md:ml-4 flex flex-col justify-center">
        <div className="flex m-auto md:m-0">
          <h1 className="text-2xl font-bold text-slate-800">{username}</h1>
          <div className="flex flex-col justify-center ml-2">
            <a href={url} target="_blank" rel="noreferrer">
              <LaunchIcon />
            </a>
          </div>
        </div>
        <h1 className="text-xl font-bold text-gray-600">{name}</h1>
      </div>
    </div>
  );
}
