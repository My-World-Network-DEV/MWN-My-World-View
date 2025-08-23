
# My World View (MWV) Master Document

## 1. Overview

Elevator Pitch
My World View (MWV) is a Twitter-like platform that combines the immediacy and brevity of
micro-posts with a rigorous, structured debate and solution workflow. Users can publish short
claims (280–500 characters) and optionally attach evidence or definitions. Viral or substantive
posts can be promoted into higher-order debate objects (Issues or Motions) via one-click
conversion, assisted by community voting or AI suggestions. Each Debate (Motion) has a
five-point stance slider that directs users into stance-specific “Position Rooms” where they
collaboratively draft arguments and curate evidence. High-impact debates can escalate to
formal visual Debates and ultimately yield crowd-sourced Solutions with actionable steps and
real-world follow-up. In short, MWV turns fleeting social posts into accountable, evidence-based
decision paths, all while preserving the frictionless social experience.
Problem
Current social media debates often devolve into short-lived, hot-take threads with little structure
or fact-checking. Important civic issues get lost in noise, and consensus is rarely captured.
MWV addresses this by providing structured debate scaffolding under each Topic and Issue.
The platform’s goal is to surface civic issues, capture community stance (Census), gather
evidence and reasoned arguments, and guide debates into actionable, auditable solutions.
Goals

* Brevity + Structure: Posts are short and fast, but major claims can be escalated to Issues and
Motions for deeper deliberation.
* Evidence-First: Every claim should link to verifiable sources. Evidence cards score sources by
credibility and community feedback.
* Transparency & Auditability: Debate trees, evidence provenance, and AI interventions are fully
traceable and labeled.
* Civic Action: Debates culminate in Solutions (e.g., policy proposals, petitions) with tracking of
real-world impact.
* AI-Augmented: AI tools assist (coach, fact-check, devil’s advocate, etc.) but only on user
demand, always labeled and reversible.
* Safety & Respect: Encourage civil argument through positive UX (e.g., rewarding source use),

community moderation, and rate-limits to curb abuse.
Non-Goals
MWV is not a generic chat or Reddit clone. It is not designed for ephemeral viral content with no
accountability, nor solely for entertainment. Instead, it focuses on civic discourse: preserving
viral engagement but steering it toward evidence-backed dialogue and outcomes.
Audience & Use Cases
The primary audience includes engaged citizens, researchers/academics, and civic organizers.
Use cases include:

* Everyday Citizen: Browses Home and Topics; sees a viral claim, upvotes or promotes it to a
Motion, then joins a Position Room to submit a stance and arguments.
* Researcher: Curates evidence and arguments under a specific Issue; exports evidence packs
for reports or policy briefs.
* Civic Organizer: Monitors stance Census on Motions, drafts community Solutions when
consensus emerges, and spawns working groups or petitions for implementation.

## 2. Domain Glossary

* Topic: A broad domain or category (e.g., Climate, Education, Healthcare). Topics organize the
    platform’s content and contain Issues.
* Issue: A focused question or problem within a Topic. Each Issue narrows the context and
holds canonical definitions and shared evidence. Example: “How should City X address
affordable housing?”.
* Motion: A concise proposition tied to an Issue (e.g., “City X should ban single-use plastics” in
an environmental issue). Motions are the primary units for capturing stances and running
debates.
* Position / Position Room: For each Motion, a stance-specific “room” on the 1–5 scale (1 =
Strongly Disagree to 5 = Strongly Agree). Users who select a stance enter that Position Room
to collaboratively refine a Contention (thesis) and gather arguments/evidence.
* Stance Event: An atomic event recording a user selecting a stance for an object (Topic, Issue,
Motion, Debate, or Solution). Stance values are integers 1–5. Each event logs userId (nullable if
anonymous), optional reason text, evidence links, and privacy (enum: public, anonymous,
hiddenWeighted).
* Debate: A structured interaction between opposing stances. Can be a real-time or threaded

debate, often visualized as an argument map (tree). High-activity Motions may be escalated into
a formal Debate Arena to resolve contention.

* Argument: A claim (with evidence) in support or opposition to a Motion, typically contributed
inside a Position Room or Debate. Arguments may be scored by community flags and author
reputation.
* Evidence: An external source (URL or upload) attached to an argument or Issue. Evidence
has metadata (domain, title, date, authors) and a Credibility Score based on signals like domain
reputation, citation frequency, peer-review tags, and community flags.
* Solution: A concrete proposal distilled from mature Debate arguments. Contains action steps,
stakeholders, feasibility analysis, and tracking status. Solutions are voted on and can spawn
real-world actions (working groups, petitions).
* Census (CensusSnapshot): A cached aggregation of all stance events for a given object
(Topic/Issue/Motion/Debate/Solution). It records raw counts and weighted counts (e.g., by user
reputation) for each stance, total participants, and a confidence score. MWV displays censuses
(e.g., as a bar or donut) to show community opinion.
* Stance Bar / CensusBar: A compact UI element (5-color bar) showing percentage of users in
each stance for a Motion or Issue.
* Debate Canvas: A visual graph interface for a Debate, with zoom/pan, nodes (arguments), and
edges (rebuttals).
* Feed (For You): The Home Feed combining raw micro-posts and promoted Objects
(Motions/Issues). It supports liking, replying, resharing, and instant promote CTAs.
* Card (UI Component): A reusable component for displaying an object. Examples include
PostCard, MotionCard, IssueCard, EvidenceCard. (A PostCard shows a micro-post;
EvidenceCard shows a source with credibility).
* Create Flow: Interactive multi-step wizards for creating content (Topic, Issue, Motion,
Evidence, Solution). These use steppers with AI suggestions and validations.
* Stance (Reputation/ELO): MWV uses a point-reputation system (akin to an “ELO” for content)
to weight contributions. (Exact formula TBD; assume reputation is numeric and boosts credible
contributors.)
* Argument Quality: A composite metric combining community votes, evidence backing, and
contributor expertise (reputation) to score arguments. (We assume arguments accrue a score
field based on such signals.)

* Position Room (Forum): Synonymous with Position (above). Sometimes called a “forum” for
that stance.
* Census (as above): Reflects community opinion; see Stance Events.
* Debate Arena: A specialized page (see Page Specs) for formal debates. *Solution Hub:
A section listing all proposed solutions; users can vote and track adoption.* Card/Tile:
Generic terms for UI content blocks (Posts, Motions, etc.).

## 3. Platform Axioms / Principles

* Evidence‑first: Structure before sprawl.
* AI is opt‑in coach: Transparency & audit.
* Action & outcomes: Accessibility & performance by default.
* Transparency & Auditability: All content moderation, AI interventions (e.g., coach suggestions,
bias flags), and ranking algorithms must be labeled and explainable. Users should always see
why a debate snippet or recommendation was surfaced.
* Evidence-First: Any claim or argument in MWV requires verifiable evidence or citation. The
system provides tools for linking sources and rates source credibility.
* Community Governance: Rely on community-driven vetting and notes (like “Community
    Notes”) to flag misleading content. Promote respectful discourse via moderation roles and
    user-driven controls.
* Privacy & User Control: Respect user privacy: e.g., allow anonymous stances (with consent
    logged), give control over personal data, and avoid dark-pattern data sharing.
* AI as Co-pilot, Not Arbiter: AI augments users (debate-coaches, suggestions) but never
overrides human agency. AI-sourced content is clearly marked, and there are mechanisms for
dispute.
* Inclusivity & Accessibility: Meet WCAG standards; design for diverse abilities and
    backgrounds. e.g., use plain language, sufficient contrast, and keyboard
    navigation.
* Open Standards: Whenever possible, use open protocols/standards (e.g., open APIs,
federated identities). Allow data portability (users can export their data).

## 4. Democratic Governance and Forums

Each level of the MWV ladder (Topic, Issue, Motion, Position, Debate, Solution) includes a
dedicated "Forum" tab/section for democratic rule-making and discussion. Forums are
accessible only to "joined" users (e.g., those who have followed the Topic, taken a stance on the
Motion, or participated in the Debate). Rules are proposed as mini-Motions within the forum,
debated in threads, and voted on using hybrid mechanisms: yes/no for application (e.g., simple
majority or 60% supermajority), and a 1-5 slider for degree (e.g., strictness level). For
high-stakes rules, quadratic voting (QV) is optional, where users spend "voice credits" (pooled
from reputation or AI credits) quadratically to express intensity, preventing spam. Proposals
require a minimum reputation to submit, and voting periods last 7-14 days with notifications.
Global axioms override local rules. This system empowers users while fallback to defaults
prevents chaos.

Implementation: Add a `forums` table linked to entities, with `rules` and `proposals` as child
    records. UI: Forum tab with threaded discussions, proposal forms, and voting components
    (sliders, QV interfaces).
    Brainstormed Key Criteria and Voting Mechanics by Level

Topic Forum (Broad Scope): Criteria include topic boundaries (e.g., off-topic tolerance:
1=Immediate delete, 5=Allow tangents), posting frequency limits, minimum evidence for claims.
Voting: Slider for tolerance; yes/no on enforcement bots. Lax in exploratory topics (philosophy),
strict in factual (science).

Issue Forum (Focused Problems): Criteria: Definition editing thresholds (e.g., consensus % for
changes), evidence standards (peer-reviewed only? 1-5 degree), motion promotion velocity.
Voting: Approval for multi-rules; slider for strictness. Mandatory counter-evidence in divisive
issues (climate), simpler in niche (local housing).

Motion Forum (Propositions): Criteria: Stance change limits (cooldown: 1=None, 5=1 month),
argument length caps, rebuttal requirements. Voting: QV for intensity. Timed responses in
high-stakes (policy), fun polls in casual (entertainment).

Position Forum (Stance-Specific): Criteria: Thesis edit approval (1=Anyone, 5=Majority),
member ejection for bad faith, evidence protocols. Voting: Slider for openness; yes/no on
anti-troll. Devil's advocate mandatory in polarized, open editing in collaborative.

Debate Forum (Structured Clashes): Criteria: Phase timings (rebuttal limit: 1=Unlimited, 5=
    min), judging (AI weight: 1=Advisory, 5=Decisive), multimedia rules. Voting: QV; timed polls.
    Evidence pre-submission in formal (ethics), memes in informal (sports).

Solution Forum (Actionable Outcomes): Criteria: Adoption thresholds (consensus: 1=Majority,
5=Unanimous), impact tracking, group sizes. Voting: Approval for steps; slider for checks. Strict

accountability in real-world (petitions), creative in hypothetical (sci-fi).

## 5. Information Architecture & Routing

The app uses a Next.js/SPA architecture with server-side rendering (SSR) for SEO-critical
    pages and dynamic client updates for real-time interactions.
    | Route | Page Name | Public? | Auth Required? | Params |
    Deep-Linking/Breadcrumbs |
    |----------------------|--------------------|---------|----------------|--------------------|------------------------------------
----|
    | / | Home Feed (For You)| Yes | No (guest can browse) | none | Home |
    | /explore or /topics | Explore/Topics List| Yes | No | none | Topics |
    | /topics/[slug] or /topic/"id" | Topic Page | Yes | No | topicSlug | Topics " Topic |
    | /issues/[id] or /topics/[slug]/issues/[id] | Issue Page | Yes | No | issueId (+topicSlug) |
    Topics " [Topic] " Issues " [Issue] |
    | /motions/[id] | Motion Page | Yes | No (view); Yes (join stance) | motionId | Topics " [Topic]

" Issues " [Issue] " Motion |
    | /positions/[id] | Position Room | No (private) | Yes (must select stance) | positionId | Topics "
... " Motion " Position (Stance)|
    | /debates/[id] | Debate Arena | Yes | No | debateId | Topics " ... " Motion " Debate |
    | /solutions | Solutions Hub | Yes | No | none (filters query)| Solutions |
    | /solutions/[id] | Solution Page | Yes | No | solutionId | Solutions " [Solution] |
    | /profile or /profile/me | My Profile | No | Yes | none (redirects to /profile/[userId]) | Profile |
    | /profile/[user] | User Public Profile| Yes | No | userId or handle |
    (none/breadcrumbs independent) |
    | /notifications | Notifications/Inbox| No | Yes | none | (User menu) |
    | /search | Search Results | Yes | No | q (query), filters | (Global) |
    | /create/topic | Create Topic | No | Yes | none | (Add " Topic) |
    | /create/issue | Create Issue | No | Yes | optionally parentTopic | (Add " Issue) |
    | /create/motion | Create Motion | No | Yes | parentIssue (or new) | (Add " Motion) |
    | /create/solution | Create Solution | No | Yes | linkedMotion (if applicable) | (Add " Solution) |
    Navigation Model: The Header contains the global search bar, logo (link to Home), and user
menu (profile, settings, logout). A persistent left rail (on desktop) lists followed Topics and quick
links (Home, Explore, Notifications). Top tabs or breadcrumb are used on content pages (e.g.,
Home › Climate › Issue: ...), reflecting the hierarchy. On mobile, a bottom tab bar
(Home/Explore/Search/Profile) is used. Forums appear as tabs on entity pages (e.g.,
/topics/[slug]/forum).
    Deep Linking: All content objects (Topic, Issue, Motion, Debate, Solution) have canonical URLs
as above. Links in posts (quotes/shares) carry metadata so context is preserved. Users can
share direct links to any room; if unauthenticated, viewing is allowed but taking actions prompts

login.
Breadcrumbs: For nested pages, breadcrumbs show the path, e.g., Topics " [Topic Name] "
[Issue Title] " [Motion Statement]. Each crumb is clickable to navigate up.

## 6. Visual System & Style Inventory

    MWV’s look-and-feel is defined via a comprehensive design system including tokens (colors,
spacing, typography, iconography), motion guidelines (animation easing, durations), and layout
conventions (grid, breakpoints). Follow modern design principles (referential & expressive
aesthetics, vivid elements balanced with clarity), while ensuring accessibility. The style should
feel fresh, somewhat playful (collage, color pops) yet trust-building.
    Design Tokens

* Colors: primary = #3B82F6 (blue), secondary = #F59E0B (amber), plus success/error colors.
For primary = #3882F6 (blue), secondary = #F59E0B (amber), plus success/error colors. (See
color-coded card schemes.)
* Spacing: 4px base unit (multiples 4,8,16...); breakpoints for mobile/tablet/desktop.
* Typography: h1, h2, body, small (e.g., font-family: 'Inter', sizes 20/18/16/14px). 4px base unit;
typography: h1-h2, body, small.
* Iconography: Build or adopt an accessible icon set (e.g., Material Icons or open-source civic
    icons). Ensure aria-label for icons.
* Motion: Use subtle easing curves; animations ~150–300ms. E.g., buttons on hover,
collapse/expand threads (ease-out). Avoid excessive motion for accessibility (follow
prefers-reduced-motion).
* Layout Grids:
  * Mobile: Single-column scroll. Bottom navigation (Home, Search, Profile).
  * Tablet/Desktop: Multi-column: e.g., left nav (topics/issues), main content, right sidebar
    (contextual).
    * Responsive breakpoints (e.g., 640px, 1024px).
* Themes: Clean dark mode (e.g., soft grays/blues for readability) with auto-detect.
    High-contrast variant for accessibility.
Style Guide & Components: Maintain a living style guide (Storybook or zeroheight). List all

components with usage.
Implementation Notes

* UI components and copy must reference axioms: e.g., badge icons that say “AI-Suggested” or
“Evidence Required”.
* Semi-custom design system: Use vivid accent colors and expressive typography, but maintain
a clean base (whites, grays) for content. Start with Material or CivicTheme core and layer
custom variables.

## 7. Component Gallery

Catalog all reusable UI components (buttons, cards, input fields, modals, etc.) with clear specs.
For each component: list props, state variations, accessibility requirements, and copy examples.
This ensures consistency and speeds development. The gallery follows atomic design
principles: from basic elements (“atoms”: Button, Icon) through composed “molecules” (e.g.,
SearchBox = Icon+Input) up to full “organisms” (e.g., DebateCard with header, body, actions).
    Key Components

* Button: Props: label, variant (primary/secondary/ghost), disabled. UX: shows loading state
spinner if isLoading. Copy: e.g., “Follow”, “Submit Motion”.
* Card: For posts/issues. Props: headerText, bodyContent, footerActions. Optional: media
thumbnail.
* Tabs: For page sections. Props: tabs=[{key,title}], activeKey. Accessible: uses "button" or
    role="tab".
* Modal: Props: title, content, actions (e.g., Confirm/Cancel). Trap focus, ARIA-labeled.
* Census Bar: Horizontal bar (5 segments). Props: distribution = [n1,n2,n3,n4,n5]; shows
    percentages on hover. (See census UI).
* PostCard: Displays a micro-post with actions (like, reply, promote). Variants: compact (2–
    lines) vs expanded (full text + top replies).
* MotionCard / IssueCard: Summary card for a Motion or Issue with title, snippet, and maybe
stance bar. Props: {motion: Motion} or {issue: Issue}, onOpen: (id) =" void.
* StanceBar: Visualizes stance distribution with 5 colored segments; clickable segments to join
stance. Props: {counts: number[5], onSelect: (stance: 1|2|3|4|5) =" void}.

* EvidenceCard: Shows an evidence source with title, domain, date, credibility badge. Props: {
evidence: Evidence, onFlag: (id) =" void }.
* CensusDonut: Shows consensus % in center and breakdown by stance (as a donut chart).
Props: {snapshot: CensusSnapshot, onOpenModal: () =" void}.
* DebateTreeCanvas: Interactive graph for debates. Props: {nodes: Node[], edges: Edge[],
onNodeSelect: (id) =" void}. Supports pan/zoom (multi-touch or mouse), selects nodes.
* ArgumentCard: Displays a single argument within a Position Room or Debate. Props:
{argument: Argument}. Events: On flag or upvote (if implemented).
* SolutionCard: Represents a solution with vote/feasibility UI. Props: {solution: Solution,
onAdopt: (id) =" void}.
* SearchBox: Debounces user input using a useDebounce hook and triggers a server action to
query a Postgres FTS index. Renders results in a keyboard-accessible dropdown and hides
when focus is lost.
* PaginationControls: Implements cursor-based navigation for Supabase queries. Displays Next
and Previous buttons with disabled states based on result metadata and emits server action
calls to fetch subsequent pages.
* EmptyState: Accepts a message prop and optional action button. Displays an illustrative SVG
icon and descriptive prompt, guiding users to create new content with AI assist links.
* ToastManager and ModalDialog: Wrap Headless UI primitives and expose imperative handlers
via React refs. Toasts listen for global event dispatches to display success, error or info
messages, while modals render through React portals and enforce focus trapping for
accessibility.
* Forum Components: New for governance: ProposalForm (for rule motions), VotingSlider (1-
degree), QVInterface (credit spending for quadratic votes).
All components must handle keyboard focus, ARIA labels (e.g., aria-label="Claim statement:
City X should ...") and be fully accessible.

## 8. Data Model & RLS

    Design the backend schema and security for MWV’s data. Core entities include Users, Topics,
Issues, Motions, Positions (stance-specific containers), Debates, Solutions,
Comments/Arguments, StanceEvents, etc. Use Row-Level Security (RLS) or equivalent ACLs to
enforce permissions (e.g., owners can edit their content, moderators can delete, stance data

write). Structure for fast querying (indexes) and RLS to ensure privacy controls (e.g.,
anonymous stance only visible as aggregate).
ERD (Text)
Users ──" Posts
\\─" Motions
\\─" Arguments ──" Motions
\\─" Evidence ───┐
\\─" Solutions ├─" Motions
Topics ──" Issues ──" Motions
\\ \\
" Motions
Issues ──" Motions ──" StanceEvents
\\
" Arguments
Motions ──" Arguments
\\ \" Evidence (via parent arguments)
\\──" Solutions
Each Motion, Issue, Debate, Solution has many StanceEvents (for census). New: Forums ──"
Entities (Topics etc.), with Rules and Proposals as children.
Tables & Schemas

* users: (id UUID PK, display_name TEXT NOT NULL, handle TEXT UNIQUE, email_hash
TEXT, reputation FLOAT DEFAULT 0.0, badges JSONB, created_at TIMESTAMP NOT
NULL
DEFAULT now(), role ENUM('user','moderator','admin') DEFAULT 'user'). Index on
handle. Reputation: 0-100, visible with links to flags.
* topics: (id UUID PK, slug TEXT UNIQUE, title TEXT NOT NULL, summary TEXT, categories
TEXT[], followers INT DEFAULT 0, created_by UUID FK-"users(id), created_at TIMESTAMP,
updated_at TIMESTAMP). Index on created_at.
* issues: (id UUID PK, topic_id UUID FK -" topics(id), title TEXT NOT NULL, summary TEXT,
canonical_definitions TEXT[], evidence_bank JSONB, created_by UUID FK-"users(id),
created_at TIMESTAMP, tags TEXT[], status ENUM('active','closed','cancelled') DEFAULT
'active'). Index on (topic_id).
* motions: (id UUID PK, issue_id UUID FK-"issues(id) NULLABLE, author_id UUID
FK-"users(id), statement TEXT NOT NULL, created_at TIMESTAMP, status
ENUM('open','closed','archived') DEFAULT 'open').

* position_rooms: (id UUID PK, motion_id FK-"motions, stance INT CHECK (1"=stance"=5),
contention TEXT, created_at TIMESTAMP); unique(motion_id,stance).
* stance_events: (id UUID PK, object_type TEXT CHECK (object_type IN
('Topic','Issue','Motion','Debate','Solution')), object_id UUID, user_id UUID NULLABLE, stance
INT CHECK (1"=stance"=5), reason_text TEXT, evidence_links UUID[] REFERENCES
evidence(id), weight FLOAT DEFAULT 1.0, privacy
ENUM('public','anonymous','hiddenWeighted') DEFAULT 'public', created_at
TIMESTAMP, ip_hash TEXT, user_agent TEXT). Index on (object_type, object_id) and
(user_id).
* census_snapshots: (id UUID PK, object_type TEXT, object_id UUID, raw_counts JSONB,
weighted_counts JSONB, total_participants INT, weighted_total FLOAT, confidence_score
FLOAT, last_updated TIMESTAMP). (Raw_counts: {1: n1,2: n2,...} ; weighted_counts similarly.)
* arguments: (id UUID PK, motion_id UUID FK-"motions(id), position INT, author_id UUID
FK-"users(id), text TEXT NOT NULL, evidence_refs JSONB, parent_id UUID
FK-"arguments(id), score FLOAT DEFAULT 0, created_at TIMESTAMP). Position ties to stance
(1–5).
* evidence: (id UUID PK, argument_id UUID FK-"arguments(id), url TEXT, domain TEXT, title
TEXT, authors JSONB, publish_date DATE, credibility_score FLOAT, flags JSONB, created_at
TIMESTAMP).
* solutions: (id UUID PK, motion_ids UUID[] REFERENCES motions(id), draft JSONB, status
ENUM('draft','voting','adopted','archived') DEFAULT 'draft', adopted_at TIMESTAMP, owner_id
UUID FK-"users(id), created_at TIMESTAMP).
* forums: (id UUID PK, entity_type TEXT, entity_id UUID, rules JSONB). Rules store approved
policies.
* proposals: (id UUID PK, forum_id FK-"forums, title TEXT, description TEXT, voting_type
ENUM('yesno','slider','qv'), status ENUM('proposed','voting','approved','rejected')).
* votes: (id UUID PK, proposal_id FK-"proposals, user_id FK-"users, vote_value INT or JSONB
for QV).
Enumerations
* stance: 1,2,3,4,5 (Strongly Disagree to Strongly Agree).
* privacy: public, anonymous, hiddenWeighted (see stance_events).

* content status: as above for motions, issues, solutions.
* roles: user, moderator, admin (on users table).
Indexes
Primary keys as above. Foreign key constraints on all _id. Index stance_events on
(object_type, object_id) and user_id. Index arguments on (motion_id). Unique handles on users.
Full-text index on content columns for search (e.g., tsvector on argument.text). Compound
indexes on foreign keys (e.g., (topic_id, created_at) for recent issues) for fast retrieval.
Row-Level Security (RLS)
Express policies in SQL:
* users: USING (id = auth.uid()) — only owners can SELECT/UPDATE their profile.
* topics: public read; writes only by admins.
* issues/motions: public read; owners can update/delete, admins/mods can delete.
* positions/arguments: INSERT allowed by any authenticated user (to contribute),
UPDATE/DELETE only if author or mod.
* stanceEvents: INSERT allowed by any authenticated user; SELECT maybe restricted to own
events if privacy=hidden, but public raw counts.
* forums/proposals: Write restricted to joined users; RLS based on participation.
* Use Postgres RLS or Supabase policies to enforce “only me can write mine; only my followers
can read private stuff”.
APIs
* REST or GraphQL endpoints matching above, enforcing RLS on server-side as well.
* Possibly use Supabase auto-generated APIs with RLS policies. Public for embeds/census,
rate-limited (100/hr free).
Seed Data Examples: Topics: e.g., Climate Change, Education Reform, Healthcare. Issues:
Under Climate: “How should City X achieve carbon neutrality?”; with canonical definitions (e.g.,
of carbon neutrality) and initial sources. Motions: e.g., “City X should ban single-use plastics”
under an environmental issue. Sample Users: Test users with different roles (alice as moderator,

bob as user). Sample Arguments/Evidence: One motion with initial arguments and evidence
cards pulled from Wikipedia or news (for testing). Add sample forums with default rules.

## 9. Census / Stance System

The Census captures users’ stances on any debate object (Topic, Issue, Motion, Position,
Debate, Solution). It quantitatively shows how the community is split (e.g., “Agree 62%,
Disagree 38%”). This section covers UI (how users submit stances and view results), API (data
model and endpoints), and edge cases (anonymity, flip-flopping, manipulation). Stances
weighted by reputation.
    Implementation Notes

* UI Components:
  * CensusBar: A compact horizontal bar divided into 5 segments (color-coded for each stance).
Show hover tooltips with % and counts.
  * CensusDonut: On Motion/Issue pages, a larger pie chart (donut) summarizing majority stance
with consensus%. Clicking opens full details.
  * CensusModal: A full-screen modal showing raw counts, weighted view toggle, confidence
score, history chart, top contributors, and link to raw events.
* Taking Stance Flow:
    1. User clicks “Take a Stance” or the CensusBar.
    2. Show a quick form: choose stance (1–5, perhaps with emoji labels), optional short reason
    (140 chars), optional evidence URL list.
    3. Privacy toggle (Public = shown with name, Anonymous = hidden). Auto-record privacy choice.
    4. Submit -" POST to /api/stanceEvents with payload.
    5. Show confirmation and prompt (optionally) “AI coach: Need help justifying your stance?”.
* APIs:
  * POST /api/stanceEvents to submit (body: objectType, objectId, stance, reason, etc). *
    GET /api/census/:objectType/:objectId returns censusSnapshot (from DB or computed).

* GET /api/census/:objectType/:objectId/history returns time series of past snapshots (for
debate timeline charts).
* GET /api/stanceEvents/search (with filters) for auditing (admins only).
* Data Model: As per tables above.
* stanceEvent: Record each submission with fields {objectType, objectId, userId, stance (1..5),
reasonText, evidenceLinks[], weight (default 1, adjusted by rep), privacy, createdAt}.
* censusSnapshot: Cached aggregates {rawCounts, weightedCounts, totalParticipants,
confidenceScore, sampleSize, trendDeltas, flags}. Update after each new stance or via
background job.
* Edge Cases:
* Changing Stance: Allow users to revise stance on same object, but record history. Possibly
enforce a cooldown (to prevent flip-flopping abuse). Indicate last change time in CensusModal.
* Low Participation: If few users (small sample), show a disclaimer in UI (e.g., “Caution: low
sample size”) or dim statistics.
* Anonymity: If user chooses Anonymous, exclude their userId from public listing but include in
weighted counts internally.
* Manipulation: Implement simple anomaly detection: e.g., if one user posts thousands of
stances, flag “suspected manipulation” in snapshot.
Acceptance Criteria
* Given 10 stanceEvents on an Issue (some public, some anonymous), When fetching the
census, Then rawCounts reflect only public events (anonymous appear only in weighted view)
and totalParticipants = 10 (sample size).
* Given user submits a stance, When survey modal appears, Then default privacy=public, user
can change to anonymous.
* Given 3 months have passed, When user revisits issue, Then their last stance is still recorded
but editable (no stale data).

## 10. Threads & Comments

This covers the design of threaded comment interactions across MWV (e.g., in Debate Arena,
Position Rooms, Issue discussions). It includes nesting behavior, sorting options, and

accessibility concerns. Aim to make conversations easy to follow, encourage engagement, and
be inclusive.
Nested threaded comments with collapsible branches and sorting controls. Show first-level
comments and one highlighted reply (e.g., most-upvoted) by default; allow expanding deeper
replies on click. Provide sorting dropdown (Newest, Top).
Implementation Notes

* Comment Component: Each comment shows author, timestamp, text, actions (Reply, Like,
Report). Use "ul role="list"" with "li role="listitem"" for accessibility.
* Nesting: Render replies as nested "ul" inside parent "li". Include visual cues (indentation,
lines or background shading).
* Collapse Mechanism: Automatically collapse replies beyond level 2. Show “View X more
replies” link that expands them.
* Sorting: Dropdown at top of thread:
* Newest: chronological by creation date (descending).
* Top: by like/vote count (as relevance can break conversation, but allow user choice).
* Accessibility:
* Use ARIA labels and roles. For example, mark “Reply” buttons with aria-label="Reply to
comment" and ensure focus outlines.
* Each comment can have aria-level attribute if using role="treeitem" (depending on HTML
structure).
* Keyboard: tab to Reply, Enter to expand/collapse.
* Performance: Paginate or lazy-load threads (e.g., initially load 20 top-level comments, fetch
more as user scrolls).
Acceptance Criteria
* Given a thread with "3 replies under one comment, When displayed, Then only one reply is
shown by default with “+2 replies” link.
* Given user selects “Top” sort, When applied, Then comments re-order correctly by likes (verify
with test data).

* Given screen reader usage, When focusing the thread, Then ARIA announces comment
hierarchy (via aria-level or appropriate roles).

## 11. AI Integrations

Integrate AI as transparent assistants, each with a role. Use a mix of OpenAI APIs for general
intelligence (prompted tasks like summarization, debate coaching, devil’s advocate) and
specialized services for fact-checking. Implement with label disclosures and human oversight.
Ethics: Annual audits for bias, public reports.
User-Facing AI Features

* AI Coach: Suggests clarity edits, missing evidence, or stronger wording. Prompt: “Improve this
argument for clarity and add a source.” The assistant suggests a draft; user can accept or
ignore. All AI suggestions are labeled “AI Coach” and are not auto-applied.
* Summarizer: Condenses long Position Room discussions or Debates into bullet summaries.
Accessible via a “Summarize” button. Prompt example: “Summarize consensus points from this
debate.”
* Fact-checker: Given a claim, finds supporting sources. On post creation, if “I claim this is
factual” is checked, runs quick source lookup and credibility heuristics. Prompts user with
source links.
* Devil’s Advocate: Generates counter-arguments on demand. In a Position Room, user can
click “AI Opponent” to see possible rebuttals to their own contention.
* Feasibility Reviewer: On proposed Solutions, AI evaluates practicality. Prompt example: “Rate
feasibility of this solution and list missing assumptions.” Shows score and explanation.
* Transcript/Judge for Debates: Real-time transcription for multimedia; scores debaters on
evidence/logic.
* Prompt Structure: Each role uses structured prompts with context. E.g., for evidence
suggestion: {motion_statement}; user stance: X; existing evidence count; AI: find reputable
evidence. The app should record the prompt and model metadata for audit.
Guardrails
* Always label AI content clearly: e.g., prefix suggestions with “AI-suggested:”.
* Keep an audit log of AI-generated content.

* Rate-limit AI generation per user to prevent abuse or runaway costs.
* Human review for sensitive tasks (if feasible, e.g., flag dispute to staff). Tiers: Free limited, paid
for more credits.
APIs/Integration
* Use OpenAI’s ChatGPT/GPT-4 via backend (requires API key, environment var). For example,
cloud function triggers on user request (or pre-submission).
* Fact-check via dedicated APIs (PolitiFact, Snopes) or integrate GPT with instruct to “Check
claim”.
* Moderation: Use OpenAI Moderation API on all new posts. If flagged, hide or queue post.
Acceptance Criteria
* Given a user requests an AI suggestion, When backend responds, Then the UI displays the
result prefixed with “AI:” and user can accept or edit it.
* Given an AI-suggested text contains a factual claim, When showing it, Then highlight it with a
“⚠ Check this” indicator if uncertain.
* Given user-generated content, When posted, Then it passes through the moderation API and
only visible if approved.

## 12. Page Blueprints

Home
The Home page at app/page.tsx serves as the fast personal hub where users toggle between
For You, Following, Latest or Heated feeds and access the Solutions Hub or My Activity tab. A
Server Component aggregates personalized slices via Supabase views and streams real-time
stance and notification deltas over Postgres channels. The GlobalHeader includes search,
quick-create modals and AI-driven promote prompts while the left sidebar renders primary
navigation and pinned topics. The main feed stitches PostCard and MotionCard components
into a cursor-paginated list with skeleton loaders for initial paint. Moderation gates ensure that
newly created posts and promotions are queued for policy review before becoming visible. "For
You": 70% similar, 30% opposing (toggleable).
Purpose: Fast personal hub: For You, Following, Latest, Heated, plus My World View and
Solutions slices.
Primary UI: Header (search, notifications, quick create) • Left Sidebar (nav, pinned topics,

shortcuts) • Right Rail (trending motions, notifications) • Main feed with Post/Motion cards.
Data/Perf: RSC streams personalized slices from aggregated views; client tabs mutate URL
search params; Realtime patches deltas (stance counts, notifications); cursor pagination.
Targets: FMP/LCP fast; skeletons on first paint.
Permissions: Public reading; writes via server actions with policy checks. Metrics:
Promote‑to‑Motion rate • Stance submissions • Debate joins • Solution views.
Defined as central dashboard with personalized feeds (“For You,” “Trending,” “Followed
Content”). My Activity tab (performance, stance history, analytics). Solutions Hub tab.
Features: Realtime updates from Supabase. Moderation gates on posting. Census snapshot
displayed at topic/issue/motion level in feeds.
Implementation notes: Next.js App Router, SSR for feed, Server Actions for
posting. Explore
The Explore page at app/explore/page.tsx unifies cross-entity discovery with a debounced
SearchBox that queries a Postgres full-text search index and a set of filter chips for entity type,
category and recency. Initial results are server-rendered with client-side infinite scroll to append
TopicCard, IssueCard, MotionCard, PositionCard, DebateCard or SolutionCard entries. Each
card displays a miniature census bar to preview community stance and subscribes to real-time
count updates. RLS policies automatically hide private drafts, and empty-state prompts guide
users to create new entities with AI-assisted duplication checks.
Purpose: Cross‑entity search/browse with facets.
Primary UI: Search box (debounced), filter chips (level, category, recency, participation), infinite
grid of Topic/Issue/Motion/Position/Debate/Solution Cards with stance previews.
Data/Perf: Postgres FTS (tsvector) + optional pgvector; URL‑synced filters; server‑rendered
first slice; client infinite scroll; Realtime non‑blocking counter patches.
Permissions: RLS hides private drafts automatically.
Metrics: CTR to entity detail • Follow actions • Create actions from empty states.
Functions as global discovery: browse all Topics, Issues, Debates, trending Solutions. Search
powered by Postgres Full-Text Search initially, pgvector optional later. Realtime trending
updates via Supabase postgres_changes. UI: infinite scroll, tabs (“Trending,” “Newest,” “By
Category”).

Topic
The Topic layer under app/topics/[topicId] offers umbrella context and incubates focused
discussions. Every Topic page includes a census snapshot bar, a description panel with
AI-summarized framing and related category tags, followed by tabs for Issues, Motions and
Forum. A right rail surfaces related topics and top contributors based on velocity scores, fed by
materialized views. Creation and promotion buttons invoke server actions to insert new Topics,
and all write operations queue through the AI moderation pipeline before broadcast.
Purpose: Umbrella context; hosts Issues & community discussion.
Primary UI: Topic Header (title, summary, categories, followers) • Tabs: Issues,
Motions, Discussion • Right rail: related topics, contributors.
Data/Perf: Summary/materialized views for counts; stream lists; follow toggle via server action +
tag revalidation + broadcast.
Permissions: Owners/mods edit; general users follow and post (forum RLS
rules). Metrics: Follows • Issue creation rate • Active debates spawned.
Includes description, census stance bar, linked Issues, and forum activity.
On app/topics/[topicId]/page.tsx a Server Component fetches the topic record alongside its
linked Issues. The TopicHeader displays title, summary, category badges and live follow count
with a toggle that calls a server action. Below, the BrowseIssues widget streams recent issues
via real-time subscriptions and cursor pagination. A client-only CreateIssueButton opens a
modal form with AI-driven duplicate detection and framing suggestions that auto-save drafts and
submit through a transactional server action.
Browse-Topics: At app/topics/page.tsx the Browse-Topics view lists all topics with pagination
managed by a server action under app/api/topicsPagination/route.ts. Topics are rendered as
TopicCard components in a responsive grid that adjusts from two columns on desktop to one on
mobile. URL query parameters preserve filter and sort state, and real-time stance patches
animate census bars on cards without blocking scrolling.
Topic-Forum: The Topic-Forum at app/topics/[topicId]/forum/page.tsx is an open discussion
space where users post questions, evidence or meta-comments. Posts are composed in a
Composer component supporting markdown and citation fields, then inserted into the threads
table through a server action. Each ArgumentTile displays tags, upvote counts and a Promote
CTA that triggers AI-suggested Issue or Motion creation flows. Threads load with
server-rendered first pages and subscribe to new replies via Supabase realtime channels, while

moderation controls allow sticky, move or merge actions for moderators. Governance proposals
here.
Community page: overviews, questions, clarifications. Moderation pipeline before publishing.
Create-Topic: The Create-Topic route at app/topics/new/page.tsx is a Client Component that
presents a form for title, description, categories, visibility and optional icon. AI assists by
suggesting improved summaries and listing similar existing topics. Drafts autosave to local
storage until the user submits, triggering the createTopic server action that writes to Postgres
under RLS rules. Upon approval, the user is redirected to the new Topic page.
Authenticated users can propose Topics. Creation flow: title, summary, categories, optional
AI-suggested framing. Fields: Title, Summary, Categories/Tags, Visibility, Icon/Banner. Assist: AI
summary/dup‑check (shows similar topics via FTS) • style guide hints. UX: Autosave drafts;
preview; owner/mod approval optional. Rules: Unique slug; spam/rate limits. Routes & Actions:
GET /create/topic • action createTopic() → insert topic.
Issue
Issues narrow Topics into specific questions. Under app/issues/[issueId], each Issue page
displays a census bar, contextual definitions bank, a Motions list and an Issue-level forum.
Materialized summary views supply KPI counts and versioned definitions, all streamed with
real-time patches. Creation and promotion flows queue through AI moderation, and maintainers
can approve definition edits or evidence submissions.
Purpose: Focused question with definitions/evidence that anchor Motions.
Primary UI: Issue header (statement, context, definitions), Evidence bank, Motions
list, Issue‑level stance/census snapshot, forum for scope/terms.
Data/Perf: Issue summary view for KPIs; versioned definitions; server lists + client infinite
scroll; promote thread → motion.
Permissions: Maintainers edit; everyone can discuss; drafts hidden until publish.
Metrics: Motions per Issue • Definition revisions accepted • Promotion conversions.
app/issues/[issueId]/page.tsx retrieves the Issue statement, context and aggregated stance
counts. It renders the IssueHeader with context definitions and an EvidenceBank that lists
attachments with verification badges. The linked Motions are shown in a MotionsList with vote
previews, and the forum tab surfaces threads for clarifications and proposals. All lists use cursor
pagination and realtime channels to update counts.
Census snapshot for Issue-level stance. Linked Motions with debate entry points.

Browse-Issues: The Browse-Issues screen at app/issues/page.tsx shows Issues grouped by
parent Topic, filtering by trending, active or recent. It leverages a server-rendered Postgres view
for grouping and displays IssueCard components in a Masonry layout. Infinite scroll and
real-time census animations keep users apprised of emerging debates.
Display Issues under selected Topic. Filters: trending, active, recent.
Issue-Forum: Under app/issues/[issueId]/forum/page.tsx users engage in scoped discussions
tagged as Scope, Definition, Evidence or Motion Proposal. The Composer offers an
evidence-request template and AI-suggested clarifying questions. Thread listings load with
server-rendered first pages and subscribe to realtime new posts. Promote-to-Motion buttons
appear inline once a proposal meets reputation thresholds or moderator approval. Governance
proposals here.
Forum posts: “proposals” and “clarifications.” RLS policies: only author can edit/delete.
Create-Issue: The Create-Issue page at app/issues/new/page.tsx offers a structured form with
parent Topic selection, Issue statement, context, definitions list and optional initial evidence
uploads. AI assists by generating definition scaffolds and scanning for duplicates. Upon
submission, the createIssue server action inserts issue and definition version records
transactionally, then routes the user to the new Issue page after moderation.
Create form with title, framing, related Topic. Optionally generate clarifying questions with AI.
Fields: Parent Topic, Issue question/statement, Context, Definitions (list), Scope boundaries,
Initial Evidence (URLs/files with citation fields). Assist: Definition scaffolds; scope checklist;
dup‑check against existing Issues. Rules: Definitions versioned; evidence requires minimal
metadata; draft→publish gate. Routes & Actions: GET /create/issue?topic= • createIssue()
transactional insert.
Motion
Motions present crisp propositions within an Issue. Routes under app/motions/[motionId] show
the proposition text, a live Stance-Bar with real-time vote distribution, a list of Positions and the
Motion-Forum for contextual debate holes. Motion creation and stance upserts are immutable
writes with automated census recalculation.
Purpose: Crisp proposition users can take a stance on.
Primary UI: Motion header; Stance‑Bar; recent arguments; related positions/debates; stance
selector unlocks Position rooms.
Data/Perf: Upsert stance → positions table (unique user+motion); debounced
edits; approval/merge for thesis revisions; presence & typing indicators.

Permissions: Authors/mods can edit statement pre/post publish per policy; stance writes are
immutable records.
Metrics: Stances, join‑to‑position, argument velocity, debate creation triggers.
On app/motions/[motionId]/page.tsx, the MotionHeader renders the proposition and rationale
summary, followed by a StanceBar component that flexibly visualizes community support and
animates via realtime deltas. The PositionsList previews user camps and includes join-buttons
triggering the Create-Position flow. A “Dispute” section surfaces top arguments from opposite
camps.
Shows proposition and aggregated stance data. Stance selection triggers census update.
Browse-Motions: The Browse-Motions view at app/motions/page.tsx lists all motions under a
selected Issue, segmented by For, Against or Mixed tabs. A server-action fetches the first page
with velocity-scored ordering, and client-side infinite scroll appends further motions. Real-time
census updates animate each card’s StanceBar.
List motions under an Issue. Tab filters: “For,” “Against,” “Mixed.”
Motion-Forum: Under app/motions/[motionId]/forum/page.tsx, users sharpen the proposition
through tagged threads for Clarification, Counterexample, Fallacy or Off-scope. The thread list is
cursor-paginated and subscribes to realtime additions. An Escalate-to-Debate CTA enables live
debate creation once at least two active positions exist. Governance proposals here.
Forum posts: “position suggestions” and “context notes.”
Create-Motion: The Create-Motion page at app/motions/new/page.tsx provides a form that binds
proposition text, rationale and parent Issue. AI tools validate affirmative phrasing, testability and
duplicate scanning. Submission calls the createMotion server action to insert a new motion and
initial census row, followed by redirect after moderation.
Requires linking to parent Issue. Input: proposition text, supporting context. Fields: Parent Issue,
Motion text (proposition), Rationale summary, Tags. Assist: Clarity checker (affirmative,
testability), conflict/duplicate scan, suggested counter‑positions. Rules: Post‑publish edits gated;
must bind to an Issue. Routes & Actions: GET /create/motion?issue= • createMotion() + initial
stance snapshot row.
Position
Positions capture individual user stances on a Motion and live under app/positions/[positionId].
Each Position page hosts a collaborative thesis panel, an argument feed template and an
evidence shelf. Unique constraints ensure one Position per user per motion, and CRDT-friendly

state persists thesis revisions.
Purpose: Stance‑specific thesis & argument workspace.
Primary UI: Thesis panel with version history; argument feed; evidence
shelf; members/presence; tabs for Thesis • Evidence • Revisions • Feed.
Data/Perf: One active position per user per motion (unique index); debounced
edits; approval/merge for thesis revisions; presence & typing indicators.
Permissions: Write limited to members; read is public for transparency.
Metrics: Argument quality/karma • Thesis revisions merged • Members growth.
app/positions/[positionId]/page.tsx fetches the Position’s thesis history, evidence attachments
and aggregated stance events. It renders a PositionHeader with user details and a census bar,
then organizes content into tabs for Thesis, Evidence, Revisions and Feed. Realtime presence
and typing indicators animate in supported channels.
Displays arguments, evidence, census distribution of stance events.
Browse-Positions: On app/positions/page.tsx, the user’s active positions are listed as
PositionCard components in a flex wrap layout. Each card shows stance strength, evidence
count and a link to its debate or solution threads, updating counts in realtime.
Cards showing stance strength, evidence count.
Position-Forum: The Position-Forum at app/positions/[positionId]/forum/page.tsx supports
within-camp collaboration with templates for Claim→Evidence→Warrant posts and a Rebuttal
Request flow that pings other camps. Moderators can merge accepted thesis revisions into the
main document, and all edits use debounced autosave. Governance proposals here.
Forums for evidence-sharing and counterpoints.
Create-Position: app/positions/new/page.tsx guides users through stance selection with a
5-point slider, rationale text and optional initial arguments and evidence. AI critique previews
highlight gaps, and citation validators verify metadata. The upsertPosition server action enforces
uniqueness and updates the Motion census.
Input: stance type (For/Against), rationale, evidence. Updates census snapshot for Motion.
Fields: Parent Motion, Stance (5‑point), Thesis (short), Initial Arguments (templated), Evidence
attachments, Visibility (private until ready). Assist: Argument templates; AI critique preview;
citation validator. Rules: One position per user per motion; publishing joins the camp. Routes &
Actions: GET /create/position?motion= • upsertPosition() ensures uniqueness.

Debate
Debates provide structured clashes across positions when opposing viewpoints exist. Hosted
under app/debates/[debateId], each Debate page features a live DebateCanvas of argument
nodes, a linear forum for audience Q&A and phase timers for Openings, Rebuttals,
Cross-Examination and Closings. Debates replay archives support post-mortem review.
Multimedia: Videos/images allowed, with AI transcription. Live streams via WebRTC; user/AI
judging.
Purpose: Structured clash across positions (live + async).
Primary UI: Debate Canvas (argument nodes/edges) + linear forum; timeline scrubber; phase
timers; right‑rail (AI summary, hotspots, stance shift, disputes).
Data/Perf: Realtime channels for chat/presence; throttling/phase windows; node/edge graph
fetch with lazy detail panels; replay player for archives.
Permissions: Entry gated by holding a Position; moderators manage phases.
Metrics: Participation, stance movement, argument uptake, time‑to‑solution.
On app/debates/[debateId]/page.tsx, the DebateCanvas component fetches argument graph
data and renders nodes and edges with lazy-loaded detail panels. Phase timers drive UI
transitions, and real-time channels deliver chat messages, rebuttals and evidence updates. A
right rail offers AI-generated summaries, hotspot highlights and stance shift analytics.
Core “arena” for structured argumentation. Real-time updates: arguments, counter-arguments,
evidence.
Browse-Debates: The Browse-Debates overview at app/debates/page.tsx lists active and
archived debates with DebateCard components showing time remaining, phase status and
popularity. Users can filter by Topic, Issue or Motion and sort by recency or engagement.
Displays active and archived debates by popularity/recency.
Debate-Forum: Under app/debates/[debateId]/forum/page.tsx, the meta-discussion pane
captures audience Q&A and referee notes. Posts are stamped by phase and submitted through
a moderator-gated queue. Export buttons allow transcript downloads and archive playback
setup. Governance proposals here.
Meta-discussion about debate structure, not direct argumentation.
Create-Debate: The Create-Debate page at app/debates/new/page.tsx offers a form linking to a

parent Motion or Position, selecting debate format, scheduling phases and inviting participants.
AI auto-invites existing camp members and generates calendar blocks. Submissions call
createDebate server action which seeds Realtime channels and phase records pending
moderation.
Start new debates tied to a Motion/Position. Moderation required before going live. Fields:
Parent Motion, Format (Open Async / Timed / Panel / Log‑only), Participants/Positions,
Schedule, Phase timings, Rules, Judge/Referee (optional), Audience Q&A (on/off). Assist:
Auto‑invite position members; calendar blocks; phase presets. Rules: Requires ≥2 active
positions; phase locks; content policy ack. Routes & Actions: GET /create/debate?motion= •
createDebate() seeds phases and channels.
Solution
Solutions synthesize debate outcomes into community-backed proposals under
app/solutions/[solutionId]. The Solution page hosts a collaborative rich-text editor with CRDT
support, version snapshots and consensus gauges. Stakeholder panels and impact timelines
track real-world adoption.
Purpose: Turn debate outcomes into actionable proposals and track adoption.
Primary UI: Collaborative editor (tiptap or equivalent), consensus gauge, vote breakdowns,
impact timeline, working‑group panel, discussion forum.
Data/Perf: CRDT‑friendly fields; patch persistence; version snapshots and diffs; Realtime
support updates; voting models (approval/score/RCV/quadratic optional).
Permissions: Authors & moderators write; readers vote/react; states: Draft → Review →
Published → Accepted.
Metrics: Support rate, review cycle time, accepted solutions, impact updates.
app/solutions/[solutionId]/page.tsx renders the final proposal summary alongside the linked
debate context, a vote breakdown census bar and a working-group panel. Editors collaborate
via a tiptap-based component pushing CRDT patches over realtime channels. Version diffs load
on demand.
Synthesized outputs of debates. Census snapshot: community support weighting.
Browse-Solutions: At app/solutions/page.tsx, top-voted solutions across Issues or Topics appear
in a responsive grid of SolutionCard components. Filters allow users to explore by adoption
state (Draft, Review, Published, Accepted). Census bars animate vote changes in real time.
Explore solutions per Issue or across Topics.

Solution-Forum: The Solution-Forum under app/solutions/[solutionId]/forum/page.tsx supports
change-request threads, vote-explanation comments and impact update posts. A timeline view
maps milestones to discussion threads and all interactions persist through Supabase with RLS
enforced. Governance proposals here.
Forum discussions around refining proposed solutions.
Create-Solution: The Create-Solution route at app/solutions/new/page.tsx is a Client
Component form capturing problem statement, proposal text, stakeholders, cost/risk metrics,
KPIs, timelines and voting method. AI assists with feasibility checklists, risk prompts and KPI
templates. On submit, the createSolution server action writes the initial version and census
snapshot, then redirects the user after moderation approval.
Form for drafting, linking to evidence, optionally AI-assisted summarization. Fields:
Parent Motion/Debate, Problem statement, Proposal, Stakeholders, Costs/Risks, KPIs,
Timeline/Milestones, Dependencies, Voting method (Approval/Score/RCV/Quadratic),
Working‑group setup. Assist: Feasibility checklist; risk prompts; KPI templates; OG image
preview. Rules: Versioned docs; votes gated by community rules. Routes & Actions: GET
/create/solution?motion= • createSolution() + initial version snapshot.

## 13. Flows

Discover relevant Topics/Issues/Motions via Home/Explore
Promote unstructured posts/ideas into Issues or Motions (guided + AI assist)

* Topic-Forum posts → Issue/Motion
* Issue-Forum proposals → Motion
* Motion-Forum disputes → Debate
Orient on an Issue (definitions, shared evidence, related motions)
Take a stance on a Motion (5‑point Stance-Bar; optional confidence)
Join a Position Room (camp thesis; arguments; evidence; coordination)
Escalate to a Debate when counter-positions exist (live arena + threaded
forum) Synthesize a Solution (collaborative editor, feasibility checks, consensus

voting) Adopt & track impact (working groups, updates, timelines, analytics)
Promotion/escalation functions. AI Assist features: summarization, duplicate detection, critique
prompts, feasibility checklists, etc.
New: Governance Flow in Forums: Propose rule → Debate thread → Vote (yes/no + slider/QV)
→ Enforce (update RLS/moderation).

## 14. Stack & Implementation

Stack: Next.js 15 (App Router) with React Server Components for data‑heavy reads and Client
Components for interactivity; Supabase Postgres (RLS), Auth, Storage, and Realtime;
TailwindCSS design tokens; route handlers under app/api/*; server actions for mutations.
Realtime: Live stance bars, debate messages, collaborative solution editing, notifications.
Supabase postgres_changes patches on stance counts, notifications, argument feeds, debates,
etc.
RLS & Roles: Public read with scoped write (owners, moderators, stance members). Drafts
remain hidden; edits double‑checked in policy.
Confirmed end-state build: React/Next.js app, Supabase Postgres, Vercel, Auth.js, moderation
via OpenAI.
Document strategy: Hybrid Master Document + Modular Artifacts (master.md plus
openapi.yaml, SQL, middleware.ts, etc.).
Added Census subsystem: stances recorded at each stage (Topic, Issue, Motion, etc.),
aggregated snapshots, realtime updates.
Moderation pipeline: every Create- page (Topic, Issue, Motion, Position, Debate, Solution)
mentions AI moderation + human review queue.

## 15. Performance, Accessibility, i18n

Performance Budgets: Aim for LCP " 2.5s, INP (Interactivity) " 100ms, CLS (layout shift) " 0.1.
Use SSR caching for public pages, lazy-load images/attachments, and virtualize long lists
(feeds, arguments) to meet speed goals.
Accessibility: Keyboard Navigation: All interactive elements (tabs, modals, carousels) are
reachable via Tab/Enter. Keyboard shortcuts (e.g., “J/K” to scroll feed) may be added.
ARIA/Labels: Form controls and buttons have aria-labels (e.g., “Set stance to Agree”). Live
regions announce updates (e.g., “Stance submitted”). Contrast: Ensure all text ≥4.5:1 contrast.
E.g., status messages on colored badges. Screen Readers: Layout uses semantic HTML (nav,

article, aside). Modal dialogs trap focus and have role="dialog". Census Visualization: Textual
summaries accompany charts (e.g., “62% Agree (310 of 500 voters)”). All color combinations
meet WCAG AA (contrast ratio ≥4.5:1). Test using automated tools (axe).
Internationalization (i18n): UI text is extracted via i18n strings. Support for RTL (Arabic/Hebrew)
by mirroring layout (headings, tabs). Dates/times are localized per user locale (Moment.js or
Intl). Units/ordering adapt to locale. Copy strategy: keys in code, with locale JSON files; avoid
embedding user content in images. Translation: Design allows multi-language by pulling all
labels via a translation function. No hard-coded strings in components.

## 16. Analytics & Telemetry

Event Tracking: The app emits structured analytics events via an internal analytics service or
third-party (e.g., Snowplow, Segment). Sample events: page_view (payload {page: string,
userId?, params}). promote_clicked ({postId, suggestedTo: 'motion'|'issue'}). stance_submitted
({objectType: 'Motion', objectId, stance:1-5}). argument_submitted, evidence_added,
solution_voted, etc. Add governance events (proposal_submitted, vote_cast).
Payloads: Include relevant IDs, user roles, timestamps, and contextual metadata (e.g., whether
AI was used).
Error Logging: Uncaught errors and API failures are logged (e.g., via Sentry). Sensitive info is
stripped. For example, a 500 on /api/posts will log userId and request payload without personal
data.
Privacy: Analytics do not capture PII. Consent required for demographic tracking. (Adhere to
GDPR/CCPA guidelines.)
Metrics collected include time-to-first-action, conversion rates (e.g., post→motion,
debate→solution), and engagement (DAU/MAU, average stance submissions per user).

## 17. Security & Privacy

Threat Model: MWV must mitigate misinformation, manipulation, and harassment. Supply
chains: content posted by users may be malicious. Main threats: bot-generated stance-events,
coordinated brigading, doxxing via evidence.
PII Classes: User Data: Email hashes, IP hashes (for anti-fraud), geolocation opt-in. Content
Data: Posts, arguments (user-generated). Behavioral: Stance events.
Storage Rules: PII (email, IP) is hashed. Email is never exposed to other users. IP is only used
for abuse detection and stored as a hash. All personal data can be deleted on user request.

Retention: Posts/stances indefinite unless deleted; logs/analytics 1 year then anonymized.
Consent: Explicit consent flows for optional data (e.g., location for demographic filters).
Abuse Prevention: Rate-limit stance submissions per object (e.g., max 1/day flip). CAPTCHAs
for suspicious signups. Reputation-based throttling. Moderators can flag or freeze threads.
Legal: Comply with copyright for evidence (just link or metadata, not copy full articles). Provide a
Terms of Service and Privacy Policy outlining content ownership (users retain copyright, license
to platform to display). ToS: Age 13+, prohibit illegal/hate/misinfo (flagged via rep).
DMs: End-to-end encrypted, with block/report feeding rep.

## 18. Testing & QA

Acceptance Criteria (Given/When/Then): Define a BDD style spec for core flows. Examples: -
Given a logged-in user on a Motion page, when they submit a stance, then the census bar
updates and the stance is recorded. - Given a moderator, when they flag evidence, then
evidence appears in moderator queue.
Component Tests: For each component: - Render in loading, empty, error, data states and verify
DOM. - Interactions: clicking buttons triggers correct callbacks. - Accessibility: snapshot ARIA
attributes, keyboard focus tests.
Page Tests: Use Cypress/Playwright: - Home loads feed; infinite scroll works. - Topic Follow
updates feed tags. - Issue page allows switching tabs and showing evidence. - Motion page
stance join works optimistically and persists. - Position Room content saves and version
history
records. - Debate Canvas zooms and pans to 100 nodes. - Solutions vote flow ends in
working-group creation prompt. Add tests for forums/voting.
Manual QA Script: 1. Onboarding: Sign up, fill profile. 2. Feed & Explore: Scroll Home, click
topics, follow a topic, check feed reflects. 3. Posting & Promotion: Create micro-post with and
without evidence. Promote one to motion; verify modal fields. Cancel and confirm flows. 4.
Stance & Debate: Join a stance, enter Position Room. Create/Edit thesis, add
argument/evidence. Escalate to Debate. 5. Solution: Vote on solution, simulate adoption, start a
working group. 6. AI Features: Use the Summarizer on a debate; verify labeled output. Disable
AI and ensure no suggestions appear. 7. Accessibility: Navigate entire site with keyboard only
(Tab, Enter). Check screen reader alerts (manual SR tool). 8. Internationalization: Switch locale
(if UI allows); verify text and layout adapt. 9. Responsive: Test on mobile/desktop sizes: header
collapses to burger menu, bottom tabs on mobile. 10. Security: Attempt actions as guest vs user
vs mod. Try unauthorized updates (should be blocked). 11. Governance: Propose/vote on rule in

forum; verify enforcement.
Record any deviations, broken flows, or inconsistencies during QA.

## 19. Operational Playbook

Environment Variables (.env): NEXT_PUBLIC_SUPABASE_URL,
NEXT_PUBLIC_SUPABASE_ANON_KEY (used on client). SUPABASE_SERVICE_KEY
(server-only for admin operations). DATABASE_URL (for migrations). JWT_SECRET (for auth if
custom). OPENAI_API_KEY (for AI prompts). ANALYTICS_WRITE_KEY (if using Segment).
Feature Flags: Use a simple toggling system (e.g., LaunchDarkly or DB flags) for beta features
(e.g., experimental summarizer).
Seed Script: Include a Node.js or SQL script (yarn db:seed) to populate initial Topics, a few
Issues/Motions, and test users (e.g., Admin/mod accounts).
CI/CD: On merge to main, run linting, tests, and yarn build. Migrations: on deployment, run
supabase db push or migration CLI for Postgres. Deploy via Vercel or Netlify for Next.js
frontend, and ensure serverless functions (if used) have the env vars. Verified integration with
Supabase (Auth, Realtime), and analytics pipelines.
Deployment Checklist: Merge code, ensure passing CI. Run supabase db push to apply new
schema. Set production env vars (including DB URL with ?pgbouncer=true for Next.js). Deploy
backend (if any separate). Deploy frontend (Next.js). Verify ephemeral state on staging. Smoke
test key flows (signup, post, stance). Monitor logs for errors. Launch: announce, monitor
analytics & errors (Sentry).
Monitoring: Use Supabase’s logs and a monitoring tool. Alert on 5xx rate or suspicious DB
queries. Dashboard shows active debates, solutions, bot signals.
Backups: Daily Supabase snapshots; RTO 1hr, RPO 5min.
Scale: "100 users at launch; Hobby tiers.
Budget: $1000; Supabase ~$25/mo, OpenAI ~$100/mo cap.
Open-Source: Closed for now to protect IP; revisit post-MVP.

## 20. References

* Brainstorming/Design Docs: MWV vision and design principles.
* MWV Blueprint/Documents: Core principles and AI augmentation.

* USWDS/Civic guidelines: Design tokens and accessibility.
* Comment/Thread UX: Nested comments and collapsing strategy.
* Design Systems: Ultimate Guide to Smart UX | Maxiom Technology | by Antonio Chagoury |
Aug, 2025 | Medium.
* Comment/Thread UX: Comment course lesson | Uxcel.
* Creating A Design System: Creating a UI Inventory | UXPin.
* Browse Topics Page.
* Topic Page.
* sort - Which comment sorting order makes more sense on blogs? - User Experience Stack
Exchange.
* Accessibility: native comments threading not visible to screenreader - Bugs - Ghost Forum.
