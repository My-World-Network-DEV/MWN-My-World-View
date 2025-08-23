# MWV Development Task List: Enhanced Project Plan with Critical Additions

## Executive Summary

This enhanced task list incorporates critical missing components identified through comprehensive repository analysis and aligns with MWV's civic engagement mission. Based on the current project state (5-band stance census, basic Supabase integration, Next.js 15 with App Router), this updated plan addresses democratic governance, evidence-first principles, and accessibility compliance within the 12-week MVP timeline.

**Key Updates**: Democratic governance moved to Phase 2, evidence system prioritized, real-time features scoped for MVP viability, AI features postponed to Phase 5, desktop-first approach with basic mobile responsive design, and accessibility integration throughout all phases rather than concentrated in Phase 6.

**Repository State**: The project has foundational infrastructure with stance events, census tracking, and basic Motion pages implemented. This plan builds upon existing components while adding missing civic engagement features essential for democratic discourse.

---

## Phase 1: Foundation (Weeks 1-3) ✅ *Enhanced*

### Core Infrastructure & Democratic Foundations

**High-Level Task 1.1: Technical Architecture Setup:** *(Mostly Complete)*

- ✅ Next.js 15 project initialized with App Router configuration
- ✅ TypeScript configured with strict mode and debate entity types
- ✅ Tailwind CSS integrated with custom design system
- ✅ Development environment established with AI coding agent integration
- 🔄 Enhance existing shadcn/ui components with accessibility-first patterns

**High-Level Task 1.2: Database Architecture & Supabase Integration:** *(Partially Complete)*

- ✅ Core PostgreSQL schema implemented (users, topics, issues, motions, stance_events)
- ✅ Basic RLS policies configured for stance events
- ✅ Real-time subscriptions working for stance updates
- ✅ Authentication system functional
- 🆕 Extend schema for forums, proposals, votes tables (governance foundation)
- 🆕 Add evidence table with credibility scoring fields
- 🆕 Implement privacy controls for anonymous stances (enum: public/anonymous/hiddenWeighted)

**High-Level Task 1.3: Core Application Structure:** *(Mostly Complete)*

- ✅ Scalable folder architecture established
- ✅ TypeScript interfaces for core entities implemented
- ✅ API routes following RESTful conventions
- ✅ Base layout components with responsive navigation
- ✅ Environment variables and development workflows configured

**High-Level Task 1.4: Evidence & Privacy Foundation** *(NEW - Critical Addition)*

- Implement evidence database schema with community credibility scoring (1-5 scale)
- Create basic source type classification (academic/government/news/expert/personal)
- Set up privacy controls for anonymous stances with GDPR-compliant consent flows
- Build evidence attachment workflows integrated with existing components
- Implement basic evidence credibility display with visual badges

**High-Level Task 1.5: Accessibility Integration** *(NEW - Cross-Phase Foundation)*

- Integrate axe-core testing into existing Vitest setup for ongoing compliance
- Implement WCAG 2.1 AA foundations (ARIA labels, heading hierarchy, color contrast 4.5:1)
- Set up keyboard navigation patterns for all interactive elements (44px touch targets)
- Create accessibility-first component patterns with proper focus management
- Establish screen reader compatibility with semantic HTML structure

**Dependencies**: None (entry point)  
**AI Agent Focus**: Schema extensions, privacy implementations, accessibility patterns  
**Deliverables**: Enhanced database schema, evidence system foundation, accessibility compliance baseline

---

## Phase 2: Content Creation & Governance (Weeks 2-5) ⚠️ *Significantly Enhanced*

### Democratic Governance & Content Management

**High-Level Task 2.1: Debate Creation Workflow:** *(Building on Existing)*

- 🔄 Enhance existing Motion creation with structured form validation
- Build Topic and Issue creation interfaces with evidence attachment
- Implement debate categorization system with tagging capabilities
- Create debate templates for different types (policy, philosophical, factual)
- Set up content moderation pipeline with automated filtering and human review queues

**High-Level Task 2.2: Media Handling & Rich Content:**

- Integrate file upload system with Supabase storage for evidence documents
- Implement image optimization and responsive display with Next.js Image component
- Create citation and source reference system for evidence-based discussions
- Build link preview generation for external references
- Develop accessibility features for media content (alt text, transcripts, descriptions)

**High-Level Task 2.3: Content Management System:**

- Create debate editing interface with version control and change tracking
- Implement content search functionality with Postgres full-text search
- Build content archiving and organization features for long-term management
- Develop export functionality for debate summaries and analysis reports
- Set up content analytics tracking for engagement metrics

**High-Level Task 2.4: Democratic Governance Foundation** *(MOVED FROM PHASE 5 - Critical)*

- Implement forum database schema (`forums`, `proposals`, `votes` tables) with RLS policies
- Build basic forum components (ProposalForm, simple voting interfaces, vote display)
- Create rule proposal workflows for each entity level (Topic/Issue/Motion/Position forums)
- Implement simple majority voting with 1-5 slider for degree/strictness decisions
- Set up governance-specific moderation queues and transparent resolution processes
- Build forum tabs integration for all entity pages (Topics, Issues, Motions)

**High-Level Task 2.5: Position Room Collaboration** *(NEW - Essential for MVP)*

- Build text-based collaborative thesis editing with simple conflict resolution (last-write-wins)
- Implement within-camp argument aggregation and evidence curation workflows
- Create position membership management and basic presence indicators
- Set up real-time updates for position activities via Supabase channels
- Build cross-position interaction workflows (rebuttal requests, evidence sharing)
- Integrate with existing StanceSelector component for seamless position entry

**Dependencies**: Enhanced Foundation (database schema, evidence system)  
**AI Agent Focus**: Form creation, governance workflows, collaborative editing, real-time features  
**Deliverables**: Democratic governance system, position room collaboration, enhanced content creation

---

## Phase 3: Debate & Consensus (Weeks 3-6) ⚠️ *Enhanced with Evidence Focus*

### Structured Discussion & Evidence-First Discourse

**High-Level Task 3.1: Argument Structure & Threading:** *(Building on Existing)*

- 🔄 Enhance existing argument display with Pro/Con hierarchies (Kialo-inspired)
- 🔄 Extend current stance tracking interface with evolution tracking
- Build argument visualization with tree structures and relationship mapping
- Develop comment nesting with unlimited depth and visual threading indicators
- Set up argument impact voting and quality scoring mechanisms

**High-Level Task 3.2: Consensus Building Tools:** *(Building on Census System)*

- 🔄 Enhance existing census tracking with multiple voting methods support
- 🔄 Extend current StanceBar with consensus measurement and agreement distributions
- Build mediation tools for facilitating productive discussions and conflict resolution
- Develop stance evolution tracking to show how opinions change through discourse
- Set up notification system for engagement updates and consensus milestones

**High-Level Task 3.3: Community Moderation & Governance:** *(Enhanced)*

- Implement community guidelines enforcement with hybrid AI/human moderation
- Create reporting system for inappropriate content with transparent resolution
- Build reputation system rewarding constructive engagement and quality contributions
- Develop role-based permissions for moderators, experts, and community leaders
- Integrate governance tools from Phase 2 for community decision-making

**High-Level Task 3.4: Evidence Curation System** *(NEW - Evidence-First Priority)*

- Build community evidence flagging and validation workflows
- Implement evidence comparison interfaces with credibility displays and visual indicators
- Create source diversity tracking and bias detection alerts for arguments
- Set up evidence export functionality for research use cases and citations
- Build evidence bank curation tools for Issues with collaborative editing
- Integrate credibility scoring with argument quality metrics

**High-Level Task 3.5: Enhanced Real-time Features** *(NEW - Scoped for MVP)*

- 🔄 Extend existing MotionCensusRealtime to all entity types (Topics, Issues, Solutions)
- Build presence indicators for Position Rooms and forums (who's online, typing)
- Create real-time notification system for engagement updates and mentions
- Set up optimized Supabase channel management for performance and cost control
- Implement real-time forum updates and proposal status changes
- Add basic typing notifications for collaborative thesis editing

**Dependencies**: Content Creation & Governance (requires forums and content to moderate)  
**AI Agent Focus**: Evidence workflows, real-time optimization, moderation tools  
**Deliverables**: Evidence-first discussion system, enhanced consensus tools, real-time collaboration

---

## Phase 4: Solutions & Discovery (Weeks 4-7) ⚠️ *Enhanced with Data Portability*

### Discovery, Solutions & Data Ownership

**High-Level Task 4.1: Discovery & Recommendation System:**

- Build intelligent content discovery using collaborative filtering and content-based algorithms
- Implement search functionality with Postgres FTS and semantic search capabilities
- Create personalized debate recommendations based on user interests and engagement history
- Develop trending topics identification and promotion system for timely discussions
- Set up related content suggestions to encourage deeper exploration of topics

**High-Level Task 4.2: Solution Proposal & Refinement:**

- Create solution proposal interface allowing users to suggest actionable outcomes
- Implement collaborative solution editing with basic version control and change tracking
- Build solution evaluation tools with criteria-based assessment and community voting
- Develop implementation pathway tracking for proposed solutions and real-world outcomes
- Set up solution synthesis tools for combining multiple proposals into comprehensive plans

**High-Level Task 4.3: Evidence Curation & Community Validation:** *(Revised Scope)*

- 🔄 Focus on community-driven evidence rating rather than external API integration
- Create evidence rating system allowing community assessment of source quality (1-5 scale)
- Build citation management tools with automatic bibliography generation
- Implement bias detection alerts and diverse perspective encouragement
- Develop evidence visualization tools showing support/opposition patterns for claims
- Set up evidence library sharing and cross-debate evidence reuse

**High-Level Task 4.4: Data Export & Portability** *(NEW - GDPR/Democratic Values)*

- Implement comprehensive user data export functionality (GDPR Article 20 compliance)
- Create debate/argument export formats (JSON, CSV, PDF) for research and backup
- Build API documentation for third-party integrations and open data access
- Set up evidence library import/export functionality for academic research
- Create backup and migration tools for user content and stance history
- Implement audit trail export for transparency and accountability

**High-Level Task 4.5: Advanced Analytics Foundation** *(NEW - Democratic Insights)*

- Implement stance evolution tracking and basic visualization dashboards
- Build engagement analytics for user journey optimization and platform improvement
- Create consensus convergence indicators and trend analysis for moderators
- Set up demographic analysis tools with privacy protection (aggregated only)
- Build foundation for real-world impact tracking and solution adoption metrics
- Create community health dashboards for administrators and moderators

**Dependencies**: Content Creation (requires content to recommend), Evidence System (data to analyze)  
**AI Agent Focus**: Search algorithms, analytics implementation, data export systems  
**Deliverables**: Discovery system, solution workflows, data portability, analytics foundation

---

## Phase 5: AI Integration (Weeks 6-9) ⚠️ *Reduced Scope, Post-MVP Focus*

### Core AI Features & Transparency

**High-Level Task 5.1: Essential AI Features** *(Focused MVP Scope)*

- Implement AI-powered content summarization for long debates and position discussions
- Build basic content analysis for duplicate detection and similar content identification
- Create AI-assisted onboarding with contextual help and progressive disclosure
- Set up comprehensive transparency frameworks for all AI interactions with clear labeling
- Implement rate limiting and cost controls for AI features with usage monitoring

**High-Level Task 5.2: Content Intelligence & Moderation Assistance:**

- Create intelligent notification systems reducing noise while highlighting relevant content
- Develop automated content tagging and categorization for improved organization
- Build AI moderation assistance with bias detection and intervention recommendations
- Implement sentiment analysis for discussion tone monitoring and escalation triggers
- Set up audit trails for all AI-generated content and recommendations

**High-Level Task 5.3: Advanced AI Features** *(Post-MVP Pipeline)*

- Plan integration architecture for fact-checking APIs (PolitiFact, Snopes) via Edge Functions
- Design devil's advocate counter-argument generation for position room balance
- Blueprint feasibility analysis for solution proposals with community input weighting
- Architect bias detection and diverse perspective encouragement systems
- Plan AI coaching features for argument improvement and evidence strengthening

**Dependencies**: Content Creation (data for training), Debate & Consensus (interaction patterns)  
**AI Agent Focus**: Summarization algorithms, transparency systems, moderation assistance  
**Deliverables**: Core AI summarization, transparency framework, moderation assistance

---

## Phase 6: Mobile & Accessibility (Weeks 7-10) ⚠️ *Desktop-First with Mobile Foundation*

### Desktop Optimization & Accessibility Excellence

**High-Level Task 6.1: Desktop Optimization & Basic Mobile** *(Revised Priority)*

- Optimize desktop experience for complex hierarchical navigation and debate trees
- Implement basic mobile responsiveness with Tailwind breakpoints and touch-friendly interfaces
- Create simplified mobile navigation patterns (limit to 2-3 hierarchy levels maximum)
- Build touch-friendly interfaces for stance selection and voting with 44px minimum targets
- Set up progressive disclosure patterns for mobile content consumption (not creation)

**High-Level Task 6.2: Advanced Accessibility Compliance** *(Enhanced Throughout)*

- 🔄 Build upon Phase 1 accessibility foundations with comprehensive WCAG 2.1 AA audit
- Implement advanced screen reader support with proper ARIA live regions and navigation
- Create high contrast mode and customizable visual accessibility features
- Build comprehensive keyboard navigation with shortcuts and logical tab order
- Set up accessibility testing automation and continuous compliance monitoring

**High-Level Task 6.3: Inclusive Experience Design:**

- Create multi-language foundation and RTL layout support preparation
- Implement customizable interface density for different cognitive preferences
- Build reading assistance tools (text-to-speech integration, highlighting, note-taking)
- Develop diverse communication style accommodation for various cultural approaches
- Set up user preference management for personalized accessibility needs

**High-Level Task 6.4: Progressive Web App Implementation:**

- Implement PWA features for offline access to debate content and drafted responses
- Create background sync for civic submissions and stance updates
- Set up push notifications for meeting reminders, vote deadlines, and engagement alerts
- Build home screen integration with shortcuts for common civic tasks
- Optimize performance with Core Web Vitals targets (LCP <2.5s, FID <100ms, CLS <0.1)

**Dependencies**: All core features (needs complete UI to optimize)  
**AI Agent Focus**: Mobile optimization, accessibility compliance, PWA implementation  
**Deliverables**: Desktop-optimized experience, WCAG AA compliance, basic mobile support, PWA foundation

---

## Phase 7: Testing & Launch Preparation (Weeks 1-12) ✅ *Enhanced with Community Focus*

### Comprehensive Quality Assurance & Community Readiness

**High-Level Task 7.1: Automated Testing Infrastructure:** *(Enhanced)*

- 🔄 Extend existing Vitest setup with comprehensive unit testing for governance and evidence systems
- Implement integration testing for complex civic workflows (Topic→Issue→Motion→Position→Solution)
- Create end-to-end testing scenarios covering critical democratic processes and edge cases
- Build performance testing automation with load testing for consensus calculations
- Develop security testing pipeline with vulnerability scanning and RLS policy validation

**High-Level Task 7.2: User Experience Testing:** *(Civic-Focused)*

- Establish user testing program with diverse demographic representation and civic backgrounds
- Implement A/B testing infrastructure for democratic process optimization
- Create accessibility testing protocols with assistive technology validation and real user testing
- Build usability testing procedures for complex debate workflows and hierarchical navigation
- Set up analytics tracking for civic engagement patterns and democratic participation metrics

**High-Level Task 7.3: Quality Assurance & Monitoring:**

- Implement real-time monitoring with civic-specific performance metrics and error tracking
- Create automated quality gates preventing deployment of democratically harmful features
- Build comprehensive logging system for audit trails and transparency requirements
- Develop rollback procedures and incident response protocols for civic platform stability
- Set up continuous security monitoring with threat detection for civic discourse protection

**High-Level Task 7.4: Community Seeding & Onboarding** *(NEW - Critical for Launch)*

- Create comprehensive seed data with realistic civic scenarios and diverse viewpoints
- Build progressive onboarding with guided hierarchy introduction (Topics→Issues→Motions)
- Set up beta user recruitment strategy targeting engaged citizens, academics, and civic organizers
- Create contextual help system and glossaries for civic terminology and platform concepts
- Implement community feedback collection and rapid iteration workflows for civic improvement

**High-Level Task 7.5: Content Moderation System** *(NEW - Democratic Safety)*

- Build hybrid AI/human moderation pipeline with transparent escalation procedures
- Implement community flagging and transparent resolution processes with appeal mechanisms
- Set up moderation queue and admin dashboard functionality with audit capabilities
- Create reputation system and community guidelines enforcement with democratic input
- Establish escalation procedures for sensitive civic content and governance disputes

**Dependencies**: All phases (continuous integration and civic community development)  
**AI Agent Focus**: Testing automation, monitoring systems, community tools  
**Deliverables**: Comprehensive testing framework, community readiness, moderation system

---

## Current Implementation Progress (local dev)

- Infrastructure & Navigation
  - ✅ Consistent header via `AppMenuBar` across the app
  - ✅ Added universal Pages dropdown and Routes Catalog for quick navigation
  - ✅ Added simple, testable UIs for all major pages (Home/Explore/Topics/Issues/Motions/Positions/Debates/Solutions/Profile/DMs/Admin/etc.)
  - ✅ Added browse stubs: `/topics`, `/issues`, `/motions`, `/positions`
  - ✅ Added "My" pages: `/my/topics`, `/my/issues`, `/my/motions`, `/my/positions`, `/my/debates`, `/my/solutions`

- Database & Realtime
  - ✅ New migration: forums/proposals/votes/evidence tables with basic RLS
  - ✅ Seeds for sample forum/proposal/evidence data
  - ✅ Realtime presence implemented (Supabase channels) for forums and position forums
  - ✅ 1–5 stance schema with privacy and realtime motion census already in place

- APIs
  - ✅ Implemented `/api/forums`, `/api/proposals`, `/api/votes`, `/api/evidence`
  - ✅ Existing `/api/stance-events`, `/api/census/motion/[motionId]`, `/api/issues/[id]`, `/api/motions/[id]`

- Governance UI
  - ✅ Forum pages for Topic/Issue/Motion/Debate/Solution with `ForumThread` and `PresencePill`
  - ✅ Proposal submission UI (wired to `/api/proposals`) and voting UI (wired to `/api/votes`)

- Evidence UI
  - ✅ `EvidencePanel` added to Issue pages and nested Topic→Issue pages, wired to `/api/evidence`
  - ⏭ Integrate evidence display/attach within Motion and Argument flows next

- Position & Census
  - ✅ Motion pages include `StanceSelector` and Motion census (realtime + optimistic)
  - ✅ Position forum route present and presence indicator

- Component testing surface
  - ✅ `gallery/` page exercises core components (StanceBar, StanceSelector, Cards, EvidencePanel, ProposalForm)

- Build & Run
  - ✅ Production build succeeded (`pnpm build`)
  - ✅ Local server running successfully for manual testing (`pnpm start`)

### Upcoming (near-term)

- Integrate `EvidencePanel`/`EvidenceCard` into Motion and Argument flows
- Persist `ForumThread` (DB-backed) and moderation actions
- Add search wiring and results rendering
- Expand accessibility test coverage (axe) and CI hook
- Optional: add browse lists for Debates/Solutions/Forums matching new stub style

## Critical Integration Points *(NEW SECTION)*

### Cross-Phase Dependencies & Democratic Values

**Governance ↔ All Features**: Forum systems and democratic decision-making integrate with every entity type (Topics, Issues, Motions, Positions, Debates, Solutions), ensuring community governance is fundamental rather than peripheral.

**Evidence ↔ Arguments**: Credibility scoring directly affects argument quality metrics, creating feedback loops that encourage evidence-first discourse and reward high-quality source citation.

**Real-time ↔ Collaboration**: Position room updates, forum discussions, and collaborative editing depend on optimized real-time infrastructure that scales from simple stance updates to complex multi-user interactions.

**Privacy ↔ Democratic Participation**: Anonymous stance handling affects every user interaction while maintaining the ability to track consensus and prevent manipulation, balancing privacy with democratic transparency.

### Technical Debt Prevention Strategies

**Database Schema Front-Loading**: All governance, evidence, and privacy schema changes implemented in Phase 1 to avoid complex migrations that could disrupt civic discussions and data integrity.

**Component Accessibility Built-In**: WCAG 2.1 AA compliance integrated from component creation rather than retrofitted, ensuring democratic participation is accessible to all citizens from day one.

**API Design for Future AI**: REST endpoints designed to support future AI integration without immediate implementation, allowing for transparent AI assistance when community governance approves.

**Real-time Architecture Scaling**: Infrastructure designed to scale from simple consensus updates to complex collaborative features without requiring fundamental rewrites.

### Success Metrics by Phase *(Enhanced with Civic KPIs)*

**Phase 1**: Schema supporting full civic hierarchy, privacy controls functional, accessibility foundations tested with assistive technologies

**Phase 2**: Democratic governance proposals flowing through community forums, Position Rooms enabling collaborative thesis development, content creation supporting evidence attachment

**Phase 3**: Multi-stance debates active with evidence curation, real-time consensus tracking accurate, community moderation reducing harmful content while preserving democratic discourse

**Phase 4**: Solution workflows enabling civic action, data export supporting research and transparency, analytics providing insights into democratic health

**Phase 5**: AI summarization improving comprehension of complex debates, transparency systems maintaining trust in AI assistance, cost controls preventing resource abuse

**Phase 6**: Desktop experience supporting complex civic workflows, WCAG AA compliance verified by disabled users, mobile enabling basic participation

**Phase 7**: Diverse community actively engaged in democratic processes, moderation maintaining civility without suppressing dissent, platform stable under civic discussion load

---

## Risk Mitigation & Contingency Planning *(Updated)*

### High-Risk Areas & Mitigation Strategies

1. **Democratic Governance Complexity**: Start with simple majority voting and 1-5 sliders, defer quadratic voting to post-MVP to ensure governance functions without overwhelming complexity

2. **Evidence System Scaling**: Begin with community-driven credibility scoring, avoid complex AI fact-checking integration until user patterns and community standards are established

3. **Real-time Performance Under Civic Load**: Implement graceful degradation for high-traffic debates, use caching for census calculations, and queue non-critical updates

4. **Mobile Complexity vs Civic Depth**: Prioritize desktop for MVP where complex hierarchical discourse thrives, ensure mobile supports basic participation without sacrificing civic depth

5. **Community Moderation Balance**: Design transparent appeal processes and community governance of moderation policies to prevent both under-moderation and over-censorship

### Scope Flexibility for Democratic Values

**Must-Have (Democratic Core)**: Position rooms, governance forums, evidence attachment, stance tracking, basic moderation, accessibility compliance

**Should-Have (Democratic Enhancement)**: Advanced analytics, solution tracking, data export, community health metrics, collaborative editing

**Could-Have (Future Democracy)**: AI fact-checking, quadratic voting, complex visualization, extensive third-party integrations, advanced mobile features

**Won't-Have (Out of Scope)**: Enterprise features, complex gamification, non-civic social features, proprietary closed systems

### Community-Centered Launch Strategy

**Pre-Launch (Weeks 10-12)**: Beta testing with diverse civic groups, seed content creation, community guidelines development through democratic process

**Launch (Week 12)**: Soft launch with invited civic organizers and engaged citizens, gradual public opening based on moderation capacity and community health

**Post-Launch (Weeks 13+)**: Community-driven feature prioritization, democratic governance of platform evolution, expansion based on successful civic outcomes
