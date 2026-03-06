import React from 'react';
import { Box, Typography, Grid2, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { achievements } from '../data/mockData';
import { useCounter } from '../hooks/useScrollReveal';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

function AchievementCard({ item, index, inView }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1], scale: { type: 'spring', stiffness: 400, damping: 20 } }}
      sx={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: 3, p: 3,
        backdropFilter: 'blur(10px)',
        position: 'relative', overflow: 'hidden',
        cursor: 'none', height: '100%',
        '&::before': {
          content: '""', position: 'absolute',
          top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${item.color}, transparent)`,
        },
        '&:hover': { borderColor: `${item.color}45`, boxShadow: `0 12px 40px ${item.color}12` },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ fontSize: '2rem', lineHeight: 1 }}>{item.icon}</Box>
        <Typography sx={{ fontFamily: '"JetBrains Mono",monospace', color: item.color, fontSize: '0.68rem', background: `${item.color}14`, border: `1px solid ${item.color}30`, borderRadius: 5, px: 1.2, py: 0.3 }}>
          {item.year}
        </Typography>
      </Box>
      <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem', mb: 1, lineHeight: 1.3 }}>
        {item.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '0.84rem' }}>
        {item.detail}
      </Typography>
    </MotionBox>
  );
}

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <Box id="achievements" sx={{ py: 14, background: 'var(--gradient-radial)' }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Achievements</SectionLabel>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 7, flexWrap: 'wrap', gap: 3 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary' }}>
            Wins that<br /><Box component="span" sx={{ color: 'primary.light' }}>define the journey</Box>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 340, lineHeight: 1.8 }}>
            Recognition, promotions, and moments where going beyond the job description created real impact.
          </Typography>
        </Box>

        <Grid2 container spacing={2.5} ref={ref}>
          {achievements.map((item, i) => (
            <Grid2 key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <AchievementCard item={item} index={i} inView={inView} />
            </Grid2>
          ))}
        </Grid2>

        {/* Add your own prompt */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          sx={{ mt: 4, p: 3, border: '1px dashed var(--glass-border)', borderRadius: 3, textAlign: 'center' }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            ✨ <strong style={{ color: 'var(--strong-inline)' }}>This section grows with you.</strong> Add new achievements to the <code style={{ color: 'var(--code-color)', background: 'var(--code-bg)', padding: '2px 6px', borderRadius: 4 }}>achievements</code> array in <code style={{ color: 'var(--code-color)', background: 'var(--code-bg)', padding: '2px 6px', borderRadius: 4 }}>mockData.js</code> as your career progresses.
          </Typography>
        </MotionBox>
      </Box>
    </Box>
  );
}
