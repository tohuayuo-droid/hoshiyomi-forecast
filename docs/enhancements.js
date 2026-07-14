(() => {
  const backdrop = document.createElement('div');
  backdrop.className = 'cosmic-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  backdrop.innerHTML = '<canvas id="starCanvas"></canvas><div class="milky-way"></div><i class="shooting-star shooting-star-a"></i><i class="shooting-star shooting-star-b"></i>';
  document.body.prepend(backdrop);

  const canvas = backdrop.querySelector('#starCanvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stars = [];
  let raf = 0;

  const makeStars = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(260, Math.floor((width * height) / 2600));
    stars = Array.from({ length: count }, (_, i) => {
      const bright = Math.random() < 0.1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: bright ? 1.2 + Math.random() * 1.4 : 0.35 + Math.random() * 0.85,
        a: bright ? 0.72 + Math.random() * 0.28 : 0.25 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.75,
        tint: i % 17 === 0 ? '255,224,166' : (i % 11 === 0 ? '170,205,255' : '255,255,255')
      };
    });
  };

  const draw = (time = 0) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    ctx.clearRect(0, 0, width, height);
    for (const star of stars) {
      const pulse = reduceMotion ? 1 : 0.78 + Math.sin(time * 0.001 * star.speed + star.phase) * 0.22;
      const alpha = Math.max(0.12, star.a * pulse);
      ctx.beginPath();
      ctx.fillStyle = `rgba(${star.tint},${alpha})`;
      ctx.shadowColor = `rgba(${star.tint},${Math.min(0.9, alpha)})`;
      ctx.shadowBlur = star.r > 1.4 ? 7 : 2;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
      if (star.r > 1.8) {
        ctx.strokeStyle = `rgba(${star.tint},${alpha * 0.55})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(star.x - 4, star.y); ctx.lineTo(star.x + 4, star.y);
        ctx.moveTo(star.x, star.y - 4); ctx.lineTo(star.x, star.y + 4);
        ctx.stroke();
      }
    }
    ctx.shadowBlur = 0;
    if (!reduceMotion) raf = requestAnimationFrame(draw);
  };

  const resize = () => {
    cancelAnimationFrame(raf);
    makeStars();
    draw(performance.now());
  };
  window.addEventListener('resize', resize, { passive: true });
  resize();
})();
