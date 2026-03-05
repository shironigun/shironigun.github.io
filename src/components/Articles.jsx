import React from 'react';
import { Box, Typography, Chip, Button, Stack } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { articles, personal } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

function ArticleCard({ article, index, inView }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      component="a"
      href={article.isPlaceholder ? undefined : article.url}
      target="_blank"
      sx={{
        display: 'flex', flexDirection: 'column',
        background: article.isPlaceholder ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
        border: article.isPlaceholder ? '1px dashed rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 3, p: 3,
        textDecoration: 'none', height: '100%',
        cursor: article.isPlaceholder ? 'none' : 'none',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        '&:hover': {
          borderColor: article.isPlaceholder ? 'rgba(255,255,255,0.2)' : 'rgba(29,106,255,0.4)',
          transform: 'translateY(-4px)',
          boxShadow: article.isPlaceholder ? 'none' : '0 12px 40px rgba(29,106,255,0.12)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <ArticleOutlinedIcon sx={{ fontSize: 16, color: article.isPlaceholder ? 'text.secondary' : 'primary.light' }} />
          <Typography variant="caption" sx={{ color: article.isPlaceholder ? 'text.secondary' : 'primary.light', fontFamily: '"JetBrains Mono",monospace', fontSize: '0.65rem' }}>
            {article.platform}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccessTimeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"JetBrains Mono",monospace', fontSize: '0.62rem' }}>{article.readTime}</Typography>
        </Box>
      </Box>

      <Typography sx={{ color: article.isPlaceholder ? 'text.secondary' : 'text.primary', fontWeight: 700, fontSize: '0.97rem', lineHeight: 1.4, mb: 1.5, flex: 1 }}>
        {article.title}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.78, mb: 2.5, fontSize: '0.84rem' }}>
        {article.excerpt}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
          {article.tags.slice(0, 2).map(t => (
            <Chip key={t} label={t} size="small" sx={{ fontSize: '0.6rem', height: 18, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'text.secondary' }} />
          ))}
        </Box>
        {!article.isPlaceholder && (
          <Typography sx={{ color: 'primary.light', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.3 }}>
            Read <ArrowForwardIcon sx={{ fontSize: 14 }} />
          </Typography>
        )}
        {article.isPlaceholder && (
          <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: '0.7rem' }}>
            Coming soon
          </Typography>
        )}
      </Box>
    </MotionBox>
  );
}

export default function Articles() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <Box id="articles" sx={{ py: 14, background: 'linear-gradient(180deg,transparent,rgba(29,106,255,0.02),transparent)' }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Articles & Thought Leadership</SectionLabel>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 7, flexWrap: 'wrap', gap: 3 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary' }}>
            Thinking out<br /><Box component="span" sx={{ color: 'primary.light' }}>loud</Box>
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            href={personal.linkedin}
            target="_blank"
            sx={{ borderColor: 'rgba(255,255,255,0.12)', color: 'text.secondary', '&:hover': { borderColor: 'primary.light', color: 'secondary.main' } }}
          >
            Follow on LinkedIn
          </Button>
        </Box>

        <Grid2 container spacing={2.5} ref={ref}>
          {articles.map((article, i) => (
            <Grid2 key={article.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ArticleCard article={article} index={i} inView={inView} />
            </Grid2>
          ))}
        </Grid2>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          sx={{ mt: 4, p: 3, border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 3, textAlign: 'center' }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            📝 <strong style={{ color: '#eef2fb' }}>As you publish articles or blog posts,</strong> add them to the <code style={{ color: '#00c8ff', background: 'rgba(0,200,255,0.08)', padding: '2px 6px', borderRadius: 4 }}>articles</code> array in <code style={{ color: '#00c8ff', background: 'rgba(0,200,255,0.08)', padding: '2px 6px', borderRadius: 4 }}>mockData.js</code>. Set <code style={{ color: '#00c8ff', background: 'rgba(0,200,255,0.08)', padding: '2px 6px', borderRadius: 4 }}>isPlaceholder: false</code> and add the real URL.
          </Typography>
        </MotionBox>
      </Box>
    </Box>
  );
}
