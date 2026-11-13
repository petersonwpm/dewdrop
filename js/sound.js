// DewDrop Minimalist Sound Synthesizer (Web Audio API)
// Provides pristine, subtle organic water droplet and UI soundscapes
// Fully synthesized without external audio files; zero latency.

class DewDropAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.initDone = false;
  }

  init() {
    if (this.initDone) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initDone = true;
      }
    } catch (e) {
      console.warn('AudioContext not supported or blocked', e);
    }
  }

  toggle() {
    if (!this.initDone) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playWaterDrop(880, 0.08);
    }
    return this.enabled;
  }

  // Synthesize an ultra-pure crystal water droplet
  playWaterDrop(baseFreq = 640, duration = 0.12) {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Organic droplet pitch contour (slight pitch bend up, then rapid drop)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * 0.8, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.02);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, now + duration);

      // Low pass to keep it soft and organic
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, now);

      // Delicate envelope
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.02);
    } catch (err) {
      // Audio failed silently
    }
  }

  // Subtle airy glass resonance for flavor changes
  playFlavorShift(colorFreq = 520) {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(colorFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(colorFreq * 1.25, now + 0.18);

      osc2.frequency.setValueAtTime(colorFreq * 1.5, now);
      osc2.frequency.exponentialRampToValueAtTime(colorFreq * 2, now + 0.18);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.24);
      osc2.stop(now + 0.24);
    } catch (e) {}
  }

  // Satisfying tactile click for add-to-pack
  playClick() {
    this.playWaterDrop(960, 0.07);
  }
}

window.dewDropAudio = new DewDropAudio();
