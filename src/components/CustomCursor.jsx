import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  let mx = 0, my = 0, rx = 0, ry = 0, raf;
  let isHovering = false;

  useEffect(() => {
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onEnter = () => { isHovering = true; };
    const onLeave = () => { isHovering = false; };

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role=button], .MuiButtonBase-root').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    const animate = () => {
      if (dotRef.current) { dotRef.current.style.left = mx + 'px'; dotRef.current.style.top = my + 'px'; }
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
        ringRef.current.style.width = isHovering ? '48px' : '32px';
        ringRef.current.style.height = isHovering ? '48px' : '32px';
        ringRef.current.style.borderColor = isHovering ? '#00c8ff' : 'rgba(77,141,255,0.6)';
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    addHoverListeners();
    animate();
    const mo = new MutationObserver(addHoverListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <Box
        ref={dotRef}
        sx={{
          position: 'fixed',
          width: 8,
          height: 8,
          background: '#00c8ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%,-50%)',
        }}
      />
      <Box
        ref={ringRef}
        sx={{
          position: 'fixed',
          width: 32,
          height: 32,
          border: '1.5px solid rgba(77,141,255,0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.25s, height 0.25s, border-color 0.25s',
          opacity: 0.7,
        }}
      />
    </>
  );
}
