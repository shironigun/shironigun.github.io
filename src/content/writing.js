// Published writing. Bodies are kept verbatim from the original articles.

export const articles = [
  {
    "slug": "acceptance-criteria",
    "title": "Why \"Done\" Is Never Really Done: A QA Perspective on Acceptance Criteria",
    "date": "March 2026",
    "readTime": "4 min read",
    "excerpt": "Most teams treat acceptance criteria as a checkbox. Here's why treating it as a conversation changes everything about how you ship quality.",
    "body": [
      {
        "type": "paragraph",
        "text": "Every sprint retrospective has that one moment — someone says 'but the acceptance criteria were met.' And technically, they're right. The checkboxes are checked. The story is closed. But the customer is still confused, the edge case still breaks, and the team is already firefighting in the next sprint."
      },
      {
        "type": "heading",
        "text": "The Checkbox Trap"
      },
      {
        "type": "paragraph",
        "text": "Acceptance criteria written as checkboxes create a false sense of completeness. When a story says 'User can reset password,' the developer builds exactly that — a reset flow. But what about the user who typos their email? The one on a 3G connection? The one who triggers the flow twice in 10 seconds?"
      },
      {
        "type": "paragraph",
        "text": "These aren't obscure edge cases. They're the real-world scenarios your users encounter daily. A checkbox says 'done.' A conversation asks 'done for whom?'"
      },
      {
        "type": "heading",
        "text": "Acceptance Criteria as a Conversation"
      },
      {
        "type": "paragraph",
        "text": "The best acceptance criteria I've written weren't written alone. They came from 15-minute conversations with developers, designers, and PMs — where someone always asks the question nobody thought to ask."
      },
      {
        "type": "paragraph",
        "text": "In my experience at Perseus Group, switching from static bullet points to collaborative acceptance criteria workshops reduced our defect leakage by over 40%. Not because we wrote more criteria — but because we asked better questions before writing any."
      },
      {
        "type": "heading",
        "text": "A Better Framework"
      },
      {
        "type": "paragraph",
        "text": "Here's what I use now: every acceptance criterion gets stress-tested with three questions — (1) What happens when this goes wrong? (2) What does the user see when nothing happens? (3) Would a new team member understand this without context?"
      },
      {
        "type": "paragraph",
        "text": "If any of those questions produce a shrug, the criterion isn't ready. It's not about perfection — it's about surfacing assumptions before they become bugs."
      },
      {
        "type": "heading",
        "text": "The Takeaway"
      },
      {
        "type": "paragraph",
        "text": "'Done' is a spectrum, not a switch. The teams that ship the most reliable software aren't the ones with the longest acceptance criteria — they're the ones who treat 'done' as a conversation that starts before the first line of code and continues after deployment."
      }
    ]
  },
  {
    "slug": "qa-to-product",
    "title": "From QA to Product: What Testing Taught Me About Building the Right Thing",
    "date": "March 2026",
    "readTime": "5 min read",
    "excerpt": "Two years of finding bugs in other people's assumptions taught me more about product thinking than any MBA could.",
    "body": [
      {
        "type": "paragraph",
        "text": "I didn't start in product. I started in QA — clicking through flows, writing test cases, and filing bugs that developers would mark 'working as intended.' That phrase haunted me. Because often, the feature was working as intended. It just wasn't working as needed."
      },
      {
        "type": "heading",
        "text": "Bugs Are Misaligned Assumptions"
      },
      {
        "type": "paragraph",
        "text": "The biggest lesson from QA isn't how to find bugs. It's recognising that most bugs aren't code issues — they're communication gaps. A developer builds what the ticket says. A designer designs what the brief described. The user does something nobody documented."
      },
      {
        "type": "paragraph",
        "text": "When I started mapping these gaps, I realised I wasn't just testing software — I was testing whether the team truly understood the problem they were solving."
      },
      {
        "type": "heading",
        "text": "The Perspective Shift"
      },
      {
        "type": "paragraph",
        "text": "QA gives you something rare: you see the product through the user's eyes, but with full knowledge of the team's intent. You sit between what was meant and what was built. That gap — that's where product thinking lives."
      },
      {
        "type": "paragraph",
        "text": "At Contour Software, I moved from filing bugs to asking 'why does this feature exist?' in sprint planning. That single question changed my trajectory. Suddenly I was in requirement workshops, mapping user journeys, and defining acceptance criteria that prevented bugs instead of catching them."
      },
      {
        "type": "heading",
        "text": "What Testing Teaches You About Product"
      },
      {
        "type": "paragraph",
        "text": "Testing teaches you to think in failure modes. Product requires thinking in success paths. Combine both, and you get someone who can define what 'right' looks like — and what 'wrong' looks like before it happens."
      },
      {
        "type": "paragraph",
        "text": "It also teaches empathy. Not the soft kind — the rigorous kind. The kind where you sit with a customer support ticket for 20 minutes and realise the 'user error' was actually a UX decision your team made six months ago."
      },
      {
        "type": "heading",
        "text": "For QA Professionals Considering the Leap"
      },
      {
        "type": "paragraph",
        "text": "You already have the hardest skill to teach: the instinct to question assumptions. Product people spend years developing that. You've been doing it every time you wrote a bug report."
      },
      {
        "type": "paragraph",
        "text": "The transition isn't about abandoning QA — it's about expanding the scope of what you test. Instead of testing features, you start testing ideas. Instead of verifying requirements, you start shaping them."
      },
      {
        "type": "heading",
        "text": "The Takeaway"
      },
      {
        "type": "paragraph",
        "text": "My path from QA to product wasn't a career change — it was a perspective shift. The best product analysts I know aren't the ones with the fanciest frameworks. They're the ones who ask 'but what happens when...' — exactly the question every good tester already knows how to ask."
      }
    ]
  }
];
