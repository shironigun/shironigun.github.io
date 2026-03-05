import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, IconButton, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { testimonials } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setActive(a => (a + 1) % testimonials.length); }, 5500);
    return () => clearInterval(t);
  }, []);

  const goTo = (n) => { setDir(n > active ? 1 : -1); setActive(n); };
  const prev = () => { setDir(-1); setActive(a => (a - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setDir(1); setActive(a => (a + 1) % testimonials.length); };
  const t = testimonials[active];

  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 30 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d * -20 }),
  };

  return (
    <Box id="testimonials" sx={{ py: 14, background: 'radial-gradient(ellipse at 50% 50%, rgba(29,106,255,0.05), transparent 70%)' }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Testimonials</SectionLabel>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary', mb: 7 }}>
          What colleagues<br /><Box component="span" sx={{ color: 'primary.light' }}>say about me</Box>
        </Typography>

        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          sx={{ maxWidth: 820, mx: 'auto' }}
        >
          <Box sx={{ overflow: 'hidden', position: 'relative', minHeight: 380 }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', width: '100%' }}
              >
                <Box sx={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 4, p: { xs: 3.5, md: 5.5 }, backdropFilter: 'blur(16px)', position: 'relative' }}>
                  <FormatQuoteIcon sx={{ fontSize: 60, color: 'primary.main', opacity: 0.22, position: 'absolute', top: 24, left: 32 }} />
                  <Box sx={{ display: 'flex', gap: 0.3, mb: 3 }}>
                    {[...Array(t.rating)].map((_, i) => <StarIcon key={i} sx={{ fontSize: 16, color: '#f5c842' }} />)}
                  </Box>
                  <Typography variant="body1" sx={{ color: 'text.primary', fontSize: { xs: '0.97rem', md: '1.06rem' }, lineHeight: 1.9, fontStyle: 'italic', fontWeight: 300, mb: 4, pt: 1 }}>
                    "{t.quote}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Avatar sx={{ width: 46, height: 46, background: 'linear-gradient(135deg,#1d6aff,#00c8ff)', fontWeight: 800 }}>{t.initials}</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ color: 'text.primary', fontSize: '1rem', fontWeight: 700 }}>{t.author}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{t.role}</Typography>
                    </Box>
                    <Chip label={t.relationship} size="small" sx={{ background: 'rgba(29,106,255,0.1)', border: '1px solid rgba(29,106,255,0.2)', color: 'primary.light', fontSize: '0.62rem' }} />
                  </Box>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mt: 4 }}>
            <IconButton onClick={prev} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: 'text.secondary', '&:hover': { borderColor: 'primary.light', color: 'secondary.main' }, cursor: 'none' }}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            {testimonials.map((_, i) => (
              <Box key={i} onClick={() => goTo(i)} sx={{ width: active === i ? 24 : 8, height: 8, borderRadius: 4, background: active === i ? 'linear-gradient(90deg,#1d6aff,#00c8ff)' : 'rgba(255,255,255,0.15)', cursor: 'none', transition: 'all 0.3s' }} />
            ))}
            <IconButton onClick={next} sx={{ border: '1px solid rgba(255,255,255,0.1)', color: 'text.secondary', '&:hover': { borderColor: 'primary.light', color: 'secondary.main' }, cursor: 'none' }}>
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}
