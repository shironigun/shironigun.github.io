// Slides for the work carousel on the home page. Each one is a small node diagram of a project, drawn on a
// 560 x 360 stage. Coordinates are stage pixels; the stage scales with its container.
//
// node kinds: pill (default), accent (gated or key step), person
// card kinds: terminal, approval, checklist, stats, chips
// edges: [fromId, toId, { curve, flow }]   flow = animated dashes
import { hoursText } from './hours';

export const workSlides = [
  {
    id: 'marketplace',
    label: 'Public on GitHub',
    title: 'AI agents that ask first',
    caption: 'A Claude Code marketplace of plugins I built one job at a time, with a person approving every write.',
    to: '/case-studies/claude-marketplace',
    orbit: { cx: 280, cy: 180, rx: 168, ry: 118 },
    hub: { x: 280, y: 180, label: 'shironigun', sub: 'Marketplace' },
    nodes: [
      { id: 'qe', x: 280, y: 62, label: 'qa-engineering', sub: 'Flagship QA loop', kind: 'accent' },
      { id: 'qt', x: 118, y: 124, label: 'qa-toolkit', sub: 'Cases and bug reports' },
      { id: 'api', x: 442, y: 124, label: 'api-testing', sub: '3-level API specs' },
      { id: 'ui', x: 118, y: 238, label: 'ui-testing', sub: 'UI test cases' },
      { id: 'crm', x: 442, y: 238, label: 'crm-bug-suite', sub: 'Bugs and comments' },
      { id: 'rn', x: 280, y: 298, label: 'release-notes-suite', sub: 'Client notes' },
    ],
    edges: [['hub', 'qe', { flow: true }], ['hub', 'qt', { flow: true }], ['hub', 'api', { flow: true }], ['hub', 'ui', { flow: true }], ['hub', 'crm', { flow: true }], ['hub', 'rn', { flow: true }]],
    cards: [
      { kind: 'terminal', x: 384, y: 12, w: 144, lines: [['ok', 'Story read'], ['ok', 'Cases drafted'], ['run', 'Dry run, 0 written']] },
      { kind: 'approval', x: 14, y: 290, w: 150, title: 'Awaiting your yes', actions: ['Publish', 'Not yet'] },
    ],
  },
  {
    id: 'delivery',
    label: 'AI product delivery',
    title: 'AI features, from idea to launch',
    caption: 'Discovery, requirements, design, prototyping, evaluation and launch readiness.',
    to: '/case-studies/promise-tracker',
    cycle: true,
    orbit: { cx: 280, cy: 172, rx: 176, ry: 118 },
    packet: { path: 'M 104 172 a 176 118 0 1 1 352 0 a 176 118 0 1 1 -352 0', dur: 6 },
    hub: { x: 280, y: 172, label: 'AI feature', sub: 'Product definition' },
    nodes: [
      { id: 'a', x: 280, y: 54, label: 'Discovery' },
      { id: 'b', x: 432, y: 113, label: 'Requirements' },
      { id: 'c', x: 432, y: 231, label: 'Design' },
      { id: 'd', x: 280, y: 290, label: 'Prototype' },
      { id: 'e', x: 128, y: 231, label: 'Evaluation' },
      { id: 'f', x: 128, y: 113, label: 'Launch', kind: 'accent' },
    ],
    cards: [
      { kind: 'terminal', x: 386, y: 288, w: 140, lines: [['ok', 'Problem framed'], ['ok', 'Criteria agreed'], ['run', 'Evaluation running']] },
    ],
  },
  {
    id: 'prototyping',
    label: 'AI prototyping',
    title: 'Prototypes before commitments',
    caption: 'Working prototypes built with Figma Make and Claude Code, so ideas are tested before development starts.',
    to: '/case-studies/ai-prototyping',
    packet: { path: 'M 484 152 C 458 18, 92 18, 64 152', dur: 3 },
    nodes: [
      { id: 'you', x: 64, y: 172, label: 'You', kind: 'person' },
      { id: 'fig', x: 214, y: 100, label: 'Figma Make', sub: 'Design' },
      { id: 'cc', x: 214, y: 244, label: 'Claude Code', sub: 'Build' },
      { id: 'proto', x: 362, y: 172, label: 'Prototype', sub: 'Working and clickable', kind: 'accent' },
      { id: 'team', x: 484, y: 172, label: 'Team review' },
    ],
    edges: [['you', 'fig', { flow: true }], ['you', 'cc', { flow: true }], ['fig', 'proto', { flow: true }], ['cc', 'proto', { flow: true }], ['proto', 'team', { flow: true }]],
    loop: 'M 484 152 C 458 18, 92 18, 64 152',
    cards: [
      { kind: 'terminal', x: 16, y: 286, w: 150, lines: [['ok', 'Spec written'], ['ok', 'Prototype built'], ['run', 'Feedback in']] },
      { kind: 'chips', x: 330, y: 298, w: 210, items: ['No code committed', 'Validated first'] },
    ],
  },
  {
    id: 'design',
    label: 'Design phase',
    title: 'Every design reviewed before build',
    caption: 'A structured design phase: business rules briefed, designs reviewed against the component library, then handed off.',
    to: '/case-studies/design-phase',
    nodes: [
      { id: 'brief', x: 70, y: 62, label: 'Brief' },
      { id: 'design', x: 200, y: 62, label: 'Design' },
      { id: 'review', x: 338, y: 62, label: 'Review', kind: 'accent' },
      { id: 'handoff', x: 482, y: 62, label: 'Handoff' },
      { id: 'ux', x: 72, y: 196, label: 'UX designer', kind: 'person' },
      { id: 'pa', x: 72, y: 282, label: 'Product analyst', kind: 'person' },
      { id: 'build', x: 476, y: 222, label: 'Development', sub: 'Builds the design' },
    ],
    edges: [['brief', 'design', { flow: true }], ['design', 'review', { flow: true }], ['review', 'handoff', { flow: true }], ['handoff', 'build', { flow: true }]],
    paths: ['M 128 196 L 168 196', 'M 150 282 C 162 282, 160 262, 168 258', 'M 338 80 L 338 118'],
    cards: [
      { kind: 'checklist', x: 168, y: 118, w: 232, title: 'Design review', rows: [['ok', 'Component library'], ['ok', 'Business rules'], ['ok', 'Mobile layout'], ['fix', 'Empty state']] },
    ],
  },
  {
    id: 'quality',
    label: 'Quality Gates',
    title: 'Quality built into delivery',
    caption: 'A gate framework grounded in root-cause analysis, adopted by three teams.',
    to: '/case-studies/quality-gates',
    packet: { path: 'M 80 96 L 480 96', dur: 3 },
    nodes: [
      { id: 's', x: 80, y: 96, label: 'Story', sub: 'Ready' },
      { id: 'c', x: 180, y: 96, label: 'Criteria', sub: 'Complete' },
      { id: 'b', x: 280, y: 96, label: 'Built', sub: 'Tested' },
      { id: 'g', x: 380, y: 96, label: 'Gate', sub: 'Automated', kind: 'accent' },
      { id: 'r', x: 480, y: 96, label: 'Release', sub: 'Approved' },
    ],
    edges: [['s', 'c', { flow: true }], ['c', 'b', { flow: true }], ['b', 'g', { flow: true }], ['g', 'r', { flow: true }]],
    cards: [
      { kind: 'stats', x: 40, y: 168, w: 480, items: [['~40%', 'less defect leakage'], ['0', 'critical defects in 6 sprints'], ['3', 'teams adopted it']] },
      { kind: 'chips', x: 60, y: 302, w: 440, items: ['Root-cause analysis', 'Facilitated sessions', 'Automated pipeline checks', 'Retrospectives'] },
    ],
  },
  {
    id: 'knowledge',
    label: 'Domain leadership',
    title: 'Knowledge that scales the team',
    caption: 'A self-initiated training programme for every function, with knowledge transfer that fed the public product knowledge base.',
    to: '/case-studies/domain-knowledge-base',
    hub: { x: 280, y: 150, label: 'Product', sub: 'Knowledge' },
    nodes: [
      { id: 'dev', x: 114, y: 70, label: 'Development' },
      { id: 'qa', x: 456, y: 70, label: 'QA' },
      { id: 'ops', x: 110, y: 206, label: 'Operations' },
      { id: 'ba', x: 448, y: 206, label: 'Business analysts' },
      { id: 'kb', x: 280, y: 262, label: 'Knowledge base', sub: 'Public', kind: 'accent' },
    ],
    edges: [['hub', 'dev', { flow: true }], ['hub', 'qa', { flow: true }], ['hub', 'ops', { flow: true }], ['hub', 'ba', { flow: true }], ['hub', 'kb', { flow: true }]],
    cards: [
      { kind: 'chips', x: 120, y: 306, w: 320, dark: true, items: [`${hoursText.junior} hours`, '120+ sessions', '60+ SOPs'] },
    ],
  },
];
