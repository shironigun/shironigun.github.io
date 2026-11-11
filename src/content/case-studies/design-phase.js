export default {
  body: [
    { p: 'Designs are cheapest to fix before anyone builds them. Yet our designs used to reach development with the hard questions still open: which business rules apply, what happens in the edge cases, which components from the library to use.' },
    { p: 'I introduced a design step that settles those questions first. In 2026 I used the same discipline to lead a revamp of the product’s interface.' },

    { h2: 'The problem' },
    { p: 'Without a dedicated design step, business rules, edge cases and component standards were settled late, during development and testing. That is exactly when changes cost the most: screens were reworked after they were built, and testing turned up gaps a design review would have caught much earlier.' },

    { h2: 'Introducing a design phase' },
    { p: 'The fix was a short, repeatable step between requirements and development, in three parts. I first used it to lead the design phase for the dealership mobile app with the UX designer.' },
    { lead: 'Brief before design.', p: 'The designer gets a functional brief: the business rules, the users and the edge cases the screen has to handle. Design starts from the problem, not from a blank canvas.' },
    { lead: 'Review before development.', p: 'Every design is checked against the component library, its states and the business rules before it goes to the developers.' },
    { lead: 'Part of “ready”.', p: 'A requirement isn’t ready for development until its design is referenced, or explicitly marked as not needed. That one rule is what made the step stick.' },
    { figure: 'designReview', caption: 'A design review: each screen is checked against the component library and the business rules, with a clear pass or fix.' },

    { h2: 'Revamping the product' },
    { p: 'In 2026 I applied the same discipline to the product itself. I led the rebuild of seven product areas on the newer design. AI agents did the build under my direction, and everything ships in English, Spanish and French.' },
    { p: 'The revamp also added new work, such as a performance dashboard.' },
    { p: 'To keep the quality consistent as the work scaled, I also had a Claude plugin made that turns a Figma design into code on the component library and reviews the result against the design system, with a clear pass or fail.' },
    { numbers: [['7', 'product areas revamped'], ['3', 'languages: English, Spanish and French'], ['Embedded', 'the design phase is now part of delivery']] },

    { h2: 'Who did what' },
    { p: 'I introduced the design phase, wrote the functional briefs and reviewed designs before development. For the revamp, I directed the work and tested what shipped. Claude Code wrote the code under my direction, and the review plugin generates code from Figma designs.' },

    { h2: 'What I took from it' },
    { p: 'A design phase doesn’t need to be heavy to work. It moves a handful of decisions to the point where they are cheapest to make, and once “ready” included a design, the step became part of how the team works.' },
  ],
};
