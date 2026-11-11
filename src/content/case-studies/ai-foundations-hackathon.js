export default {
  documents: [
    { title: 'Working with Claude: The Eleven Building Blocks', meta: 'Practical handbook, 183 pages', href: '/documents/working-with-claude-eleven-building-blocks.pdf', action: 'Read the handbook', primary: true },
  ],
  body: [
    { p: 'In August 2026 I organised and led an AI hackathon for the QA team, and brought the design team in alongside them. The goal was to turn AI concepts into working solutions to real problems in the team’s own work. I wrote a full project brief for every participant, taught the foundations, mentored each team to a working demonstration, and created a handbook so the learning continues across the division.' },

    { h2: 'Shaping the programme' },
    { p: 'I brainstormed the projects with the team, finalised the scope and included the design team alongside QA. There were nine participants, eight QA engineers and a designer, and each received a full specification: the mission, architecture, functional requirements, deliverables with acceptance criteria, guardrails and a phased roadmap.' },

    { h2: 'Teaching the foundations' },
    { p: 'The sessions covered Claude Projects, Skills, MCP servers, agents and workflows. I opened with a talk, “AI Foundations: From Doing to Directing”, and a live example on Azure DevOps MCP servers.' },
    { p: 'I also shared a skill I created that drafts test cases in my own style, learned from hundreds of test cases I had written, as a worked example of what the team could make for themselves.' },

    { h2: 'The nine projects' },
    { p: 'One brief per participant, each scoped to a real problem in the team’s own work: five on testing and quality, three on knowledge and delivery insight, and one on design.' },

    { h2: 'Principles every brief shared' },
    {
      list: [
        'AI recommends, a person approves: nothing is written back to the team’s tools without an explicit approval.',
        'Every finding shows its evidence: answers cite the stories, defects or code they came from.',
        'Compute what can be computed: metrics and counts are calculated, not left to the model.',
        'A thin slice first: build one module end to end before widening the scope.',
      ],
    },

    { h2: 'Mentoring to working demonstrations' },
    { p: 'I guided every team through ideation, implementation and delivery of a minimum viable product, and unblocked them along the way. All nine reached a working demonstration.' },
    { numbers: [['9', 'project briefs, one per participant'], ['11', 'Claude building blocks taught'], ['183', 'pages in the handbook']] },

    { h2: 'The handbook' },
    { p: 'So the learning wouldn’t end with the event, I created “Working with Claude: The Eleven Building Blocks”, a 183-page practical guide covering Projects, Instructions, Skills, MCP servers, Connectors, Artifacts, Marketplace, Plugins, Routines, Agents and Workflows, with examples by role and a quick-reference sheet. You can read it from the top of this page.' },

    { h2: 'Recognition' },
    { photo: '/certifications/ai-foundations-organiser-certificate.jpg', width: 1600, height: 1131, alt: 'Certificate of appreciation certifying that Mahmood Ahmad successfully organised AI Foundations: Powering work with AI Orchestration, dated 13 August 2026.', caption: 'Certificate of appreciation for organising and delivering the AI Foundations initiative, August 2026.' },
  ],
};
