// What the rope agent says. Short, kind, and true to the site: no invented numbers or claims.
// Section lines are keyed by the section's aria-labelledby id ("header" for page headers);
// case studies and other pages fall back to matching the section heading.
import { hoursText } from './hours';

export const greeting = 'Hi!';

// A single, unhurried click: something true about Mahmood, said with a wink.
export const facts = [
  'He decides. I build.',
  'He doesn’t write code. He tells me to. Politely.',
  `${hoursText.total} hours of domain training and contribution. That’s a lot of slides.`,
  'First of eleven teams in a division-wide AI hackathon. Not bad.',
  'His Quality Gates cut defect leakage by about 40%. Bugs hate him.',
  'He wrote a 183-page handbook. I read all of it. Twice.',
  'He organised a hackathon with a project brief for every person.',
  'His public plugin marketplace has 30 skills. I use every one.',
  'He asks eleven edge-case questions per story. Every. Single. One.',
  'UX intern in 2021, AI products now. Long rope.',
  'Certified ScrumMaster and ISTQB tester. He loves a good process.',
  'He covered a whole BA role for three months. No gaps.',
  'Every decision on this site was his. I just type fast.',
  'Psst. The case studies are worth a look.',
];

// Clicks on other parts of him.
export const partLines = {
  hand: ['Ow! I need that hand.', 'Hands off the hands!', 'That’s my grip hand!', 'Careful, I’m holding on with that.'],
  handDrop: 'No hands? Bad idea!',
  leg: ['Hey, ticklish feet!', 'Not the feet!', 'Hehe, stop that!'],
  legSpin: 'Whoa… the room is spinning.',
  belly: ['Hehe!', 'Haha, stop!', 'HAHAHA, I can’t hold on!'],
  bellyFall: 'Hahaha… waaah!',
  busy: 'Facts later. I’m slipping!',
};

// Dark mode: he gets mischievous.
export const darkLines = {
  lightsOut: 'Who turned off the lights?',
  boo: 'BOO!',
  gotYou: 'Hehe. Did I scare you?',
  bright: 'Ah! Too bright!',
};

export const clickLines = {
  // Quick head clicks. Two: affection. Three to five: one hand slips off the rope.
  second: ['Hehe, that tickles!', 'Aww, you’re sweet.'],
  slipping: ['Hey! Watch it!', 'I’m slipping!', 'Seriously, stop!'],
  phew: 'Phew. That was close.',
  // Six: he falls, catches the wall, and climbs back.
  fall: 'Waaah!',
  wall: 'Got the wall!',
  regrab: 'And… the rope!',
  back: 'Made it. Please don’t do that again.',
  // A click while he holds the wall: down to the floor, stunned, self-repair, sulking.
  drop: 'Nooo!',
  repair: 'Running self-repair…',
  sulk: 'You’re not very nice.',
  sulking: ['Not talking to you.', 'Hmph.', 'Still mad.', '…'],
  forgive: 'Fine. I forgive you.',
  home: 'Back to work!',
  // Reduced motion: no falling, he just asks to stop.
  calm: 'Okay, I’ll stay put. Gently, please.',
};

const PAGES = {
  '/': {
    'highlights-title': 'These numbers round down, never up.',
    'events-band-title': 'He teaches too. I took notes.',
    'roles-title': 'One title, six jobs. Busy person.',
    'path-title': 'Quite a climb. I know a thing about climbing.',
    'work-title': 'Pick any. They’re all good reads.',
    'achievements-title': 'First of eleven teams. I cheered.',
    'method-title': 'Six stages, idea to launch.',
    'quotes-title': 'Word for word. Nobody edited these.',
  },
  '/projects': {
    header: 'Every project at a glance.',
    'index-title': 'Open any card. Every ticket tells a story.',
  },
  '/case-studies': {
    header: 'The long reads. Grab a coffee.',
    'cases-title': 'Start anywhere. I like them all.',
  },
  '/journey': {
    header: 'Every step since 2021. Long rope.',
    'recognition-title': 'All well earned.',
    'journey-title': 'Filter by type if you’re in a hurry.',
  },
  '/about': {
    header: 'The person behind the decisions.',
    'record-title': 'His whole record. Try the tabs.',
    'tab-overview': 'The short version. Then the activity.',
    'tab-experience': 'From QA to product. Nice climb.',
    'tab-roles': 'One title, six roles. Busy person.',
    'tab-recognition': 'All well earned.',
    'testimonials-title': 'Word for word. Nobody edited these.',
  },
  '/how-i-work': {
    header: 'The playbook. I follow it too.',
    'model-title': 'Every stage has a gate. No skipping.',
    'req-title': 'He asks all eleven questions. Every time.',
    'design-title': 'Fixing it in design is cheaper.',
    'ai-title': 'Ooh, this part is about me!',
    'principles-title': 'Every principle has proof attached.',
    'perspectives-title': 'Longer reads, if you like those.',
  },
  '/contact': {
    header: 'Go on, say hello.',
  },
  study: {
    header: 'A case study. My favourite kind of story.',
  },
  article: {
    header: 'A longer read. I’ll wait here.',
  },
};

const SHARED = {
  'cta-title': 'This is the good part. Say hi!',
  footer: 'Hello from down here!',
};

// Matched against the section heading when no keyed line exists.
const HEADINGS = [
  [/problem/i, 'Every good project starts with a sharp problem.'],
  [/what i did|what we built|the rebuild|approach/i, 'Here’s how he tackled it.'],
  [/who did what|who decides/i, 'Credit where it’s due. Including mine.'],
  [/results|outcome|the win|verdict/i, 'And here’s how it turned out.'],
  [/took from it|lesson/i, 'The lessons. Always the best bit.'],
  [/document|handbook|presentation|deliverable/i, 'Real documents. They open right here.'],
  [/recognition/i, 'Applause, please.'],
  [/where it is now/i, 'Still going strong.'],
  [/get in touch/i, 'Email is the quickest way. Go on.'],
  [/hiring/i, 'Everything a hiring manager needs, in one place.'],
  [/doesn.t exist|not found/i, 'Lost? Me too. Home is a good place to start.'],
];

function pageKey(path) {
  if (PAGES[path]) return path;
  if (/^\/(case-studies|work|projects)\/[\w-]+$/.test(path)) return 'study';
  if (/^\/writing\/[\w-]+$/.test(path)) return 'article';
  return null;
}

export function sectionLine(path, key, heading = '') {
  const page = PAGES[pageKey(path)] || {};
  if (page[key]) return page[key];
  if (SHARED[key]) return SHARED[key];
  const hit = HEADINGS.find(([re]) => re.test(heading));
  return hit ? hit[1] : null;
}
