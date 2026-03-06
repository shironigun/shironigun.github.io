import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Chip, Tab, Tabs } from '@mui/material';
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

function SkillBar({ name, level, visible, delay = 0 }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>{name}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{level}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={visible ? level : 0}
        sx={{ '& .MuiLinearProgress-bar': { transition: `transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms !important` } }}
      />
    </Box>
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

          {skillGroups.map((group, gi) => (
            <Box key={gi} sx={{ display: activeTab === gi ? 'block' : 'none' }}>
              <Grid2 container spacing={5}>
                {[group.skills.slice(0, 3), group.skills.slice(3)].map((half, hi) => (
                  <Grid2 key={hi} size={{ xs: 12, md: 6 }}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: hi * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {half.map((s, i) => <SkillBar key={s.name} name={s.name} level={s.level} visible={inView} delay={i * 90} />)}
                    </MotionBox>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          ))}

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            sx={{ mt: 6, p: 3.5, background: 'var(--glass-bg)', border: '1px solid var(--glass-divider)', borderRadius: 3, backdropFilter: 'blur(8px)' }}
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
