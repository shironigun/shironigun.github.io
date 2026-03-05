import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Box, Button, IconButton, Typography,
  Drawer, List, ListItem, ListItemButton, Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '../data/mockData';

const primaryLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Tools',    href: '#tools' },
  { label: 'Experience', href: '#experience' },
];

const workLinks = [
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Case Studies',   href: '#case-studies' },
  { label: 'Achievements',   href: '#achievements' },
];

const moreLinks = [
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Articles',     href: '#articles' },
  { label: 'Resume',       href: '#resume' },
];

function DropdownMenu({ links, open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            paddingTop: 8,
          }}
        >
          <Box sx={{
            background: 'rgba(6,19,37,0.97)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 2.5,
            backdropFilter: 'blur(24px)',
            py: 1, minWidth: 180,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            {links.map(link => (
              <Button
                key={link.label}
                fullWidth
                onClick={() => { document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                sx={{
                  justifyContent: 'flex-start', px: 2.5, py: 1,
                  color: 'text.secondary', fontSize: '0.82rem', fontWeight: 500,
                  borderRadius: 0,
                  '&:hover': { color: 'secondary.main', background: 'rgba(29,106,255,0.08)' },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavDropdown({ label, links }) {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        endIcon={<ExpandMoreIcon sx={{ fontSize: '14px !important', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />}
        sx={{ color: open ? 'secondary.main' : 'text.secondary', fontSize: '0.8rem', fontWeight: 500, px: 1.5, py: 0.8, '&:hover': { color: 'secondary.main', background: 'rgba(29,106,255,0.07)' } }}
      >
        {label}
      </Button>
      <DropdownMenu links={links} open={open} />
    </Box>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWork, setMobileWork] = useState(false);
  const [mobileMore, setMobileMore] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{
        background: scrolled ? 'rgba(3,13,26,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <Toolbar sx={{ px: { xs: 2, md: 5 }, py: 1, justifyContent: 'space-between' }}>
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Typography
              variant="h6" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{ fontWeight: 800, letterSpacing: '-0.5px', color: 'text.primary', cursor: 'none' }}
            >
              M<Box component="span" sx={{ color: 'primary.light' }}>.</Box>Ahmad
            </Typography>
          </motion.div>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.3, alignItems: 'center' }}>
            {primaryLinks.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Button onClick={() => scrollTo(link.href)} sx={{ color: 'text.secondary', fontSize: '0.8rem', fontWeight: 500, px: 1.4, py: 0.8, '&:hover': { color: 'secondary.main', background: 'rgba(29,106,255,0.07)' } }}>
                  {link.label}
                </Button>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.22 }}>
              <NavDropdown label="Work" links={workLinks} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.28 }}>
              <NavDropdown label="More" links={moreLinks} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.34 }}>
              <Button variant="contained" color="primary" startIcon={<WhatsAppIcon fontSize="small" />} href={personal.whatsapp} target="_blank" sx={{ ml: 1, py: 0.9, px: 2.5 }}>
                Let's Connect
              </Button>
            </motion.div>
          </Box>

          <IconButton sx={{ display: { lg: 'none' }, color: 'text.primary', cursor: 'none' }} onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 290, p: 2, background: 'rgba(6,19,37,0.98)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.07)' } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1rem' }}>M<Box component="span" sx={{ color: 'primary.light' }}>.</Box>Ahmad</Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'text.secondary', cursor: 'none' }}><CloseIcon /></IconButton>
        </Box>
        <List dense>
          {primaryLinks.map(link => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton onClick={() => scrollTo(link.href)} sx={{ borderRadius: 2, mb: 0.3, color: 'text.secondary', '&:hover': { color: 'secondary.main', background: 'rgba(29,106,255,0.08)' } }}>{link.label}</ListItemButton>
            </ListItem>
          ))}

          {/* Work group */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setMobileWork(!mobileWork)} sx={{ borderRadius: 2, mb: 0.3, color: 'text.secondary', justifyContent: 'space-between', '&:hover': { color: 'secondary.main', background: 'rgba(29,106,255,0.08)' } }}>
              Work
              <ExpandMoreIcon sx={{ fontSize: 16, transition: 'transform 0.2s', transform: mobileWork ? 'rotate(180deg)' : 'none' }} />
            </ListItemButton>
          </ListItem>
          <Collapse in={mobileWork}>
            {workLinks.map(link => (
              <ListItem key={link.label} disablePadding sx={{ pl: 2 }}>
                <ListItemButton onClick={() => scrollTo(link.href)} sx={{ borderRadius: 2, mb: 0.3, color: 'text.secondary', fontSize: '0.85rem', '&:hover': { color: 'secondary.main', background: 'rgba(29,106,255,0.08)' } }}>{link.label}</ListItemButton>
              </ListItem>
            ))}
          </Collapse>

          {/* More group */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setMobileMore(!mobileMore)} sx={{ borderRadius: 2, mb: 0.3, color: 'text.secondary', justifyContent: 'space-between', '&:hover': { color: 'secondary.main', background: 'rgba(29,106,255,0.08)' } }}>
              More
              <ExpandMoreIcon sx={{ fontSize: 16, transition: 'transform 0.2s', transform: mobileMore ? 'rotate(180deg)' : 'none' }} />
            </ListItemButton>
          </ListItem>
          <Collapse in={mobileMore}>
            {moreLinks.map(link => (
              <ListItem key={link.label} disablePadding sx={{ pl: 2 }}>
                <ListItemButton onClick={() => scrollTo(link.href)} sx={{ borderRadius: 2, mb: 0.3, color: 'text.secondary', fontSize: '0.85rem', '&:hover': { color: 'secondary.main', background: 'rgba(29,106,255,0.08)' } }}>{link.label}</ListItemButton>
              </ListItem>
            ))}
          </Collapse>

          <ListItem sx={{ mt: 2 }}>
            <Button fullWidth variant="contained" color="primary" startIcon={<WhatsAppIcon />} href={personal.whatsapp} target="_blank">WhatsApp</Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
