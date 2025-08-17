import Link from 'next/link';
import AppMenuBar from '@/components/AppMenuBar';

const sample = {
    topicSlug: 'ai-labor',
    issueId: '101',
    motionId: '9001',
    postId: '1',
    forumId: '123',
    username: 'demo',
    solutionId: '42',
    debateId: '77',
};

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Routes Catalog</h1>
                <p className="mt-1 text-sm text-gray-600">Quick links to test pages with sample params on Vercel.</p>

                <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { href: '/', label: 'Home' },
                        { href: '/explore', label: 'Explore' },
                        { href: `/topics/${sample.topicSlug}`, label: 'Topic' },
                        { href: `/topics/${sample.topicSlug}/issues/${sample.issueId}`, label: 'Topic → Issue detail' },
                        { href: `/issues/${sample.issueId}`, label: 'Issue' },
                        { href: `/motions/${sample.motionId}`, label: 'Motion' },
                        { href: `/motions/${sample.motionId}/positions/1`, label: 'Position Room 1' },
                        { href: `/motions/${sample.motionId}/positions/3`, label: 'Position Room 3' },
                        { href: `/motions/${sample.motionId}/positions/5`, label: 'Position Room 5' },
                        { href: `/posts/${sample.postId}`, label: 'Post detail' },
                        { href: `/profile/${sample.username}`, label: 'Profile' },
                        { href: '/notifications', label: 'Notifications' },
                        { href: '/settings', label: 'Settings' },
                        { href: '/search', label: 'Search' },
                        { href: '/admin', label: 'Admin' },
                        { href: '/admin/moderation', label: 'Admin Moderation' },
                        { href: '/forums', label: 'Forums' },
                        { href: `/forums/${sample.forumId}`, label: 'Forum Thread' },
                        { href: '/dms', label: 'DMs' },
                        { href: '/onboarding', label: 'Onboarding' },
                        { href: '/topics/new', label: 'Create Topic' },
                        { href: '/issues/new', label: 'Create Issue' },
                        { href: '/motions/new', label: 'Create Motion' },
                        { href: '/solutions', label: 'Solutions' },
                        { href: `/solutions/${sample.solutionId}`, label: 'Solution detail' },
                        { href: '/solutions/new', label: 'Create Solution' },
                        { href: '/debates', label: 'Debates' },
                        { href: `/debates/${sample.debateId}`, label: 'Debate detail' },
                        { href: '/debates/new', label: 'Create Debate' },
                        { href: '/about', label: 'About' },
                        { href: '/privacy', label: 'Privacy' },
                    ].map((r) => (
                        <Link key={r.href} href={r.href} className="rounded-lg border bg-white p-4 text-sm hover:shadow-sm">
                            {r.label}
                            <div className="mt-1 text-xs text-gray-500">{r.href}</div>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
}


