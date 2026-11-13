// DewDrop Ambient Micro-Droplets & Condensation Canvas
// High-performance particle canvas with fluid physics & flavor-reactive tint

class DewDropCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, vx: 0, vy: 0, active: false };
    this.activeColor = { r: 229, g: 169, b: 60 };
    this.targetColor = { r: 229, g: 169, b: 60 };
    this.maxParticles = 38;
    this.ripples = [];
    this.isRunning = false;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Spawn initial particles
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }

    // Interactive mouse reactions
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const prevX = this.mouse.x;
      const prevY = this.mouse.y;
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.vx = this.mouse.x - prevX;
      this.mouse.vy = this.mouse.y - prevY;
      this.mouse.active = true;

      if (Math.hypot(this.mouse.vx, this.mouse.vy) > 15 && Math.random() < 0.25) {
        this.addRipple(this.mouse.x, this.mouse.y, 0.4);
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    this.start();
  }

  setColor(hexColor) {
    // Parse hex
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 229;
    const g = parseInt(hex.substring(2, 4), 16) || 169;
    const b = parseInt(hex.substring(4, 6), 16) || 60;
    this.targetColor = { r, g, b };
  }

  resize() {
    const parent = this.canvas.parentElement;
    const width = parent ? parent.clientWidth : window.innerWidth;
    const height = parent ? parent.clientHeight : window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.scale(dpr, dpr);
    this.width = width;
    this.height = height;
  }

  createParticle(randomY = false) {
    const size = Math.random() * 4 + 1.5;
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : this.height + 20,
      radius: size,
      baseRadius: size,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.45 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      sway: Math.random() * 40 + 20
    };
  }

  addRipple(x, y, strength = 0.5) {
    if (this.ripples.length > 8) this.ripples.shift();
    this.ripples.push({
      x,
      y,
      radius: 4,
      maxRadius: Math.random() * 50 + 60,
      opacity: strength,
      speed: Math.random() * 1.5 + 1.2
    });
  }

  update() {
    // Lerp color
    this.activeColor.r += (this.targetColor.r - this.activeColor.r) * 0.05;
    this.activeColor.g += (this.targetColor.g - this.activeColor.g) * 0.05;
    this.activeColor.b += (this.targetColor.b - this.activeColor.b) * 0.05;

    // Update ripples
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.radius += r.speed;
      r.opacity *= 0.95;
      if (r.radius > r.maxRadius || r.opacity < 0.01) {
        this.ripples.splice(i, 1);
      }
    }

    // Update particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.pulse += p.pulseSpeed;
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.pulse) * 0.25;

      // Interaction with mouse
      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 2.2;
          p.y += (dy / dist) * force * 2.2;
        }
      }

      // Reset when particle goes above screen
      if (p.y < -30) {
        this.particles[i] = this.createParticle(false);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const { r, g, b } = this.activeColor;
    const rInt = Math.round(r);
    const gInt = Math.round(g);
    const bInt = Math.round(b);

    // Draw ripples
    for (const rip of this.ripples) {
      this.ctx.beginPath();
      this.ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(${rInt}, ${gInt}, ${bInt}, ${rip.opacity * 0.35})`;
      this.ctx.lineWidth = 1.2;
      this.ctx.stroke();
    }

    // Draw water droplet particles
    for (const p of this.particles) {
      const currentRadius = p.baseRadius + Math.sin(p.pulse) * 0.5;

      // Glow halo
      const grad = this.ctx.createRadialGradient(
        p.x, p.y, currentRadius * 0.2,
        p.x, p.y, currentRadius * 2.5
      );
      grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.85})`);
      grad.addColorStop(0.4, `rgba(${rInt}, ${gInt}, ${bInt}, ${p.opacity * 0.3})`);
      grad.addColorStop(1, `rgba(${rInt}, ${gInt}, ${bInt}, 0)`);

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, currentRadius * 2.5, 0, Math.PI * 2);
      this.ctx.fill();

      // Droplet core reflection
      this.ctx.beginPath();
      this.ctx.arc(p.x - currentRadius * 0.25, p.y - currentRadius * 0.25, currentRadius * 0.35, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
      this.ctx.fill();
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }
}

window.DewDropCanvas = DewDropCanvas;
