import { hoursText } from '../hours';
export default {
  body: [
    { p: `When I joined, domain knowledge lived in the heads of three senior engineers who were also responsible for delivery. I turned it into a structured programme of live sessions, SOPs and walkthroughs, delivered ${hoursText.junior} hours of training as a Junior SQA Analyst, and fed what we documented into the public product knowledge base.` },

    { h2: 'The problem' },
    { p: 'New hires learned by osmosis over months. They asked the same questions again and again, and every question pulled a senior engineer away from their own work. There was no single source of truth.' },

    { h2: 'Mapping what people needed to know' },
    { p: 'I spent three weeks shadowing the senior engineers and documenting processes that had never been written down. That audit surfaced 14 critical knowledge domains, across dealership systems, the CRM, business rules and testing workflows.' },

    { h2: 'Designing the curriculum' },
    { p: 'I structured the 14 domains into a modular path of increasing depth. Every module had theory, a hands-on exercise and a competency check, adding up to 80 hours of structured content.' },

    { h2: 'Delivering it' },
    { p: 'Over 18 months I ran more than 120 live sessions, wrote over 60 SOPs and 30 video walkthroughs, and held weekly Q&A office hours. The programme reached well beyond new hires: operations, development, QA, stakeholders and customers all used it. The sessions and the knowledge transfer around them also fed the public product knowledge base.' },
    { p: 'I collected feedback after every cohort, updated the material every quarter, and tracked time to productivity.' },
    { numbers: [['~90%', 'less time spent on domain training'], [hoursText.junior, 'training hours delivered'], ['60+', 'SOPs and guides written'], ['5+', 'audiences, from operations to customers']] },

    { h2: 'What I took from it' },
    { p: 'Writing the knowledge down showed the senior engineers how much context they had been carrying. The real return wasn’t only faster onboarding: it freed them from hours of interruptions every day.' },
  ],
};
