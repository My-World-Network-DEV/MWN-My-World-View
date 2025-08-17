import { NextResponse } from 'next/server';

export async function GET() {
  const posts = [
    { id: '1', author: { name: 'Tanual', handle: 'tanu' }, minutesAgo: 2, text: 'New proposals to decrease insecting renewable energy policy efficacy—counterfactuals suggest a 3–5y lag unless permitting is streamlined.', evidenceCount: 3 },
    { id: '2', author: { name: 'Ethel', handle: 'ethe' }, minutesAgo: 9, text: 'Support carbon pricing to develop economic impact buffers on agriculture. Suggest pairing with soil credits.' },
    { id: '3', author: { name: 'Enoel', handle: 'enl' }, minutesAgo: 21, text: 'Explore a steady revenue line through a circular reform—shift e-waste levies to upstream manufacturers.', evidenceCount: 1 },
  ];
  const trending = [
    { title: 'AI is essential for …', counts: { for: 62, against: 28, abstain: 10 }, total: 1204 },
    { title: 'Ban plastic bags in …', counts: { for: 54, against: 36, abstain: 10 }, total: 987 },
    { title: 'Universal basic income …', counts: { for: 39, against: 48, abstain: 13 }, total: 654 },
  ];
  const suggestedTopics = [
    { title: 'Artificial intelligence' },
    { title: 'Renewable energy' },
    { title: 'Freedom of speech' },
    { title: 'Climate policy' },
    { title: 'Urban planning' },
    { title: 'Healthcare' },
  ];
  const activeIssues = [
    { title: 'Regulate AI alignment', motionCount: 4 },
    { title: 'Plastic waste export bans', motionCount: 3 },
    { title: 'Cashless society risks', motionCount: 5 },
  ];
  return NextResponse.json({ posts, trending, suggestedTopics, activeIssues });
}


