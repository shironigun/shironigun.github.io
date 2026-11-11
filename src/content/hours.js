// Hours in each title at Perseus Group, worked out live from the working week (Monday to Friday,
// 8 hours a day; see lib/workHours.js). The days are contiguous, so the overall total runs from
// 12 December 2023, the same start as tenure in site.js, up to yesterday.
//
// Where each figure is used:
// - each title's own hours: its role on About, and that role's highlight text;
// - the Junior SQA hours: the 2024 to 2025 domain training programme, which ran in that title;
// - the overall total: the undated headline figures (highlights, teaching, the rope agent).
import { formatHours, workHours } from '../lib/workHours';

export const roleHours = {
  trainee: workHours('2023-12-12', '2024-02-14'), // the two-month traineeship
  junior: workHours('2024-02-15', '2025-12'),
  current: workHours('2026-01', null),
};

export const totalHours = roleHours.trainee + roleHours.junior + roleHours.current;

// Display strings, rounded down, for example "3,900+".
export const hoursText = {
  trainee: formatHours(roleHours.trainee),
  junior: formatHours(roleHours.junior),
  current: formatHours(roleHours.current),
  total: formatHours(totalHours),
};
