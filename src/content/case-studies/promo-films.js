// The product may be named here: he approved showing TargetCRM (also offered as Notify360) with
// the promo films on 11 Nov 2026. Every film uses a fictional dealership and demo data.
// Round 2 (11 Nov 2026): new voice, the production pipeline and one review comment as graphs.
// Sources: the ledger (docs/private/chat-exports/merged.md §2, §6, §10, §11), the film notes in
// docs/private/artifacts/portfolio-rd-and-films.md, and his film memory notes in
// docs/private/claude-memory/crm-project/ (promise-tracker-promo, targetcrm-promo-film(-v2),
// promo-film-callout-style, no-camera-drift-in-films, no-codebase-changes-for-side-work).
// Only the two published films are embedded. The app-store cut is not exported or approved: describe it,
// never embed it. The real customer figures once proposed as a hook are internal and not in any film.
export default {
  updated: 'November 2026',
  body: [
    { p: 'A CRM’s real screens are full of real people: names, phone numbers, deals, payments. Now make a film of one for an expo, and another for a feature that hasn’t shipped yet. Without showing a single real customer.' },
    { p: 'TargetCRM is the customer-engagement product I work on at Perseus Group, part of Constellation Software. It is also offered as Notify360. It gives automotive, agricultural and equipment dealerships one place for deals, conversations, payments, feedback, tasks, customers and inventory, on the web and on mobile.' },
    { p: 'In about a week I directed three films about it: an enterprise promo for an expo, a short app-store cut, and a story film for Promise Tracker, a new AI feature. I set each story, the art direction and the rules every shot follows, and reviewed every cut frame by frame. Claude built the films in code under my direction, from the product’s real screens, with a fictional dealership in place of real customers.' },

    { h2: 'At a glance' },
    { ol: [
      'I set the purpose and story of each film, and held every scene to what the product really does.',
      'I set the art direction and the rules: focused callouts, plain captions one at a time, centred title cards, a still camera.',
      'I had the real screens lifted into the films with fictional data, without a single change to the product’s code.',
      'I reviewed each cut through comments on the film, one fix per comment, until every beat was right.',
    ] },
    { numbers: [['2', 'films published, 1080p with sound'], ['0', 'real customers on screen'], ['0', 'changes to the product’s code']] },

    { h2: 'Three films, one week, zero real customers' },
    { p: 'Three needs arrived together: an expo film that shows the product working end to end, a cut short enough for an app-store listing, and a film for Promise Tracker, an AI feature with no demo material yet, that explains it without promising anything the product doesn’t do.' },
    { p: 'All three had the same constraints. Show the real product, not a mock-up that drifts from it. Show no real customer, though a CRM’s real screens are full of them. And leave the product’s code alone.' },
    { p: 'Here is how the week went.' },
    { timeline: [
      { when: '5 Nov 2026', title: 'The app-store cut', detail: 'A deep blue stage, the real screens in a dark device. 30 seconds at most; an end card of 2 seconds at most.' },
      { when: '6 Nov 2026', title: 'The expo cut', detail: 'The best of the store cut and a reference film, on the reference’s light ground. Here length didn’t matter; correctness and pacing did.' },
      { when: '7 Nov 2026', title: '“Visuals are distorted”', detail: 'One comment from me became an audit of how the screens were lifted, and rules for any film built on real screens.' },
      { when: '10 Nov 2026', title: 'Three rounds of comments', detail: 'Focused callouts, plain captions, a still camera. A TargetCRM version joins the Notify360 one.' },
      { when: '11 Nov 2026', title: 'Published', detail: 'The expo cut and the Promise Tracker film go up, with my employer’s approval. The store cut waits for its export.' },
    ], caption: 'Three films in one week, from the first cut to publishing.' },

    { h2: 'What we made' },
    { p: 'The enterprise promo is a tour of the whole product, from a deal moving from lead to won to the same app on every device.' },
    { video: '/videos/targetcrm-enterprise-promo.mp4', title: 'TargetCRM enterprise promo', poster: '/videos/targetcrm-enterprise-promo-poster.jpg', caption: 'The expo cut, 2 min 9 s: the deals pipeline, one inbox for every channel, payments inside a chat, customer feedback, tasks, customer records, inventory and every device. Demo data throughout.' },
    { p: 'The app-store cut tells the same story in under 30 seconds. I set its rules with the stores in mind: no store’s name on the end card, the official logo only on a light background, and social-network icons only inside the app’s own screens, never in a callout. It isn’t exported yet, so it isn’t shown here.' },
    { p: 'The Promise Tracker film tells one story. Maya, a fictional customer, asks her rep, Jordan, for her trade-in value, and he promises it “this afternoon”. Then nothing happens.' },
    { table: {
      columns: ['Beat', 'What the viewer sees'],
      rows: [
        ['The promise', 'In a chat, Jordan promises Maya her trade-in value this afternoon'],
        ['The slip', 'Three days pass with nothing sent, and Maya follows up'],
        ['The catch', 'Promise Tracker finds the open promise: how long Maya has waited, how urgent it is, who owns it'],
        ['The review', 'A manager opens the conversation; a reply is drafted, and nothing is sent until they click Send'],
        ['The nudge', 'The manager reminds Jordan; his bell lights, and he sends the trade value'],
        ['The kept promise', 'The next scan sees the promise kept, and the row leaves the list'],
        ['The end card', '“Coming soon” and “Shown with demo data”'],
      ],
    }, caption: 'The Promise Tracker film, beat by beat. Demo data.' },
    { video: '/videos/promise-tracker-targetcrm.mp4', title: 'Promise Tracker story film', poster: '/videos/promise-tracker-targetcrm-poster.jpg', caption: 'The story film, 2 min 14 s: a promise made in a chat slips, the AI finds it, and a manager makes sure it is kept. Shown with demo data; the feature is in pilot, not released yet.' },

    { h2: 'My role and the team' },
    { p: 'I directed all three films: what each is for, the story, the look, the rules and what each scene may show. Claude built them in code under my direction: the scenes, the motion, the score and the product screens. My employer approved the two published films.' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Purpose and story', 'Set what each film is for and its story; renamed the feature Promise Tracker', '', ''],
        ['Product truth', 'Required a written list of what the product really does; held every scene to it', 'Checked each point against the product, read-only', ''],
        ['Screens', 'Set the rules: real screens, fictional data, no change to the codebase', 'Lifted the screens and filled them with demo data', ''],
        ['Look and rules', 'Set the art direction, the film rules and the pacing', 'Built the scenes, motion and score in code', ''],
        ['Review', 'Reviewed each cut frame by frame, one fix per comment', 'Made each fix and answered it in its thread', ''],
        ['Release', '', '', 'My employer approved the two published films'],
      ],
    }, caption: 'Who did what. I directed; Claude built the films under my direction.' },

    { h2: 'From brief to published film' },
    { p: 'Every film went through the same pipeline. Follow the packet: it stops twice for a yes, once from me and once from my employer, and the dashed loop is where most of the work happened.' },
    {
      graph: {
        lanes: [
          { name: 'Me', note: 'the director' },
          { name: 'AI agents', note: 'Claude, building in code' },
          { name: 'My employer' },
        ],
        phases: [
          { name: 'Direct', row: 0 },
          { name: 'Build', row: 2 },
          { name: 'Review', row: 5 },
          { name: 'Release', row: 7 },
        ],
        nodes: [
          { id: 'purpose', name: 'Set the purpose', sub: 'expo, store or new feature', lane: 0, row: 0, kind: 'human', detail: 'For the expo film I told Claude length didn’t matter; showing everything correctly did. The store cut had 30 seconds. The Promise Tracker film had to explain a feature nobody had seen.' },
          { id: 'story', name: 'Story and look', sub: 'art direction', lane: 0, row: 1, kind: 'human', detail: 'The expo film keeps a reference film’s light look, with a phone framing the app. For Promise Tracker, the app window floats on a desk in the product’s own colours.' },
          { id: 'truth', name: 'Write down the truth', sub: 'checked read-only', lane: 1, row: 2, kind: 'ai', detail: 'Before any scene, the product’s real behaviour is checked and written down. If the product shows no marker, the film shows none. If something needs a person to act, the film never shows it happening on its own.' },
          { id: 'screens', name: 'Lift the real screens', sub: 'fictional data, code untouched', lane: 1, row: 3, kind: 'ai', detail: 'Web screens come from a running copy of the app, mobile screens from the app’s own designs, filled with a fictional dealership: invented people, 555 numbers, example.com addresses. The codebase is never touched; any workaround lives outside it.' },
          { id: 'scenes', name: 'Build the scenes', sub: 'camera, callouts, score', lane: 1, row: 4, kind: 'ai', detail: 'Claude builds each scene in code: camera, callouts, captions and music, every scene starting on the beat.' },
          { id: 'checks', name: 'Frame checks', sub: 'holds, cuts, names', lane: 1, row: 5, kind: 'check', detail: 'Two frames inside any camera hold must be identical. Every cut is checked last frame against first. Every name and number on screen must be fictional.' },
          { id: 'review', name: 'Review the cut', sub: 'frame by frame', lane: 0, row: 6, kind: 'gate', detail: 'I watch every cut and pin a comment to the exact moment that is wrong. One comment, one fix, until every beat is right.' },
          { id: 'export', name: 'Export again', sub: '1080p with sound', lane: 1, row: 7, kind: 'ai', detail: 'The Promise Tracker film exists as two copies that differ only in the logo, so every fix has to reach both.' },
          { id: 'approve', name: 'Approval to publish', lane: 2, row: 8, kind: 'gate', detail: 'My employer approved publishing the enterprise promo and the Promise Tracker film. The store cut hasn’t reached this step: it isn’t exported yet.' },
          { id: 'live', name: 'Published', sub: '11 November 2026', lane: 0, row: 9, kind: 'output', detail: 'Both films play here, and the Promise Tracker film also plays on its case study.' },
        ],
        edges: [
          { from: 'purpose', to: 'story', label: 'the brief' },
          { from: 'story', to: 'truth', label: 'the story' },
          { from: 'truth', to: 'screens', label: 'truth list' },
          { from: 'screens', to: 'scenes', label: 'lifted screens' },
          { from: 'scenes', to: 'checks', label: 'a cut' },
          { from: 'checks', to: 'review', label: 'checked cut' },
          { from: 'review', to: 'scenes', label: 'comments: fix' },
          { from: 'review', to: 'export', label: 'approved cut' },
          { from: 'export', to: 'approve', label: 'final film' },
          { from: 'approve', to: 'live', label: 'approval' },
        ],
      },
      caption: 'The production pipeline, from purpose to publishing. The amber gates are people; the dashed loop is a review round sending the cut back.',
    },

    { h2: 'Every frame is a claim' },
    { p: 'The Promise Tracker film was the hardest: the feature is in pilot, so every frame is a claim nobody can try yet.' },
    { table: {
      columns: ['What the product really does', 'So the film…'],
      rows: [
        ['A scan runs when a person starts it', 'never shows a scan running by itself'],
        ['A kept promise quietly leaves the open list', 'shows the row leaving on the next scan, not a “resolved” badge'],
        ['The chat screen itself shows no promise marker', 'tags the promise only in the review panel, where the product shows it'],
        ['Nothing is sent without a manager’s click', 'pauses on “Nothing is sent until you click Send”'],
      ],
    }, caption: 'Product truth for the Promise Tracker film: what the product does, and how the film respects it.' },

    { h2: 'One comment, one fix' },
    { p: 'Every comment is pinned to an exact frame, says one thing and gets one fix. Here is a real one from the Promise Tracker film: the screen kept creeping in during holds. Watch where the fix goes: not into one scene, but into a rule.' },
    {
      graph: {
        lanes: [
          { name: 'Me', note: 'the director' },
          { name: 'AI agents', note: 'Claude, building in code' },
        ],
        nodes: [
          { id: 'watch', name: 'Spot it', sub: 'the screen keeps creeping', lane: 0, row: 0, kind: 'human', detail: 'The camera never truly held still. A slow zoom crept in during every hold, and it made the text shimmer.' },
          { id: 'pin', name: 'Pin one comment', sub: 'at the exact moment', lane: 0, row: 1, kind: 'human', detail: 'On the frame where it happens, saying one thing.' },
          { id: 'reply', name: 'Answer in the thread', sub: 'the cause, then the fix', lane: 1, row: 2, kind: 'ai', detail: 'In the comment’s own thread: holds weren’t still, the logo “breathed” and titles crept upward.' },
          { id: 'rule', name: 'A standing rule', sub: 'holds stand perfectly still', lane: 1, row: 3, kind: 'store', detail: 'When the camera holds, it holds perfectly still, and it moves only between shots. One-off accents, like a bell that wiggles once, stay.' },
          { id: 'fix', name: 'Fix every scene', sub: 'not just the one flagged', lane: 1, row: 4, kind: 'ai', detail: 'Every hold in the film is rewritten to stand still, together with the timings that depend on it.' },
          { id: 'frames', name: 'Prove it on frames', sub: 'two frames, identical', lane: 1, row: 5, kind: 'check', detail: 'Two frames taken inside any hold must be identical. If they differ, the fix goes back.' },
          { id: 'recheck', name: 'Watch it again', sub: 'I resolve the thread', lane: 0, row: 6, kind: 'gate', detail: 'I watch the new cut. The thread is resolved only when I say so.' },
          { id: 'done', name: 'Never asked twice', sub: 'built in from the first cut', lane: 0, row: 7, kind: 'output', detail: 'The rule applies from the first cut of any new film, so nobody writes that comment again.' },
        ],
        edges: [
          { from: 'watch', to: 'pin', label: 'the moment' },
          { from: 'pin', to: 'reply', label: 'comment' },
          { from: 'reply', to: 'rule', label: 'the cause' },
          { from: 'rule', to: 'fix', label: 'the rule' },
          { from: 'fix', to: 'frames', label: 'new cut' },
          { from: 'frames', to: 'fix', label: 'a moving frame' },
          { from: 'frames', to: 'recheck', label: 'still frames' },
          { from: 'recheck', to: 'done', label: 'resolved thread' },
        ],
      },
      caption: 'One review comment, end to end: the creeping zoom. The dashed loop is a frame check sending the fix back.',
    },
    { p: 'Most comments went the same way. A caption that lingered after its target had gone became “a caption leaves before the camera moves”. Callouts stacked on a table became “walk a table one column at a time”. Rules like these grew the Promise Tracker film from two minutes to 2 min 14 s. Some comments simply cut a scene, such as a sign-in screen.' },

    { h2: 'Key decisions' },
    { decisions: [
      {
        q: 'Where do the product screens come from?',
        options: ['Redraw the screens for the film', 'Lift the real screens'],
        chose: 'Lift the real screens',
        why: 'A redrawn screen drifts from the product. Real screens mean every frame shows the product as it really works.',
      },
      {
        q: 'May the film touch the product’s code?',
        options: ['Patch the app to make filming easier', 'Leave the codebase untouched'],
        chose: 'Leave the codebase untouched',
        why: 'Side work never goes into the team’s codebase, not even as a temporary fix. The film adapts to the product, not the other way round.',
      },
      {
        q: 'What may the film show of a feature that isn’t released?',
        options: ['How we hope it will work', 'Only what the product does today'],
        chose: 'Only what the product does today',
        why: 'A film is a promise to the viewer. Nothing in it goes beyond the product, and it ends on “Coming soon” and “Shown with demo data”.',
      },
    ], caption: 'The calls that shaped the films, in my words.' },
    { call: {
      saw: 'A CRM’s real screens are full of real customers. A real dealership’s figures were even suggested as an opening hook for the Promise Tracker film.',
      decided: 'I kept every customer fictional. The films use a made-up dealership with its own customers, reps, phone numbers and email addresses, and the Promise Tracker film opens on the promise itself, not on anyone’s statistics.',
      why: 'The films are public. A fictional dealership shows exactly the same product, and no customer’s data travels with it.',
    } },

    { h2: 'The rules every shot follows' },
    { p: 'All of them now apply to every film, from the first cut.' },
    { cards: [
      { title: 'Focus and pop', tag: 'callouts', body: 'Callouts focus and pop: whatever a caption points at stays sharp and lifts out a little, and the rest of the app blurs and dims.' },
      { title: 'Label: value', tag: 'captions', body: 'Captions are plain “label: value” lines, one at a time, such as “How long Maya has waited: 3 days”.' },
      { title: 'One at a time', tag: 'tables', body: 'Tables and dashboards are walked in order, one callout at a time. If that takes longer, the scene gets longer.' },
      { title: 'Leave early', tag: 'timing', body: 'A caption leaves before the camera moves or the scene cuts.' },
      { title: 'Centred cards', tag: 'titles', body: 'Title and end cards are centred, with a big logo.' },
      { title: 'Hold still', tag: 'camera', body: 'No camera drift: when the camera holds, it holds perfectly still, and it moves only between shots.' },
      { title: 'Close-ups for small things', tag: 'icons', body: 'A small target, such as an icon, gets a close-up of its own instead of a callout in a wide shot.' },
    ], caption: 'Seven rules, each born as a comment on one frame.' },

    { h2: 'How we knew it was right' },
    { p: 'Every cut was checked against rules, not taste alone.' },
    { list: [
      'Every scene matches the written list of what the product really does.',
      'Two frames taken inside any camera hold must be identical, so no drift slips through.',
      'Every cut is checked by setting the last frame of one scene beside the first frame of the next.',
      'Every name, number and address on screen is fictional.',
    ] },

    { h2: 'Where it is now' },
    { p: 'Both films were published on 11 November 2026, with my employer’s approval. The Promise Tracker film exists in two versions that differ only in the logo, TargetCRM and Notify360; the TargetCRM version plays here and on its case study. The feature is in pilot, not released yet, so the film ends on “Coming soon”.' },
    { p: 'The app-store cut is built but not exported. It will join the other two only once it is exported and approved.' },

    { h2: 'What I learned' },
    { quote: 'A promo film is a product claim, so it has to be true.' },
    { p: 'Directing a film felt close to reviewing a feature: one precise comment per problem, and a clear rule behind each one.' },
    { p: 'Product truth matters in marketing too. A film is often the first promise a customer hears about a feature, and it should be one the product keeps.' },
    { link: { to: '/case-studies/promise-tracker', text: 'Read the Promise Tracker case study' } },
  ],
};
