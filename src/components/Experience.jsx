import React, { useState } from 'react';
import { Box, Typography, Chip, Tab, Tabs, List, ListItem } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experience } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const exp = experience[activeTab];

  return (
    <Box id="experience" sx={{ py: 14, background: 'linear-gradient(180deg,transparent,rgba(29,106,255,0.025),transparent)' }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Experience</SectionLabel>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary', mb: 7 }}>
          Where I've<br /><Box component="span" sx={{ color: 'primary.light' }}>delivered value</Box>
        </Typography>

        <MotionBox ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
          <Grid2 container spacing={0}>
            <Grid2 size={{ xs: 12, md: 3.5 }}>
              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={(_, v) => setActiveTab(v)}
                sx={{
                  '& .MuiTabs-indicator': { left: 0, right: 'auto', width: 3, borderRadius: '0 3px 3px 0', background: 'linear-gradient(180deg,#1d6aff,#00c8ff)' },
                  '& .MuiTab-root': {
                    alignItems: 'flex-start', textAlign: 'left', color: 'text.secondary',
                    borderLeft: '1px solid rgba(255,255,255,0.07)', borderRadius: '0 8px 8px 0',
                    mr: 1, minHeight: 'auto', py: 1.8, px: 2.5,
                    '&.Mui-selected': { color: 'secondary.main', background: 'rgba(29,106,255,0.08)' },
                    '&:hover': { background: 'rgba(255,255,255,0.03)' },
                  },
                }}
              >
                {experience.map((e) => (
                  <Tab key={e.id} label={
                    <Box>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'inherit', lineHeight: 1.3 }}>{e.role}</Typography>
                      <Typography sx={{ fontSize: '0.7rem', fontFamily: '"JetBrains Mono",monospace', color: 'text.secondary', mt: 0.3 }}>{e.company.split(',')[0]}</Typography>
                    </Box>
                  } />
                ))}
              </Tabs>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 8.5 }}>
              <AnimatePresence mode="wait">
                <MotionBox
                  key={activeTab}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  sx={{ pl: { xs: 0, md: 5 }, pt: { xs: 4, md: 0 }, borderLeft: { md: '1px solid rgba(255,255,255,0.07)' } }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarTodayOutlinedIcon sx={{ fontSize: 13, color: 'secondary.main' }} />
                        <Typography variant="caption" sx={{ color: 'secondary.main' }}>{exp.period}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnOutlinedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{exp.location}</Typography>
                      </Box>
                      {exp.current && <Chip label="Current" size="small" sx={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.25)', height: 20, fontSize: '0.65rem' }} />}
                    </Box>
                    <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5, fontSize: '1.4rem' }}>{exp.role}</Typography>
                    <Typography sx={{ color: 'primary.light', fontWeight: 500, fontSize: '0.9rem', mb: 3 }}>{exp.company}</Typography>
                  </Box>

                  <List disablePadding>
                    {exp.bullets.map((bullet, i) => (
                      <ListItem key={i} disablePadding sx={{ mb: 1.5, alignItems: 'flex-start' }}>
                        <ChevronRightIcon sx={{ color: 'secondary.main', mt: 0.3, mr: 1, fontSize: 18, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '0.91rem' }} dangerouslySetInnerHTML={{ __html: bullet }} />
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mt: 3 }}>
                    {exp.tags.map(tag => (
                      <Chip key={tag} label={tag} size="small" sx={{ fontFamily: '"JetBrains Mono",monospace', fontSize: '0.65rem', background: 'rgba(29,106,255,0.08)', border: '1px solid rgba(29,106,255,0.18)', color: 'primary.light' }} />
                    ))}
                  </Box>
                </MotionBox>
              </AnimatePresence>
            </Grid2>
          </Grid2>
        </MotionBox>
      </Box>
    </Box>
  );
}
