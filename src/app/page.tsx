import TopNav from '@/components/TopNav';
import Sidebar from '@/components/Sidebar';
import Composer from '@/components/Composer';
import PostCard from '@/components/PostCard';
import RightRail from '@/components/RightRail';

type Post = {
  id: string;
  author: { name: string; handle: string; avatarUrl?: string };
  minutesAgo: number;
  text: string;
  evidenceCount?: number;
};

const posts: Post[] = [
  {
    id: '1',
    author: { name: 'Tanual', handle: 'tanu' },
    minutesAgo: 2,
    text: 'New proposals to decrease insecting renewable energy policy efficacy…',
    evidenceCount: 3,
  },
  {
    id: '2',
    author: { name: 'Ethel', handle: 'ethe' },
    minutesAgo: 9,
    text: 'Support carbon pricing to develop economic impacts on agriculture.',
  },
  {
    id: '3',
    author: { name: 'Enoel', handle: 'enl' },
    minutesAgo: 21,
    text: 'Explore some static revenue through a circular reform.',
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <Sidebar />
        <section className="lg:col-span-8 xl:col-span-7 space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-6 text-sm">
            <button className="border-b-2 border-transparent pb-2 text-gray-900 hover:border-gray-300">For you</button>
            <button className="border-b-2 border-transparent pb-2 text-gray-600 hover:border-gray-300">Following</button>
            <button className="border-b-2 border-transparent pb-2 text-gray-600 hover:border-gray-300">Latest</button>
          </div>

          {/* Composer */}
          <Composer />

          {/* Feed */}
          <div className="space-y-4">
            {posts.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        </section>

        <RightRail />
      </main>
    </div>
  );
}
