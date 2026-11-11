export default {
  body: [
    { p: 'As QA lead, I had AI agents build the API test automation for our dealership platform under my direction: a framework with three levels of tests, running in our pipeline. Then I audited it the way I would audit any other feature, and found it was telling us things that weren’t true.' },

    { h2: 'The question that matters' },
    { p: 'A test suite has one job: to fail when the product breaks. So the question I asked of every test was a simple one. Would this test fail if the feature broke?' },

    { h2: 'Switch the backend off' },
    { p: 'The simplest check was the most revealing. I switched the backend off and ran the suite. Some of the tests still passed, with nothing behind them to test.' },
    { figure: 'audit', caption: 'Use the switch to see what the suite reported with the backend off.' },
    { p: 'Those were false positives: tests that reported success without checking anything real. A green pipeline had been telling the team that features worked when the suite couldn’t have known.' },

    { h2: 'Three levels, one job each' },
    { p: 'I had set the framework up in three levels, so each kind of test has a single, clear purpose. The rebuild kept that structure.' },
    { figure: 'testLevels', caption: 'The three levels of the suite, each with one job.' },

    { h2: 'The rebuild' },
    { p: 'I set four rules for the rebuild.' },
    { lead: 'Exact expectations.', p: 'Every check expects a specific result, not just “something worked”.' },
    { lead: 'Fail, don’t skip.', p: 'If setup breaks, the test fails and says why, instead of quietly skipping.' },
    { lead: 'Tests for the tests.', p: 'The framework has its own checks, so a broken helper can’t quietly pass everything.' },
    { lead: 'Check the ground first.', p: 'Before a run, the suite confirms the test environment is up.' },
    { note: 'The rebuilt suite is in use and awaiting its first full baseline run.' },

    { h2: 'Who did what' },
    { p: 'I set the three-level structure, ran the audit, decided the rebuild rules and reviewed the tests. Claude Code wrote the framework and the tests under my direction. The pipeline runs for the whole team on every scheduled run.' },

    { h2: 'What I took from it' },
    { quote: 'AI makes writing tests cheap, so the scarce skill becomes judging them.' },
  ],
};
