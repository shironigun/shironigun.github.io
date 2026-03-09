import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Chip, Stack, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { motion, AnimatePresence } from 'framer-motion';
import { personal, stats } from '../data/mockData';
import { useCounter } from '../hooks/useScrollReveal';

const MotionBox = motion.create(Box);

function StatCard({ num, suffix, label }) {
  const { ref, count } = useCounter(num);
  return (
    <MotionBox
      ref={ref}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      sx={{
        p: 2.5, background: 'var(--accent-glow)',
        border: '1px solid var(--accent-glow-strong)', borderRadius: 3, textAlign: 'center',
      }}
    >
      <Typography sx={{ fontWeight: 800, fontSize: '2.2rem', lineHeight: 1, background: 'linear-gradient(135deg,#4d8dff,#00c8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {count}{suffix}
      </Typography>
      <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>{label}</Typography>
    </MotionBox>
  );
}

function BgCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, dots = [], mx = 0, my = 0, raf;
    let GAP = 72;
    if (window.innerWidth < 600) GAP = 40;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      dots = [];
      const cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1;
      for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++)
          dots.push({ x: i * GAP, y: j * GAP, ox: i * GAP, oy: j * GAP, vx: 0, vy: 0, s: Math.random() * 0.7 + 0.3 });
    };
    const onMouse = (e) => { mx = e.clientX; my = e.clientY; };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        const dx = mx - d.x, dy = my - d.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) { const f = 1 - dist / 180; d.vx -= dx * f * 0.01; d.vy -= dy * f * 0.01; }
        d.vx += (d.ox - d.x) * 0.04; d.vy += (d.oy - d.y) * 0.04;
        d.vx *= 0.85; d.vy *= 0.85; d.x += d.vx; d.y += d.vy;
        const bright = Math.max(0, 1 - Math.sqrt((d.x - mx) ** 2 + (d.y - my) ** 2) / 300);
        ctx.beginPath(); ctx.arc(d.x, d.y, d.s * (1 + bright), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(29,106,255,${0.1 + bright * 0.4})`; ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) { ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y); ctx.strokeStyle = `rgba(29,106,255,${0.04 * (1 - d / 90)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    resize(); window.addEventListener('resize', resize); window.addEventListener('mousemove', onMouse); draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMouse); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.55, pointerEvents: 'none' }} />;
}

const phrases = ['Product Quality Analyst', 'CSM® Certified', 'CTFL Certified', 'QA Strategist', 'Product Thinker'];

export default function Hero() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [pIdx, setPIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[pIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setTyped(current.slice(0, typed.length + 1));
        if (typed.length + 1 === current.length) setTimeout(() => setDeleting(true), 1400);
      } else {
        setTyped(current.slice(0, typed.length - 1));
        if (typed.length - 1 === 0) { setDeleting(false); setPIdx((pIdx + 1) % phrases.length); }
      }
    }, deleting ? 45 : 75);
    return () => clearTimeout(timeout);
  }, [typed, deleting, pIdx]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <Box id="home" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', pt: 12, pb: 6, position: 'relative', overflow: 'hidden' }}>
      {!prefersReducedMotion && <BgCanvas />}
      <Box sx={{ position: 'absolute', top: '20%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,var(--accent-glow),transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />
      <Box sx={{ position: 'absolute', bottom: '10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,200,255,0.05),transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />

      <Box sx={{ width: '100%', maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 }, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, lg: 7 }}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', borderRadius: 10, px: 2, py: 0.7, mb: 3 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 8, color: '#00e5a0', animation: 'pulse 2s infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
                  <Typography variant="caption" sx={{ color: 'secondary.main', fontSize: '0.72rem' }}>Open to new opportunities</Typography>
                </Box>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography variant="h1" sx={{ fontSize: { xs: '3.2rem', sm: '4.2rem', md: '5.2rem' }, color: 'text.primary', mb: 0.5 }}>Mahmood</Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: '3.2rem', sm: '4.2rem', md: '5.2rem' }, background: 'linear-gradient(135deg, #4d8dff, #00c8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', mb: 2 }}>Ahmad</Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Typography sx={{ fontFamily: '"JetBrains Mono",monospace', fontSize: '1rem', color: 'secondary.main', minHeight: '1.5em' }}>
                    {typed}
                    <Box component="span" sx={{ display: 'inline-block', width: 2, height: '1em', background: '#00c8ff', ml: 0.5, animation: 'blink 1s step-end infinite', '@keyframes blink': { '50%': { opacity: 0 } }, verticalAlign: 'middle' }} />
                  </Typography>
                </Box>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 540, mb: 4, fontSize: '0.97rem' }}>
                  Bridging <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>Business Goals & Technical Excellence</Box> — I don't just build the thing right, I ensure we build <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>the right thing.</Box>
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 4 }}>
                  <Button variant="contained" color="primary" size="large" onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })} sx={{ px: 3.5, py: 1.4 }}>View Experience →</Button>
                  <Button variant="outlined" size="large" href={personal.whatsapp} target="_blank" startIcon={<WhatsAppIcon />} sx={{ px: 3, py: 1.4, borderColor: 'rgba(37,211,102,0.4)', color: '#25d366', '&:hover': { borderColor: '#25d366', background: 'rgba(37,211,102,0.07)' } }}>WhatsApp</Button>
                  <Button variant="outlined" size="large" href={personal.linkedin} target="_blank" startIcon={<LinkedInIcon />} sx={{ px: 3, py: 1.4, borderColor: 'var(--glass-hover)', color: 'text.secondary', '&:hover': { borderColor: 'primary.light', color: 'secondary.main' } }}>LinkedIn</Button>
                </Stack>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOnOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Lahore, Pakistan 🇵🇰</Typography>
                  </Box>
                  <Box sx={{ width: '1px', height: 14, background: 'var(--glass-border)' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <EmailOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{personal.email}</Typography>
                  </Box>
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <MotionBox
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              sx={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 4, p: 3.5, backdropFilter: 'blur(20px)', animation: 'float 6s ease-in-out infinite', '@keyframes float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } } }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, pb: 2.5, borderBottom: '1px solid var(--glass-divider)' }}>
                <Avatar alt="Mahmood Ahmad" sx={{ width: 52, height: 52, background: 'linear-gradient(135deg,#1d6aff,#00c8ff)', fontWeight: 800, fontSize: '1.3rem' }}>M</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: 'text.primary', letterSpacing: '-0.3px' }}>Mahmood Ahmad</Typography>
                  <Typography variant="caption" sx={{ color: 'secondary.main' }}>Product Quality Analyst</Typography>
                </Box>
              </Box>
              <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                {stats.map((s, i) => <Grid size={6} key={i}><StatCard {...s} /></Grid>)}
              </Grid>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                {['CSM®', 'CTFL', 'Agile', 'Azure DevOps', 'Power BI', 'Python', 'SQL'].map(t => (
                  <Chip key={t} label={t} size="small" sx={{ background: 'var(--accent-glow-mild)', border: '1px solid var(--accent-glow-strong)', color: 'primary.light' }} />
                ))}
              </Box>
            </MotionBox>
          </Grid>
        </Grid>

        <Box onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })} sx={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, cursor: 'none', opacity: 0.45, '&:hover': { opacity: 0.9 }, transition: 'opacity .2s' }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: '0.6rem' }}>scroll</Typography>
          <KeyboardArrowDownIcon sx={{ color: 'text.secondary', fontSize: 20, animation: 'bounce .8s ease infinite', '@keyframes bounce': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(5px)' } } }} />
        </Box>
      </Box>
    </Box>
  );
}
