import React from 'react';
import { Box, Typography, Grid, Chip, Stack } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personal, softSkills } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } }),
  };

  return (
    <Box id="about" sx={{ py: 14, px: { xs: 2.5, md: 5 }, maxWidth: 1140, mx: 'auto' }} ref={ref}>
      <SectionLabel>About Me</SectionLabel>
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary', mb: 7 }}>
        Where <Box component="span" sx={{ color: 'primary.light' }}>product strategy</Box><br />meets quality obsession
      </Typography>

      <Grid2 container spacing={7} alignItems="flex-start">
        <Grid2 size={{ xs: 12, md: 7 }}>
          <MotionBox variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            {personal.bio.map((p, i) => (
              <Typography key={i} variant="body1" sx={{ color: 'text.secondary', mb: 2.5, fontSize: '0.97rem' }} />
            ))}
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2.5, fontSize: '0.97rem' }}>
              I'm a <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>Certified ScrumMaster® (CSM®)</Box> and <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>ISTQB®-certified Product Quality Analyst</Box> at Perseus Group, Constellation Software — one of the world's top vertical market software conglomerates.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2.5, fontSize: '0.97rem' }}>
              My superpower is a dual perspective: deep SQA foundations combined with a strategic product mindset. I excel at the entire lifecycle — from <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>discovery workshops and stakeholder mapping</Box>, to translating insights into clear Epics and acceptance criteria in Azure DevOps.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: '0.97rem' }}>
              Whether modelling processes, running regression analysis, or building Power Platform dashboards — my goal is always to improve <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>predictability, alignment, and user trust.</Box>
            </Typography>

            <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>Core Soft Skills</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {softSkills.map((skill, i) => (
                <MotionBox key={skill} component="span" variants={fadeUp} custom={i * 0.03} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                  <Chip label={skill} size="small" variant="outlined" sx={{ borderColor: 'var(--glass-border)', color: 'text.secondary', fontSize: '0.75rem', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.light', color: 'secondary.main', background: 'var(--accent-glow)' } }} />
                </MotionBox>
              ))}
            </Box>
          </MotionBox>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 5 }}>
          <MotionBox variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <Box sx={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 3, p: 3, backdropFilter: 'blur(10px)', mb: 3 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>Quick Info</Typography>
              <Stack spacing={2}>
                {[
                  { icon: <LocationOnIcon fontSize="small" />, label: personal.location },
                  { icon: <WorkIcon fontSize="small" />, label: 'Perseus Group, Constellation Software' },
                  { icon: <SchoolIcon fontSize="small" />, label: personal.education },
                ].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box sx={{ width: 30, height: 30, borderRadius: 1.5, background: 'var(--accent-glow-mild)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.light', flexShrink: 0, mt: 0.2 }}>{item.icon}</Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{item.label}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Box sx={{ background: 'linear-gradient(135deg,var(--accent-glow-mild),rgba(0,200,255,0.06))', border: '1px solid var(--accent-border)', borderRadius: 3, p: 3 }}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 1.5, fontSize: '1rem' }}>My Belief</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.8 }}>
                "I own what I touch, question what I don't understand, and refuse to leave things worse than I found them."
              </Typography>
            </Box>
          </MotionBox>
        </Grid2>
      </Grid2>
    </Box>
  );
}
