/* Transparent food cutout choreography.
   The optional #flavorVideo hook is already prepared for the scroll-controlled
   video Max plans to add later. Add a muted <video id="flavorVideo"> inside
   .flavor-flight-sticky and this file will scrub it through the section. */

(() => {
  const cutoutReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);

  if (cutoutReduceMotion || !hasGsap) {
    document.querySelectorAll('.flight-label').forEach(el => { el.style.opacity = '1'; });
    return;
  }

  const g = window.gsap;
  const ST = window.ScrollTrigger;
  g.registerPlugin(ST);

  // Hero entrance: the cutouts feel like physical food pieces entering the frame,
  // while the storefront remains the real-world anchor behind them.
  g.from('.hero-cutout-wings', {
    xPercent: 45,
    yPercent: 24,
    rotate: 12,
    scale: .82,
    opacity: 0,
    duration: 1.25,
    delay: .32,
    ease: 'power3.out'
  });

  g.from('.hero-cutout-african', {
    xPercent: 32,
    yPercent: -25,
    rotate: -8,
    scale: .78,
    opacity: 0,
    duration: 1.15,
    delay: .5,
    ease: 'power3.out'
  });

  g.to('.hero-cutout-wings', {
    xPercent: -18,
    yPercent: -34,
    rotate: 8,
    scale: 1.06,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  g.to('.hero-cutout-african', {
    xPercent: 18,
    yPercent: 52,
    rotate: -9,
    scale: .9,
    opacity: .16,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.15
    }
  });

  // Main scroll-controlled scene. CSS handles the sticky viewport; GSAP only
  // choreographs the layers, which keeps the section stable on mobile Safari.
  const flight = g.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '#flavorFlight',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.05,
      invalidateOnRefresh: true
    }
  });

  flight
    .fromTo('.flight-logo',
      { scale: .68, rotate: -14, opacity: .25 },
      { scale: 1, rotate: 0, opacity: 1, duration: .2 }, 0)
    .fromTo('.flight-wings',
      { xPercent: 58, yPercent: 28, rotate: -18, scale: .74, opacity: .2 },
      { xPercent: 0, yPercent: 0, rotate: -4, scale: 1, opacity: 1, duration: .28 }, 0)
    .fromTo('.flight-african',
      { xPercent: 38, yPercent: -35, rotate: 18, scale: .72, opacity: .2 },
      { xPercent: 0, yPercent: 0, rotate: 4, scale: 1, opacity: 1, duration: .3 }, .05)
    .to('.label-wings', { opacity: 1, duration: .09 }, .22)
    .to('.label-african', { opacity: 1, duration: .09 }, .25)
    .to('.flight-logo', { scale: 1.12, rotate: 8, duration: .28 }, .28)
    .to('.flight-orbits', { rotate: 95, scale: 1.06, duration: .34 }, .24)
    .to('.flight-wings', { xPercent: -78, yPercent: -24, rotate: 16, scale: 1.13, duration: .38 }, .34)
    .to('.flight-african', { xPercent: 52, yPercent: 36, rotate: -12, scale: 1.12, duration: .38 }, .36)
    .to('.flight-copy', { yPercent: -10, opacity: .72, duration: .22 }, .58)
    .to('.flight-logo', { scale: .74, rotate: 24, opacity: .25, duration: .24 }, .68)
    .to('.flight-wings', { xPercent: -128, yPercent: -48, opacity: .16, duration: .25 }, .7)
    .to('.flight-african', { xPercent: 92, yPercent: 68, opacity: .15, duration: .25 }, .7)
    .to('.flight-label', { opacity: 0, duration: .12 }, .72)
    .to('.flight-copy', { yPercent: -22, opacity: 0, duration: .2 }, .8);

  // Subtle orbit motion outside the main timeline keeps the center feeling alive.
  g.to('.flight-orbits span:nth-child(2)', {
    rotate: -180,
    duration: 24,
    repeat: -1,
    ease: 'none'
  });

  // Future video support. No video is required today, so nothing runs until the
  // element exists. When added, scroll position maps directly to video time.
  const flavorVideo = document.getElementById('flavorVideo');
  if (flavorVideo) {
    const setupVideoScrub = () => {
      const duration = flavorVideo.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      ST.create({
        trigger: '#flavorFlight',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: self => {
          const target = Math.min(duration - .03, Math.max(0, self.progress * duration));
          if (Math.abs(flavorVideo.currentTime - target) > .025) flavorVideo.currentTime = target;
        }
      });
    };

    flavorVideo.muted = true;
    flavorVideo.playsInline = true;
    flavorVideo.preload = 'auto';
    if (flavorVideo.readyState >= 1) setupVideoScrub();
    else flavorVideo.addEventListener('loadedmetadata', setupVideoScrub, { once: true });
  }

  window.addEventListener('load', () => ST.refresh(), { once: true });
})();
