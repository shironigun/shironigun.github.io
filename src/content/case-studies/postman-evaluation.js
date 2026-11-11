export default {
  documents: [
    { title: 'Postman API testing: proof of concept', meta: 'Presentation, 35 slides, 2025', href: '/documents/postman-poc-presentation.pdf', action: 'Present slides', primary: true },
    { title: 'Postman for API testing: evaluation', meta: 'Written evaluation, 10 pages, 2025', href: '/documents/postman-api-testing-evaluation.pdf', action: 'Read the evaluation' },
  ],
  documentsNote: 'As presented in 2025. Postman’s plans and limits have changed since; the tables in this article are current as of November 2026.',
  body: [
    { p: 'In early 2025 our QA team used Postman for basic API checks, but its automation, performance and security features were unexplored. I evaluated the full feature set, mapped it plan by plan, and presented the findings to the QA and engineering teams. The recommendation made Postman the standard API testing tool across more than five teams.' },
    { p: 'I have since rechecked the evaluation against Postman’s official documentation, as of November 2026. The original presentation and written evaluation are at the top of this page.' },

    { h2: 'The problem' },
    { p: 'The QA team validated APIs by hand. There was no standard tooling for functional, performance or automated API testing, no CI integration for API tests, no structured way to chain calls or manage environments, and no view of API health.' },

    { h2: 'How I evaluated it' },
    { p: 'I started with a deep dive into the full feature set, from workspaces, environments and collection runs to Flows, API chaining, performance testing, AI assistance, scripting, test data, CI integrations, vault integrations and monitors. Then I mapped every feature against the plans on offer, including run limits, virtual-user limits for performance testing and collaboration limits.' },
    { p: 'I documented the limitations as carefully as the strengths: performance caps, no distributed load testing, limited contract testing and no built-in vulnerability scanning. The recommendation followed from both. Use Postman for functional, contract and end-to-end testing with automation, alongside specialist tools for high-scale performance and security.' },

    { h2: 'The capabilities, explained' },
    { p: 'These are the capabilities the presentation covered, what each one does for a testing team, and which plans include it as of November 2026.' },
    { h3: 'Organise and configure' },
    { lead: 'Workspaces.', p: 'Shared spaces where a team keeps its collections, environments and documentation together, so everyone tests against the same requests.', meta: 'Team collaboration from the Team plan; private and partner workspaces on Enterprise.' },
    { lead: 'Environments and variables.', p: 'One collection runs against QA, staging or production by switching environment. Variables at global, collection, environment, data and local scope keep URLs and test data out of the requests, and the narrowest scope wins.', meta: 'All plans.' },
    { h3: 'Build tests' },
    { lead: 'API chaining.', p: 'A script saves a value from one response, such as an ID or a token, into a variable that the next request uses, so a complete workflow runs end to end.', meta: 'All plans.' },
    { lead: 'Scripts and assertions.', p: 'Pre-request and post-response scripts in JavaScript, with pm.test, built-in Chai assertions and snippets for common checks such as status codes, response times and JSON structure.', meta: 'All plans.' },
    { lead: 'Test data generation.', p: 'Dynamic variables built on Faker generate names, emails, IDs and timestamps, and iteration data can come from CSV or JSON files, so tests don’t depend on hand-made data.', meta: 'All plans.' },
    { h3: 'Run and automate' },
    { lead: 'Collection Runner.', p: 'Runs a whole collection or folder with set iterations and data, either manually or on a schedule in the Postman cloud.', meta: 'Unlimited runs on all plans; scheduled runs use monitoring requests.' },
    { lead: 'Postman CLI and CI/CD.', p: 'The Postman CLI runs the same collections in GitHub Actions, GitLab, Azure Pipelines or Jenkins, so API tests can gate every build. Newman still runs older v2.1 collections.', meta: 'All plans.' },
    { lead: 'Reporting.', p: 'Every run records each request, response code, timing and assertion, and the CLI exports CLI, JSON, JUnit and HTML reports for pipelines.', meta: 'All plans.' },
    { h3: 'Performance and reliability' },
    { lead: 'Performance testing.', p: 'Simulates virtual users with fixed, ramp-up, spike or peak load profiles to catch response-time regressions before a release.', meta: 'Local runs on all plans; cloud runs at $0.04 per virtual-user hour.' },
    { lead: 'Monitors.', p: 'Scheduled checks from the Postman cloud confirm an API is up and behaving as specified, with alerts to Slack or Microsoft Teams and a trend dashboard.', meta: '1,000 requests a month on Free; 10,000 on paid plans.' },
    { lead: 'Mock servers.', p: 'Return saved example responses from a mock URL, so front-end and QA work can start before the backend is ready.', meta: 'Unlimited on all plans.' },
    { h3: 'Security and extensibility' },
    { lead: 'Vault and secrets.', p: 'Keys and tokens stay in Postman Vault instead of in shared collections or environments, and enterprise teams can connect external vaults such as AWS Secrets Manager, Azure Key Vault or HashiCorp Vault.', meta: 'Vault on all plans; external vault integrations on Enterprise.' },
    { lead: 'Flows.', p: 'A low-code visual canvas for chaining requests with logic, used for automations and quick workflows without writing code.', meta: 'Manual flows on all plans; 25 to 500 automation credits a month by plan.' },
    { lead: 'AI assistance.', p: 'In 2025 this was Postbot. Postman’s Agent Mode now turns plain-language instructions into actions: it generates tests, fixes errors, creates mock servers and builds documentation.', meta: 'AI credits included on every plan.' },
    { lead: 'Integrations.', p: 'Slack and Microsoft Teams notifications, native Git, Jira and a VS Code extension keep testing inside the tools the team already uses.', meta: 'All plans.' },

    { h2: 'Plans at a glance' },
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

    { h2: 'What has changed since 2025' },
    { p: 'Rechecking the 2025 findings against the current product shows how quickly tooling moves.' },
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

    { h2: 'Strengths and limitations' },
    { p: 'From the evaluation, with each point checked against the current product.' },
    {
      pair: [
        {
          title: 'Strengths',
          items: [
            'Easy to adopt: an intuitive interface lets manual testers send, debug and automate requests without heavy scripting.',
            'Complete functional testing: environments, chaining, scripted assertions and mocks in one tool, from a single request to an end-to-end workflow.',
            'Built for teams: shared workspaces, roles and native Git keep collections versioned and in sync.',
            'Fits the pipeline: the Postman CLI runs the same collections in CI, so API tests gate every build.',
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

    { h2: 'The verdict' },
    { p: 'The conclusion of the evaluation still holds against the current product. Postman is the right tool for functional, contract and end-to-end testing, with automation, CI/CD pipelines and team collaboration. It is not the tool for high-scale performance or deep security testing; those are best paired with dedicated tools such as JMeter, Gatling or OWASP ZAP.' },
    { numbers: [['15', 'capabilities evaluated and explained'], ['4', 'plans mapped feature by feature'], ['5+', 'teams adopted it as the standard API tool'], ['16', 'strengths and limitations documented']] },

    { h2: 'What I took from it' },
    { quote: 'A good proof of concept doesn’t just prove a tool works; it shows where it stops working.' },
    { p: 'Being upfront about the limits is what made the team trust the recommendation and adopt it faster. Revisiting it now shows how quickly tooling moves: half of the 2025 limits no longer apply.' },
  ],
};
