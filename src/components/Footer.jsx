import React from 'react';
import { Box, Typography, Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { personal } from '../data/mockData';

export default function Footer() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid var(--glass-divider)',
          py: 4,
          px: { xs: 2.5, md: 5 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          maxWidth: 1140,
          mx: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
          © 2026 <Box component="span" sx={{ color: 'primary.light' }}>Mahmood Ahmad</Box>. All rights reserved.
        </Typography>
        <Typography sx={{ fontFamily: '"JetBrains Mono",monospace', color: 'text.secondary', fontSize: '0.72rem' }}>
          Built with <Box component="span" sx={{ color: 'primary.light' }}>precision</Box> · Lahore, Pakistan 🇵🇰
        </Typography>
      </Box>

      {/* WhatsApp FAB */}
      <Tooltip title="Chat on WhatsApp" placement="left">
        <Fab
          component="a"
          href={personal.whatsapp}
          target="_blank"
          size="medium"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: '#25d366',
            color: '#fff',
            zIndex: 500,
            cursor: 'none',
            boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
            animation: 'pulseWA 3s ease-in-out infinite',
            '@keyframes pulseWA': {
              '0%,100%': { boxShadow: '0 4px 20px rgba(37,211,102,0.5)' },
              '50%': { boxShadow: '0 4px 40px rgba(37,211,102,0.8), 0 0 0 8px rgba(37,211,102,0.1)' },
            },
            '&:hover': { background: '#1da851', transform: 'scale(1.1)' },
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Tooltip>
    </>
  );
}
