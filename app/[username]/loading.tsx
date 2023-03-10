import { LoadingGameList } from '@/components/Loading/LoadingGameList';
import { LoadingProfileCard } from '@/components/Loading/LoadingProfileCard';

export default function Loading() {
  return (
    <div>
      <LoadingProfileCard />
      <LoadingGameList />
    </div>
  );
}
