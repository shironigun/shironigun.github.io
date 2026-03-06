# Articles Section Context

## Component

`src/components/Articles.jsx`

## Data Source

`articles` from `mockData.js` (2 articles)

## Articles

### 1. Why "Done" Is Never Really Done: A QA Perspective on Acceptance Criteria

- **ID**: art-1
- **Date**: March 2026
- **Read Time**: 4 min
- **Tags**: Quality, Acceptance Criteria, Agile
- **Color**: #1d6aff
- **Excerpt**: Most teams treat acceptance criteria as a checkbox. Here's why
  treating it as a conversation changes everything about how you ship quality.
- **Sections**: The Checkbox Trap → Acceptance Criteria as a Conversation → A
  Better Framework → The Takeaway
- **Key point**: 40% defect reduction at Perseus Group from collaborative AC
  workshops

### 2. From QA to Product: What Testing Taught Me About Building the Right Thing

- **ID**: art-2
- **Date**: March 2026
- **Read Time**: 5 min
- **Tags**: Career, Product Thinking, QA
- **Color**: #00e5a0
- **Excerpt**: Two years of finding bugs in other people's assumptions taught me
  more about product thinking than any MBA could.
- **Sections**: Bugs Are Misaligned Assumptions → The Perspective Shift → What
  Testing Teaches You About Product → For QA Professionals Considering the Leap
  → The Takeaway
- **Key point**: Transition from QA to product thinking at Contour Software

## Component Behavior

- **In-portfolio reading**: Articles open in a dialog (not external links)
- Cards show: date, read time, title, excerpt, tags (first 2), "Read →"
- Click opens dialog with: header (tags, title, date, read time) + body
  (heading/paragraph blocks)
- 2-column grid layout (2 articles)
- No "Follow on LinkedIn" button — removed along with placeholder cleanup

## Data Format

Each article has a `body` array of objects:
`{ type: "heading" | "paragraph", text: "..." }`

## Last Updated

March 6, 2026
