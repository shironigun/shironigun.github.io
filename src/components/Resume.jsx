import React, { useRef, useState } from 'react';
import { Box, Typography, Button, Divider, Stack, Chip, List, ListItem, CircularProgress } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import DownloadIcon from '@mui/icons-material/Download';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useColorScheme } from '@mui/material/styles';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { personal, experience, certifications } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

function ResumeThumb() {
  return (
    <Box sx={{ width: '100%', aspectRatio: '3/4', background: 'var(--dialog-bg-gradient)', borderRadius: 2, border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
      <Box sx={{ background: '#1d6aff', p: 2 }}>
        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.85rem', fontFamily: '"Plus Jakarta Sans",sans-serif' }}>Mahmood Ahmad</Typography>
        <Typography sx={{ color: 'var(--text-on-glass)', fontSize: '0.65rem', fontFamily: '"JetBrains Mono",monospace' }}>Product Quality Analyst · CSM® · CTFL</Typography>
      </Box>
      <Box sx={{ p: 1.5 }}>
        {[...Array(5)].map((_, i) => (
          <Box key={i} sx={{ mb: i === 0 || i === 2 ? 2 : 0.8 }}>
            {(i === 0 || i === 2) && <Box sx={{ display: 'flex', gap: 0.5, mb: 0.7, alignItems: 'center' }}><Box sx={{ width: 5, height: 5, background: '#00c8ff', borderRadius: '50%' }} /><Box sx={{ height: 4, width: 50, background: 'var(--glass-hover)', borderRadius: 2 }} /></Box>}
            <Box sx={{ height: 4, width: ['80%', '65%', '90%', '70%', '55%'][i], background: i % 3 === 0 ? 'rgba(29,106,255,0.25)' : 'var(--glass-border)', borderRadius: 2, mb: 0.5 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const topSkills = ['Product Discovery', 'User Story Writing', 'Azure DevOps', 'Power BI', 'SQL', 'Python', 'Scrum (CSM®)', 'ISTQB CTFL', 'Stakeholder Mgmt', 'RACI/RASCI', 'Risk Management', 'Power Platform', 'Selenium', 'Kanban', 'SWOT', '5 Whys'];

export default function Resume() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const resumeContentRef = useRef(null);
  const { mode } = useColorScheme();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    const el = resumeContentRef.current;
    if (!el) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const contentW = pageW - margin * 2;
      const imgRatio = canvas.height / canvas.width;
      const contentH = contentW * imgRatio;

      if (contentH <= pageH - margin * 2) {
        pdf.addImage(imgData, 'PNG', margin, margin, contentW, contentH);
      } else {
        // Multi-page: slice the canvas into pages
        const pxPerPage = (canvas.width * (pageH - margin * 2)) / contentW;
        let yOffset = 0;
        let page = 0;
        while (yOffset < canvas.height) {
          if (page > 0) pdf.addPage();
          const sliceH = Math.min(pxPerPage, canvas.height - yOffset);
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = sliceH;
          const ctx = sliceCanvas.getContext('2d');
          ctx.drawImage(canvas, 0, yOffset, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
          const sliceImg = sliceCanvas.toDataURL('image/png');
          const drawH = (sliceH / canvas.width) * contentW;
          pdf.addImage(sliceImg, 'PNG', margin, margin, contentW, drawH);
          yOffset += sliceH;
          page++;
        }
      }
      const themeSuffix = mode === 'light' ? 'Light' : 'Dark';
      pdf.save(`Mahmood_Ahmad_Resume_${themeSuffix}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Box id="resume" sx={{ py: 14, background: 'var(--gradient-section)' }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Resume</SectionLabel>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary', mb: 7 }}>
          My full<br /><Box component="span" sx={{ color: 'primary.light' }}>experience doc</Box>
        </Typography>

        <Grid2 container spacing={4} ref={ref}>
          <Grid2 size={{ xs: 12, md: 3.5 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              sx={{ position: { md: 'sticky' }, top: 120 }}
            >
              <Box sx={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 3, p: 2.5, mb: 2 }}>
                <ResumeThumb />
                <Stack spacing={1.5} sx={{ mt: 2.5 }}>
                  <Button variant="contained" color="primary" fullWidth startIcon={downloading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <DownloadIcon />} onClick={handleDownload} disabled={downloading}>{downloading ? 'Generating…' : 'Download Resume'}</Button>
                  <Button variant="outlined" fullWidth startIcon={<LinkedInIcon />} href={personal.linkedin} target="_blank" sx={{ borderColor: 'var(--glass-hover)', color: 'text.secondary', '&:hover': { borderColor: 'primary.light', color: 'secondary.main' } }}>LinkedIn Profile</Button>
                </Stack>
              </Box>
              <Box sx={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 3, p: 2.5 }}>
                {[{ label: 'Updated', val: 'March 2026' }, { label: 'Degree', val: 'B.S. Info Tech' }, { label: 'Location', val: 'Lahore, PK 🇵🇰' }, { label: 'Company', val: 'Perseus Group, CSI' }].map(item => (
                  <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid var(--glass-bg)' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.label}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.primary' }}>{item.val}</Typography>
                  </Box>
                ))}
              </Box>
            </MotionBox>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 8.5 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              ref={resumeContentRef}
              sx={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 3, p: { xs: 3, md: 5 } }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, pb: 3, borderBottom: '2px solid #1d6aff' }}>
                <Box>
                  <Typography variant="h3" sx={{ color: 'text.primary', fontSize: '1.8rem', mb: 0.5 }}>Mahmood Ahmad</Typography>
                  <Typography sx={{ fontFamily: '"JetBrains Mono",monospace', color: 'var(--code-color)', fontSize: '0.78rem' }}>Product Quality Analyst (CSM®, CTFL) · Perseus Group, Constellation Software</Typography>
                </Box>
                <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>{personal.phone}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: 'primary.light' }}>{personal.email}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>Lahore, Punjab, Pakistan</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3.5 }}>
                <Typography variant="overline" sx={{ color: 'primary.light', display: 'block', mb: 1.5, letterSpacing: '.12em' }}>Summary</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.85 }}>CSM® and ISTQB®-certified Product Quality Analyst partnering with cross-functional teams to transform complex product visions into secure, high-quality solutions. Dual expertise spanning rigorous SQA practices and strategic product discovery.</Typography>
              </Box>
              <Divider sx={{ mb: 3.5 }} />

              <Box sx={{ mb: 3.5 }}>
                <Typography variant="overline" sx={{ color: 'primary.light', display: 'block', mb: 2.5, letterSpacing: '.12em' }}>Experience</Typography>
                {experience.map((exp) => (
                  <Box key={exp.id} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.3, flexWrap: 'wrap', gap: 1 }}>
                      <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem' }}>{exp.role}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{exp.period}</Typography>
                    </Box>
                    <Typography sx={{ fontFamily: '"JetBrains Mono",monospace', color: 'var(--code-color)', fontSize: '0.73rem', mb: 1.2 }}>{exp.company}</Typography>
                    <List disablePadding>
                      {exp.bullets.map((b, j) => (
                        <ListItem key={j} disablePadding sx={{ mb: 0.4, alignItems: 'flex-start' }}>
                          <ChevronRightIcon sx={{ fontSize: 14, color: 'var(--code-color)', mt: 0.4, mr: 0.5, flexShrink: 0 }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.82rem' }} dangerouslySetInnerHTML={{ __html: b }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ mb: 3.5 }} />

              <Box sx={{ mb: 3.5 }}>
                <Typography variant="overline" sx={{ color: 'primary.light', display: 'block', mb: 2, letterSpacing: '.12em' }}>Education</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                  <Box>
                    <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.92rem' }}>B.S. Information Technology</Typography>
                    <Typography sx={{ fontFamily: '"JetBrains Mono",monospace', color: 'var(--code-color)', fontSize: '0.72rem' }}>University of the Punjab, Lahore</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Nov 2019 — Dec 2023</Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 3.5 }} />

              <Box sx={{ mb: 3.5 }}>
                <Typography variant="overline" sx={{ color: 'primary.light', display: 'block', mb: 2, letterSpacing: '.12em' }}>Core Skills</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {topSkills.map(s => <Chip key={s} label={s} size="small" sx={{ fontFamily: '"JetBrains Mono",monospace', fontSize: '0.62rem', background: 'var(--accent-glow-mild)', border: '1px solid var(--accent-border)', color: 'primary.light' }} />)}
                </Box>
              </Box>
              <Divider sx={{ mb: 3.5 }} />

              <Box>
                <Typography variant="overline" sx={{ color: 'primary.light', display: 'block', mb: 2, letterSpacing: '.12em' }}>Key Certifications</Typography>
                {certifications.slice(0, 5).map((c, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.8, borderBottom: '1px solid var(--glass-bg)', flexWrap: 'wrap', gap: 1 }}>
                    <Typography sx={{ color: 'text.primary', fontSize: '0.84rem', fontWeight: 500 }}>{c.title}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{c.issuer} · {c.date}</Typography>
                  </Box>
                ))}
              </Box>
            </MotionBox>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}
