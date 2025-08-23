# MWV Pages and Components — UI/UX Development Status

## Pages

- **Home (`src/app/page.tsx`)**: Implemented. Uses `AppMenuBar`, `HeaderHero`, `FeedTabs`, `Composer`, lists posts with `PostCard`.
- **Explore (`src/app/explore/page.tsx`)**: Implemented. Grid lists for Topics/Issues, basic filters, consistent header.
- **Topics (slug) (`src/app/topics/[slug]/page.tsx`)**: Implemented. Topic header, issue list. Consistent header.
- **Topics → Issue (`src/app/topics/[slug]/issues/[issueId]/page.tsx`)**: Implemented. Breadcrumbs, issue card, related motions, `EvidencePanel` added.
- **Issues (id) (`src/app/issues/[id]/page.tsx`)**: Implemented. Issue header, motions list, `EvidencePanel`, forum open button.
- **Issues/New (`src/aap/issues/new/page.tsx`)**: Implemented (simple). Uses `CreateWizard` skeleton.
- **Motions (id) (`src/app/motions/[motionId]/page.tsx`)**: Implemented. Census (`MotionCensusRealtime`), `StanceSelector`, Actions with Forum button.
- **Motions/New (`src/app/motions/new/page.tsx`)**: Implemented (simple). Uses `CreateWizard` skeleton.
- **Positions/New (`src/app/positions/new/page.tsx`)**: Implemented (simple). `StanceSelector` UI.
- **Position Forum (`src/app/positions/[positionId]/forum/page.tsx`)**: Implemented (basic). `ForumThread`, `PresencePill`.
- **Debates (list) (`src/app/debates/page.tsx`)**: Implemented (basic). List shell.
- **Debates (id) (`src/app/debates/[debateId]/page.tsx`)**: Implemented (basic). Canvas placeholder.
- **Debates/New (`src/app/debates/new/page.tsx`)**: Implemented (simple). `CreateWizard` skeleton.
- **Solutions (list) (`src/app/solutions/page.tsx`)**: Implemented (basic). Renders `SolutionCard`.
- **Solutions (id) (`src/app/solutions/[solutionId]/page.tsx`)**: Implemented (basic). Solution detail shell.
- **Solutions/New (`src/app/solutions/new/page.tsx`)**: Implemented (simple). `CreateWizard` skeleton.
- **Forums (list) (`src/app/forums/page.tsx`)**: Implemented (basic). Mock list; consistent header.
- **Forum (id) (`src/app/forums/[forumId]/page.tsx`)**: Implemented. `ProposalForm` (POST → `/api/proposals`), `ProposalList` + `VoteWidget`, `ForumThread`, `PresencePill`.
- **Topic Forum (`src/app/topics/[slug]/forum/page.tsx`)**: Implemented. `ForumThread` + presence.
- **Issue Forum (`src/app/issues/[id]/forum/page.tsx`)**: Implemented. `ForumThread` + presence.
- **Motion Forum (`src/app/motions/[motionId]/forum/page.tsx`)**: Implemented. `ForumThread` + presence.
- **Debate Forum (`src/app/debates/[debateId]/forum/page.tsx`)**: Implemented. `ForumThread` + presence.
- **Solution Forum (`src/app/solutions/[solutionId]/forum/page.tsx`)**: Implemented. `ForumThread` + presence.
- **DMs (list) (`src/app/dms/page.tsx`)**: Implemented (basic). Inbox with mock threads.
- **DMs (conversation) (`src/app/dms/[conversationId]/page.tsx`)**: Implemented (basic). Conversation shell.
- **Profile (`src/app/profile/page.tsx`)**: Implemented (basic). Editable display name.
- **Profile (username) (`src/app/profile/[username]/page.tsx`)**: Implemented (basic). Public profile shell.
- **Notifications (`src/app/notifications/page.tsx`)**: Implemented (basic). Recent + preferences.
- **Settings (`src/app/settings/page.tsx`)**: Implemented (basic). Theme toggle placeholder.
- **Search (`src/app/search/page.tsx`)**: Implemented (basic). Search shell.
- **About (`src/app/about/page.tsx`)**: Implemented (static). Uses consistent header.
- **Privacy (`src/app/privacy/page.tsx`)**: Implemented (static). Sections for policy.
- **Admin (`src/app/admin/page.tsx`)**: Implemented (basic). Metrics cards, moderation queue, audit log.
- **Admin Moderation (`src/app/admin/moderation/page.tsx`)**: Implemented (basic). Queue shell.
- **Onboarding (`src/app/onboarding/page.tsx`)**: Implemented (basic). Checklist.
- **Routes Catalog (`src/app/routes/page.tsx`)**: Implemented. Links to major routes.
- **My Topics (`src/app/my/topics/page.tsx`)**: Implemented. List of followed topics.
- **My Issues (`src/app/my/issues/page.tsx`)**: Implemented. List of my issues.
- **My Motions (`src/app/my/motions/page.tsx`)**: Implemented. List of my motions.
- **My Positions (`src/app/my/positions/page.tsx`)**: Implemented. List of my positions.
- **My Debates (`src/app/my/debates/page.tsx`)**: Implemented. List of my debates.
- **My Solutions (`src/app/my/solutions/page.tsx`)**: Implemented. List of my solutions.

All listed pages use the shared header `AppMenuBar` for consistent navigation.

## Components

- **AppMenuBar**: Implemented. Global header with dropdowns, search, theme toggle; new "Pages" dropdown added.
- **HeaderHero**: Implemented. Hero section on Home.
- **Sidebar**: Implemented. Global navigation sidebar.
- **Card / CardExpandable / Chip / SectionTitle**: Implemented. UI primitives.
- **Skeleton**: Implemented. Loading states.
- **ToastManager**: Implemented. Global toasts provider.
- **ThemeToggle**: Implemented. Light/dark switch.
- **Breadcrumbs**: Implemented. Used on nested routes.
- **FeedTabs**: Implemented. Home feed switching.
- **Composer**: Implemented. Post composer UI.
- **PostCard / MotionCard / IssueCard / SolutionCard / TopicCard / DebateCard / PositionCard**: Implemented (basic visual summaries).
- **StanceBar / MotionCensusRealtime / CensusBar / CensusDonut**: Implemented (basic). Census visualization.
- **StanceSelector / VotingSlider**: Implemented (basic UX). Stance input.
- **ArgumentCard / ArgumentForm / Comment / ForumThread**: Implemented (basic shells).
- **ProposalForm / ProposalList / VoteWidget**: Implemented. Wired to `/api/proposals` and `/api/votes`.
- **ForumOpenButton**: Implemented. Creates/opens forum per entity.
- **PresencePill**: Implemented. Realtime presence indicator (Supabase).
- **EvidencePanel**: Implemented. Add/list evidence via `/api/evidence`.
- **EvidenceCard / EvidenceAttach**: Implemented (partial usage). Ready for argument integration.
- **CreateWizard**: Implemented. Multi-step simple skeleton.
- **ModalDialog**: Implemented (utility, not widely used yet).
- **QuickActions / RightRail / TopNav / WorkingGroupPanel / ModerationFlag / AISuggestionButton / QVInterface**: Implemented (varying degrees, mostly visual/utility; wiring pending for some).

## Status Legend

- Implemented: Page/component renders with consistent header and basic UX.
- Implemented (basic): Visual shell present, may use mock data; further wiring planned.
- Implemented (simple): Skeleton wizard or minimal form.
- Partial usage: Component exists and is used in some contexts; extended integration planned.

## Notable Next Steps

- Add deep-links for all Forum tabs and My pages in Routes Catalog and Header menu.
- Integrate `EvidencePanel` or `EvidenceCard` into Motion and Argument flows.
- Expand `ForumThread` to persist and fetch threads; wire moderation.
- Add presence/typing to additional collaborative contexts.
- Build search input wiring and results rendering on Search page.
- Introduce accessibility checks (axe) into CI for all new pages.
