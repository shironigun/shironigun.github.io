// Inline stroke icons. Decorative by default; pass a title to make one meaningful.

function Svg({ title, children, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

export const MailIcon = (p) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Svg>
);

export const LinkedInIcon = (p) => (
  <Svg {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></Svg>
);

export const GitHubIcon = (p) => (
  <Svg {...p}><path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.6 2.5 5.6 2.8 5.6 2.8a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.2c0 4.7 2.9 5.7 5.6 6a3 3 0 0 0-.8 2.3V21" /></Svg>
);

export const DownloadIcon = (p) => (
  <Svg {...p}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></Svg>
);

export const CheckIcon = (p) => (
  <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>
);

export const MenuIcon = (p) => (
  <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
);

export const CloseIcon = (p) => (
  <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);

export const PersonIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></Svg>
);

export const SunIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Svg>
);
export const MoonIcon = (p) => (
  <Svg {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></Svg>
);
export const ChevronIcon = (p) => (
  <Svg {...p}><path d="m9 6 6 6-6 6" /></Svg>
);

export const ExternalIcon = (p) => (
  <Svg {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Svg>
);

// Subject icons for roles, recognition, achievements and events. Looked up by name from content.
export const AwardIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.3 7 21l5-2.6 5 2.6-1.5-7.7" /></Svg>
);
export const TrophyIcon = (p) => (
  <Svg {...p}><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H5a2 2 0 0 0 0 4h3M16 6h3a2 2 0 0 1 0 4h-3M12 13v4M8.5 20h7M9.5 17h5" /></Svg>
);
export const SparkIcon = (p) => (
  <Svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></Svg>
);
export const MegaphoneIcon = (p) => (
  <Svg {...p}><path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1ZM17 9a4 4 0 0 1 0 6" /></Svg>
);
export const HeartIcon = (p) => (
  <Svg {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></Svg>
);
export const LayersIcon = (p) => (
  <Svg {...p}><path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5" /></Svg>
);
export const PenIcon = (p) => (
  <Svg {...p}><path d="M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16l-1 4ZM14 7l3 3" /></Svg>
);
export const ChipIcon = (p) => (
  <Svg {...p}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M10 10h4v4h-4zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></Svg>
);
export const ShieldIcon = (p) => (
  <Svg {...p}><path d="M12 3 5 6v6c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></Svg>
);
export const BookIcon = (p) => (
  <Svg {...p}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5ZM4 19a2 2 0 0 1 2-2h13" /></Svg>
);
export const RocketIcon = (p) => (
  <Svg {...p}><path d="M14 4c3 0 6 3 6 6l-7 7-6-6 7-7ZM7 11l-3 1 2 2M13 17l-1 3-2-2M15 9h.01" /></Svg>
);
export const BriefcaseIcon = (p) => (
  <Svg {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" /></Svg>
);
export const TrendIcon = (p) => (
  <Svg {...p}><path d="m3 17 6-6 4 4 8-8M15 7h6v6" /></Svg>
);
export const UsersIcon = (p) => (
  <Svg {...p}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 4.5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-3.5-5.5" /></Svg>
);
export const PlugIcon = (p) => (
  <Svg {...p}><path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4" /></Svg>
);
export const BadgeIcon = (p) => (
  <Svg {...p}><path d="M12 3l2.4 1.8 3-.2.8 2.9 2.4 1.8-1 2.8 1 2.8-2.4 1.8-.8 2.9-3-.2L12 21l-2.4-1.8-3 .2-.8-2.9-2.4-1.8 1-2.8-1-2.8 2.4-1.8.8-2.9 3 .2L12 3Z" /><path d="m9 12 2 2 4-4" /></Svg>
);
export const MicIcon = (p) => (
  <Svg {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></Svg>
);
export const CalendarIcon = (p) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Svg>
);

export const subjectIcons = {
  award: AwardIcon, trophy: TrophyIcon, spark: SparkIcon, megaphone: MegaphoneIcon, heart: HeartIcon,
  layers: LayersIcon, pen: PenIcon, chip: ChipIcon, shield: ShieldIcon, book: BookIcon, rocket: RocketIcon,
  briefcase: BriefcaseIcon, trend: TrendIcon, users: UsersIcon, plug: PlugIcon, badge: BadgeIcon,
  mic: MicIcon, calendar: CalendarIcon,
};

export function SubjectIcon({ name, ...rest }) {
  const Icon = subjectIcons[name];
  return Icon ? <Icon {...rest} /> : null;
}
