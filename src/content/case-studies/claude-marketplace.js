// The Claude Code marketplace: the parent of every plugin (11 Nov 2026). Each plugin has its own case
// study (projects with `parent: 'claude-marketplace'`); this page tells the shared story: why the
// plugins were built one at a time, how they came together, what they share, and how it went public.
// Facts: the repo on origin/main (catalogue, root README, git log: 40 commits, 18 merged pull
// requests), docs/private/artifacts/qa-plugin-facts.md §2, §14 and §15, and merged.md §3 and §5.
// It is his own public work, so counts that are true on disk may show. Never name the product, the
// organisation, a colleague or the repo's placeholder brand.
export default {
  updated: 'November 2026',
  body: [
    { p: 'July 2026. A release has just gone out, and somebody has to tell our clients what changed. That somebody is me, again, with a long list of closed tickets and a blank page.' },
    { p: 'So I specified a helper for it. Then one for bug reports. Then one for test cases. Each was built on its own, for one job I was tired of doing by hand. By October I had a drawer full of them and a better question: what if anyone could install them with one line? This is the story of that drawer becoming a public marketplace.' },

    { h2: 'At a glance' },
    {
      ol: [
        'I built each plugin alone, for one real job: release notes, bugs, test cases, API tests, explainers.',
        'On 9 October 2026 they moved under one roof: a public Claude Code marketplace you add with one line.',
        'Every plugin keeps a few shared rules: ask before writing, stand on its own, keep private things out.',
        'It is still growing. The eighth plugin, Feature Intelligence, is being built on the dev branch now.',
      ],
    },
    {
      numbers: [['7', 'plugins published'], ['30', 'skills inside them'], ['1', 'line to add the marketplace'], ['18', 'pull requests merged']],
      caption: 'Counted on the public repo in November 2026.',
    },

    { h2: 'A drawer full of helpers' },
    { p: 'Most of a QA analyst’s week is writing. Test cases, bug reports, status updates, release notes. Each one has a right shape, and the right shape lived in my head. When I was busy, or someone else did the writing, the shape slipped.' },
    { p: 'Claude Code skills changed that. A skill is a folder of instructions an AI agent follows when a request matches it. Write the house style down once, and every bug report gets it, whoever asks.' },
    { p: 'So every time a job annoyed me twice, it got a plugin. None of them was planned as part of a set.' },
    {
      table: {
        columns: ['The job', 'What kept going wrong', 'The plugin that fixed it'],
        rows: [
          ['Client release notes', 'A long list of closed work, for clients who only need what changes their day', 'Release-notes suite'],
          ['UI test cases', 'Steps with no expected result; scripts that drift away from their cases', 'UI Testing'],
          ['API tests', 'Tests quietly loosened until they pass', 'API Testing'],
          ['Bugs and defects', 'Every tester writes them differently', 'CRM Bug Suite'],
          ['The whole QA loop', 'A separate tool for every step, and no single place to start', 'QA Engineering'],
          ['Explaining a feature', 'One document for every reader, so it fits none of them', 'Feature Explainer'],
        ],
      },
      caption: 'Six annoyances, six plugins. Each was built and used alone before the marketplace existed.',
    },
    { p: 'Building them one at a time was a feature, not an accident. Each plugin had to earn its keep on real work before the next one started. If one had failed, nothing else would have broken with it.' },

    { h2: 'Built one at a time' },
    { p: 'Here is the order they arrived in. The dates come from my notes and the public git history.' },
    {
      timeline: [
        { when: 'Jul 2026', title: 'The release-notes suite', detail: 'Two skills: a harvester that gathers everything and a releaser that writes the note. When a seventeen-agent version was put on the table, I kept the two skills.' },
        { when: 'Aug 2026', title: 'The house-style skills', detail: 'Bugs, production defects, ticket comments, UI and API test cases: my formats, written down as rules.' },
        { when: '10 Sep 2026', title: 'Feedback becomes rules', detail: 'The support team’s edits to real release notes became rules the releaser now enforces.' },
        { when: '5 to 8 Oct 2026', title: 'The flagship takes shape', detail: 'QA Engineering, specified as small sub-projects, each reviewed before the next began.' },
        { when: '9 Oct 2026', title: 'The marketplace goes public', detail: 'Six plugins in one clean first commit to a new public repository.' },
        { when: '10 to 13 Oct 2026', title: 'The flagship grows up', detail: 'Versions 0.2 to 0.8.1: a guided start, a status board, a knowledge base, desktop products and nine evaluations.' },
        { when: '29 to 30 Oct 2026', title: 'Feature Explainer joins', detail: 'The seventh plugin, merged through pull request 18.' },
        { when: '30 Oct 2026 to now', title: 'Feature Intelligence begins', detail: 'Forked from Feature Explainer the day it merged. In development on the dev branch, not in the catalogue yet.' },
      ],
      caption: 'Five months, eight plugins. The first six met each other on 9 October.',
    },
    { p: 'They didn’t stay strangers. Watch the packets in the diagram below. Four skills from the toolkit flow into QA Engineering, which took them in on its first day. Then every plugin lands in one place: the catalogue.' },
    {
      graph: {
        lanes: [
          { name: 'Writing', note: 'notes and explainers' },
          { name: 'Test design', note: 'cases and scripts' },
          { name: 'Tracker work', note: 'bugs and updates' },
          { name: 'The whole loop', note: 'orchestration' },
        ],
        nodes: [
          { id: 'rn', name: 'Release-notes suite', sub: 'July, 2 skills', lane: 0, row: 0, kind: 'ai', detail: 'The first helper. A harvester gathers everything that shipped; a releaser decides what clients hear and writes it in plain words.' },
          { id: 'ui', name: 'UI Testing', sub: 'August, 2 skills', lane: 1, row: 1, kind: 'ai', detail: 'My test-case style as rules: every step has an action and an expected result. It writes the cases, then the Playwright script, and can read a script back into cases.' },
          { id: 'bug', name: 'CRM Bug Suite', sub: 'August, 3 skills', lane: 2, row: 1, kind: 'ai', detail: 'Bugs, production defects and ticket comments, all in one house format, so a ticket reads the same whoever files it.' },
          { id: 'api', name: 'API Testing', sub: 'August, 2 skills', lane: 1, row: 2, kind: 'ai', detail: 'API cases and specs at three levels that assert one exact status and every documented field, and a partner skill that triages a failed run before drafting a bug.' },
          { id: 'kit', name: 'QA Toolkit', sub: '4 product-neutral skills', lane: 2, row: 3, kind: 'ai', detail: 'The same ideas with every product detail stripped out: UI cases, API cases, filing to a tracker and drafting a bug, each usable on its own.' },
          { id: 'qa', name: 'QA Engineering', sub: 'October, the flagship', lane: 3, row: 4, kind: 'ai', detail: 'One orchestrator for the whole loop, from story to filed bug, asking before every write. It took in the toolkit’s four skills on its first day.' },
          { id: 'mk', name: 'The marketplace', sub: 'marketplace.json, 9 Oct', lane: 1.5, row: 5, kind: 'store', detail: 'One catalogue file lists every plugin: its name, what it does and where it lives. On 9 October it went public, and the drawer became a shelf.' },
          { id: 'fx', name: 'Feature Explainer', sub: '29 October, 7th plugin', lane: 0, row: 6, kind: 'ai', detail: 'Name a feature and a reader, get a visual explainer written for them. It joined the catalogue through pull request 18.' },
          { id: 'fi', name: 'Feature Intelligence', sub: 'in development', lane: 0, row: 7, kind: 'ai', detail: 'Forked from Feature Explainer the day it merged, and growing into a model of a whole feature with a source behind every statement.' },
        ],
        edges: [
          { from: 'kit', to: 'qa', label: '4 skills absorbed' },
          { from: 'rn', to: 'mk' },
          { from: 'ui', to: 'mk' },
          { from: 'bug', to: 'mk' },
          { from: 'api', to: 'mk' },
          { from: 'kit', to: 'mk' },
          { from: 'qa', to: 'mk', label: 'the flagship' },
          { from: 'fx', to: 'mk', label: 'joins, PR 18' },
          { from: 'fx', to: 'fi', label: 'forked' },
        ],
      },
      caption: 'How the plugins fed each other. Each was built alone; the catalogue is where they meet. Press Play to watch it again, or pick any plugin.',
    },

    { h2: 'Meet the plugins' },
    { p: 'Every plugin has its own case study, with the whole story: why it exists, every skill, the format it writes and how it was proved. Pick one.' },
    { family: 'claude-marketplace' },
    {
      table: {
        columns: ['Plugin', 'Its job', 'Inside', 'Version', 'Built for'],
        rows: [
          ['QA Engineering', 'The whole QA loop, from story to filed bug', '16 skills, 4 agents, 9 commands', '0.8.1', 'Any product'],
          ['QA Toolkit', 'Four QA skills, one at a time', '4 skills', '1.0.0', 'Any product'],
          ['UI Testing', 'UI cases and Playwright UI specs', '2 skills', '1.1.0', 'Our CRM, with placeholders'],
          ['API Testing', 'API cases, specs and bug drafts', '2 skills', '1.0.0', 'Our CRM, with placeholders'],
          ['CRM Bug Suite', 'Bugs, defects and ticket comments', '3 skills', '0.2.0', 'Our CRM, with placeholders'],
          ['Release-notes suite', 'The release inventory and the client note', '2 skills', '0.1.0', 'Our CRM, with placeholders'],
          ['Feature Explainer', 'A visual explainer for each reader', '1 skill and 5 scripts', '0.1.0', 'Any product'],
          ['Feature Intelligence', 'A traceable model of a whole feature', 'In development', '0.0.2', 'Any product'],
        ],
        note: 'The first seven are in the catalogue on main; Feature Intelligence is on the dev branch.',
      },
      caption: 'The family at a glance. “Any product” means it ships with no product, organisation or credential in it.',
    },

    { h2: 'What’s inside a plugin' },
    { p: 'Every plugin has the same simple shape, so once you have read one you can read them all.' },
    {
      tree: [
        { name: 'claude-marketplace/', depth: 0 },
        { name: '.claude-plugin/marketplace.json', note: 'the catalogue: seven entries, each with a name, a one-line description, a category and a folder', depth: 1 },
        { name: 'README.md', note: 'how to add, install, verify and manage', depth: 1 },
        { name: 'plugins/', depth: 1 },
        { name: 'qa-engineering/', note: 'the biggest; the others have the same shape with fewer parts', depth: 2 },
        { name: '.claude-plugin/plugin.json', note: 'name, version, description, keywords', depth: 3 },
        { name: 'commands/', note: 'slash commands such as /qa and /test', depth: 3 },
        { name: 'agents/', note: 'the orchestrator, two reviewers and a tutor', depth: 3 },
        { name: 'skills/<name>/SKILL.md', note: 'one folder per skill: when to use it, its steps and its rules', depth: 3 },
        { name: 'skills/<name>/references/', note: 'formats, field maps and worked examples, read only when needed', depth: 3 },
        { name: 'hooks/', note: 'the live status pane', depth: 3 },
        { name: '.mcp.json', note: 'the outside tools it brings, pinned to exact versions', depth: 3 },
      ],
      caption: 'The repo’s shape. Skills hold the know-how; references hold the long material; .mcp.json brings the tools.',
    },
    { p: 'The clever part is how little loads at first. Claude sees only each skill’s name and one-line description. The full instructions load when a request matches, and the long references load only when a step needs them. A plugin can know a lot without crowding the conversation.' },
    { p: 'Here is one request travelling through a plugin, from plain words to a filed ticket. Follow the packet: it stops once, and that stop is you.' },
    {
      graph: {
        lanes: [{ name: 'You' }, { name: 'Claude' }, { name: 'The skill' }, { name: 'The tracker' }],
        nodes: [
          { id: 'ask', name: 'Ask in plain words', sub: '“draft a bug for this”', lane: 0, row: 0, kind: 'human', detail: 'No command to remember. You describe what you want, the way you would to a colleague.' },
          { id: 'match', name: 'Match a description', sub: 'one line per skill', lane: 1, row: 1, kind: 'ai', detail: 'Claude only sees each skill’s name and one-line description. The skill whose description fits the request is the one that wakes up.' },
          { id: 'rules', name: 'Load its rules', sub: 'SKILL.md', lane: 2, row: 2, kind: 'ai', detail: 'Now the full instructions load: the steps, the house style and the things it must never do.' },
          { id: 'refs', name: 'Open references', sub: 'format, fields, examples', lane: 2, row: 3, kind: 'store', detail: 'Long material, such as the field mapping or a worked example, is read only when a step needs it. The conversation stays small.' },
          { id: 'gate', name: 'Preview, then yes', lane: 0, row: 4, kind: 'gate', detail: 'The draft comes back to you first. Every skill that writes to the tracker waits here until a person says yes.' },
          { id: 'write', name: 'Write the ticket', sub: 'through an MCP server', lane: 3, row: 5, kind: 'external', detail: 'Only now does the skill call the tracker, through the tool the plugin brought with it.' },
          { id: 'done', name: 'You get the link', lane: 0, row: 6, kind: 'output', detail: 'The new ticket’s link comes back, so you can check it landed where you meant.' },
        ],
        edges: [
          { from: 'ask', to: 'match', label: 'request' },
          { from: 'match', to: 'rules', label: 'the right skill' },
          { from: 'rules', to: 'refs', label: 'when needed' },
          { from: 'refs', to: 'gate', label: 'draft' },
          { from: 'gate', to: 'write', label: 'approved draft' },
          { from: 'write', to: 'done', label: 'ticket link' },
        ],
      },
      caption: 'How a skill wakes up and does its job. The amber gate turns green only when you approve.',
    },

    { h2: 'One line to install' },
    { p: 'Adding the marketplace doesn’t install anything. It puts the shelf in front of you. You then pick the plugins you want, one at a time.' },
    {
      graph: {
        lanes: [{ name: 'You' }, { name: 'Claude Code' }, { name: 'The public repo' }, { name: 'Your session' }],
        nodes: [
          { id: 'add', name: 'Add the marketplace', sub: 'marketplace add …', lane: 0, row: 0, kind: 'human', detail: 'One command with the repo’s address. Claude Code remembers it as the “shironigun” marketplace.' },
          { id: 'cat', name: 'Read the catalogue', sub: 'marketplace.json', lane: 2, row: 1, kind: 'store', detail: 'One file lists all seven plugins: name, description, category and the folder each one lives in.' },
          { id: 'shelf', name: 'Show the shelf', sub: 'the Discover tab', lane: 1, row: 2, kind: 'external', detail: 'Claude Code lists every plugin you could install, without installing any of them.' },
          { id: 'pick', name: 'Pick one', sub: 'install name@shironigun', lane: 0, row: 3, kind: 'human', detail: 'You install only what you need. A tester who writes API cases can take API Testing and nothing else.' },
          { id: 'folder', name: 'Fetch the plugin', sub: 'plugins/<name>/', lane: 2, row: 4, kind: 'store', detail: 'Its manifest, skills, commands, agents and tool settings come down together.' },
          { id: 'load', name: 'Load it', sub: 'skills, commands, MCP', lane: 1, row: 5, kind: 'external', detail: 'Commands appear under the plugin’s name, skills wait for a matching request, and any bundled tools start.' },
          { id: 'ready', name: 'Ready to work', sub: '/qa-engineering:qa', lane: 3, row: 6, kind: 'output', detail: 'The plugin is part of your session. Update it later with one command, or switch it off without uninstalling.' },
        ],
        edges: [
          { from: 'add', to: 'cat', label: 'repo address' },
          { from: 'cat', to: 'shelf', label: 'catalogue' },
          { from: 'shelf', to: 'pick', label: 'the list' },
          { from: 'pick', to: 'folder', label: 'plugin name' },
          { from: 'folder', to: 'load', label: 'plugin files' },
          { from: 'load', to: 'ready', label: 'commands + skills' },
        ],
      },
      caption: 'From one line to a working plugin. Nothing installs until you pick it.',
    },
    {
      code: [
        '# add the marketplace (once)',
        'claude plugin marketplace add shironigun/claude-marketplace',
        '',
        '# install what you need',
        'claude plugin install qa-engineering@shironigun',
        'claude plugin install api-testing@shironigun',
        '',
        '# check, update, tidy up',
        'claude plugin list',
        'claude plugin marketplace update shironigun',
        'claude plugin disable api-testing@shironigun',
      ],
      caption: 'The whole install, from the repo’s README. Inside a session, the same commands start with /plugin.',
    },
    { note: 'Plugins run in Claude Code in the terminal, in the desktop app’s local sessions and in VS Code. They don’t run in cloud sessions.' },

    { h2: 'Rules every plugin keeps' },
    { p: 'The plugins were built months apart, but they agree on a handful of rules. I didn’t write these as a policy first. They are what kept proving right, so every new plugin started with them.' },
    {
      cards: [
        { title: 'Ask before writing', tag: 'every writer', body: 'Every skill that creates a ticket, a test case or a comment shows the draft first and waits for a yes. A write to the tracker is real; it notifies people.' },
        { title: 'Stand on your own', tag: 'no dependencies', body: 'No plugin needs another to work. QA Engineering copied the toolkit’s skills in rather than depending on it.' },
        { title: 'Pin the tools', tag: '.mcp.json', body: 'Bundled MCP servers are pinned to exact versions, so an update somewhere else can’t change a plugin’s behaviour overnight.' },
        { title: 'Write the style down', tag: 'references/', body: 'The house style lives in the skill and its references: title grammar, step format, field rules, worked examples. Not in anyone’s head.' },
        { title: 'Keep private things out', tag: 'placeholders', body: 'The product and organisation are replaced by placeholders. The product-neutral plugins keep a team’s specifics in a profile that git ignores.' },
        { title: 'Version everything', tag: 'plugin.json', body: 'Each plugin carries its own version, from 0.1.0 to 1.1.0, so you can tell what changed and when.' },
      ],
      columns: 3,
      caption: 'Six rules the family shares. They were learned one plugin at a time.',
    },

    { h2: 'Going public without leaking' },
    { p: 'The plugins were built on real work. Their first drafts named the product, the team’s tracker and real tickets. That is fine on my machine and not fine on the internet.' },
    { p: 'Git remembers everything, so making the working repo public would have published every real name in its history. I chose a fresh start instead.' },
    {
      graph: {
        lanes: [{ name: 'The working repo' }, { name: 'Me' }, { name: 'The public repo' }],
        nodes: [
          { id: 'work', name: 'Built on real work', sub: 'real names, real tickets', lane: 0, row: 0, kind: 'store', detail: 'Everything was built against real jobs, so the drafts named the product, the organisation and real tickets.' },
          { id: 'map', name: 'Map every name', sub: 'product, org, IDs, tickets', lane: 1, row: 1, kind: 'human', detail: 'I had each product name, organisation, ID and ticket reference mapped to a placeholder, and kept the original repo private.' },
          { id: 'check', name: 'Check before publishing', lane: 1, row: 2, kind: 'gate', detail: 'Nothing went out until the copy was checked, including that no credential had ever been committed.' },
          { id: 'clean', name: 'One clean commit', sub: '9 October 2026', lane: 2, row: 3, kind: 'output', detail: 'A new public repository that starts from a single commit. The working history, with its real names, stayed private.' },
          { id: 'prs', name: 'dev, then main', sub: '18 pull requests', lane: 2, row: 4, kind: 'store', detail: 'From then on, new work lands on the dev branch and reaches main through a pull request.' },
          { id: 'second', name: 'A second pass', sub: 'neutral placeholders', lane: 1, row: 5, kind: 'human', detail: 'The placeholders still hint at a brand. A branch that makes them fully neutral is written and not merged yet.' },
        ],
        edges: [
          { from: 'work', to: 'map', label: 'everything' },
          { from: 'map', to: 'check', label: 'scrubbed copy' },
          { from: 'check', to: 'clean', label: 'approved' },
          { from: 'clean', to: 'prs', label: 'new work' },
          { from: 'prs', to: 'second', label: 'what still leaks' },
        ],
      },
      caption: 'How the marketplace went public. The history that named real things never left the private repo.',
    },
    { p: 'Placeholders are not perfect. They can still hint at the industry, and a stray detail can survive a scrub. So I treat the public repo like a release: checked before it goes out, versioned, and never pushed in a hurry.' },

    { h2: 'My role and the team' },
    { p: 'This is my own project. I picked every job worth a plugin, wrote the rules each one follows, and reviewed everything before it shipped. AI agents wrote the files to my specifications.' },
    {
      table: {
        columns: ['Stage', 'Me', 'AI agents', 'Team'],
        rows: [
          ['Choosing the jobs', 'Picked the jobs worth a plugin, from my own week', '', ''],
          ['Specifying', 'Wrote the house style, the rules and the limits for every skill', 'Drafted skills and references to my specs', ''],
          ['Building', 'Reviewed every plugin before it shipped', 'Wrote the files, scripts and tests', ''],
          ['Proving', 'Used them on real work and fed back what broke', 'Ran the evaluations and reviews I set', 'The support team’s edits shaped the release-notes rules'],
          ['Publishing', 'Decided what went public and approved the scrub', 'Mapped names to placeholders', ''],
          ['Teaching', 'Prepared a workshop runbook on the QA plugin', 'Wrote the course material to my outline', ''],
        ],
      },
      caption: 'Who did what across the marketplace.',
    },

    { h2: 'How I approached it' },
    {
      stages: [
        { name: 'Solve one job', part: 'A plugin starts as one job from my own week', by: 'me' },
        { name: 'Write the style down', part: 'Rules, formats and examples in the skill', by: 'me' },
        { name: 'Build to the spec', part: 'AI agents write it; I review', by: 'ai' },
        { name: 'Prove it on real work', part: 'Use it, correct it, tighten it', by: 'proved' },
        { name: 'Combine and publish', part: 'One catalogue, one clean commit', by: 'me' },
        { name: 'Keep growing', part: 'Feature Intelligence on the dev branch', by: 'ai', now: true },
      ],
      caption: 'The same six steps, repeated for every plugin.',
    },
    { lead: 'Solve one job.', p: 'No plugin started as an idea for a plugin. Each started as a job I had done by hand too many times.' },
    { lead: 'Write the style down.', p: 'This is where most of my time went. A rule like “every step has an expected result” sounds obvious until you try to make an AI follow it every time.' },
    { lead: 'Build to the spec.', p: 'AI agents wrote the files: skills, references, scripts and tests. I read what they wrote and sent back what was wrong.' },
    { lead: 'Prove it on real work.', p: 'Each plugin was used on real tickets or real releases before it went anywhere near the public repo.' },
    { lead: 'Combine and publish.', p: 'Only once six of them worked did I give them one home: one catalogue file and one clean commit.' },
    { lead: 'Keep growing.', p: 'The newest plugins started life inside the marketplace. Feature Explainer joined through a pull request, and Feature Intelligence is being built on the dev branch.' },

    { h2: 'Key decisions' },
    {
      decisions: [
        {
          q: 'One big plugin, or one plugin per job?',
          options: ['One plugin that does everything', 'One plugin per job, in one marketplace'],
          chose: 'One plugin per job, in one marketplace',
          why: 'People need different things. A tester who only writes API cases shouldn’t have to install an orchestrator. The marketplace gives one address; each plugin stays small.',
        },
        {
          q: 'Keep the toolkit once the flagship took in its skills?',
          options: ['Retire it', 'Keep it as the light option'],
          chose: 'Keep it as the light option',
          why: 'Some teams want one skill, not a whole loop. The README says so plainly: the toolkit is the pick-what-you-need alternative to the flagship.',
        },
        {
          q: 'Seventeen agents or two skills for release notes?',
          options: ['A seventeen-agent pipeline', 'Two skills with opposite jobs'],
          chose: 'Two skills with opposite jobs',
          why: 'The two-skill suite already worked, and I could read every rule in it. I said no to the agents and kept what worked.',
        },
        {
          q: 'Product-specific plugins: publish them or keep them private?',
          options: ['Keep them private', 'Publish them with placeholders'],
          chose: 'Publish them with placeholders',
          why: 'The method is the part others can use: how a bug is shaped, how a release is triaged. With the product and organisation replaced, the method travels.',
        },
      ],
      caption: 'Four decisions that shaped the marketplace.',
    },
    {
      call: {
        saw: 'The working repo was full of real names, tickets and the product itself. Making it public would have published all of that history.',
        decided: 'Start a new public repo from one clean commit, with every product reference mapped to a placeholder, and keep the original private.',
        why: 'You can’t un-publish history. A clean start was the only version I could stand behind.',
      },
    },

    { h2: 'How I knew it was right' },
    { p: 'Each plugin was proved its own way, because each does a different job. The detail is on each plugin’s page; here is the short version.' },
    {
      table: {
        columns: ['Plugin', 'How it was proved'],
        rows: [
          ['QA Engineering', 'Two recorded dry runs, a live test on a real product, and nine behavioural evaluations: seven passed, and both misses are explained on its page.'],
          ['Release-notes suite', 'Used to draft real client notes. The support team’s edits became rules the releaser enforces.'],
          ['UI Testing, API Testing, CRM Bug Suite', 'Built from the formats I use on real tickets, and checked against them.'],
          ['QA Toolkit', 'Its four skills became the flagship’s first four, and were tested again there.'],
          ['Feature Explainer', 'A lint step and page checks run on every explainer before anyone sees it.'],
          ['Feature Intelligence', '107 automated tests passing, and a pilot on a made-up feature with 17 planted faults. Six evaluations are written and not run yet.'],
        ],
      },
      caption: 'Proof, plugin by plugin.',
    },

    { h2: 'Where it is now' },
    { p: 'Seven plugins are public on main, and anyone can add them with the commands above. Feature Intelligence is in development on the dev branch, and will join the catalogue when it has passed its own evaluations.' },
    { p: 'Every plugin page tells its own story end to end. If you only read one, read QA Engineering: it is where everything I learned in the others came together.' },

    { h2: 'What I learned' },
    { quote: 'Build the tool for one job first. If it earns its keep, it earns its place on the shelf.' },
    { lead: 'Small first, then together.', p: 'Every plugin that works today worked alone first. If I had designed the marketplace before the plugins, I would have built the wrong shelf.' },
    { lead: 'A house style is a product.', p: 'Writing down how I file a bug made me decide what a good bug is. The rules got better because a machine had to follow them.' },
    { lead: 'Publishing has its own bugs.', p: 'Placeholders leak in odd places. Going public is a release like any other: checked, versioned, and never rushed.' },
    { link: { to: '/case-studies/qa-plugin', text: 'Read the flagship: QA Engineering' } },
    { link: { href: 'https://github.com/shironigun/claude-marketplace', text: 'See the marketplace on GitHub' } },
  ],
};
