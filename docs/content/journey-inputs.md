# Career journey: information to add

The Journey page (`/journey`) and the Home timeline are generated from
`src/content/journey.js`. Every entry there is sourced from the portfolio,
the LinkedIn profile or confirmed 2026 work. This file lists what is still
missing, so new entries can be added as soon as the details are available.

## How to add an entry

Send the details in this shape, or add them to `journey.js` directly, in
date order:

```js
{
  date: '2025-03',            // YYYY-MM (or YYYY if the month is unknown)
  when: 'Mar 2025',           // how the date should read on the page
  type: 'workshop',           // see the types below
  title: 'Short, specific title',
  org: 'Company, issuer or event',          // optional
  detail: 'One or two sentences on the value delivered.',
  metric: { value: '40+', label: 'attendees' },  // optional
  to: '/case-studies/some-case-study',              // optional link to a case study
  file: '/certifications/File-Name.pdf',    // optional certificate file
  highlight: true,                          // optional: also show on Home
}
```

Types: `role`, `promotion` (add `from: 'Previous title'`), `project`,
`initiative`, `achievement`, `certification`, `exam`, `education`,
`workshop`, `talk`, `event`, `course`.

Keep the wording general and focused on product value: no internal tool
names, version numbers, environments, ticket IDs, customer or partner names.

## Dates still needed

These are on the site but have no date, so they are not on the timeline yet:

- [ ] VP Award: month and year
- [ ] AI Innovator of the Month: month and year
- [ ] Division All-Hands Recognition: month and year
- [ ] Annual Special Thanks: year

These are on the timeline with an approximate position; an exact month
would place them correctly:

- [x] Each certification's month (from the pre-redesign codebase)
- [ ] Shipped a critical release solo
- [ ] Covered the three-month BA vacancy (start and end)
- [ ] Trained the two QA hires
- [ ] Introduced the design phase (first feature it was used on)
- [ ] Domain training programme: start and end
- [ ] Quality Gates: introduced, and when the third team adopted it
- [x] AI hackathon win (May 2025)
- [ ] AI automation workshops, Skills Evals Lab, Playwright course

## Entries still to collect

- [ ] Exams passed beyond the listed certifications
- [ ] Workshops, sessions and hackathons attended or participated in
- [ ] Talks or sessions delivered outside the ones listed
- [ ] Any title changes not covered by the promotions
- [ ] Other projects and initiatives from 2021 to 2025
- [ ] Recognition beyond the five awards listed
- [ ] Attendee numbers or outcomes for workshops and talks, where known
