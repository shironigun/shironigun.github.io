import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Stack } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personal } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

const channels = [
  { label: 'WhatsApp', value: personal.phone, icon: <WhatsAppIcon />, href: personal.whatsapp, color: '#25d366', bg: 'rgba(37,211,102,0.1)' },
  { label: 'Email', value: personal.email, icon: <EmailOutlinedIcon />, href: `mailto:${personal.email}`, color: '#4d8dff', bg: 'rgba(29,106,255,0.1)' },
  { label: 'LinkedIn', value: 'mahmoodahmad-connect', icon: <LinkedInIcon />, href: personal.linkedin, color: '#0077b5', bg: 'rgba(0,119,181,0.1)' },
];

export default function Connect() {
  const [form, setForm] = useState({ name: '', company: '', email: '', purpose: '', message: '' });
  const [sent, setSent] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', company: '', email: '', purpose: '', message: '' });
  };

  return (
    <Box id="connect" sx={{ py: 14, background: 'radial-gradient(ellipse at 50% 0%,rgba(29,106,255,0.07),transparent 60%)' }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Let's Connect</SectionLabel>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary', mb: 7 }}>
          Ready to build<br /><Box component="span" sx={{ color: 'primary.light' }}>something great?</Box>
        </Typography>

        <Grid2 container spacing={6} ref={ref} alignItems="flex-start">
          <Grid2 size={{ xs: 12, md: 5 }}>
            <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 400, fontSize: '0.97rem' }}>
                Whether you're looking for a Product Analyst who gets both business and tech, or just want to connect — I'd love to hear from you. <Box component="strong" sx={{ color: 'text.primary' }}>WhatsApp gets the fastest response.</Box>
              </Typography>
              <Stack spacing={1.5}>
                {channels.map((ch) => (
                  <MotionBox
                    key={ch.label}
                    component="a"
                    href={ch.href}
                    target="_blank"
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.2, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3, textDecoration: 'none', cursor: 'none', transition: 'border-color 0.25s, background 0.25s', '&:hover': { borderColor: ch.color, background: ch.bg } }}
                  >
                    <Box sx={{ width: 42, height: 42, borderRadius: 2, background: ch.bg, color: ch.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ch.icon}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3 }}>{ch.label}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{ch.value}</Typography>
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '1rem' }}>→</Typography>
                  </MotionBox>
                ))}
              </Stack>
            </MotionBox>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 7 }}>
            <MotionBox
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              sx={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 4, p: { xs: 3, md: 4.5 }, backdropFilter: 'blur(12px)' }}
            >
              <Typography variant="h5" sx={{ color: 'text.primary', mb: 3 }}>Send a message 👋</Typography>
              <Grid2 container spacing={2} sx={{ mb: 2 }}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} size="small" />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Company" name="company" value={form.company} onChange={handleChange} size="small" />
                </Grid2>
              </Grid2>
              <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} size="small" sx={{ mb: 2 }} />
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Purpose</InputLabel>
                <Select name="purpose" value={form.purpose} label="Purpose" onChange={handleChange}
                  sx={{ background: 'rgba(255,255,255,0.03)', color: 'text.primary', borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(29,106,255,0.5)' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1d6aff' }, '& .MuiSvgIcon-root': { color: 'text.secondary' }, cursor: 'none' }}
                  MenuProps={{ PaperProps: { sx: { background: '#061325', border: '1px solid rgba(255,255,255,0.1)' } } }}
                >
                  {['Job Opportunity', 'Collaboration', 'Consulting', 'Mentorship', 'Just connecting'].map(o => (
                    <MenuItem key={o} value={o} sx={{ color: 'text.secondary', '&:hover': { background: 'rgba(29,106,255,0.1)' }, cursor: 'none' }}>{o}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField fullWidth multiline rows={4} label="Message" name="message" value={form.message} onChange={handleChange} sx={{ mb: 3 }} />
              <Button fullWidth variant="contained" color="primary" size="large"
                startIcon={sent ? <CheckCircleOutlineIcon /> : <SendIcon />}
                onClick={handleSubmit}
                sx={{ py: 1.6, fontSize: '0.97rem', background: sent ? 'linear-gradient(135deg,#00e5a0,#00b37a)' : undefined, boxShadow: sent ? '0 0 30px rgba(0,229,160,0.3)' : undefined }}
              >
                {sent ? 'Message Sent! 🎉' : 'Send Message →'}
              </Button>
            </MotionBox>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}
