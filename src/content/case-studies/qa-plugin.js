export default {
  body: [
    { p: 'Most AI QA tools stop at test cases written as text. The real job is a loop: it starts with a user story and ends with a bug on a board your team trusts. The QA Engineering Plugin is my answer to that loop, an open-source Claude Code marketplace of 7 plugins and 30 skills, where one orchestrator coordinates the agents and a person approves every write before anything touches Azure DevOps.' },

    { h2: 'Why I created it' },
    { lead: 'Context lives in the tracker.', p: 'Acceptance criteria, comments, history and linked bugs all sit in Azure DevOps. An agent has to read all of it, and say what it is guessing.' },
    { lead: 'Writes need a human gate.', p: 'One wrong bulk write into the tracker costs more trust than the agent saves in time.' },
    { lead: 'Manual testers need a path.', p: 'A team that tests by hand needs a way in, not a code dump. That’s why the plugin includes a self-paced Playwright course that remembers where each learner stopped.' },

    { h2: 'The loop' },
    { figure: 'qaLoop', caption: 'From a story in to a filed bug out. The gated steps wait for a person.' },
    { p: 'The flagship plugin, qa-engineering, has 16 skills, 4 agents and 9 slash commands, and covers 6 test levels.' },

    { h2: 'Nothing is written without a yes' },
    { p: 'Every write to the tracker goes through two gates and a dry run.' },
    {
      ol: [
        'Gate 1: you pick which test cases get published, and to which plan and suite.',
        'A dry run shows every title, plan, suite, story link and field mapping, and writes nothing.',
        'Gate 2 needs your explicit yes. “ok” or silence doesn’t count, and a new selection means a new dry run.',
        'Only then does it create the test cases, add them to the suite and link them to the story. Filing a bug goes through the same gate.',
      ],
    },

    { h2: 'It reads the failure before it files anything' },
    { p: 'When a test fails, failure triage reads the trace and classifies it before anything is drafted. Only product bugs are drafted for filing, in the house format, and only through the gate. A flaky test is flagged so it can be stabilised. A broken environment is flagged too, so the product isn’t blamed for it. And a defect in the test itself means fixing the test, not the product.' },

    { h2: 'It labels what it knows' },
    { p: 'Story analysis reads the whole story: acceptance criteria, comments, history, parent and child items, and linked bugs. Every claim it makes carries one of four labels: Confirmed, Inferred, Assumption or Gap. It never invents a requirement, and the analysis step can’t write to the tracker at all.' },

    { h2: 'Tested like a product' },
    { p: 'I ran the plugin like any other product. It was split into 20 sub-projects, each specified, planned, built and reviewed, and it has 9 behavioural evaluations of its own. It took one week to go from the first specification to version 0.8.' },
    { numbers: [['7', 'plugins'], ['30', 'skills'], ['20', 'sub-projects, each specified and reviewed'], ['9', 'behavioural evaluations']] },

    { h2: 'Try it' },
    { p: 'It runs in the terminal, the Claude desktop app and VS Code. Two commands install it:' },
    { code: ['claude plugin marketplace add shironigun/claude-marketplace', 'claude plugin install qa-engineering@shironigun'] },
    { link: { href: 'https://github.com/shironigun/claude-marketplace', text: 'See it on GitHub' } },

    { h2: 'Who did what' },
    { p: 'I designed the loop, the gates and the shared state, specified every skill and agent, wrote the evaluations and reviewed every result. Claude Code wrote the plugin code and drafted the skills under my direction. It’s open source, so anyone can use it, file issues or adapt it.' },
  ],
};
