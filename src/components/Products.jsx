import React, { useState } from 'react';
import {
  Box, Typography, Chip, Dialog, DialogContent,
  IconButton, Tooltip, Button, Stack,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LanguageIcon from '@mui/icons-material/Language';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { products } from '../data/mockData';

const MotionBox = motion.create(Box);

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ width: 24, height: 2, background: 'linear-gradient(90deg,#1d6aff,#00c8ff)', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'secondary.main' }}>{children}</Typography>
    </Box>
  );
}

/* ── Webview Dialog ── */
function ProductDialog({ product, open, onClose }) {
  const [webviewError, setWebviewError] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth
      PaperProps={{ sx: { background: '#061325', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden', maxHeight: '92vh' } }}
    >
      {/* Toolbar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 3, py: 1.8, borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', flexWrap: 'wrap' }}>
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: product.color, flexShrink: 0 }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>{product.name}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{product.company}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <Tooltip title="Open Knowledge Base">
            <IconButton href={product.knowledgeBaseUrl} target="_blank" size="small" sx={{ color: 'primary.light', border: '1px solid rgba(29,106,255,0.3)', cursor: 'none', '&:hover': { background: 'rgba(29,106,255,0.1)' } }}>
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', cursor: 'none' }}><CloseIcon fontSize="small" /></IconButton>
        </Box>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {!webviewError ? (
          <Box sx={{ position: 'relative', width: '100%', height: '70vh', background: '#000' }}>
            {/* Browser chrome */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <Box sx={{ display: 'flex', gap: 0.6 }}>
                {['#ff5f57', '#ffbd2e', '#28c840'].map(c => <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
              </Box>
              <Box sx={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 1, px: 1.5, py: 0.4 }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.7rem', fontFamily: '"JetBrains Mono",monospace' }}>{product.knowledgeBaseUrl}</Typography>
              </Box>
            </Box>
            <iframe
              src={product.knowledgeBaseUrl}
              title={`${product.name} Knowledge Base`}
              width="100%"
              height="calc(100% - 42px)"
              style={{ border: 'none', display: 'block' }}
              onError={() => setWebviewError(true)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </Box>
        ) : (
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>Unable to load inline preview.</Typography>
            <Button href={product.knowledgeBaseUrl} target="_blank" variant="outlined" size="small" startIcon={<OpenInNewIcon />} sx={{ cursor: 'none' }}>
              Open Knowledge Base
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ── Product Card ── */
function ProductCard({ product, index, inView, onOpen }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1], scale: { type: 'spring', stiffness: 400, damping: 20 } }}
      onClick={onOpen}
      sx={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 3, p: 3, height: '100%',
        backdropFilter: 'blur(10px)',
        position: 'relative', overflow: 'hidden',
        cursor: 'none',
        '&::before': {
          content: '""', position: 'absolute',
          top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${product.color}, transparent)`,
        },
        '&:hover': { borderColor: `${product.color}45`, boxShadow: `0 12px 40px ${product.color}12` },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <LanguageIcon sx={{ color: product.color, fontSize: '1.6rem' }} />
          <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '1.1rem' }}>{product.name}</Typography>
        </Box>
        <Chip
          label={product.role}
          size="small"
          sx={{
            fontFamily: '"JetBrains Mono",monospace', fontSize: '0.58rem',
            background: `${product.color}14`, color: product.color,
            border: `1px solid ${product.color}30`, borderRadius: 5,
          }}
        />
      </Box>

      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
        {product.company}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '0.84rem', mb: 2.5 }}>
        {product.description}
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={0.8}>
        {product.features.map(f => (
          <Chip key={f} label={f} size="small" variant="outlined"
            sx={{ fontSize: '0.65rem', color: 'text.secondary', borderColor: 'rgba(255,255,255,0.12)', borderRadius: 2 }}
          />
        ))}
      </Stack>

      <Box sx={{ mt: 2.5, display: 'flex', gap: 1 }}>
        <Button size="small" variant="outlined" startIcon={<LanguageIcon />}
          sx={{
            fontSize: '0.7rem', textTransform: 'none', cursor: 'none',
            color: product.color, borderColor: `${product.color}40`,
            '&:hover': { background: `${product.color}14`, borderColor: product.color },
          }}
        >
          View Knowledge Base
        </Button>
      </Box>
    </MotionBox>
  );
}

/* ── Section ── */
export default function Products() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeProduct, setActiveProduct] = useState(null);

  return (
    <Box id="products" sx={{ py: 14, background: 'radial-gradient(ellipse at 50% 50%, rgba(29,106,255,0.04), transparent 70%)' }}>
      <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2.5, md: 5 } }}>
        <SectionLabel>Products</SectionLabel>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 7, flexWrap: 'wrap', gap: 3 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: 'text.primary' }}>
            Products I<br /><Box component="span" sx={{ color: 'primary.light' }}>work with</Box>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 340, lineHeight: 1.8 }}>
            Enterprise products I actively shape, test, and help evolve — click to explore the knowledge base.
          </Typography>
        </Box>

        <Grid2 container spacing={2.5} ref={ref}>
          {products.map((product, i) => (
            <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 6 }}>
              <ProductCard product={product} index={i} inView={inView} onOpen={() => setActiveProduct(product)} />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {activeProduct && (
        <ProductDialog product={activeProduct} open={!!activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </Box>
  );
}
