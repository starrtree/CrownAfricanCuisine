/* Crown's Pizza & Wings cinematic prototype
   Interaction patterns adapted from StarrTree's existing scroll/parallax builds.
*/

const ORDER_URL = 'https://www.crownspizzaandwings.com/order';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const menuData = [
  { category: 'Family Style', items: [
    ['Family Pack 1', '$49.99+'], ['Family Pack 2', '$43.99+'], ['Family Pack 3', '$86.99']
  ]},
  { category: '16” Pizza • Buy One, 2nd 50% Off', items: [
    ['Plain Cheese', '$17.99+'], ['Pepperoni', '$17.99+'], ['Veggie Lovers', '$23.99+'], ['Meat Lovers', '$23.99+'], ['Supreme', '$23.99+'], ['Buffalo Chicken', '$22.99+'], ['BBQ Special', '$23.99+'], ['Meatball Pepperoni', '$23.99+'], ['Chicken Tender', '$23.99+'], ['The After Hour', '$23.99+'], ['Crown Mac', '$23.99+']
  ]},
  { category: 'Calzones', items: [
    ['Meat Lover Calzone', '$12.99+'], ['Chicken Ranch Calzone', '$12.99+'], ['Veggie Calzone', '$12.99+'], ['New York Calzone', '$12.99+']
  ]},
  { category: 'Buffalo Wings', items: [
    ['Six (6) Pieces', '$7.99'], ['Six Pieces Combo', '$9.99'], ['Ten Pieces', '$11.99'], ['Ten Pieces Combo', '$13.99'], ['Fifteen (15) Pieces', '$16.99'], ['Fifteen Pieces Combo', '$20.99'], ['20 Pieces', '$20.99'], ['20 Pieces Combo', '$24.99'], ['Fifty (50) Pieces', '$45.99'], ['Fifty Pieces Combo', '$49.99']
  ]},
  { category: 'Breaded Hot Wings', items: [
    ['6 Pieces Hot Wings', '$8.99+'], ['10 Pieces Hot Wings', '$12.99+'], ['15 Pieces Hot Wings', '$17.99+'], ['20 Pieces Hot Wings', '$22.99+']
  ]},
  { category: 'Breaded Whole Wings', items: [
    ['Whole Wings (6 Pieces)', '$8.99+'], ['Whole Wings (10 Pieces)', '$12.99+'], ['Whole Wings (15 Pieces)', '$17.99+'], ['Whole Wings (20 Pieces)', '$22.99+'], ['Whole Wings (30 Pieces)', '$32.99'], ['Whole Wings (50 Pieces)', '$49.99']
  ]},
  { category: 'Appetizers', items: [
    ['Mozzarella Sticks', '$5.99'], ['Onion Rings', '$4.99'], ['Popcorn Chicken', '$4.99'], ['Macaroni & Cheese Bites', '$6.99'], ['Potato & Veggie', '$4.99'], ['Beef Patty (Plain)', '$2.99'], ['Beef Patty with Cheese', '$4.99'], ['Beef Patty with Cheese and Pepperoni', '$5.99']
  ]},
  { category: 'Burgers / Sandwiches', items: [
    ['Cheese Burger', '$6.99+'], ['Double Cheese Burger', '$8.99+'], ['Bacon Cheese Burger', '$7.99+'], ['Turkey Burger', '$6.99+'], ['Veggie Burger', '$6.99+'], ['Chicken Burger', '$5.99+'], ['Spicy Chicken Burger', '$5.99+'], ['Fish Sandwich', '$7.99+'], ['Yassa', '$14.00'], ['Fataya Chicken 2 Pcs', '$5.00'], ['Fataya Chicken 4 Pcs', '$10.00'], ['Fataya Fish 2 Pcs', '$5.00'], ['Fataya Fish 4 Pcs', '$10.00'], ['Fataya Beef 2 Pcs', '$5.00'], ['Fataya Beef 4 Pcs', '$10.00']
  ]},
  { category: 'Fries', items: [
    ['Fries', '$2.99'], ['Small French Fries', '$2.99'], ['Large French Fries', '$5.49'], ['Cheese Fries', '$5.49'], ['Seasoned Fries', '$5.49'], ['Cajun Fries', '$5.49'], ["Crown's Fries", '$7.99'], ['Mega Fries', '$7.50']
  ]},
  { category: 'Hot Heros', items: [
    ['Philly Cheese Steak', '$7.99+'], ['Double Philly Cheese Steak', '$9.99+'], ['Chicken Cheese Steak', '$7.99+'], ['Grilled Chicken Sandwich', '$7.99+'], ['Chicken Tender Sandwich', '$7.99+'], ['Whiting Fish Sandwich', '$7.99+']
  ]},
  { category: 'Parmigiana', items: [
    ['Meatball Parmigiana', '$9.99+'], ['Sausage Parmigiana', '$9.99+'], ['Meatball + Sausage Parmigiana', '$10.99+'], ['Chicken Parmigiana', '$9.99+']
  ]},
  { category: 'Chicken Tenders', items: [
    ['Tenders (2 Pieces)', '$4.99+'], ['Tenders (6 Pieces)', '$11.99+'], ['Tenders (12 Pieces)', '$20.99+']
  ]},
  { category: 'Nuggets', items: [
    ['Nuggets (6 Pieces)', '$3.99+'], ['Nuggets (12 Pieces)', '$5.99+'], ['Nuggets (20 Pieces)', '$9.99+']
  ]},
  { category: 'Whiting Fish + Fries', items: [
    ['Whiting (2 Piece Combo)', '$9.99'], ['Whiting (3 Piece Combo)', '$11.99'], ['Whiting (6 Piece Combo)', '$19.99']
  ]},
  { category: 'Tilapia Fish + Fries', items: [
    ['Tilapia (2 Pieces Combo)', '$9.99'], ['Tilapia (3 Pieces Combo)', '$11.99'], ['Tilapia (6 Pieces Combo)', '$19.99']
  ]},
  { category: 'Jumbo Shrimp', items: [
    ['Jumbo Shrimp (6 Pieces)', '$6.99+'], ['Jumbo Shrimp (12 Pieces)', '$11.99+']
  ]},
  { category: 'Pasta', items: [
    ['Pasta With Meat Sauce', '$12.99'], ['Pasta With Meatball', '$12.99'], ['Baked Ziti', '$12.99'], ['Chicken Broccoli Alfredo', '$14.99'], ['Shrimp Alfredo Pasta', '$14.99'], ['Crispy Chicken Alfredo', '$12.99']
  ]},
  { category: 'Salad', items: [
    ['Garden Salad', '$6.99'], ['Grilled Chicken Salad', '$9.99']
  ]},
  { category: 'Wraps', items: [
    ['Chicken Caesar Wrap', '$10.99'], ['Veggie Wrap', '$9.99'], ['Boneless Buffalo Chicken Wrap', '$10.99'], ['Grilled Chicken Wrap', '$10.99'], ['Meat Lovers Wrap', '$11.99']
  ]},
  { category: 'Quesadillas', items: [
    ['Cheese Quesadilla', '$7.99'], ['Buffalo Chicken Quesadilla', '$9.99'], ['Chicken Quesadilla', '$9.99'], ['Steak Quesadilla', '$9.99'], ['Veggie Quesadilla', '$9.99']
  ]},
  { category: 'Burritos', items: [
    ['Chicken Burrito', '$9.99'], ['Lamb Burrito', '$9.99'], ['Steak Burrito', '$9.99'], ['Veggie Burrito', '$10.99']
  ]},
  { category: 'New York Style Rice & Salad', items: [
    ['Chicken Over Rice', '$12.99+'], ['Lamb Over Rice', '$12.99+'], ['Falafel Over Rice', '$12.99+'], ['Mix Over Rice', '$12.99+'], ['Steak Over Rice', '$12.99+']
  ]},
  { category: 'Gyros', items: [
    ['Chicken Gyro', '$9.99+'], ['Lamb Gyro', '$9.99+'], ['Mix Gyro', '$9.99+'], ['Falafel Gyro', '$9.99+']
  ]},
  { category: 'Desserts', items: [
    ['Cake', '$3.99'], ['Banana Pudding', '$3.99'], ['Ice Cream', '$0.00'], ['Chocolate Cake', '$3.99']
  ]},
  { category: 'Beverages', items: [
    ['Can Soda', '$1.50'], ['Water', '$1.00'], ['2 Liter Soda', '$3.99'], ['Lemonade', '$2.50'], ['Indian Tea', '$0.00'], ['Drink', '$1.99'], ['Drink', '$2.50'], ['Hug', '$1.00']
  ]},
  { category: 'African Food', items: [
    ['Dibi', '$20.00+'], ['Grill Fish', '$20.00+'], ['Maffe', '$14.00+'], ['Fufu Soup', '$15.00+'], ['Fufu Eguissi', '$16.00+'], ['Chicken Shawarma', '$9.99'], ['Beef Shawarma', '$9.99'], ['Thiebou Dienne', '$14.00'], ['Domoda Boulet', '$14.00'], ['Chicken Brochette', '$20.00+'], ['Beef Brochette', '$20.00+']
  ]}
];

const flatMenu = menuData.flatMap(group => group.items.map(([name, price]) => ({ category: group.category, name, price })));
let activeCategory = 'All';
let query = '';

const menuGrid = document.getElementById('menuGrid');
const menuChips = document.getElementById('menuChips');
const menuSearch = document.getElementById('menuSearch');
const menuReset = document.getElementById('menuReset');

function createChip(label) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `menu-chip${label === activeCategory ? ' active' : ''}`;
  button.textContent = label;
  button.dataset.category = label;
  button.addEventListener('click', () => {
    activeCategory = label;
    menuChips.querySelectorAll('.menu-chip').forEach(chip => chip.classList.toggle('active', chip.dataset.category === activeCategory));
    renderMenu();
  });
  return button;
}

function renderChips() {
  if (!menuChips) return;
  menuChips.replaceChildren(createChip('All'), ...menuData.map(group => createChip(group.category)));
}

function renderMenu() {
  if (!menuGrid) return;
  const needle = query.trim().toLowerCase();
  const matches = flatMenu.filter(item => {
    const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
    const searchMatch = !needle || `${item.name} ${item.category}`.toLowerCase().includes(needle);
    return categoryMatch && searchMatch;
  });

  if (!matches.length) {
    menuGrid.innerHTML = '<div class="menu-empty"><strong>No menu items match that search.</strong><br>Try pizza, rice, wings, fish, lamb or African food.</div>';
    return;
  }

  const fragment = document.createDocumentFragment();
  matches.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.style.setProperty('--i', index);
    card.innerHTML = `
      <span class="cat">${item.category}</span>
      <h3>${item.name}</h3>
      <div class="price">${item.price === '$0.00' ? 'See ordering site' : item.price}</div>
    `;
    card.addEventListener('click', () => window.open(ORDER_URL, '_blank', 'noopener,noreferrer'));
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${item.name}, ${item.price}. Open online ordering.`);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.open(ORDER_URL, '_blank', 'noopener,noreferrer');
      }
    });
    fragment.appendChild(card);
  });
  menuGrid.replaceChildren(fragment);
}

renderChips();
renderMenu();

menuSearch?.addEventListener('input', event => {
  query = event.target.value;
  renderMenu();
});
menuReset?.addEventListener('click', () => {
  query = '';
  activeCategory = 'All';
  if (menuSearch) menuSearch.value = '';
  renderChips();
  renderMenu();
  menuSearch?.focus();
});

// Header, progress, cursor ambience
const siteNav = document.getElementById('siteNav');
const progressBar = document.getElementById('progressBar');
const cursorGlow = document.querySelector('.cursor-glow');
document.getElementById('year').textContent = new Date().getFullYear();

function onScrollMeta() {
  const top = window.scrollY || 0;
  const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  if (progressBar) progressBar.style.width = `${Math.min(100, (top / max) * 100)}%`;
  siteNav?.classList.toggle('scrolled', top > 30);
}
window.addEventListener('scroll', onScrollMeta, { passive: true });
onScrollMeta();

if (cursorGlow && window.matchMedia('(pointer:fine)').matches && !reduceMotion) {
  window.addEventListener('pointermove', event => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });
  window.addEventListener('pointerleave', () => { cursorGlow.style.opacity = '0'; });
}

// Scroll motion
if (!reduceMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.0,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.05
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  gsap.from('.hero-copy > *', {
    y: 38,
    opacity: 0,
    duration: 1.05,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.15
  });
  gsap.from('.hero-seal', {
    scale: 0.82,
    opacity: 0,
    rotate: -9,
    duration: 1.25,
    ease: 'power3.out',
    delay: 0.28
  });
  gsap.to('.hero-food-wings', {
    yPercent: -30, rotate: 5, scale: 1.08, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.hero-food-african', {
    yPercent: 48, rotate: -7, scale: 0.92, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.15 }
  });

  gsap.to('.hero-bg img', {
    scale: 1,
    yPercent: 7,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.hero-copy', {
    yPercent: 18,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '45% top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.hero-seal', {
    yPercent: 30,
    rotate: 12,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
  });

  gsap.utils.toArray('.parallax').forEach(el => {
    const speed = Number(el.dataset.speed || 0.06);
    gsap.fromTo(el,
      { y: () => -window.innerHeight * speed },
      {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 }
      }
    );
  });

  gsap.utils.toArray('.split-panel').forEach((panel, index) => {
    const media = panel.querySelector('.split-media');
    gsap.fromTo(media,
      { scale: 1.18, xPercent: index ? 4 : -4 },
      {
        scale: 1.04,
        xPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.split-story', start: 'top bottom', end: 'bottom top', scrub: 1.1 }
      }
    );
  });

  const rail = document.getElementById('favoriteRail');
  const railWrap = rail?.parentElement;
  if (rail && railWrap && window.matchMedia('(min-width: 761px)').matches) {
    const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth + 76);
    gsap.to(rail, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.favorite-rail',
        start: 'top top',
        end: () => `+=${Math.max(window.innerWidth, distance() + window.innerWidth * 0.35)}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true
      }
    });
  } else if (rail) {
    rail.style.overflowX = 'auto';
    rail.style.width = '100%';
  }

  gsap.from('.proof-card', {
    y: 34,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.proof-grid', start: 'top 82%', once: true }
  });

  gsap.to('.visit-image img', {
    scale: 1.08,
    yPercent: -3,
    ease: 'none',
    scrollTrigger: { trigger: '.visit', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });
} else {
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

// Keep anchor navigation predictable even with smooth scrolling libraries.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
});
