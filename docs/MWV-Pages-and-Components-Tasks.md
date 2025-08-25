# MWV Pages and Components — UI/UX Development Status (Ordered & Formatted)

> All pages use the shared header `AppMenuBar` for consistent navigation unless noted.

## Pages

<!-- 1) Core navigation & discovery -->

## **Home (`src/app/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`AppMenuBar`, `HeaderHero`, `FeedTabs`, `Composer`, `PostCard`, `RightRail` (Trending/Suggested), `Sidebar`.

### **Description:**

Three-column layout (Sidebar / Main Feed / Right Rail) with evidence-first feed and a compact, non-overlapping header search.

### **Purpose:**

Provide a fast, welcoming reading and posting experience; surface trending civic objects; encourage following Topics.

### **UI Design:**

Bounded header search (280–360px); segmented FeedTabs; cards use soft elevation and rounded corners; `CensusBar v2` replaces legacy stance bars; 8‑pt spacing; Right Rail shows Trending Motions and Suggested Topics.

### **UX Design:**

`/` focuses composer; `Cmd/Ctrl+Enter` posts; `j/k` navigates cards; `Enter` opens; focus rings on all controls; skeletons for loading; empty state suggests Topics to follow.

### **Brainstorm:**

Inline quick poll in Composer; "Reading mode" toggle; micro-surveys on evidence quality.

## **Explore (`src/app/explore/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

Grid lists for `TopicCard`/`IssueCard`/`MotionCard`/`PositionCard`/`DebateCard`/`SolutionCard`, filter chips, search.

### **Description:**

Discovery hub showing curated and filterable grids of civic objects with quick follow/join actions.

### **Purpose:**

Help users find Topics, Issues, and Motions worth engaging with.

### **UI Design:**

Masonry/regular grid with card aspect harmony; filter bar with active-chip row; hover state reveals Follow micro-button on Topic cards.

### **UX Design:**

Filters announce on change; removable active chips; keyboard focus order left→right, top→bottom; empty state presents 6 curated Topics.

### **Brainstorm:**

"Collections" (editor picks); time-window filter (24h/7d/30d); map of geo-tagged Issues.

## **Search (`src/app/search/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Search field in header, results tabs (All/Topics/Issues/Motions/People).

### **Description:**

Unified search with scoped result tabs.

### **Purpose:**

Quickly find relevant objects across MWV.

### **UI Design:**

Header search follows Home constraints; results as `List Card v2` with highlighted matches.

### **UX Design:**

Keyboard navigation between results and tabs; recent queries; empty state teaches advanced filters.

### **Brainstorm:**

Saved searches; query suggestions; search operators cheat-sheet.

<!-- 2) Topic & Issue model -->

## **Topics (slug) (`src/app/topics/[slug]/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`Topic/Issue Header v2` (title, desc, Follow), tabs (Issues/Motions/Forum), `IssueCard`, small `CensusBar v2`.

### **Description:**

Topic hub with a succinct header and tabbed lists that keep context visible.

### **Purpose:**

Orient users to a Topic and drive following plus downstream participation.

### **UI Design:**

Large H1, 1–2 line description, Follow button with count; tabs underline; no right rail by default for focus.

### **UX Design:**

Follow toggles with optimistic UI; description truncates after 2 lines with “More”; tabs change content without full reload.

### **Brainstorm:**

Topic health meter (activity, evidence density); related Topics chip row.

## **Topics → Issue (`src/app/topics/[slug]/issues/[issueId]/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`Breadcrumbs`, `Topic/Issue Header v2`, motions list via `MotionCard`, `CensusBar v2`, `EvidencePanel`.

### **Description:**

Issue-focused view inside a Topic, highlighting motions and top evidence.

### **Purpose:**

Move users from interest to action (vote, add stance, contribute evidence).

### **UI Design:**

Single-wide content column; Motion cards with compact `CensusBar v2`; Evidence panel promoted near top.

### **UX Design:**

Breadcrumbs enable backtracking; inline evidence attach; keyboardable stance controls.

### **Brainstorm:**

"Starter pack" evidence suggestions; motion sorting by controversy.

## **Issues (id) (`src/app/issues/[id]/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`Topic/Issue Header v2`, tabs (Motions/Evidence/Forum), `MotionCard`, `CensusBar v2`, `EvidencePanel`.

### **Description:**

Dedicated Issue page with clear problem definition and paths to vote, debate, and cite sources.

### **Purpose:**

Centralize deliberation around one Issue.

### **UI Design:**

No right rail; wide single column emphasizes clarity; `CensusBar v2` standard; evidence-first hierarchy.

### **UX Design:**

Tabs preserve scroll position; stance input keyboard support; forum opens inline with preview.

### **Brainstorm:**

Issue timeline (milestones, updates); credibility indicators from community rating.

## **Issues/New (`src/app/issues/new/page.tsx`)**:

### **Status:**

Implemented (simple).

### **Uses:**

`CreateWizard`, inline validation.

### **Description:**

Guided form to publish a new Issue.

### **Purpose:**

Ensure clear, well-scoped Issues with optional starting evidence.

### **UI Design:**

Minimal, step-based form; red outline + concise error text per field; helper text under Title and Description.

### **UX Design:**

Validate on blur + submit; “Save draft” secondary; success toast links to Issue page.

### **Brainstorm:**

Inline writing assistant for clarity and neutrality.

<!-- 3) Motions & Positions -->

## **Motions (id) (`src/app/motions/[motionId]/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

Motion header, `MotionCensusRealtime`, `CensusBar v2`, `StanceSelector v2`, `EvidencePanel`, forum open button.

### **Description:**

Motion detail with current stance distribution and immediate input.

### **Purpose:**

Drive voting with context and promote evidence-backed stances.

### **UI Design:**

Census above the fold; stance selector styled as 5 radio chips; confidence/evidence options inline.

### **UX Design:**

Arrow keys cycle stance; Space selects; attaching evidence doesn’t lose selection; optimistic vote update.

### **Brainstorm:**

Compare-with-peers mini-chart; reminder to re-evaluate after new evidence.

## **Motions/New (`src/app/motions/new/page.tsx`)**:

### **Status:**

Implemented (simple).

### **Uses:**

`CreateWizard`, inline validation.

### **Description:**

Form to propose a motion under a Topic.

### **Purpose:**

Capture clear, single-sentence motion statements.

### **UI Design:**

Prominent statement field with microcopy; Topic selector; optional context block.

### **UX Design:**

On submit, scroll to first error; keep input on failed submit; success toast with CTA to invite others.

### **Brainstorm:**

Statement quality linter; duplicate detection.

## **Positions/New (`src/app/positions/new/page.tsx`)**:

### **Status:**

Implemented (simple).

### **Uses:**

`StanceSelector v2`, evidence attach.

### **Description:**

Lightweight flow to record a stance and (optionally) confidence and evidence.

### **Purpose:**

Reduce friction to contribute positions on motions.

### **UI Design:**

5-option stance pills; attach area as drop zone; preview of attached evidence.

### **UX Design:**

Required stance; inline error; `Cmd/Ctrl+Enter` to publish.

### **Brainstorm:**

Post-publish share card; quick link to forum thread.

## **Position Forum (`src/app/positions/[positionId]/forum/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

`ForumThread`, `PresencePill`.

### **Description:**

Discussion thread for a specific position.

### **Purpose:**

Allow focused, source-citing debate around a position.

### **UI Design:**

Single column thread; subtle dividers; inline reply.

### **UX Design:**

`r` to reply; `Cmd/Ctrl+Enter` to send; live presence count.

### **Brainstorm:**

Thread summary AI; evidence extraction panel.

<!-- 4) Discussion spaces (Forums) -->

## **Forum (id) (`src/app/forums/[forumId]/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`ProposalForm`, `ProposalList`, `VoteWidget`, `ForumThread`, `PresencePill`.

### **Description:**

Full forum view with proposals and threaded discussion.

### **Purpose:**

Coordinate group decision-making with voting.

### **UI Design:**

Proposals as cards; votes inline as micro-bars; thread below.

### **UX Design:**

Submit with `Cmd/Ctrl+Enter`; optimistic vote; presence feedback.

### **Brainstorm:**

Proposal templates; quorum indicators.

## **Forums (list) (`src/app/forums/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

List shell.

### **Description:**

Browse forums across entities.

### **Purpose:**

Entry point to ongoing discussions.

### **UI Design:**

Simple list with unread badges; sort dropdown.

### **UX Design:**

Keyboardable list; open in same tab with breadcrumbs.

### **Brainstorm:**

Topic/Issue grouping; subscription control.

## **Topic Forum (`src/app/topics/[slug]/forum/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`ForumThread`, `PresencePill`.

### **Description:**

Forum scoped to a Topic.

### **Purpose:**

Keep discussions contextual to Topic scope.

### **UI Design:**

Sticky Topic title/context; standard thread.

### **UX Design:**

Same shortcuts as global forum.

### **Brainstorm:**

Topic FAQ pinning.

## **Issue Forum (`src/app/issues/[id]/forum/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`ForumThread`, `PresencePill`.

### **Description:**

Forum scoped to an Issue.

### **Purpose:**

Focused deliberation with evidence at hand.

### **UI Design:**

Sticky Issue summary block.

### **UX Design:**

Quick insert of evidence citations.

### **Brainstorm:**

Auto-thread summaries.

## **Motion Forum (`src/app/motions/[motionId]/forum/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`ForumThread`, `PresencePill`.

### **Description:**

Forum scoped to a Motion.

### **Purpose:**

Discuss arguments around the motion language.

### **UI Design:**

Shows current `CensusBar v2` near header.

### **UX Design:**

Vote shortcut in thread header.

### **Brainstorm:**

Debate-mode toggle per thread.

## **Debate Forum (`src/app/debates/[debateId]/forum/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`ForumThread`, `PresencePill`.

### **Description:**

Forum scoped to a Debate.

### **Purpose:**

Side-aware conversation.

### **UI Design:**

Side badges; subtle color accents.

### **UX Design:**

Filter by side.

### **Brainstorm:**

Judge commentary lane.

## **Solution Forum (`src/app/solutions/[solutionId]/forum/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`ForumThread`, `PresencePill`.

### **Description:**

Forum scoped to a Solution.

### **Purpose:**

Implementation-focused dialogue.

### **UI Design:**

Task checklist snippet at top (read-only).

### **UX Design:**

Link to solution changes from posts.

### **Brainstorm:**

"Call for help" flags.

<!-- 5) Debates -->

## **Debates (list) (`src/app/debates/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

`DebateCard`, filters.

### **Description:**

Listing of debates, their status, and next event time.

### **Purpose:**

Help users browse and join debates.

### **UI Design:**

Cards with proposition and sides summary; status chips.

### **UX Design:**

Filter by status; keyboard focusable cards; empty state invites proposing a debate.

### **Brainstorm:**

Calendar integration; bookmark debates.

## **Debates (id) (`src/app/debates/[debateId]/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Two-column layout, `CensusBar v2`, argument composer.

### **Description:**

Debate canvas with arguments grouped by side.

### **Purpose:**

Structure real-time or asynchronous arguments.

### **UI Design:**

Sticky summary column; readable argument blocks; subtle side color accents.

### **UX Design:**

Add-argument opens side-aware composer; keyboard shortcuts for quoting.

### **Brainstorm:**

Timer for live rounds; judge/observer roles.

## **Debates/New (`src/app/debates/new/page.tsx`)**:

### **Status:**

Implemented (simple).

### **Uses:**

`CreateWizard`.

### **Description:**

Simple form to define a new debate.

### **Purpose:**

Encourage structured propositions and sides.

### **UI Design:**

Stepper for proposition → sides → schedule.

### **UX Design:**

Inline validation; preview before publish.

### **Brainstorm:**

Templates for common formats (Oxford, Lincoln-Douglas).

<!-- 6) Solutions -->

## **Solutions (list) (`src/app/solutions/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

`SolutionCard`, filters.

### **Description:**

Discoverable solutions with maturity and impact hints.

### **Purpose:**

Surface actionable outcomes tied to Issues.

### **UI Design:**

Grid cards; maturity/status chip; small evidence count chip.

### **UX Design:**

Filter by topic, maturity; empty state with submission CTA.

### **Brainstorm:**

Impact estimator preview; success stories carousel.

## **Solutions (id) (`src/app/solutions/[solutionId]/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

`EvidencePanel`, forum open.

### **Description:**

Solution detail with goal, steps, and evidence.

### **Purpose:**

Help users assess viability and contribute improvements.

### **UI Design:**

Title + summary; sectioned detail; right-aligned forum button.

### **UX Design:**

Inline anchor nav; sticky CTA.

### **Brainstorm:**

Implementation checklist; dependency map.

## **Solutions/New (`src/app/solutions/new/page.tsx`)**:

### **Status:**

Implemented (simple).

### **Uses:**

`CreateWizard`.

### **Description:**

Submit a new solution proposal.

### **Purpose:**

Gather concrete proposals tied to Issues.

### **UI Design:**

Structured fields for problem fit, resources, risks.

### **UX Design:**

Validate on blur; friendly helper text; success toast.

### **Brainstorm:**

Auto-link to related Issues.

<!-- 7) Messaging & Profiles -->

## **DMs (list) (`src/app/dms/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Two-pane inbox.

### **Description:**

Direct message inbox with thread previews.

### **Purpose:**

Private coordination.

### **UI Design:**

Left thread list; right conversation preview; unread bold.

### **UX Design:**

Arrow keys move list; `Enter` opens; search filters.

### **Brainstorm:**

Pin important threads; labels.

## **DMs (conversation) (`src/app/dms/[conversationId]/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Chat view, composer.

### **Description:**

Conversation view with attachments.

### **Purpose:**

One-to-one or small group discussion.

### **UI Design:**

Bubbles with timestamps; avatar stack for group.

### **UX Design:**

`Cmd/Ctrl+Enter` sends; `Shift+Enter` newline.

### **Brainstorm:**

Quoted replies; message reactions.

## **Profile (`src/app/profile/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Editable fields.

### **Description:**

User edits display details.

### **Purpose:**

Personalization and identity.

### **UI Design:**

Simple form with live preview card.

### **UX Design:**

Inline validation; success toast.

### **Brainstorm:**

Profile completeness meter.

## **Profile (username) (`src/app/profile/[username]/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Profile header, tabs.

### **Description:**

Public profile with content tabs.

### **Purpose:**

Showcase a user’s contributions.

### **UI Design:**

Avatar, name, follow button; tabs (Posts/Motions/Evidence).

### **UX Design:**

Follow toggle with count; keyboardable tabs.

### **Brainstorm:**

Endorsements; credibility graph.

## **Notifications (`src/app/notifications/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Grouped list.

### **Description:**

Recent activity and settings link.

### **Purpose:**

Keep users informed without overwhelm.

### **UI Design:**

Group by day; subtle separators; action affordances.

### **UX Design:**

Mark read/unread; batch actions.

### **Brainstorm:**

Digest modes; quiet hours.

## **Settings (`src/app/settings/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Toggles, forms.

### **Description:**

Preferences for account, theme, accessibility.

### **Purpose:**

Personal control center.

### **UI Design:**

Sectioned panels; ≥44×44 targets; helper text.

### **UX Design:**

Autosave where safe; undo toast.

### **Brainstorm:**

Accessibility presets.

<!-- 8) System / Meta -->

## **Onboarding (`src/app/onboarding/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Checklist.

### **Description:**

First-run setup tasks.

### **Purpose:**

Guide new users to value quickly.

### **UI Design:**

Progress bar; friendly illustrations.

### **UX Design:**

Save progress; skip steps; resume later.

### **Brainstorm:**

Personalized topic suggestions.

## **Routes Catalog (`src/app/routes/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

Link grid.

### **Description:**

Directory of major app routes.

### **Purpose:**

Developer/operator navigation.

### **UI Design:**

Tiles with short descriptions.

### **UX Design:**

Search/filter; copy route path.

### **Brainstorm:**

Health status badges per route.

## **Admin (`src/app/admin/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Metrics cards, moderation queue, audit log.

### **Description:**

Operational overview and controls.

### **Purpose:**

Monitor health and moderate content.

### **UI Design:**

KPI cards grid; queue table; log list.

### **UX Design:**

Bulk actions; keyboard shortcuts; filters by severity.

### **Brainstorm:**

Alerting thresholds; export.

## **Admin Moderation (`src/app/admin/moderation/page.tsx`)**:

### **Status:**

Implemented (basic).

### **Uses:**

Queue shell.

### **Description:**

Focused moderation queue.

### **Purpose:**

Efficient review and action.

### **UI Design:**

Triage list with flags; detail drawer.

### **UX Design:**

Approve/Reject hotkeys; evidence preview.

### **Brainstorm:**

Assisted triage via heuristics.

## **About (`src/app/about/page.tsx`)**:

### **Status:**

Implemented (static).

### **Uses:**

Long-form content.

### **Description:**

Explains mission and principles.

### **Purpose:**

Build trust through transparency.

### **UI Design:**

Left table of contents; anchored sections.

### **UX Design:**

In-page anchor links; readable line length.

### **Brainstorm:**

Team profiles; timeline.

## **Privacy (`src/app/privacy/page.tsx`)**:

### **Status:**

Implemented (static).

### **Uses:**

Long-form content.

### **Description:**

Privacy policy sections.

### **Purpose:**

Inform users of data practices.

### **UI Design:**

Clear headings; callouts for key points.

### **UX Design:**

Anchor nav; last updated date.

### **Brainstorm:**

Plain-language summary.

<!-- 9) Personal dashboards -->

## **My Topics (`src/app/my/topics/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`TopicCard`, filters.

### **Description:**

List of followed Topics.

### **Purpose:**

Personal hub for interests.

### **UI Design:**

Card list; sort by activity.

### **UX Design:**

Unfollow inline; bulk actions.

### **Brainstorm:**

Digest frequency per Topic.

## **My Issues (`src/app/my/issues/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`IssueCard`.

### **Description:**

Issues created or followed by the user.

### **Purpose:**

Track personal problem spaces.

### **UI Design:**

List with activity indicators.

### **UX Design:**

Quick jump to Evidence/Forum.

### **Brainstorm:**

Reminders for stale Issues.

## **My Motions (`src/app/my/motions/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`MotionCard`, `CensusBar v2`.

### **Description:**

Motions I proposed or follow.

### **Purpose:**

Monitor outcomes and votes.

### **UI Design:**

Compact cards; status chips.

### **UX Design:**

Revisit stance prompt when census shifts.

### **Brainstorm:**

Shareable summary card.

## **My Positions (`src/app/my/positions/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

Position list.

### **Description:**

All positions I’ve taken.

### **Purpose:**

Personal stance ledger.

### **UI Design:**

Stance chip + confidence; evidence count.

### **UX Design:**

Edit stance; attach more evidence.

### **Brainstorm:**

Reflection prompts.

## **My Debates (`src/app/my/debates/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`DebateCard`.

### **Description:**

Debates I’m in or following.

### **Purpose:**

Keep track of debate activity.

### **UI Design:**

Cards with next session time.

### **UX Design:**

RSVP; reminders.

### **Brainstorm:**

Debate recap digest.

## **My Solutions (`src/app/my/solutions/page.tsx`)**:

### **Status:**

Implemented.

### **Uses:**

`SolutionCard`.

### **Description:**

Solutions I created or support.

### **Purpose:**

Manage contributions and updates.

### **UI Design:**

Cards with maturity chip.

### **UX Design:**

Subscribe to updates; changelog link.

### **Brainstorm:**

Impact tracking widget.

---

## Components (Ordered)

<!-- Foundations -->

## **AppMenuBar**:

### **Status:**

Implemented.

### **Description:**

Global header with brand, primary nav, bounded search, utilities.

### **Purpose:**

Consistent navigation and quick access.

### **UI Design:**

Search width 280–360px; overflow collapses into “More”; visible focus rings; ≥44×44 targets.

### **UX Design:**

Esc closes search; dropdowns trap focus; keyboard navigation for menus.

### **Brainstorm:**

Recent searches; command palette.

## **Sidebar**:

### **Status:**

Implemented.

### **Description:**

Global vertical navigation.

### **Purpose:**

Quick access to major areas and pinned Topics.

### **UI Design:**

Icon+label; active pill; collapses to icons.

### **UX Design:**

Tooltips on hover/focus; keyboard support.

### **Brainstorm:**

Reorder via drag.

## **HeaderHero**:

### **Status:**

Implemented.

### **Description:**

Optional hero banner used on Home.

### **Purpose:**

Welcome + orient with primary actions.

### **UI Design:**

8‑pt spacing; large headline; spaced CTAs.

### **UX Design:**

Keyboard-focusable buttons; skip link.

### **Brainstorm:**

Contextual hero variants.

## **Card / CardExpandable / Chip / SectionTitle**:

### **Status:**

Implemented.

### **Description:**

UI primitives for consistent visual language.

### **Purpose:**

Compose lists and information blocks.

### **UI Design:**

Soft elevation; rounded corners; concise titles.

### **UX Design:**

Clear hover/pressed/selected states.

### **Brainstorm:**

Card density presets.

## **Skeleton**:

### **Status:**

Implemented.

### **Description:**

Shimmer placeholders while content loads.

### **Purpose:**

Reduce perceived latency.

### **UI Design:**

3-line text blocks, media boxes.

### **UX Design:**

Never persist >4s without update.

### **Brainstorm:**

Adaptive skeleton lengths.

## **ModalDialog**:

### **Status:**

Implemented.

### **Description:**

General-purpose modal.

### **Purpose:**

Focused tasks and confirmations.

### **UI Design:**

Focus trap; clear hierarchy; right-aligned primary.

### **UX Design:**

Esc closes; return focus to trigger.

### **Brainstorm:**

Sheet-style variant.

<!-- Navigation helpers -->

## **Breadcrumbs**:

### **Status:**

Implemented.

### **Description:**

Path navigation.

### **Purpose:**

Aid orientation and backtracking.

### **UI Design:**

Subtle separators; last item is current.

### **UX Design:**

`aria-current="page"`; full keyboard support.

### **Brainstorm:**

Collapsible middle segments.

## **FeedTabs**:

### **Status:**

Implemented.

### **Description:**

Switches the Home feed view.

### **Purpose:**

Segment content (For You / Following / Latest / Heated).

### **UI Design:**

Segmented control; clear selected state.

### **UX Design:**

Arrow keys move; Enter activates.

### **Brainstorm:**

Remember last chosen tab.

<!-- Content cards & evidence -->

## **PostCard / MotionCard / IssueCard / SolutionCard / TopicCard / DebateCard / PositionCard**:

### **Status:**

Implemented.

### **Description:**

Visual summaries mapped to `List Card v2`.

### **Purpose:**

Scannable cards across lists and feeds.

### **UI Design:**

Title, meta, 2–3 line preview; hover reveals secondary actions.

### **UX Design:**

`Enter` opens; Save/Share/Report in overflow.

### **Brainstorm:**

Density toggle (comfortable/compact).

## **EvidencePanel / EvidenceCard / EvidenceAttach**:

### **Status:**

Implemented (panel) / Implemented (partial usage) for cards/attach.

### **Description:**

Add/list evidence with credibility cues.

### **Purpose:**

Elevate sources over opinion.

### **UI Design:**

Evidence capsules with source + excerpt; key-evidence mark.

### **UX Design:**

Drag/drop attach; cite-into-composer; one-click copy quote; attach confirmation.

### **Brainstorm:**

Credibility scoring hints; deduplicate identical sources.

<!-- Data visualization -->

## **StanceBar / MotionCensusRealtime / CensusBar / CensusDonut**:

### **Status:**

Implemented (upgrade to `CensusBar v2`).

### **Description:**

Visualize stance distribution.

### **Purpose:**

Communicate consensus at a glance.

### **UI Design:**

Single rounded bar with fixed stance order; consistent red→gray→green.

### **UX Design:**

Hover/focus labels; text alt list of stances+percent.

### **Brainstorm:**

Compare to similar Motions.

<!-- Inputs & creation flows -->

## **Composer**:

### **Status:**

Implemented.

### **Description:**

Create a new post with optional poll and evidence.

### **Purpose:**

Lower friction to contribute.

### **UI Design:**

Rounded input; icon-pills for Attach/Cite/Poll.

### **UX Design:**

`/` focus; `Cmd/Ctrl+Enter` submit; inline error if empty.

### **Brainstorm:**

Draft autosave.

## **StanceSelector / VotingSlider**:

### **Status:**

Implemented (v2 patterns).

### **Description:**

Input for selecting a stance (+confidence, evidence).

### **Purpose:**

Capture user position clearly.

### **UI Design:**

Five radio-style chips; inline error under group.

### **UX Design:**

Arrow keys cycle; Space selects; no stacked error signals.

### **Brainstorm:**

One-tap “abstain/skip” affordance.

## **CreateWizard**:

### **Status:**

Implemented.

### **Description:**

Multi-step skeleton for creation flows.

### **Purpose:**

Reduce cognitive load.

### **UI Design:**

Stepper; primary/secondary buttons; progress.

### **UX Design:**

Persisted state between steps; validation per-step.

### **Brainstorm:**

Contextual tips per step.

## **ProposalForm / ProposalList / VoteWidget**:

### **Status:**

Implemented.

### **Description:**

Proposals with inline voting.

### **Purpose:**

Group decision flows.

### **UI Design:**

Proposal card + micro-bar results.

### **UX Design:**

Optimistic vote; keyboardable options.

### **Brainstorm:**

Quorum progress indicator.

<!-- Collaboration & presence -->

## **ForumThread / Comment / ArgumentCard / ArgumentForm**:

### **Status:**

Implemented.

### **Description:**

Threaded discussion components.

### **Purpose:**

Facilitate structured debate.

### **UI Design:**

One-level indent; avatars; readable line length.

### **UX Design:**

Quoting; quick evidence attach.

### **Brainstorm:**

Summarize long threads.

## **PresencePill**:

### **Status:**

Implemented.

### **Description:**

Realtime presence indicator.

### **Purpose:**

Social awareness.

### **UI Design:**

Avatar stack + count; tooltip shows names.

### **UX Design:**

Live updates without jitter.

### **Brainstorm:**

Status (typing/speaking) micro-icons.

## **ForumOpenButton**:

### **Status:**

Implemented.

### **Description:**

Opens or creates a forum for an entity.

### **Purpose:**

Shortcut to discussion.

### **UI Design:**

Primary button with presence count.

### **UX Design:**

Same-tab open with breadcrumbs.

### **Brainstorm:**

Deep-link to last read.

<!-- Utilities & advanced -->

## **ToastManager**:

### **Status:**

Implemented.

### **Description:**

Global non-blocking notifications.

### **Purpose:**

Surface transient feedback.

### **UI Design:**

Bottom-right stack; subtle backgrounds.

### **UX Design:**

Auto-dismiss 4–6s; persistent for errors; focus to toast on keyboard trigger.

### **Brainstorm:**

Undo actions.

## **ThemeToggle**:

### **Status:**

Implemented.

### **Description:**

Light/dark switch.

### **Purpose:**

Personalize appearance.

### **UI Design:**

Sun/Moon icon; clear state.

### **UX Design:**

Respects OS preference; keyboard toggle.

### **Brainstorm:**

High-contrast mode.

## **QuickActions / RightRail / TopNav / WorkingGroupPanel / ModerationFlag / AISuggestionButton / QVInterface**:

### **Status:**

Implemented (varying wiring).

### **Description:**

Utility and advanced components.

### **Purpose:**

Speed common tasks and specialized workflows.

### **UI Design:**

Follow host density and spacing; quiet by default.

### **UX Design:**

Keyboardable; discoverable tooltips.

### **Brainstorm:**

Context-aware surfacing.

---

## Status Legend

* **Implemented:** Page/component renders with consistent header and basic UX.
* **Implemented (basic):** Visual shell present, may use mock data; further wiring planned.
* **Implemented (simple):** Skeleton wizard or minimal form.
* **Partial usage:** Component exists and is used in some contexts; extended integration planned.

## Notable Next Steps

* Add deep-links for all Forum tabs and My pages in Routes Catalog and Header menu.
* Integrate `EvidencePanel` or `EvidenceCard` into Motion and Argument flows.
* Expand `ForumThread` to persist and fetch threads; wire moderation.
* Add presence/typing to additional collaborative contexts.
* Build search input wiring and results rendering on Search page.
* Introduce accessibility checks (axe) into CI for all new pages.
