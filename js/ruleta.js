// ========================================
// RULETA DOBLE — "Cafecito o Miedo"
// ========================================

// === ITEM DATA ===
// TODAS las comidas del menú
const comidasItems = [
  // Para Picar
  { name: 'Deditos queso', emoji: '🧀' },
  { name: 'Empanaditas', emoji: '🥟' },
  { name: 'Nachos mixtos', emoji: '🌮' },
  { name: 'Quesadillas', emoji: '🫓' },
  { name: 'Patacones', emoji: '🍌' },
  { name: 'Papas francesa', emoji: '🍟' },
  { name: 'Papas en casco', emoji: '🥔' },
  // Comidas
  { name: 'Burro pollo', emoji: '🌯' },
  { name: 'Burro mixto', emoji: '🌯' },
  { name: 'Mini hamburguesas', emoji: '🍔' },
  { name: 'Sándwich criollo', emoji: '🥪' },
  { name: 'Sándwich pollo', emoji: '🥪' },
  { name: 'Waffle dulce', emoji: '🧇' },
  { name: 'Waffle salado', emoji: '🧇' },
  // Tortas
  { name: 'Cheesecake', emoji: '🍰' },
  { name: 'Torta chocolate', emoji: '🍫' },
  { name: 'Torta abuela', emoji: '🎂' },
  { name: 'Torta zanahoria', emoji: '🥕' },
  // Infantil
  { name: 'Nuggets pollo', emoji: '🍗' },
  { name: 'Mini burger kids', emoji: '🍔' },
];

// TODAS las bebidas del menú (cafés + no-café)
const todasBebidasItems = [
  // Cafés calientes
  { name: 'Americano', emoji: '☕' },
  { name: 'Campesino', emoji: '☕' },
  { name: 'Cubano', emoji: '☕' },
  { name: 'Espresso', emoji: '☕' },
  { name: 'Espresso Doble', emoji: '☕' },
  // Cafés fríos
  { name: 'Affogato', emoji: '🍨' },
  { name: 'Bombón', emoji: '🍯' },
  { name: 'Frappe', emoji: '🧊' },
  // Con leche
  { name: 'Cappuccino', emoji: '☕' },
  { name: 'Latte', emoji: '🥛' },
  { name: 'Mochaccino', emoji: '🍫' },
  { name: 'Té Chai', emoji: '🍵' },
  // Con licor
  { name: 'Carajillo', emoji: '🥃' },
  { name: 'Canelazo licor', emoji: '🔥' },
  // Bebidas calientes
  { name: 'Agua panela', emoji: '🧀' },
  { name: 'Aromática', emoji: '🌿' },
  { name: 'Canelazo', emoji: '🍵' },
  { name: 'Chocolate', emoji: '🍫' },
  { name: 'Vino caliente', emoji: '🍷' },
  { name: 'Infusión frutas', emoji: '🍓' },
  { name: 'Maicenita', emoji: '🥛' },
  { name: 'Migao abuela', emoji: '🍞' },
  { name: 'Milo caliente', emoji: '🥛' },
  // Bebidas frías
  { name: 'Jugo en agua', emoji: '🥭' },
  { name: 'Jugo en leche', emoji: '🥛' },
  { name: 'Limonada', emoji: '🍋' },
  { name: 'Milo frío', emoji: '🧊' },
  { name: 'Soda saborizada', emoji: '🥤' },
  { name: 'Tinto verano', emoji: '🍷' },
  { name: 'Pantera rosa', emoji: '🌸' },
  { name: 'Té frío', emoji: '🧊' },
  { name: 'Gaseosa', emoji: '🥤' },
  { name: 'Tamarindo', emoji: '🟫' },
  { name: 'Coca Cola', emoji: '🥤' },
  // Cervezas
  { name: 'Corona', emoji: '🍺' },
  { name: 'Club Colombia', emoji: '🍺' },
  { name: 'Cerveza Light', emoji: '🍺' },
  { name: 'Tres Cordilleras', emoji: '🍺' },
];

// SOLO café (todas las variantes con café)
const soloCafeItems = [
  { name: 'Americano', emoji: '☕' },
  { name: 'Campesino', emoji: '☕' },
  { name: 'Cubano', emoji: '☕' },
  { name: 'Espresso', emoji: '☕' },
  { name: 'Espresso Doble', emoji: '☕' },
  { name: 'Affogato', emoji: '🍨' },
  { name: 'Bombón', emoji: '🍯' },
  { name: 'Frappe', emoji: '🧊' },
  { name: 'Cappuccino ☕', emoji: '☕' },
  { name: 'Cappuccino 🧊', emoji: '🧊' },
  { name: 'Latte ☕', emoji: '🥛' },
  { name: 'Latte 🧊', emoji: '🧊' },
  { name: 'Mochaccino ☕', emoji: '🍫' },
  { name: 'Mochaccino 🧊', emoji: '🧊' },
  { name: 'Cappuccino licor', emoji: '🥃' },
  { name: 'Carajillo', emoji: '🥃' },
  { name: 'Latte licor', emoji: '🥃' },
];

// === WHEEL CLASS ===
class WheelSpinner {
  constructor(canvasId, items) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.items = items;
    this.currentAngle = 0;
    this.isSpinning = false;
    this.resultCallback = null;
    this.size = 0;
    this.setupCanvas();
    this.draw();
  }

  setItems(newItems) {
    this.items = newItems;
    this.currentAngle = 0;
    this.draw();
    this.hideResult();
  }

  setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const container = this.canvas.parentElement;
    const maxSize = Math.min(320, container.clientWidth - 20, window.innerWidth / 2 - 50);
    const size = Math.max(220, maxSize);
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.canvas.style.width = size + 'px';
    this.canvas.style.height = size + 'px';
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    this.size = size;
    this.cx = size / 2;
    this.cy = size / 2;
    this.radius = size / 2 - 6;
  }

  draw() {
    const ctx = this.ctx;
    const cx = this.cx;
    const cy = this.cy;
    const r = this.radius;
    const n = this.items.length;
    const segAngle = (2 * Math.PI) / n;

    ctx.clearRect(0, 0, this.size, this.size);

    // Adaptive font size based on number of items
    const nameSize = Math.max(7, Math.min(11, this.size * 0.032 - n * 0.08));
    const emojiSize = Math.max(10, Math.min(14, this.size * 0.04 - n * 0.05));

    // Draw segments
    for (let i = 0; i < n; i++) {
      const start = this.currentAngle + i * segAngle;
      const end = start + segAngle;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? '#1c1505' : '#2a1f0d';
      ctx.fill();

      ctx.strokeStyle = 'rgba(201, 168, 76, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Text + emoji
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + segAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // Name
      ctx.fillStyle = '#F5EDD6';
      ctx.font = `${nameSize}px 'Cinzel', serif`;
      ctx.fillText(this.items[i].name, r - 20, 0);

      // Emoji
      ctx.font = `${emojiSize}px sans-serif`;
      ctx.fillText(this.items[i].emoji, r - 4, 0);

      ctx.restore();
    }

    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = '#C9A84C';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Outer glow ring
    ctx.beginPath();
    ctx.arc(cx, cy, r + 3, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Center
    const centerR = this.size * 0.09;
    const glow = ctx.createRadialGradient(cx, cy, centerR * 0.5, cx, cy, centerR * 1.4);
    glow.addColorStop(0, 'rgba(201, 168, 76, 0.25)');
    glow.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, centerR * 1.4, 0, 2 * Math.PI);
    ctx.fillStyle = glow;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, centerR, 0, 2 * Math.PI);
    ctx.fillStyle = '#0A0A0A';
    ctx.fill();
    ctx.strokeStyle = '#C9A84C';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, 2 * Math.PI);
    ctx.fillStyle = '#C9A84C';
    ctx.fill();
  }

  spin(onComplete) {
    if (this.isSpinning) return;
    this.isSpinning = true;
    this.hideResult();

    const extraRotations = (4 + Math.random() * 3) * 2 * Math.PI;
    const randomOffset = Math.random() * 2 * Math.PI;
    const totalSpin = extraRotations + randomOffset;
    const startAngle = this.currentAngle;
    const duration = 4500 + Math.random() * 1500;
    const startTime = performance.now();
    let lastSeg = -1;

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      this.currentAngle = startAngle + totalSpin * eased;

      const segAngle = (2 * Math.PI) / this.items.length;
      const curSeg = Math.floor((((this.currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) / segAngle);
      if (curSeg !== lastSeg && navigator.vibrate) {
        navigator.vibrate(6);
        lastSeg = curSeg;
      }

      this.draw();

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        const winner = this.getWinner();
        this.showResult(winner);
        if (onComplete) onComplete(winner);
      }
    };

    requestAnimationFrame(animate);
  }

  getWinner() {
    const segAngle = (2 * Math.PI) / this.items.length;
    const pointerAngle = -Math.PI / 2;
    const norm = ((pointerAngle - this.currentAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const idx = Math.floor(norm / segAngle) % this.items.length;
    return this.items[idx];
  }

  showResult(winner) {
    const wrap = this.canvas.closest('.ruleta-wheel-wrap');
    const overlay = wrap.querySelector('.wheel-result');
    const emojiEl = overlay.querySelector('.wheel-result-emoji');
    const nameEl = overlay.querySelector('.wheel-result-name');
    emojiEl.textContent = winner.emoji;
    nameEl.textContent = winner.name;
    overlay.classList.add('visible');
  }

  hideResult() {
    const wrap = this.canvas.closest('.ruleta-wheel-wrap');
    const overlay = wrap.querySelector('.wheel-result');
    if (overlay) overlay.classList.remove('visible');
  }
}

// === GLOBAL STATE ===
let wheelComidas = null;
let wheelBebidas = null;
let bebidasFilter = 'todas';

function initRuleta() {
  if (!wheelComidas) {
    wheelComidas = new WheelSpinner('wheel-comidas', comidasItems);
  } else {
    wheelComidas.setupCanvas();
    wheelComidas.draw();
  }
  if (!wheelBebidas) {
    wheelBebidas = new WheelSpinner('wheel-bebidas', todasBebidasItems);
  } else {
    wheelBebidas.setupCanvas();
    wheelBebidas.draw();
  }
}

function setBebidasFilter(filter) {
  if (wheelBebidas && wheelBebidas.isSpinning) return;
  bebidasFilter = filter;

  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  if (wheelBebidas) {
    wheelBebidas.setItems(filter === 'todas' ? todasBebidasItems : soloCafeItems);
  }
}

function spinComidas() {
  if (!wheelComidas) return;
  if (wheelComidas.isSpinning) return;

  const btn = document.getElementById('ruleta-spin-comidas');
  btn.classList.add('spinning');
  btn.textContent = '✦ GIRANDO... ✦';

  wheelComidas.spin(() => {
    btn.classList.remove('spinning');
    btn.textContent = 'Girar Comidas';
  });
}

function spinBebidas() {
  if (!wheelBebidas) return;
  if (wheelBebidas.isSpinning) return;

  const btn = document.getElementById('ruleta-spin-bebidas');
  btn.classList.add('spinning');
  btn.textContent = '✦ GIRANDO... ✦';

  wheelBebidas.spin(() => {
    btn.classList.remove('spinning');
    btn.textContent = 'Girar Bebidas';
  });
}

// Tap result to dismiss
document.addEventListener('click', (e) => {
  if (e.target.closest('.wheel-result.visible')) {
    e.target.closest('.wheel-result').classList.remove('visible');
  }
});

// Resize handler
window.addEventListener('resize', () => {
  if (wheelComidas && !wheelComidas.isSpinning) {
    wheelComidas.setupCanvas();
    wheelComidas.draw();
  }
  if (wheelBebidas && !wheelBebidas.isSpinning) {
    wheelBebidas.setupCanvas();
    wheelBebidas.draw();
  }
});