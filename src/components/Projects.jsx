import React, { useState } from 'react';
import {
  Box, Typography, Chip, Button, Dialog, DialogContent,
  IconButton, Stack, Tooltip,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projectsData } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

function StatusBadge({ status }) {
  const map = {
    Live:      { color: '#00e5a0', bg: 'rgba(0,229,160,0.1)',  border: 'rgba(0,229,160,0.25)',  icon: <CheckCircleIcon sx={{ fontSize: 10 }} /> },
    Completed: { color: '#4d8dff', bg: 'rgba(77,141,255,0.1)', border: 'rgba(77,141,255,0.25)', icon: <CheckCircleIcon sx={{ fontSize: 10 }} /> },
    Upcoming:  { color: '#f5c842', bg: 'rgba(245,200,66,0.1)', border: 'rgba(245,200,66,0.25)', icon: <AccessTimeIcon sx={{ fontSize: 10 }} /> },
  };
  const s = map[status] || map.Live;
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.3, borderRadius: 5, background: s.bg, border: `1px solid ${s.border}` }}>
      <Box sx={{ color: s.color }}>{s.icon}</Box>
      <Typography sx={{ color: s.color, fontSize: '0.6rem', fontFamily: '"JetBrains Mono",monospace', fontWeight: 600 }}>{status}</Typography>
    </Box>
  );
}

// Webview dialog
function ProjectDialog({ project, open, onClose }) {
  const [webviewError, setWebviewError] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth
      PaperProps={{ sx: { background: '#061325', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden', maxHeight: '92vh' } }}
    >
      {/* Toolbar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 3, py: 1.8, borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', flexWrap: 'wrap' }}>
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: project.color, flexShrink: 0 }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>{project.title}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{project.company} · {project.period}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          {project.repoUrl && (
            <Tooltip title="View Repository">
              <IconButton href={project.repoUrl} target="_blank" size="small" sx={{ color: 'text.secondary', border: '1px solid rgba(255,255,255,0.1)', cursor: 'none', '&:hover': { color: 'text.primary', borderColor: 'rgba(255,255,255,0.3)' } }}>
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {project.demoUrl && (
            <Tooltip title="Open Live Demo">
              <IconButton href={project.demoUrl} target="_blank" size="small" sx={{ color: 'primary.light', border: '1px solid rgba(29,106,255,0.3)', cursor: 'none', '&:hover': { background: 'rgba(29,106,255,0.1)' } }}>
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', cursor: 'none' }}><CloseIcon fontSize="small" /></IconButton>
        </Box>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {/* Webview / live demo */}
        {project.demoUrl && !webviewError ? (
          <Box sx={{ position: 'relative', width: '100%', height: '65vh', background: '#000' }}>
            {/* Browser chrome */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <Box sx={{ display: 'flex', gap: 0.6 }}>
                {['#ff5f57','#ffbd2e','#28c840'].map(c => <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
              </Box>
              <Box sx={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 1, px: 1.5, py: 0.4 }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.7rem', fontFamily: '"JetBrains Mono",monospace' }}>{project.demoUrl}</Typography>
              </Box>
            </Box>
            <iframe
              src={project.demoUrl}
              title={project.title}
              width="100%"
              height="calc(100% - 42px)"
              style={{ border: 'none', display: 'block' }}
              onError={() => setWebviewError(true)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </Box>
        ) : (
          /* Detailed project view when no live URL */
          <Box sx={{ p: 4 }}>
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, md: 8 }}>
                <Typography variant="h5" sx={{ color: 'text.primary', mb: 2 }}>{project.title}</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.85 }}>{project.longDescription}</Typography>

                <Typography variant="overline" sx={{ color: 'primary.light', display: 'block', mb: 2 }}>Key Highlights</Typography>
                <Stack spacing={1} sx={{ mb: 3 }}>
                  {project.highlights.map((h, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: project.color, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{h}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {project.tags.map(t => (
                    <Chip key={t} label={t} size="small" sx={{ fontFamily: '"JetBrains Mono",monospace', fontSize: '0.62rem', background: `${project.color}14`, border: `1px solid ${project.color}30`, color: project.color }} />
                  ))}
                </Box>
              </Grid2>

              <Grid2 size={{ xs: 12, md: 4 }}>
                {/* Metrics */}
                <Box sx={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3, p: 3, mb: 2 }}>
                  <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>Project Info</Typography>
                  {[
                    { label: 'Company', val: project.company },
                    { label: 'Period', val: project.period },
                    { label: 'Type', val: project.type },
                    { label: 'Status', val: project.status },
                    { label: 'Impact', val: project.impact },
                  ].map(row => (
                    <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.9, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{row.label}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500, textAlign: 'right', maxWidth: 160 }}>{row.val}</Typography>
                    </Box>
                  ))}
                </Box>
                {/* Impact callout */}
                <Box sx={{ background: `${project.color}12`, border: `1px solid ${project.color}30`, borderRadius: 3, p: 2.5, textAlign: 'center' }}>
                  <EmojiEventsIcon sx={{ color: project.color, mb: 1 }} />
                  <Typography sx={{ color: project.color, fontWeight: 800, fontSize: '1.4rem', lineHeight: 1 }}>{project.impact}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Primary Impact</Typography>
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Project card
function ProjectCard({ project, index, inView, onClick }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onClick(project)}
      sx={{
        background: project.isPlaceholder ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
        border: project.isPlaceholder ? '1px dashed rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 3, p: 3,
        cursor: 'none', height: '100%',
        display: 'flex', flexDirection: 'column',
        backdropFilter: 'blur(8px)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        position: 'relative', overflow: 'hidden',
        '&::before': { content: '""', position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: project.isPlaceholder ? 'rgba(255,255,255,0.1)' : `linear-gradient(180deg, ${project.color}, transparent)`, borderRadius: '0 0 0 0' },
        '&:hover': { borderColor: project.isPlaceholder ? 'rgba(255,255,255,0.2)' : `${project.color}55`, boxShadow: project.isPlaceholder ? 'none' : `0 12px 40px ${project.color}15` },
      }}
    >
      {/* Top row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Chip label={project.type} size="small" sx={{ fontFamily: '"JetBrains Mono",monospace', fontSize: '0.6rem', background: `${project.color}14`, border: `1px solid ${project.color}30`, color: project.color }} />
        <StatusBadge status={project.status} />
      </Box>

      <Typography sx={{ color: project.isPlaceholder ? 'text.secondary' : 'text.primary', fontWeight: 700, fontSize: '1rem', mb: 1, lineHeight: 1.3 }}>
        {project.title}
      </Typography>
      <Typography variant="caption" sx={{ color: 'secondary.main', fontFamily: '"JetBrains Mono",monospace', display: 'block', mb: 1.5 }}>
        {project.company} · {project.period}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75, mb: 2, flex: 1, fontSize: '0.84rem' }}>
        {project.description}
      </Typography>

      <Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mb: 2 }}>
          {project.tags.slice(0, 4).map(t => (
            <Chip key={t} label={t} size="small" sx={{ fontFamily: '"JetBrains Mono",monospace', fontSize: '0.6rem', height: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'text.secondary' }} />
          ))}
        </Box>
        {/* Impact bar */}
        {!project.isPlaceholder && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiEventsIcon sx={{ fontSize: 14, color: project.color }} />
            <Typography sx={{ color: project.color, fontSize: '0.78rem', fontWeight: 700, fontFamily: '"JetBrains Mono",monospace' }}>{project.impact}</Typography>
          </Box>
        )}
        {project.isPlaceholder && (
          <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>Edit mockData.js to add your project →</Typography>
        )}
      </Box>
    </MotionBox>
  );
}

const typeFilters = ['All', 'Product QA', 'Data & Analytics', 'Automation', 'Knowledge Management', 'UX & Documentation'];

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? projectsData : projectsData.filter(p => p.type === activeFilter);

  return (
    <Box id="projects" sx={{ py: 14, background: 'linear-gradient(180deg,transparent,rgba(29,106,255,0.025),transparent)' }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Projects</SectionLabel>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5, flexWrap: 'wrap', gap: 3 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary' }}>
            Work I'm<br /><Box component="span" sx={{ color: 'primary.light' }}>proud of</Box>
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
            {typeFilters.map(f => (
              <Chip key={f} label={f} size="small" onClick={() => setActiveFilter(f)} sx={{ cursor: 'none', background: activeFilter === f ? 'rgba(29,106,255,0.18)' : 'rgba(255,255,255,0.04)', border: activeFilter === f ? '1px solid rgba(29,106,255,0.5)' : '1px solid rgba(255,255,255,0.08)', color: activeFilter === f ? 'primary.light' : 'text.secondary', transition: 'all 0.2s', '&:hover': { borderColor: 'rgba(29,106,255,0.4)', color: 'primary.light' } }} />
            ))}
          </Box>
        </Box>

        <Box ref={ref}>
          <AnimatePresence mode="wait">
            <Grid2 container spacing={2.5} key={activeFilter}>
              {filtered.map((project, i) => (
                <Grid2 key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <ProjectCard project={project} index={i} inView={inView} onClick={setSelected} />
                </Grid2>
              ))}
            </Grid2>
          </AnimatePresence>
        </Box>
      </Box>

      {selected && <ProjectDialog project={selected} open={Boolean(selected)} onClose={() => setSelected(null)} />}
    </Box>
  );
}
