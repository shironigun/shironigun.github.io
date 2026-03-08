import React, { useState } from 'react';
import { Box, Typography, Chip, Tab, Tabs } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skillGroups, softSkills } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

// Category accent colors
const categoryColors = {
  'Product & Analysis': '#1d6aff',
  'Quality Assurance': '#00e5a0',
  'Data & Analytics': '#ff6c37',
  'Agile & Frameworks': '#a855f7',
};

// SVG icons mapped by skill name
const skillIcons = {
  // Product & Analysis
  'Product Discovery & Definition': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={c} strokeWidth="2"/><path d="M16.5 16.5L21 21" stroke={c} strokeWidth="2" strokeLinecap="round"/><path d="M11 8v6M8 11h6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  'User Story Writing & Acceptance Criteria': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke={c} strokeWidth="2"/><path d="M8 8h8M8 12h6M8 16h4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  'Stakeholder Management (RACI/RASCI)': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="3" stroke={c} strokeWidth="2"/><circle cx="5" cy="17" r="2.5" stroke={c} strokeWidth="1.5"/><circle cx="19" cy="17" r="2.5" stroke={c} strokeWidth="1.5"/><path d="M12 10v4M8 16l3-2M16 16l-3-2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  'Process Modelling (Visio, draw.io)': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="7" height="5" rx="1" stroke={c} strokeWidth="1.5"/><rect x="15" y="3" width="7" height="5" rx="1" stroke={c} strokeWidth="1.5"/><rect x="8.5" y="16" width="7" height="5" rx="1" stroke={c} strokeWidth="1.5"/><path d="M5.5 8v3h13V8M12 11v5" stroke={c} strokeWidth="1.5"/></svg>
  ),
  'Roadmapping & Gantt Planning': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.3"/><rect x="5" y="4" width="8" height="3" rx="1" fill={c}/><rect x="8" y="10" width="10" height="3" rx="1" fill={c} opacity="0.7"/><rect x="4" y="16" width="6" height="3" rx="1" fill={c} opacity="0.5"/></svg>
  ),
  // Quality Assurance
  'Manual & Functional Testing': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 11l2 2 4-4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="4" width="16" height="16" rx="3" stroke={c} strokeWidth="2"/></svg>
  ),
  'Test Planning & Execution': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke={c} strokeWidth="2"/><path d="M8 8h3M8 12h3M8 16h3" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M14 8l1 1 2-2M14 12l1 1 2-2" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 16h3" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/></svg>
  ),
  'Automation Testing (Selenium)': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="6" y="3" width="12" height="14" rx="2" stroke={c} strokeWidth="2"/><circle cx="10" cy="10" r="1.5" fill={c}/><circle cx="14" cy="10" r="1.5" fill={c}/><path d="M8 17v3M16 17v3M6 20h4M14 20h4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  'Performance & Pen Testing': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="8" stroke={c} strokeWidth="2"/><path d="M12 9v4l3 2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 5V3M18.5 7.5l1.5-1.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  'API & UAT Testing': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 8l-4 4 4 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 8l4 4-4 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 4l-4 16" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  // Data & Analytics
  'SQL / T-SQL': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="8" ry="3" stroke={c} strokeWidth="2"/><path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke={c} strokeWidth="2"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke={c} strokeWidth="1.5"/></svg>
  ),
  'Python (Pandas, Matplotlib)': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3C7 3 7 5.5 7 5.5V8h5v1H6S3 8.5 3 12.5 5.5 19 5.5 19H8v-2.5S7.8 14 10.5 14H15s2.5.1 2.5-2.5V6S18 3 12 3zm-1.5 1.5a1 1 0 110 2 1 1 0 010-2z" fill={c}/><path d="M12 21c5 0 5-2.5 5-2.5V16h-5v-1h6s3 .5 3-3.5S18.5 5 18.5 5H16v2.5s.2 2.5-2.5 2.5H9S6.5 9.9 6.5 12.5V18S6 21 12 21zm1.5-1.5a1 1 0 110-2 1 1 0 010 2z" fill={c} opacity="0.6"/></svg>
  ),
  'Power BI Dashboards': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="14" width="4" height="6" rx="1" fill={c} opacity="0.5"/><rect x="10" y="10" width="4" height="10" rx="1" fill={c} opacity="0.7"/><rect x="17" y="4" width="4" height="16" rx="1" fill={c}/></svg>
  ),
  'Quantitative Analysis (Regression)': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 20L21 4" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.4"/><circle cx="5" cy="17" r="2" fill={c}/><circle cx="9" cy="14" r="2" fill={c} opacity="0.8"/><circle cx="14" cy="10" r="2" fill={c} opacity="0.8"/><circle cx="19" cy="6" r="2" fill={c}/></svg>
  ),
  'Power Platform (Apps & Automate)': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 3l-9 11h7l-1 7 9-11h-7l1-7z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  // Agile & Frameworks
  'Scrum (CSM®)': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.65 6.35A7.96 7.96 0 0012 4a8 8 0 100 16 7.96 7.96 0 005.65-2.35" stroke={c} strokeWidth="2" strokeLinecap="round"/><path d="M12 8v4l2 2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 4l-2.5 2.5M20 4h-3M20 4v3" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  'Kanban': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke={c} strokeWidth="2"/><path d="M9 3v18M15 3v18" stroke={c} strokeWidth="1.5"/><rect x="4.5" y="6" width="3" height="3" rx="0.5" fill={c}/><rect x="10.5" y="6" width="3" height="5" rx="0.5" fill={c} opacity="0.7"/><rect x="16.5" y="6" width="3" height="2" rx="0.5" fill={c} opacity="0.5"/><rect x="4.5" y="11" width="3" height="2" rx="0.5" fill={c} opacity="0.5"/></svg>
  ),
  'Azure DevOps': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 6v12l-5 3V7L5 4l16 2zm-5 3L4 6v9l3 4 9-2V9z" fill={c}/></svg>
  ),
  'ISTQB® CTFL': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke={c} strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  'Risk & Escalation Management': (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3L2 21h20L12 3z" stroke={c} strokeWidth="2" strokeLinejoin="round"/><path d="M12 10v4" stroke={c} strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill={c}/></svg>
  ),
};

function SkillCard({ skill, catColor, visible, delay = 0 }) {
  const IconFn = skillIcons[skill.name];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.06, ease: [0.16, 1, 0.3, 1] }}
      sx={{
        p: 2, borderRadius: 2.5,
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', gap: 1.5,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        '&:hover': {
          borderColor: `${catColor}40`,
          boxShadow: `0 4px 20px ${catColor}10`,
        },
      }}
    >
      {IconFn && (
        <Box sx={{
          width: 34, height: 34, borderRadius: 2,
          background: `${catColor}10`, border: `1px solid ${catColor}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {IconFn(catColor)}
        </Box>
      )}
      <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '0.84rem' }}>
        {skill.name}
      </Typography>
    </MotionBox>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box id="skills" sx={{ py: 14, background: 'var(--gradient-section)' }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Skills</SectionLabel>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary', mb: 7 }}>
          What I bring<br />to the <Box component="span" sx={{ color: 'primary.light' }}>table</Box>
        </Typography>

        <Box ref={ref}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 5,
              '& .MuiTab-root': { color: 'text.secondary', '&.Mui-selected': { color: 'secondary.main' } },
              '& .MuiTabs-indicator': { background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', height: 2, borderRadius: 1 },
              borderBottom: '1px solid var(--glass-divider)',
            }}
          >
            {skillGroups.map((g, i) => (
              <Tab key={i} label={g.category} sx={{ fontWeight: 500, textTransform: 'none', fontSize: '0.88rem', cursor: 'none', px: 3 }} />
            ))}
          </Tabs>

          {skillGroups.map((group, gi) => {
            const catColor = categoryColors[group.category] || '#1d6aff';
            return (
              <Box key={gi} sx={{ display: activeTab === gi ? 'block' : 'none' }}>
                <Grid2 container spacing={2}>
                  {group.skills.map((s, i) => (
                    <Grid2 key={s.name} size={{ xs: 12, sm: 6 }}>
                      <SkillCard skill={s} catColor={catColor} visible={inView} delay={i} />
                    </Grid2>
                  ))}
                </Grid2>
              </Box>
            );
          })}

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            sx={{ mt: 4, p: 3.5, background: 'var(--glass-bg)', border: '1px solid var(--glass-divider)', borderRadius: 3, backdropFilter: 'blur(8px)' }}
          >
            <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>Soft Skills & Competencies</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {softSkills.map(s => (
                <Chip key={s} label={s} size="small" sx={{ background: 'var(--accent-glow)', border: '1px solid var(--accent-border)', color: 'primary.light', transition: 'all 0.2s', '&:hover': { background: 'var(--accent-glow-strong)', transform: 'translateY(-2px)' } }} />
              ))}
            </Box>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}
