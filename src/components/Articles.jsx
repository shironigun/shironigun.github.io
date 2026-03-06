import React, { useState } from 'react';
import {
  Box, Typography, Chip, Dialog, DialogContent, IconButton,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { articles } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

/* ── Article Reading Dialog ── */
function ArticleDialog({ article, open, onClose }) {
  if (!article) return null;
  return (
    <Dialog
      open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper"
      PaperProps={{ sx: { background: 'var(--dialog-bg)', border: '1px solid var(--glass-border)', borderRadius: 3, maxHeight: '92vh' } }}
    >
      {/* Header */}
      <Box sx={{ position: 'relative', overflow: 'visible', flexShrink: 0 }}>
        <Box sx={{ background: `linear-gradient(135deg, ${article.color}22, var(--dropdown-bg))`, px: 4, pt: 3, pb: 3, borderBottom: '1px solid var(--glass-border)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
              {article.tags.map(t => (
                <Chip key={t} label={t} size="small" sx={{ fontSize: '0.6rem', height: 20, background: `${article.color}18`, border: `1px solid ${article.color}40`, color: article.color, fontFamily: '"JetBrains Mono",monospace' }} />
              ))}
            </Box>
            <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', cursor: 'none' }}><CloseIcon fontSize="small" /></IconButton>
          </Box>
          <Typography variant="h4" sx={{ color: 'text.primary', mb: 1, lineHeight: 1.35, fontSize: { xs: '1.3rem', md: '1.65rem' } }}>
            {article.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArticleOutlinedIcon sx={{ fontSize: 13, color: 'secondary.main' }} />
              <Typography variant="caption" sx={{ color: 'secondary.main' }}>{article.date}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{article.readTime}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Body */}
      <DialogContent sx={{ px: { xs: 3, md: 5 }, py: 4 }}>
        {article.body.map((block, i) => {
          if (block.type === 'heading') {
            return (
              <Typography key={i} variant="h6" sx={{ color: article.color, fontWeight: 700, mt: i === 0 ? 0 : 4, mb: 1.5, fontSize: '1.05rem' }}>
                {block.text}
              </Typography>
            );
          }
          return (
            <Typography key={i} variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.95, mb: 2, fontSize: '0.92rem' }}>
              {block.text}
            </Typography>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}

/* ── Article Card ── */
function ArticleCard({ article, index, inView, onClick }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      sx={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: 3, p: 3,
        height: '100%',
        cursor: 'none',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        '&:hover': {
          borderColor: `${article.color}55`,
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 40px ${article.color}15`,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <ArticleOutlinedIcon sx={{ fontSize: 16, color: article.color }} />
          <Typography variant="caption" sx={{ color: article.color, fontFamily: '"JetBrains Mono",monospace', fontSize: '0.65rem' }}>
            {article.date}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccessTimeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"JetBrains Mono",monospace', fontSize: '0.62rem' }}>{article.readTime}</Typography>
        </Box>
      </Box>

      <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.97rem', lineHeight: 1.4, mb: 1.5, flex: 1 }}>
        {article.title}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.78, mb: 2.5, fontSize: '0.84rem' }}>
        {article.excerpt}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
          {article.tags.slice(0, 2).map(t => (
            <Chip key={t} label={t} size="small" sx={{ fontSize: '0.6rem', height: 18, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'text.secondary' }} />
          ))}
        </Box>
        <Typography sx={{ color: article.color, fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.3 }}>
          Read <ArrowForwardIcon sx={{ fontSize: 14 }} />
        </Typography>
      </Box>
    </MotionBox>
  );
}

/* ── Section ── */
export default function Articles() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selected, setSelected] = useState(null);

  return (
    <Box id="articles" sx={{ py: 14, background: 'var(--gradient-section)' }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Articles & Thought Leadership</SectionLabel>
        <Box sx={{ mb: 7 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary' }}>
            Thinking out<br /><Box component="span" sx={{ color: 'primary.light' }}>loud</Box>
          </Typography>
        </Box>

        <Grid2 container spacing={2.5} ref={ref}>
          {articles.map((article, i) => (
            <Grid2 key={article.id} size={{ xs: 12, sm: 6 }}>
              <ArticleCard article={article} index={i} inView={inView} onClick={() => setSelected(article)} />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <AnimatePresence>
        <ArticleDialog article={selected} open={!!selected} onClose={() => setSelected(null)} />
      </AnimatePresence>
    </Box>
  );
}
