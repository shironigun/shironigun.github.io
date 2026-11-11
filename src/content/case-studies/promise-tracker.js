export default {
  body: [
    { p: 'Every day, dealership reps make dozens of small promises to customers: “I’ll send the manual tonight”, “I’ll call you back after lunch”, “Let me check the financing options for you.” Most are kept. Some slip, and the dealership usually finds out only when the customer follows up, or complains.' },
    { p: 'Promise Tracker is an AI feature that catches the promises a dealership still owes. I led its product definition, from the first question to a feature that is now heading to production.' },
    { figure: 'journey', caption: 'The stages Promise Tracker went through, from the first question to launch.' },

    { h2: 'The problem' },
    { p: 'In a busy inbox, some promises slip and some customer questions never get an answer. Reps move on to the next conversation, and nothing reminds them of the commitment they made an hour earlier.' },
    { p: 'Managers had no single place to see what the dealership still owed each customer. They found out when the customer did.' },

    { h2: 'What the feature does' },
    { p: 'Promise Tracker gives a manager one list of what the dealership still owes each customer: the open promise or unanswered question, how urgent it is, and a suggested reply. The demo below uses fictional data.' },
    { figure: 'promiseFull', caption: 'The manager’s view: what the dealership owes, how urgent each item is, and a suggested reply.' },
    { p: 'The split of responsibility is deliberate. The AI finds and suggests; the manager decides. No message reaches a customer without a manager’s click.' },

    { h2: 'How I led it' },
    { lead: 'Discovery.', p: 'I started by mapping how promises actually happen in dealership conversations, and what a manager needs in front of them to act on one.' },
    { lead: 'Requirements.', p: 'I wrote the requirements and acceptance criteria, including the rules for rating urgency and the rules for what the AI must never say.' },
    { lead: 'Design.', p: 'I shaped the manager’s view and reviewed it against the product’s component library before anything was built.' },
    { lead: 'Prototype.', p: 'I had a working prototype made with Figma Make and Claude Code from my specifications, so the team could click through the real workflow before committing development time.' },
    { lead: 'AI behaviour and evaluation.', p: 'I defined what the AI detects, when it acts and what it must never say, then set the quality criteria and release rules every change has to meet.' },
    { lead: 'Into the product.', p: 'I worked alongside the developers as the feature moved from prototype into the product, and produced the story film that explains it to customers.' },

    { h2: 'The release gate' },
    { p: 'An AI feature can behave well in a demo and badly the next day, so passing once is not enough. Every rule the AI must follow is checked before a release, and a single critical failure stops the release.' },
    { figure: 'releaseGate', caption: 'Each rule is checked before release; one critical failure blocks it.' },

    { h2: 'Who did what' },
    { p: 'I framed the problem, wrote the requirements, designed the manager workflow, defined and iterated the AI behaviour, and set the quality criteria and release rules. Claude Code generated the prototype code from my specifications. The developers are building the production feature, and I support them through the build.' },

    { h2: 'Where it is now' },
    { p: 'Promise Tracker is heading to production. The story film walks through it from a promise made in a chat to a manager making sure it is kept, with demo data.' },
    { video: '/videos/promise-tracker-targetcrm.mp4', title: 'Promise Tracker story film', poster: '/videos/promise-tracker-targetcrm-poster.jpg', caption: 'Promise Tracker in TargetCRM, also offered as Notify360. 2 min 14 s, demo data.' },

    { h2: 'What I took from it' },
    { quote: 'Reliability is a rate, not a yes or no.' },
    { p: 'An AI can pass a check once and fail it the next time, so release decisions have to rest on consistent results, not on a single good run.' },
    { p: 'Owning an AI feature also means owning its rules. The hardest product decisions weren’t about what the AI should do, but about what it must never say.' },
    { p: 'And the manager’s click is part of the design, not a safety net added at the end. Keeping a person in control shaped every screen and every action in the feature.' },
  ],
};
