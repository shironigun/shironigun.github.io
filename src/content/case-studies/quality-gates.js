export default {
  body: [
    { p: 'When I joined the CRM product team, defects reaching production were causing client escalations and unplanned sprint interruptions. I designed a quality framework to fix the cause rather than the symptoms. Within two quarters defect leakage was down by about 40%, and three other teams went on to adopt it.' },
    { numbers: [['~40%', 'less defect leakage, by my own tracking'], ['0', 'critical defects across 6 consecutive sprints'], ['3', 'other teams adopted the framework']] },

    { h2: 'The problem' },
    { p: 'The team was shipping features with ambiguous acceptance criteria, so business stakeholders and developers expected different things. Defects were caught late, or in production, which derailed sprints and cost client trust.' },

    { h2: 'Finding the cause' },
    { p: 'Before changing anything, I ran a two-week root-cause analysis of the defects that had escaped, using 5 Whys and mapping the defect lifecycle in Azure DevOps. The answer was clear: 68% of production bugs traced back to incomplete acceptance criteria.' },

    { h2: 'Designing the gates' },
    { p: 'I designed “Strict Quality Gates”: a mandatory Definition of Ready and Definition of Done, with acceptance-criteria templates written as Given, When, Then. Work couldn’t enter a sprint, or leave it, without passing its gate.' },
    {
      pair: [
        { title: 'Definition of Ready', items: ['The story is clear and unambiguous', 'Criteria cover the happy path and at least two edge cases', 'The design is referenced, or marked not needed', 'Dependencies and integration impact are assessed', 'QA reviewed the criteria before development'] },
        { title: 'Definition of Done', items: ['All acceptance criteria are verified', 'Tested across every integration', 'No critical or high defects open', 'Matches the approved design', 'Release notes are drafted'] },
      ],
    },

    { h2: 'Making it stick' },
    { p: 'A framework only matters if the team uses it. I worked with the Product Owner and the engineering lead to build the gates into the sprint workflow, trained the team over four facilitated sessions, and added automated gate checks to the Azure DevOps pipeline.' },
    { p: 'Then I measured it. I tracked defect escape rates every week and refined the framework in a retrospective every two sprints. Within two quarters leakage was down by about 40%, and the team went six consecutive sprints without a critical defect. Three other teams across the division have since adopted the framework.' },

    { h2: 'Leading the QA team' },
    { p: 'I now lead the QA team. I trained two QA hires from non-IT backgrounds to independent sprint work, and onboarded three new analysts in 2026.' },
    { p: 'When the senior QA left without warning or a handover, I took over QA for the release mid-cycle, and it shipped on time with no drop in quality.' },
    { link: { to: '/case-studies/ai-test-suite-audit', text: 'Related: how I audited our AI-built test suite' } },

    { h2: 'What I took from it' },
    { quote: 'Quality is a communication problem as much as a technical one.' },
    { p: 'Once acceptance criteria became something the whole team owned, people started thinking about edge cases earlier, before a line of code was written.' },
  ],
};
