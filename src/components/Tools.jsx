import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { toolCategories } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

function ToolCard({ tool, index }) {
  return (
    <Tooltip title={tool.name} placement="top" arrow>
      <MotionBox
        whileHover={{ y: -7, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        sx={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 3,
          p: { xs: 2, sm: 2.5 },
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.2,
          cursor: 'none', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(8px)',
          '&::before': { content: '""', position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%,rgba(29,106,255,0.12),transparent 60%)', opacity: 0, transition: 'opacity 0.3s' },
          '&:hover': { borderColor: 'rgba(77,141,255,0.5)', boxShadow: '0 14px 40px rgba(29,106,255,0.18)', '&::before': { opacity: 1 }, '& .tool-name': { color: '#00c8ff' } },
        }}
      >
        <Box className="tool-icon" sx={{ fontSize: { xs: '2rem', sm: '2.4rem' }, lineHeight: 1, position: 'relative', zIndex: 1 }}>
          {tool.icon ? <i className={tool.icon} style={{ fontSize: 'inherit' }} /> : tool.emoji}
        </Box>
        <Typography className="tool-name" variant="overline" sx={{ color: 'text.secondary', fontSize: '0.62rem', textAlign: 'center', transition: 'color 0.2s', position: 'relative', zIndex: 1 }}>
          {tool.name}
        </Typography>
      </MotionBox>
    </Tooltip>
  );
}

export default function Tools() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <Box id="tools" sx={{ py: 14 }} ref={ref}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Tools & Tech</SectionLabel>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary', mb: 7 }}>
          My <Box component="span" sx={{ color: 'primary.light' }}>tech stack</Box>
        </Typography>

        {toolCategories.map((cat, ci) => (
          <MotionBox
            key={ci}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
            sx={{ mb: 5 }}
          >
            <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: '0.68rem', mb: 2, display: 'block', letterSpacing: '.14em' }}>
              {cat.category}
            </Typography>
            <Grid2 container spacing={1.5}>
              {cat.tools.map((tool, ti) => (
                <Grid2 key={ti} size={{ xs: 4, sm: 3, md: 2 }}>
                  <ToolCard tool={tool} index={ti} />
                </Grid2>
              ))}
            </Grid2>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
}
