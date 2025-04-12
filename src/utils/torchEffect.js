export const initializeTorchEffect = () => {
  const updateMousePosition = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
  };

  document.addEventListener('mousemove', updateMousePosition);
  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    updateMousePosition(touch);
  });

  // Cleanup function
  return () => {
    document.removeEventListener('mousemove', updateMousePosition);
    document.removeEventListener('touchmove', updateMousePosition);
  };
}; 