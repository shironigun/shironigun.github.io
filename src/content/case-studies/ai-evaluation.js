// Company work: say only what he did and the problem it solved. No feature or skill names,
// per-feature test counts, data volumes, architecture, API details or defects found (see
// docs/content/content-rules.md). His own open-source plugin and the course are his to describe.
// The public copy of the Lab (public/labs/skills-evals-lab.html) uses fictional examples only.
export default {
  documents: [
    { title: 'Skills Evals Lab', meta: 'Interactive course, 16 lessons, about 2¾ hours, 2026', href: '/labs/skills-evals-lab.html', action: 'Open the course', primary: true },
  ],
  documentsNote: 'Written for our QA and product teams. Every example in it is fictional. It runs in your browser and keeps your progress on your device.',
  body: [
    { h2: 'The problem' },
    { p: 'An AI feature doesn’t give the same answer twice. The same message can be read differently on the next run, so one passing test proves very little, and a team has no clear way to say an AI feature is ready to ship.' },

    { h2: 'What I did' },
    { p: 'I built a repeatable way to evaluate AI features before release, used it on the AI features my team builds and on my own AI tooling, and wrote a course so the rest of the team can apply it.' },
    { numbers: [['3 of 3', 'runs must pass before a case counts'], ['9', 'behavioural evaluations on my own plugin'], ['16', 'lessons in the course']] },

    { h2: 'The method' },
    {
      ol: [
        'One test for every rule the model can get wrong, not one test per screen.',
        'Check the shape first. Every answer must match the agreed format before its content is judged.',
        'Run every case three times. A case counts only when all three runs pass.',
        'Judge content against written criteria, so two reviewers reach the same verdict.',
        'Include the attacks. An instruction hidden in a customer’s message is text to read, not an order to follow.',
      ],
    },

    { h2: 'What it solved' },
    {
      list: [
        'A clear release bar for AI features: a feature is ready when every rule passes on every run, not when a demo looks right.',
        'Issues show up before release, because every rule the model can break has its own test.',
        'Results anyone can check, because the pass rules and the grading criteria are written down.',
        'The method is written down as a course, so others on the team can learn it.',
      ],
    },

    { h2: 'Holding my own tools to the same bar' },
    { p: 'The QA Engineering Plugin is AI as well, so it gets the same treatment: 9 behavioural evaluations, each run three times. On 13 October 2026 the suite scored 83.3%, with 7 of the 9 cases passing every run.' },
    { link: { to: '/case-studies/qa-plugin', text: 'Read about the QA Engineering Plugin' } },

    { h2: 'Teaching it: the Skills Evals Lab' },
    { p: 'The Skills Evals Lab is the course I wrote for our QA and product teams: 14 modules and 16 lessons, about two and three-quarter hours, with five hands-on labs and two tracks, one for associates and one for eval leads.' },
    {
      list: [
        'Why the same input gives different answers, and why one passing run proves little',
        'What makes a good skill, with a checker that grades a SKILL.md as you type',
        'Answers checked against a schema, including the ways models break the format',
        'Graders, judge calibration and pass@k, simulated in the browser',
        'It ends with a first real evaluation of a skill',
      ],
    },
    { p: 'You can open the whole course from the top of this page.' },

    { h2: 'Still learning' },
    { p: 'Evaluation is the part of AI product work I’m going deepest on. I’m preparing for the ISTQB AI Testing (CT-AI) and Testing with Generative AI (CT-GenAI) certifications, and working through my own roadmap of evaluation, retrieval and agent topics.' },

    { h2: 'Who did what' },
    { p: 'I designed the method and the evaluations, wrote the test cases and grading criteria, and reviewed every result. Claude Code wrote the scripts and built the course pages under my direction.' },
  ],
};
