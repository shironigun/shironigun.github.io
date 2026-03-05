import React, { useState } from 'react';
import {
  Box, Typography, Chip, Button, Dialog, DialogContent,
  IconButton, Stack, Divider, Avatar,
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
      PaperProps={{ sx: { background: '#061325', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, maxHeight: '92vh' } }}
    >
      {/* Header */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ background: `linear-gradient(135deg, ${cs.color}22, rgba(6,19,37,0.98))`, px: 4, pt: 4, pb: 3, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', cursor: 'none' }}><CloseIcon fontSize="small" /></IconButton>
          </Box>
          <Chip label={cs.category} size="small" sx={{ background: `${cs.color}20`, border: `1px solid ${cs.color}40`, color: cs.color, mb: 2, fontFamily: '"JetBrains Mono",monospace', fontSize: '0.65rem' }} />
          <Typography variant="h4" sx={{ color: 'text.primary', mb: 1, lineHeight: 1.35, pb: 0.5 }}>{cs.title}</Typography>
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
        <Box sx={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderLeft: `3px solid ${cs.color}`, borderRadius: '0 12px 12px 0', p: 3, mb: 4 }}>
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

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mb: 4 }} />

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

// Case study card
function CaseStudyCard({ cs, index, inView, onClick }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(cs)}
      sx={{
        background: cs.isPlaceholder ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
        border: cs.isPlaceholder ? '1px dashed rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 3, p: 3.5,
        cursor: 'none', height: '100%',
        display: 'flex', flexDirection: 'column',
        backdropFilter: 'blur(8px)',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        '&::before': {
          content: '""', position: 'absolute',
          top: 0, left: 0, right: 0, height: 2,
          background: cs.isPlaceholder ? 'transparent' : `linear-gradient(90deg, ${cs.color}, transparent)`,
        },
        '&:hover': {
          borderColor: cs.isPlaceholder ? 'rgba(255,255,255,0.18)' : `${cs.color}50`,
          transform: 'translateY(-5px)',
          boxShadow: cs.isPlaceholder ? 'none' : `0 16px 48px ${cs.color}15`,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Chip label={cs.category} size="small" sx={{ fontFamily: '"JetBrains Mono",monospace', fontSize: '0.62rem', background: `${cs.color}14`, border: `1px solid ${cs.color}30`, color: cs.color }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{cs.readTime}</Typography>
        </Box>
      </Box>

      <Typography sx={{ color: cs.isPlaceholder ? 'text.secondary' : 'text.primary', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.35, mb: 1 }}>
        {cs.title}
      </Typography>
      <Typography variant="caption" sx={{ color: 'secondary.main', fontFamily: '"JetBrains Mono",monospace', display: 'block', mb: 2 }}>
        {cs.company} · {cs.period}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, flex: 1, fontSize: '0.86rem' }}>
        {cs.overview.slice(0, 160)}...
      </Typography>

      {/* Results preview */}
      {!cs.isPlaceholder && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          {cs.results.slice(0, 3).map((r, i) => (
            <Box key={i} sx={{ background: `${cs.color}0d`, border: `1px solid ${cs.color}22`, borderRadius: 2, px: 1.5, py: 1, textAlign: 'center', minWidth: 70 }}>
              <Typography sx={{ color: cs.color, fontWeight: 800, fontSize: '1rem', lineHeight: 1.2 }}>{r.metric}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6rem', display: 'block', mt: 0.3, lineHeight: 1.3 }}>{r.label}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Button
        size="small"
        endIcon={<ArrowForwardIcon />}
        sx={{
          color: cs.isPlaceholder ? 'text.secondary' : cs.color,
          p: 0, justifyContent: 'flex-start',
          fontSize: '0.78rem', fontWeight: 600,
          cursor: 'none',
          '&:hover': { background: 'transparent', transform: 'translateX(4px)' },
          transition: 'transform 0.2s',
        }}
      >
        {cs.isPlaceholder ? 'Edit in mockData.js →' : 'Read Case Study →'}
      </Button>
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
            <Grid2 key={cs.id} size={{ xs: 12, sm: 6, md: i === 0 ? 8 : 4 }}>
              <CaseStudyCard cs={cs} index={i} inView={inView} onClick={setSelected} />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {selected && <CaseStudyDialog cs={selected} open={Boolean(selected)} onClose={() => setSelected(null)} />}
    </Box>
  );
}
