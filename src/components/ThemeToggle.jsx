import React from 'react';
import { IconButton, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useColorScheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
    const { mode, setMode } = useColorScheme();
    const isDark = mode === 'dark';

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 28,
                left: 28,
                zIndex: 9999,
            }}
        >
            <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}>
                <IconButton
                    onClick={() => setMode(isDark ? 'light' : 'dark')}
                    sx={{
                        width: 48,
                        height: 48,
                        background: isDark
                            ? 'rgba(255,255,255,0.08)'
                            : 'rgba(0,0,0,0.06)',
                        border: '1px solid',
                        borderColor: isDark
                            ? 'rgba(255,255,255,0.12)'
                            : 'rgba(0,0,0,0.1)',
                        backdropFilter: 'blur(16px)',
                        color: isDark ? '#00c8ff' : '#1d6aff',
                        boxShadow: isDark
                            ? '0 4px 24px rgba(0,200,255,0.15)'
                            : '0 4px 24px rgba(29,106,255,0.15)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: isDark
                                ? 'rgba(255,255,255,0.14)'
                                : 'rgba(0,0,0,0.1)',
                        },
                    }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={isDark ? 'dark' : 'light'}
                            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.25 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                        </motion.div>
                    </AnimatePresence>
                </IconButton>
            </motion.div>
        </Box>
    );
}
