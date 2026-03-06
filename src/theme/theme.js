import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "data-mui-color-scheme" },
  colorSchemes: {
    dark: {
      palette: {
        primary: { main: "#1d6aff", light: "#4d8dff", dark: "#1255cc" },
        secondary: { main: "#00c8ff" },
        success: { main: "#00e5a0" },
        background: { default: "#030d1a", paper: "rgba(6,24,52,0.85)" },
        text: { primary: "#eef2fb", secondary: "#cdd7e8" },
      },
    },
    light: {
      palette: {
        primary: { main: "#1d6aff", light: "#4d8dff", dark: "#1255cc" },
        secondary: { main: "#0090b8" },
        success: { main: "#00b87a" },
        background: { default: "#f5f7fb", paper: "#ffffff" },
        text: { primary: "#111827", secondary: "#4b5563" },
      },
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-2px", lineHeight: 0.96 },
    h2: { fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.08 },
    h3: { fontWeight: 700, letterSpacing: "-1px" },
    h4: { fontWeight: 700, letterSpacing: "-.5px" },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 300, lineHeight: 1.85 },
    body2: { fontWeight: 300, lineHeight: 1.75, fontSize: "0.875rem" },
    caption: {
      fontFamily: '"JetBrains Mono", monospace',
      letterSpacing: "0.08em",
    },
    overline: {
      fontFamily: '"JetBrains Mono", monospace',
      letterSpacing: "0.18em",
      fontSize: "0.69rem",
    },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          borderRadius: 8,
          cursor: "none",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #1d6aff, #1255cc)",
          boxShadow: "0 0 30px rgba(29,106,255,0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #4d8dff, #1d6aff)",
            boxShadow: "0 8px 40px rgba(29,106,255,0.5)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "0.69rem",
          cursor: "none",
          borderRadius: 6,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          background: t.vars
            ? `rgba(${t.vars.palette.text.primaryChannel} / 0.04)`
            : "rgba(255,255,255,0.04)",
          border: `1px solid rgba(${
            t.vars?.palette.text.primaryChannel || "255,255,255"
          }, 0.08)`,
          backdropFilter: "blur(16px)",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          cursor: "none",
        }),
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          height: 5,
          backgroundColor: "var(--progress-track)",
        },
        bar: {
          borderRadius: 100,
          background: "linear-gradient(90deg, #1d6aff, #00c8ff)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          alignItems: "flex-start",
          cursor: "none",
          minHeight: 56,
          padding: "12px 20px",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          left: 0,
          right: "auto",
          width: 3,
          borderRadius: 3,
          background: "linear-gradient(180deg, #1d6aff, #00c8ff)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme: t }) => ({
          background:
            t.palette.mode === "dark"
              ? "rgba(6,24,52,0.95)"
              : "rgba(255,255,255,0.95)",
          border: `1px solid rgba(${
            t.vars?.palette.text.primaryChannel || "255,255,255"
          }, 0.1)`,
          backdropFilter: "blur(12px)",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "0.72rem",
          color: t.palette.text.primary,
        }),
        arrow: ({ theme: t }) => ({
          color:
            t.palette.mode === "dark"
              ? "rgba(6,24,52,0.95)"
              : "rgba(255,255,255,0.95)",
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { cursor: none; overflow-x: hidden; }
        :root, [data-mui-color-scheme="dark"] {
          --glass-bg: rgba(255,255,255,0.04);
          --glass-border: rgba(255,255,255,0.08);
          --glass-hover: rgba(255,255,255,0.12);
          --glass-divider: rgba(255,255,255,0.07);
          --accent-glow: rgba(29,106,255,0.08);
          --accent-glow-mild: rgba(29,106,255,0.12);
          --accent-glow-strong: rgba(29,106,255,0.18);
          --accent-border: rgba(29,106,255,0.2);
          --accent-border-strong: rgba(29,106,255,0.5);
          --dialog-bg: #061325;
          --dialog-bg-gradient: linear-gradient(160deg,#0a1628,#061325);
          --nav-bg: rgba(3,13,26,0.9);
          --nav-blur: blur(20px);
          --dropdown-bg: rgba(6,19,37,0.97);
          --shadow-heavy: 0 20px 60px rgba(0,0,0,0.5);
          --code-color: #00c8ff;
          --code-bg: rgba(0,200,255,0.08);
          --body-bg: #030d1a;
          --scrollbar-track: #030d1a;
          --gradient-section: linear-gradient(180deg,transparent,rgba(29,106,255,0.025),transparent);
          --gradient-radial: radial-gradient(ellipse at 50% 50%, rgba(29,106,255,0.04), transparent 70%);
          --gradient-radial-top: radial-gradient(ellipse at 50% 0%,rgba(29,106,255,0.07),transparent 60%);
          --text-on-glass: rgba(255,255,255,0.65);
          --progress-track: rgba(255,255,255,0.06);
          --strong-inline: #eef2fb;
        }
        [data-mui-color-scheme="light"] {
          --glass-bg: rgba(0,0,0,0.03);
          --glass-border: rgba(0,0,0,0.08);
          --glass-hover: rgba(0,0,0,0.06);
          --glass-divider: rgba(0,0,0,0.06);
          --accent-glow: rgba(29,106,255,0.06);
          --accent-glow-mild: rgba(29,106,255,0.08);
          --accent-glow-strong: rgba(29,106,255,0.14);
          --accent-border: rgba(29,106,255,0.2);
          --accent-border-strong: rgba(29,106,255,0.5);
          --dialog-bg: #ffffff;
          --dialog-bg-gradient: linear-gradient(160deg,#f0f2f5,#ffffff);
          --nav-bg: rgba(255,255,255,0.85);
          --nav-blur: blur(20px);
          --dropdown-bg: rgba(255,255,255,0.97);
          --shadow-heavy: 0 20px 60px rgba(0,0,0,0.12);
          --code-color: #0077aa;
          --code-bg: rgba(0,119,170,0.08);
          --body-bg: #f5f7fb;
          --scrollbar-track: #f5f7fb;
          --gradient-section: linear-gradient(180deg,transparent,rgba(29,106,255,0.03),transparent);
          --gradient-radial: radial-gradient(ellipse at 50% 50%, rgba(29,106,255,0.04), transparent 70%);
          --gradient-radial-top: radial-gradient(ellipse at 50% 0%,rgba(29,106,255,0.04),transparent 60%);
          --text-on-glass: rgba(0,0,0,0.55);
          --progress-track: rgba(0,0,0,0.06);
          --strong-inline: #111827;
        }
        body { background: var(--body-bg); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--scrollbar-track); }
        ::-webkit-scrollbar-thumb { background: #1d6aff; border-radius: 3px; }
        ::selection { background: rgba(29,106,255,0.35); }
        a, button { cursor: none; }
      `,
    },
  },
});

export default theme;
