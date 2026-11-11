# Content rules

What may and may not appear on the site and in this repository. The repository is public, so these rules apply to `docs/` as much as to the pages. Personal notes belong in `docs/private/`, which git ignores.

## Never publish

- Where he is based: no city, country, region, time zone or local-time clock. (The university name stays as a credential.)
- Employer internals: partner and integration names, internal hostnames or environments, version numbers, ticket or work-item IDs, dealer or customer data, pricing tiers, security findings.
- Colleagues’ names, except the three people whose testimonials appear verbatim.
- Hackathon participants’ names, internal team names and internal project codenames.
- Programming languages or frameworks presented as his skills. He builds by directing AI agents.
- The specific product name in copy. Say “enterprise dealership SaaS at Perseus Group, Constellation Software”. Two exceptions: verbatim testimonials, and the promo films and the pages that show them, where the product is named TargetCRM and described as also offered as Notify360 (his approval, 11 Nov 2026). The films use a fictional dealership and demo data only.
- Anything from his private context notes beyond the career facts he has approved for the site.
- Inside company projects, anything beyond what he did and the problem it solved: internal feature or skill names (beyond those already on the site), per-feature test counts, data volumes, architecture, API or schema details, defects found, and who owns which feature. Exhibits built from company work use fictional examples and invented field names.

## Always

- Professional, plain wording. General detail that shows his value as a product person, not internal detail.
- Testimonials word for word, with the relationship line. Never trim or rephrase them.
- Exact ownership words: **led**, **built**, **introduced**, **assisted**. Exact status words: “Heading to production” is not “Released”.
- Real numbers only, rounded down. Tenure is worked out live from 14 December 2023.
- Lead with product, then design, then AI, then quality.
- Name the employer as Perseus Group, part of Constellation Software (Contour Software where a company line needs it).

## Checks before publishing

1. Search the change for location words, internal names and IDs.
2. Run the QA sweep (see the [site guide](../design/site-guide.md#quality-checks)); it also flags location mentions on every route.
3. If a fact is new, add it to [about Mahmood](about-mahmood.md) as well, so the docs stay the full record.
