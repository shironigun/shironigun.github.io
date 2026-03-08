import React, { useState } from 'react';
import {
  Box, Typography, Chip, Dialog, DialogContent,
  IconButton, Stack, Divider, Avatar, Button,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { caseStudies } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

function CaseStudyDialog({ cs, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper"
      PaperProps={{ sx: { background: 'var(--dialog-bg)', border: '1px solid var(--glass-border)', borderRadius: 3, maxHeight: '92vh' } }}
    >
      {/* Header */}
      <Box sx={{ position: 'relative', overflow: 'visible', flexShrink: 0 }}>
        <Box sx={{ background: `linear-gradient(135deg, ${cs.color}22, var(--dropdown-bg))`, px: 4, pt: 3, pb: 3, borderBottom: '1px solid var(--glass-border)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Chip label={cs.category} size="small" sx={{ background: `${cs.color}20`, border: `1px solid ${cs.color}40`, color: cs.color, fontFamily: '"JetBrains Mono",monospace', fontSize: '0.65rem' }} />
            <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', cursor: 'none' }}><CloseIcon fontSize="small" /></IconButton>
          </Box>
          <Typography variant="h4" sx={{ color: 'text.primary', mb: 1, lineHeight: 1.35 }}>{cs.title}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{cs.subtitle}</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <WorkOutlineIcon sx={{ fontSize: 13, color: 'secondary.main' }} />
              <Typography variant="caption" sx={{ color: 'secondary.main' }}>{cs.company}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{cs.period} · {cs.readTime}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ px: 4, py: 3 }}>
        {/* Overview */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: cs.color, display: 'block', mb: 1.5 }}>Overview</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>{cs.overview}</Typography>
        </Box>

        {/* Problem */}
        <Box sx={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-divider)', borderLeft: `3px solid ${cs.color}`, borderRadius: '0 12px 12px 0', p: 3, mb: 4 }}>
          <Typography variant="overline" sx={{ color: cs.color, display: 'block', mb: 1.5 }}>The Problem</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.85 }}>{cs.problem}</Typography>
        </Box>

        {/* Approach */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: cs.color, display: 'block', mb: 2.5 }}>My Approach</Typography>
          <Stack spacing={2}>
            {cs.approach.map((step, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', background: `${cs.color}18`, border: `1px solid ${cs.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Typography sx={{ color: cs.color, fontSize: '0.72rem', fontWeight: 800, fontFamily: '"JetBrains Mono",monospace' }}>{String(i + 1).padStart(2, '0')}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.9rem', mb: 0.4 }}>{step.step}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{step.detail}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ borderColor: 'var(--glass-divider)', mb: 4 }} />

        {/* Results */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: cs.color, display: 'block', mb: 2.5 }}>
            <TrendingUpIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
            Results & Impact
          </Typography>
          <Grid2 container spacing={2}>
            {cs.results.map((r, i) => (
              <Grid2 key={i} size={{ xs: 6, sm: 3 }}>
                <Box sx={{ background: `${cs.color}0f`, border: `1px solid ${cs.color}25`, borderRadius: 3, p: 2.5, textAlign: 'center' }}>
                  <Typography sx={{ color: cs.color, fontWeight: 800, fontSize: '1.6rem', lineHeight: 1 }}>{r.metric}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5, lineHeight: 1.4 }}>{r.label}</Typography>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        {/* Learnings */}
        <Box sx={{ background: `linear-gradient(135deg, ${cs.color}0f, rgba(0,200,255,0.04))`, border: `1px solid ${cs.color}20`, borderRadius: 3, p: 3 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
            <LightbulbOutlinedIcon sx={{ color: cs.color, mt: 0.3, flexShrink: 0 }} />
            <Box>
              <Typography variant="overline" sx={{ color: cs.color, display: 'block', mb: 1 }}>Key Learning</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.85 }}>"{cs.learnings}"</Typography>
            </Box>
          </Box>
        </Box>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mt: 3 }}>
          {cs.tags.map(t => (
            <Chip key={t} label={t} size="small" sx={{ fontFamily: '"JetBrains Mono",monospace', fontSize: '0.62rem', background: `${cs.color}12`, border: `1px solid ${cs.color}28`, color: cs.color }} />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// SVG icons matched to each case study by ID
const csSvgIcons = {
  'cs-defect-reduction': (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-1 14l-3.5-3.5 1.41-1.41L11 13.17l5.59-5.59L18 9l-7 7z" fill={color}/>
    </svg>
  ),
  'cs-postman-poc': (color) => (
    <svg width="22" height="22" viewBox="0 0 256 256">
      <circle cx="128" cy="128" r="128" fill={color} opacity="0.15"/>
      <path d="M189.6 66.4L118.9 137.1l-3.3-3.3c-4.6-4.6-12-4.6-16.6 0l-32.6 32.6c-.9.9-.9 2.4 0 3.3l19.8 19.8c.9.9 2.4.9 3.3 0l32.6-32.6c4.6-4.6 4.6-12 0-16.6l-3.3-3.3 70.7-70.7c.9-.9.9-2.4 0-3.3l-3.3-3.3" fill={color}/>
      <path d="M175.2 80.8l11.1-11.1 14.2 14.2-11.1 11.1" fill={color} opacity="0.6"/>
    </svg>
  ),
  'cs-training': (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" fill={color}/>
    </svg>
  ),
};

// Case study card
function CaseStudyCard({ cs, index, inView, onClick }) {
  const SvgIcon = csSvgIcons[cs.id];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(cs)}
      sx={{
        cursor: 'none', height: '100%',
        position: 'relative', overflow: 'hidden',
        borderRadius: 3,
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(8px)',
        display: 'flex', flexDirection: 'column',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        '&::before': {
          content: '""', position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
          background: `linear-gradient(180deg, ${cs.color}, transparent)`,
        },
        '&:hover': {
          borderColor: `${cs.color}55`,
          boxShadow: `0 12px 40px ${cs.color}15`,
          '& .cs-arrow': { transform: 'translateX(4px)', opacity: 1 },
        },
      }}
    >
      {/* Top section — SVG icon + category + read time + period */}
      <Box sx={{ px: 3, pt: 3, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {SvgIcon && (
            <Box sx={{
              width: 40, height: 40, borderRadius: 2,
              background: `${cs.color}14`, border: `1px solid ${cs.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {SvgIcon(cs.color)}
            </Box>
          )}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label={cs.category} size="small" sx={{
                fontFamily: '"JetBrains Mono",monospace', fontSize: '0.6rem', height: 20,
                background: `${cs.color}14`, border: `1px solid ${cs.color}30`, color: cs.color,
              }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 11, color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.62rem' }}>{cs.readTime}</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.58rem', opacity: 0.5 }}>•</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.62rem', fontFamily: '"JetBrains Mono",monospace', opacity: 0.6 }}>
                {cs.period}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Title + company + overview */}
      <Box sx={{ px: 3, pt: 2.5, pb: 0 }}>
        <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.35, mb: 0.8 }}>
          {cs.title}
        </Typography>
        <Typography variant="caption" sx={{ color: 'secondary.main', fontFamily: '"JetBrains Mono",monospace', display: 'block', mb: 1.5 }}>
          {cs.company}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '0.84rem', mb: 2.5 }}>
          {cs.overview.slice(0, 140)}...
        </Typography>
      </Box>

      {/* Results — each in its own full-width container */}
      {!cs.isPlaceholder && (
        <Box sx={{ px: 3, mb: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {cs.results.slice(0, 3).map((r, i) => (
            <Box key={i} sx={{
              width: '100%',
              background: `${cs.color}0c`,
              border: `1px solid ${cs.color}20`,
              borderRadius: 2, py: 1, px: 1.5,
              display: 'flex', alignItems: 'center', gap: 1.5,
            }}>
              <Typography sx={{ color: cs.color, fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.1, minWidth: 48 }}>{r.metric}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6rem', lineHeight: 1.3 }}>{r.label}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Tags */}
      <Box sx={{ px: 3, mb: 2, mt: 'auto', display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
        {cs.tags.slice(0, 3).map(t => (
          <Chip key={t} label={t} size="small" sx={{
            fontFamily: '"JetBrains Mono",monospace', fontSize: '0.56rem', height: 18,
            background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'text.secondary',
          }} />
        ))}
      </Box>

      {/* Read Case Study CTA */}
      <Box sx={{ px: 3, pb: 3, display: 'flex', alignItems: 'center', gap: 0.8 }}>
        <Typography className="cs-arrow" sx={{
          color: cs.color, fontSize: '0.72rem', fontWeight: 600,
          fontFamily: '"JetBrains Mono",monospace', opacity: 0.6,
          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}>
          Read Case Study
        </Typography>
        <ArrowForwardIcon className="cs-arrow" sx={{
          fontSize: 14, color: cs.color, opacity: 0.6,
          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </Box>
    </MotionBox>
  );
}

export default function CaseStudies() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selected, setSelected] = useState(null);

  return (
    <Box id="case-studies" sx={{ py: 14 }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Case Studies</SectionLabel>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 7, flexWrap: 'wrap', gap: 3 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary' }}>
            Problems I<br /><Box component="span" sx={{ color: 'primary.light' }}>solved, in depth</Box>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360, lineHeight: 1.8 }}>
            Detailed breakdowns of real challenges — the problem, my approach, and measurable outcomes.
          </Typography>
        </Box>

        <Grid2 container spacing={3} ref={ref}>
          {caseStudies.map((cs, i) => (
            <Grid2 key={cs.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <CaseStudyCard cs={cs} index={i} inView={inView} onClick={setSelected} />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {selected && <CaseStudyDialog cs={selected} open={Boolean(selected)} onClose={() => setSelected(null)} />}
    </Box>
  );
}
