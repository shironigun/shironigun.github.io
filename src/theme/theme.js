import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: {
      palette: {
        primary: { main: '#1d6aff', light: '#4d8dff', dark: '#1255cc' },
        secondary: { main: '#00c8ff' },
        success: { main: '#00e5a0' },
        background: { default: '#030d1a', paper: 'rgba(6,24,52,0.85)' },
        text: { primary: '#eef2fb', secondary: '#cdd7e8' },
      },
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-2px', lineHeight: 0.96 },
    h2: { fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.08 },
    h3: { fontWeight: 700, letterSpacing: '-1px' },
    h4: { fontWeight: 700, letterSpacing: '-.5px' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 300, lineHeight: 1.85 },
    body2: { fontWeight: 300, lineHeight: 1.75, fontSize: '0.875rem' },
    caption: { fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.08em' },
    overline: { fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.18em', fontSize: '0.69rem' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', fontWeight: 700,
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          borderRadius: 8, cursor: 'none',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1d6aff, #1255cc)',
          boxShadow: '0 0 30px rgba(29,106,255,0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4d8dff, #1d6aff)',
            boxShadow: '0 8px 40px rgba(29,106,255,0.5)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: '"JetBrains Mono", monospace', fontSize: '0.69rem', cursor: 'none', borderRadius: 6 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
          cursor: 'none',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 100, height: 5, backgroundColor: 'rgba(255,255,255,0.06)' },
        bar: { borderRadius: 100, background: 'linear-gradient(90deg, #1d6aff, #00c8ff)' },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500, alignItems: 'flex-start', cursor: 'none', minHeight: 56, padding: '12px 20px' },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { left: 0, right: 'auto', width: 3, borderRadius: 3, background: 'linear-gradient(180deg, #1d6aff, #00c8ff)' },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(6,24,52,0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.72rem',
        },
        arrow: { color: 'rgba(6,24,52,0.95)' },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #030d1a; cursor: none; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #030d1a; }
        ::-webkit-scrollbar-thumb { background: #1d6aff; border-radius: 3px; }
        ::selection { background: rgba(29,106,255,0.35); color: #eef2fb; }
        a, button { cursor: none; }
      `,
    },
  },
});

export default theme;
