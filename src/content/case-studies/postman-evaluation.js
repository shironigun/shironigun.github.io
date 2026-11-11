// The Postman evaluation (2025), rewritten 11 Nov 2026 in the round-2 voice. Sources: his 10-page written
// evaluation and 35-slide deck (both linked below), the previous version of this page, and
// docs/private/chat-exports/merged.md §2, §6 and §8 (the AI-features Postman framework, Oct 2026:
// specified by him, built by AI agents; INTERNAL numbers, so the method only, no counts).
// Adoption (C4): the "more than five teams" wording is the site's own, self-reported and unsourced; keep it
// exactly as worded, never add detail to it. The old call's "adopt it faster" was dropped as unsourced.
export default {
  updated: 'November 2026',
  documents: [
    { title: 'Postman API testing: proof of concept', meta: 'Presentation, 35 slides, 2025', href: '/documents/postman-poc-presentation.pdf', action: 'Present slides', primary: true },
    { title: 'Postman for API testing: evaluation', meta: 'Written evaluation, 10 pages, 2025', href: '/documents/postman-api-testing-evaluation.pdf', action: 'Read the evaluation' },
  ],
  documentsNote: 'As presented in 2025. Postman’s plans and limits have changed since; the tables in this article are current as of November 2026.',
  body: [
    { p: 'Every tester on the team had Postman installed. Almost nobody used more than its Send button.' },
    { p: 'In early 2025 our QA team used Postman for basic API checks, while its automation, performance and security features sat unexplored. I evaluated the full feature set, mapped it plan by plan, and presented the findings to the QA and engineering teams. The recommendation made Postman the standard API testing tool across more than five teams.' },
    { p: 'In November 2026 I rechecked it against Postman’s official documentation. The original presentation and written evaluation are at the top of this page, as presented.' },

    { h2: 'At a glance' },
    { ol: [
      'I scoped the question: features, cost, integrations, strengths and limits, and whether whole teams could adopt the tool.',
      'I evaluated every capability and mapped each one against Postman’s plans, limits and add-on prices.',
      'I wrote a 10-page evaluation and presented a 35-slide recommendation to the QA and engineering teams.',
      'In November 2026 I rechecked every finding against the current product, and kept the 2025 documents as they were presented.',
    ] },
    { numbers: [['15', 'capabilities evaluated and explained'], ['4', 'plans mapped feature by feature'], ['5+', 'teams adopted it as the standard API tool'], ['16', 'strengths and limitations documented']] },

    { h2: 'Copy, paste, squint' },
    { p: 'Picture Dana, a tester checking a new endpoint before a release. She pastes a token into a request, reads the JSON by eye, then copies an ID out of the response by hand to test the next call. Nothing she did is saved for the next release, and nothing runs in the pipeline.' },
    { p: 'The QA team validated APIs by hand. There was no standard tooling for functional, performance or automated API testing, no CI integration for API tests, no structured way to chain calls or manage environments, and no view of API health. Could the tool already on our machines do more, at what cost, and where would it stop?' },

    { h2: 'Yes, with a fence around it' },
    { p: 'Postman is the right tool for functional, contract and end-to-end testing, with automation, CI/CD pipelines and team collaboration. It is not the tool for high-scale performance or deep security testing; those are best paired with dedicated tools such as JMeter, Gatling or OWASP ZAP.' },
    {
      pair: [
        {
          title: 'Strengths',
          items: [
            'Easy to adopt: manual testers can send, debug and automate requests without heavy scripting.',
            'Complete functional testing: environments, chaining, scripted assertions and mocks in one tool, from a single request to an end-to-end workflow.',
            'Built for teams: shared workspaces, roles and native Git keep collections versioned and in sync.',
            'Fits the pipeline: the Postman CLI runs the same collections in CI, so API tests can gate every build.',
            'Documentation and mocking included, with no extra tools.',
            'Secure credential handling: Vault keeps keys and tokens out of shared collections.',
            'Stronger AI help: Agent Mode now generates tests and fixes failing requests, well beyond what Postbot offered in 2025.',
          ],
        },
        {
          title: 'Limitations',
          items: [
            'Not a load-testing platform: good for catching performance regressions, but very high-scale or distributed load still needs tools such as JMeter or Gatling.',
            'No direct database connection for validating backend data.',
            'No built-in security scanning: fuzzing and vulnerability scanning still need dedicated tools such as OWASP ZAP or Burp Suite.',
            'Collaboration is a paid feature: since March 2026 the Free plan is single-user.',
            'AI output needs review: generated tests are a strong start, but complex scenarios still need a tester’s judgement.',
            'App and CLI runs can differ, so results found in the app should be confirmed in a CLI run before relying on them in CI.',
          ],
        },
      ],
    },

    { h2: 'My role and the team' },
    { p: 'The 2025 evaluation was my own research: I scoped it, did it, wrote it up and presented it. The teams weighed the recommendation and adopted it. In 2026 I rechecked the findings and wrote the brief for a Postman framework for our AI features, which AI agents built.' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Scope', 'Set the questions: features, cost, integrations, strengths and limits, and fit for team adoption', '', ''],
        ['Evaluation', 'Recorded what every capability does and where it stops; mapped each to a plan and its limits', '', ''],
        ['Decision', 'Wrote the evaluation and presented the recommendation to QA and engineering', '', 'Adopted Postman as the standard API testing tool, across more than five teams'],
        ['Recheck', 'Rechecked every finding against Postman’s current documentation', '', ''],
        ['AI features', 'Wrote the brief and set the rules for what a failure means', 'Built the collection to my brief', ''],
      ],
    }, caption: 'Who did what. The 2025 evaluation was my own research; in 2026 AI agents built the AI-features collection to my brief.' },

    { h2: 'How I approached it' },
    { stages: [
      { name: 'Scope', part: 'Features, cost, integrations and fit', by: 'me' },
      { name: 'Deep dive', part: 'Every capability, its limits and its plan', by: 'me' },
      { name: 'Recommendation', part: 'Postman for functional work, specialists beside it', by: 'me' },
      { name: 'Adoption', part: 'The standard API tool across more than five teams', by: 'proved' },
      { name: 'AI features', part: 'A Postman framework for testing AI answers', by: 'ai' },
      { name: 'Recheck', part: 'Every finding checked against the 2026 product', by: 'me' },
    ], caption: 'From the scope in early 2025 to the AI-features framework and the recheck in 2026, with who carried each stage.' },
    { p: 'Follow the evaluation from three questions to a team decision, then on to the recheck. Notice the packet visiting Postman’s plans: a feature only counted once I knew what it cost.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'Postman and its docs' }, { name: 'QA and engineering' }],
        phases: [
          { name: 'Evaluate, early 2025', row: 0 },
          { name: 'Decide', row: 5 },
          { name: 'Recheck, November 2026', row: 8 },
        ],
        nodes: [
          { id: 'scope', name: 'Set the questions', sub: 'features, cost, fit', lane: 0, row: 0, kind: 'human', detail: 'What can it do for testing, what does it cost, and could whole teams adopt it?' },
          { id: 'try', name: 'Work through each feature', sub: 'workspaces to monitors', lane: 1, row: 1, kind: 'external', detail: 'Workspaces, environments, Flows, performance testing, AI help, vaults and monitors.' },
          { id: 'record', name: 'What it does, where it stops', lane: 0, row: 2, kind: 'human', detail: 'Two answers for every capability.' },
          { id: 'plans', name: 'Map it to a plan', sub: 'limits and add-ons', lane: 1, row: 3, kind: 'external', detail: 'Run, virtual-user and collaborator limits, and the paid add-ons a team would need.' },
          { id: 'weigh', name: 'Weigh both sides', sub: 'strengths vs limits', lane: 0, row: 4, kind: 'human', detail: 'The limits shaped the recommendation as much as the strengths.' },
          { id: 'docs', name: 'Write it up', sub: '10 pages, 35 slides', lane: 0, row: 5, kind: 'output', detail: 'Both documents are linked at the top of this page.' },
          { id: 'teams', name: 'The teams weigh it', sub: 'QA and engineering', lane: 2, row: 6, kind: 'human', detail: 'I presented the recommendation; the teams decided.' },
          { id: 'adopt', name: 'The standard API tool', sub: 'more than five teams', lane: 2, row: 7, kind: 'output', detail: 'Postman became the standard API testing tool across more than five teams.' },
          { id: 'recheck', name: 'Recheck every finding', sub: 'official docs only', lane: 1, row: 8, kind: 'external', detail: 'Every 2025 finding, checked against Postman’s official documentation.' },
          { id: 'tables', name: 'Update the tables', sub: '2025 documents untouched', lane: 0, row: 9, kind: 'output', detail: 'The page carries the current plans and what changed.' },
        ],
        edges: [
          { from: 'scope', to: 'try', label: 'questions' },
          { from: 'try', to: 'record', label: 'what it did' },
          { from: 'record', to: 'plans', label: 'capability' },
          { from: 'plans', to: 'weigh', label: 'plan + cost' },
          { from: 'weigh', to: 'docs', label: 'recommendation' },
          { from: 'docs', to: 'teams', label: 'the deck' },
          { from: 'teams', to: 'adopt', label: 'decision' },
          { from: 'docs', to: 'recheck', label: '2025 findings' },
          { from: 'recheck', to: 'tables', label: 'what changed' },
        ],
      },
      caption: 'The evaluation end to end, from three questions to a team decision and the 2026 recheck.',
    },
    { lead: 'Deep dive.', p: 'Every capability got two answers, what it does and where it stops, and then a plan: the limits and add-ons a team would hit.' },
    { lead: 'Recommendation.', p: 'Performance caps, no distributed load testing, limited contract testing and no built-in vulnerability scanning. So Postman got the functional work, and specialist tools the rest.' },

    { h2: 'Fifteen capabilities, one test each' },
    { p: 'Each capability faced the same three questions. Here they are on performance testing: watch the packet split three ways at the limit, with two roads staying in Postman and one leading to a specialist.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'Any plan' }, { name: 'Paid plans' }, { name: 'A specialist tool' }],
        nodes: [
          { id: 'cap', name: 'Pick a capability', sub: 'performance testing', lane: 0, row: 0, kind: 'human', detail: 'One capability at a time. This one has a limit that is easy to see.' },
          { id: 'does', name: 'What does it do?', sub: 'fixed, ramp-up, spike, peak', lane: 0, row: 1, kind: 'human', detail: 'It simulates virtual users to catch response-time regressions before a release.' },
          { id: 'stops', name: 'Where does it stop?', sub: 'scale and distribution', lane: 0, row: 2, kind: 'human', detail: 'Very high-scale or distributed load is beyond it.' },
          { id: 'local', name: 'Local runs', sub: 'every plan', lane: 1, row: 3, kind: 'output', detail: 'Local performance runs are included on every plan.' },
          { id: 'cloud', name: 'Cloud runs', sub: 'per virtual-user hour', lane: 2, row: 3, kind: 'output', detail: 'Cloud runs cost $0.04 per virtual-user hour, and only on paid plans.' },
          { id: 'big', name: 'JMeter or Gatling', sub: 'very large load', lane: 3, row: 3, kind: 'external', detail: 'Very high-scale or distributed load goes to a dedicated tool, beside Postman.' },
          { id: 'verdict', name: 'A verdict with a price', sub: 'into the recommendation', lane: 1.5, row: 4, kind: 'output', detail: 'Each capability ends with its plan and its limit beside it, which turns a feature list into a decision.' },
        ],
        edges: [
          { from: 'cap', to: 'does', label: 'capability' },
          { from: 'does', to: 'stops', label: 'its job' },
          { from: 'stops', to: 'local', label: 'small load' },
          { from: 'stops', to: 'cloud', label: 'cloud load' },
          { from: 'stops', to: 'big', label: 'very large load' },
          { from: 'local', to: 'verdict', label: 'plan' },
          { from: 'cloud', to: 'verdict', label: 'cost' },
          { from: 'big', to: 'verdict', label: 'the gap' },
        ],
      },
      caption: 'One capability through the evaluation, with November 2026 plans. Every capability got the same three questions.',
    },
    { p: 'Here are all fifteen, what each does for a testing team, and which plans include it as of November 2026.' },
    { h3: 'Organise and configure' },
    { lead: 'Workspaces.', p: 'Shared spaces where a team keeps its collections, environments and documentation together, so everyone tests against the same requests.', meta: 'Team collaboration from the Team plan; private and partner workspaces on Enterprise.' },
    { lead: 'Environments and variables.', p: 'One collection runs against QA, staging or production by switching environment. Variables at global, collection, environment, data and local scope keep URLs and test data out of the requests, and the narrowest scope wins.', meta: 'All plans.' },
    { h3: 'Build tests' },
    { lead: 'API chaining.', p: 'A script saves a value from one response, such as an ID or a token, into a variable the next request uses, so a whole workflow runs end to end.', meta: 'All plans.' },
    { lead: 'Scripts and assertions.', p: 'Pre-request and post-response scripts in JavaScript, with pm.test, built-in Chai assertions and snippets for common checks such as status codes, response times and JSON structure.', meta: 'All plans.' },
    { lead: 'Test data generation.', p: 'Dynamic variables built on Faker generate names, emails, IDs and timestamps, and iteration data can come from CSV or JSON files, so tests don’t depend on hand-made data.', meta: 'All plans.' },
    { h3: 'Run and automate' },
    { lead: 'Collection Runner.', p: 'Runs a whole collection or folder with set iterations and data, manually or on a schedule in the Postman cloud.', meta: 'Unlimited runs on all plans; scheduled runs use monitoring requests.' },
    { lead: 'Postman CLI and CI/CD.', p: 'The Postman CLI runs the same collections in GitHub Actions, GitLab, Azure Pipelines or Jenkins, so API tests can gate every build. Newman still runs older v2.1 collections.', meta: 'All plans.' },
    { lead: 'Reporting.', p: 'Every run records each request, response code, timing and assertion, and the CLI exports CLI, JSON, JUnit and HTML reports for pipelines.', meta: 'All plans.' },
    { h3: 'Performance and reliability' },
    { lead: 'Performance testing.', p: 'Simulates virtual users with fixed, ramp-up, spike or peak load profiles to catch response-time regressions before a release.', meta: 'Local runs on all plans; cloud runs at $0.04 per virtual-user hour.' },
    { lead: 'Monitors.', p: 'Scheduled checks from the Postman cloud confirm an API is up and behaving as specified, with alerts to Slack or Microsoft Teams and a trend dashboard.', meta: '1,000 requests a month on Free; 10,000 on paid plans.' },
    { lead: 'Mock servers.', p: 'Return saved example responses from a mock URL, so front-end and QA work can start before the backend is ready.', meta: 'Unlimited on all plans.' },
    { h3: 'Security and extensibility' },
    { lead: 'Vault and secrets.', p: 'Keys and tokens stay in Postman Vault instead of in shared collections or environments, and enterprise teams can connect external vaults such as AWS Secrets Manager, Azure Key Vault or HashiCorp Vault.', meta: 'Vault on all plans; external vault integrations on Enterprise.' },
    { lead: 'Flows.', p: 'A low-code visual canvas for chaining requests with logic, for automations and quick workflows without writing code.', meta: 'Manual flows on all plans; 25 to 500 automation credits a month by plan.' },
    { lead: 'AI assistance.', p: 'In 2025 this was Postbot. Postman’s Agent Mode now turns plain-language instructions into actions: it generates tests, fixes errors, creates mock servers and builds documentation.', meta: 'AI credits included on every plan.' },
    { lead: 'Integrations.', p: 'Slack and Microsoft Teams notifications, native Git, Jira and a VS Code extension keep testing inside the tools the team already uses.', meta: 'All plans.' },

    { h2: 'When the answers won’t sit still' },
    { p: 'In October 2026 the tool met a problem the 2025 evaluation never had to consider. Our AI features answer differently on every run, so an exact-match check fails even when the answer is fine.' },
    { p: 'I wrote the brief for a Postman framework to test them, for developers and testers alike, and AI agents built it. Every request carries a plain-language note on what its tests check. The collection signs in by itself and runs each AI skill against several model endpoints.' },
    { p: 'One rule decides the colour. A run fails only when the product would reject the answer; anything else only warns. So red always means something real.' },

    { h2: 'The calls I made' },
    { decisions: [
      {
        q: 'What should the evaluation weigh?',
        options: ['Features alone', 'Features against plans, limits and cost'],
        chose: 'Features against plans, limits and cost',
        why: 'Adoption was part of the scope. A capability that needs a higher plan or a paid add-on changes the decision, so every feature carries its plan.',
      },
      {
        q: 'Which result should a pipeline trust?',
        options: ['A run in the app', 'A run from the command line'],
        chose: 'A run from the command line',
        why: 'Results and configuration can differ between the app and the CLI, and pipelines run the CLI. A result found in the app should be confirmed in a CLI run before anyone relies on it.',
      },
      {
        q: 'For our AI features, what should a red result mean?',
        options: ['Any rule broken', 'Only an answer the product would reject'],
        chose: 'Only an answer the product would reject',
        why: 'AI answers vary from run to run, so a red run has to mean something real. Rules the product enforces fail the run; everything else only warns.',
      },
    ], caption: 'The decisions behind the evaluation and what followed it.' },
    { call: {
      saw: 'The team used Postman only to send requests by hand, while its automation, performance and security features sat unexplored, each with real limits.',
      decided: 'I recommended it as the standard tool for functional, contract and end-to-end testing, and said plainly where it stops.',
      why: 'Being upfront about the limits made the recommendation easier to trust.',
    } },

    { h2: 'How the findings held up' },
    { p: 'Rechecking the 2025 findings against the current product shows how quickly tooling moves. The verdict holds; about half of the 2025 limits no longer apply.' },
    { h3: 'Plans today' },
    {
      table: {
        columns: ['Plan detail', 'Free', 'Solo', 'Team', 'Enterprise'],
        rows: [
          ['Price', '$0', '$9 a month, billed annually', '$19 per user a month, billed annually', 'Contact sales'],
          ['Users', '1', '1', 'Unlimited', 'Unlimited'],
          ['Collection Runner', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'],
          ['Mock servers', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'],
          ['Monitoring requests a month', '1,000', '10,000', '10,000', '10,000'],
          ['Flows automation credits a month', '25', '50', '100 per team', '500 per team'],
          ['Cloud performance testing', 'Not included', '$0.04 per virtual-user hour', '$0.04 per virtual-user hour', '$0.04 per virtual-user hour'],
          ['Private workspaces', 'No', 'No', 'No', 'Yes'],
          ['External vault integrations', 'No', 'No', 'No', 'With the security add-on'],
        ],
        note: 'Source: Postman pricing and plan documentation, checked November 2026. Basic and Professional are no longer sold to new customers; existing customers keep their limits until renewal.',
      },
      caption: 'Postman’s current plans, as published in November 2026.',
    },
    { h3: 'What changed since 2025' },
    {
      table: {
        columns: ['Area', 'Early 2025', 'November 2026'],
        rows: [
          ['Plans', 'Free, Basic, Professional, Enterprise', 'Free, Solo, Team, Enterprise, from March 2026'],
          ['Free plan', 'Up to three collaborators', 'One user, no team'],
          ['Collection runs', '25 a month on Free and Basic; unlimited as a $49 add-on', 'Unlimited on all plans'],
          ['Performance testing', '100 virtual users on Free and Basic, 500 on Professional and Enterprise', 'Local runs on all plans; cloud runs billed per virtual-user hour'],
          ['Mock servers', '1,000 to 100,000 requests a month by plan', 'Unlimited on all plans'],
          ['AI assistance', 'Postbot, a $9 add-on', 'Agent Mode, with AI credits included in every plan'],
          ['Flows', '$12 per seat a month', 'Automation credits included by plan, then $1 per 1,000'],
          ['CI/CD', 'Newman or the Postman CLI', 'Postman CLI recommended; Newman runs only older v2.1 collections'],
          ['Monitoring', '1,000 requests on Free, 10,000 on paid plans', 'Same allowances; paid plans continue pay-as-you-go past the limit'],
        ],
      },
      caption: 'The 2025 findings, rechecked against the current product.',
    },

    { h2: 'Where it is now' },
    { p: 'The conclusion still holds: Postman for functional, contract and end-to-end testing, with specialist tools beside it for high-scale load and security. The 2025 documents stay as presented; the tables record what changed.' },

    { h2: 'What I learned' },
    { quote: 'A good proof of concept doesn’t just prove a tool works; it shows where it stops working.' },
    { p: 'Naming the limits made the recommendation easier to trust, not harder. A team that knows where a tool stops can plan for the gap instead of discovering it mid-release.' },
    { p: 'An evaluation is also a snapshot with a date on it. Revisiting this one shows how quickly tooling moves: about half of the 2025 limits no longer apply, and the page says which.' },
    { link: { to: '/case-studies/ai-evaluation', text: 'How I evaluate AI features' } },
    { link: { to: '/case-studies/ai-test-suite-audit', text: 'API test automation and the audit' } },
  ],
};
