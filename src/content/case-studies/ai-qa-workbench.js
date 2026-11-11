export default {
  body: [
    { p: 'In July 2026 I joined the DIS AI Foundations program, a five-day AI hackathon run jointly by our division and other Perseus Group divisions. After a day of AI sessions, there were four days to find a problem, design a solution and build a working prototype. Most teams worked on product features. My project was for the people who test them.' },

    { h2: 'The question behind it' },
    { quote: 'If developers are becoming AI reviewers and orchestrators, why shouldn’t QA?' },
    { p: 'The goal was to move QA from executing repetitive tasks to reviewing, validating and orchestrating AI-generated work.' },

    { h2: 'What it does' },
    { p: 'The workbench starts from a user story and carries it all the way to a structured bug report.' },
    {
      ol: [
        'It reads the story and identifies gaps in the requirements before any testing starts.',
        'It generates human-readable test cases and links them to Azure DevOps.',
        'It generates Playwright automation mapped to those test cases.',
        'It runs the tests through pipelines, publishes the reports and notifies the team.',
        'It drafts structured bug reports with clear reproduction steps, expected results and actual results.',
      ],
    },
    { figure: 'pipeline', caption: 'Six agents, each with one job.' },

    { h2: 'Under the hood' },
    { p: 'The workbench uses multi-agent orchestration, four switchable AI providers, retrieval over a local knowledge base, and golden-file regression checks on the AI’s own output.' },

    { h2: 'Who did what' },
    { p: 'I designed the system, specified every agent and flow, chose the architecture trade-offs and quality-controlled the output. Claude Code wrote the code under my direction, and a teammate built the companion Playwright suite.' },

    { h2: 'Recognition' },
    { photo: '/certifications/dis-ai-foundations-certificate.jpg', width: 1600, height: 1131, alt: 'Certificate of completion from Dealer Information Systems certifying that Mahmood Ahmad completed AI Foundations: From Developer to Orchestrator, dated 3 July 2026.', caption: 'Certificate of completion, AI Foundations: From Developer to Orchestrator, July 2026.' },
  ],
};
