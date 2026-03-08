import React, { useState } from 'react';
import {
  Box, Typography, Chip, Avatar, Dialog, DialogContent,
  IconButton, Button, Tooltip,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import VerifiedIcon from '@mui/icons-material/Verified';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FilterListIcon from '@mui/icons-material/FilterList';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { certificationsWithPdf } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

// PDF Viewer Dialog
function PdfDialog({ cert, open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'var(--dialog-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      {/* Header */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 3, py: 2, borderBottom: '1px solid var(--glass-border)',
        background: 'var(--glass-bg)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32, background: cert.color, fontSize: '0.72rem', fontWeight: 800 }}>
            {cert.initials}
          </Avatar>
          <Box>
            <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>
              {cert.title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {cert.issuer} · {cert.date}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Open credential URL">
            <IconButton
              href={cert.credentialUrl}
              target="_blank"
              size="small"
              sx={{ color: 'primary.light', border: '1px solid rgba(29,106,255,0.3)', '&:hover': { background: 'var(--accent-glow-mild)' }, cursor: 'none' }}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', cursor: 'none', '&:hover': { color: 'text.primary' } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <DialogContent sx={{ p: 0, position: 'relative' }}>
        {cert.certFile ? (
          cert.certType === 'image' ? (
            /* Image certificate */
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--dialog-bg)', p: 2, minHeight: '60vh' }}>
              <img
                src={cert.certFile}
                alt={cert.title}
                style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 8 }}
              />
            </Box>
          ) : (
            /* PDF certificate */
            <Box sx={{ position: 'relative', width: '100%', height: '75vh' }}>
              <iframe
                src={cert.certFile}
                title={cert.title}
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
              />
            </Box>
          )
        ) : (
          /* Fallback — no file linked */
          <Box sx={{
            height: '60vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 3,
            background: 'var(--dialog-bg-gradient)',
          }}>
            <Box sx={{
              width: 80, height: 80, borderRadius: '50%',
              background: `${cert.color}18`, border: `2px solid ${cert.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PictureAsPdfIcon sx={{ fontSize: 36, color: cert.color }} />
            </Box>
            <Box sx={{ textAlign: 'center', maxWidth: 380, px: 3 }}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>Certificate not linked yet</Typography>
              <Button
                variant="outlined"
                startIcon={<OpenInNewIcon />}
                href={cert.credentialUrl}
                target="_blank"
                sx={{ borderColor: `${cert.color}60`, color: cert.color, '&:hover': { borderColor: cert.color, background: `${cert.color}0f` } }}
              >
                View Credential Online
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

// The flip card — crossfade + lift (avoids backfaceVisibility bugs with glass/blur)
function CertFlipCard({ cert, index, inView, onClick }) {
  const [hovered, setHovered] = useState(false);

  const face = {
    position: 'absolute', inset: 0,
    borderRadius: 3, p: 3,
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    overflow: 'hidden',
    transition: 'opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)',
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(cert)}
      sx={{
        height: 300,
        cursor: 'none',
        position: 'relative',
      }}
    >
      {/* FRONT */}
      <Box sx={{
        ...face,
        opacity: hovered ? 0 : 1,
        transform: hovered ? 'scale(0.96)' : 'scale(1)',
        pointerEvents: hovered ? 'none' : 'auto',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(10px)',
        '&::after': {
          content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${cert.color}, transparent)`,
        },
      }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.8 }}>
            <Avatar sx={{ width: 30, height: 30, background: cert.color, fontSize: '0.72rem', fontWeight: 800 }}>
              {cert.initials}
            </Avatar>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: '0.63rem' }}>{cert.issuer}</Typography>
            <Box sx={{ ml: 'auto' }}>
              <Chip
                label={cert.category}
                size="small"
                sx={{ fontSize: '0.6rem', height: 18, background: `${cert.color}18`, border: `1px solid ${cert.color}35`, color: cert.color }}
              />
            </Box>
          </Box>
          <Typography sx={{ color: 'text.primary', fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.35, mb: 1 }}>
            {cert.title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
            {cert.date}{cert.credentialId ? ` · ID: ${cert.credentialId}` : ''}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <VerifiedIcon sx={{ fontSize: 13, color: '#00e5a0' }} />
            <Typography variant="caption" sx={{ color: '#00e5a0', fontSize: '0.63rem' }}>Verified</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.5 }}>
            <PictureAsPdfIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.63rem' }}>Hover to preview</Typography>
          </Box>
        </Box>
      </Box>

      {/* BACK */}
      <Box sx={{
        ...face,
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'scale(1)' : 'scale(0.96)',
        pointerEvents: hovered ? 'auto' : 'none',
        background: `linear-gradient(145deg, ${cert.color}18, var(--dropdown-bg))`,
        border: `1px solid ${cert.color}45`,
      }}>
        {/* Mini PDF preview mockup */}
        <Box sx={{
          flex: 1, mb: 2,
          background: 'var(--glass-bg)',
          border: `1px solid ${cert.color}25`,
          borderRadius: 2,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <Box sx={{ background: cert.color, p: 1.2, textAlign: 'center' }}>
            <Typography sx={{ color: '#fff', fontSize: '0.6rem', fontWeight: 700, fontFamily: '"JetBrains Mono",monospace' }}>
              {cert.issuer} · CERTIFICATE
            </Typography>
          </Box>
          <Box sx={{ p: 1.5, flex: 1, display: 'flex', flexDirection: 'column', gap: 0.7 }}>
            {[...Array(4)].map((_, i) => (
              <Box key={i} sx={{ height: 4, width: ['90%', '65%', '80%', '50%'][i], background: i === 0 ? `${cert.color}40` : 'var(--glass-border)', borderRadius: 2 }} />
            ))}
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              <Box sx={{ height: 4, width: '30%', background: `${cert.color}30`, borderRadius: 2 }} />
              <Box sx={{ height: 4, width: '20%', background: 'var(--glass-bg)', borderRadius: 2 }} />
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography sx={{ color: 'text.primary', fontSize: '0.82rem', fontWeight: 700, mb: 0.5 }}>{cert.title}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2, lineHeight: 1.6 }}>
            {cert.description}
          </Typography>
          <Button
            size="small"
            fullWidth
            startIcon={<PictureAsPdfIcon />}
            sx={{
              background: `${cert.color}20`,
              border: `1px solid ${cert.color}50`,
              color: cert.color,
              fontSize: '0.72rem',
              py: 0.8,
              cursor: 'none',
              '&:hover': { background: `${cert.color}35` },
            }}
          >
            Click to View Full Certificate
          </Button>
        </Box>
      </Box>
    </MotionBox>
  );
}

const categories = ['All', 'Product', 'Agile', 'QA', 'Data', 'Dev', 'PM'];

export default function Certifications() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? certificationsWithPdf
    : certificationsWithPdf.filter(c => c.category === activeFilter);

  return (
    <Box id="certifications" sx={{ py: 14 }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Certifications</SectionLabel>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5, flexWrap: 'wrap', gap: 3 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary', mb: 0 }}>
            Credentials that<br /><Box component="span" sx={{ color: 'primary.light' }}>back the work</Box>
          </Typography>
          {/* Category filter */}
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <Chip
                key={cat}
                label={cat}
                size="small"
                onClick={() => setActiveFilter(cat)}
                sx={{
                  cursor: 'none',
                  background: activeFilter === cat ? 'var(--accent-glow-strong)' : 'var(--glass-bg)',
                  border: activeFilter === cat ? '1px solid rgba(29,106,255,0.5)' : '1px solid var(--glass-border)',
                  color: activeFilter === cat ? 'primary.light' : 'text.secondary',
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: 'rgba(29,106,255,0.4)', color: 'primary.light' },
                }}
              />
            ))}
          </Box>
        </Box>

        <Box ref={ref}>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 3, fontStyle: 'italic' }}>
            💡 Hover to flip card and preview PDF proof · Click to open full certificate viewer
          </Typography>
          <AnimatePresence mode="wait">
            <Grid2 container spacing={2.5} key={activeFilter}>
              {filtered.map((cert, i) => (
                <Grid2 key={cert.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <CertFlipCard cert={cert} index={i} inView={inView} onClick={setSelectedCert} />
                </Grid2>
              ))}
            </Grid2>
          </AnimatePresence>
        </Box>
      </Box>

      {/* PDF Dialog */}
      {selectedCert && (
        <PdfDialog
          cert={selectedCert}
          open={Boolean(selectedCert)}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </Box>
  );
}
