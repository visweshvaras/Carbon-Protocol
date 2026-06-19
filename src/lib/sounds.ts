class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // default to muted to comply with browser policies

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initCtx();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.1, delay: number = 0) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const ctx = this.ctx;
    setTimeout(() => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (err) {
        console.warn('Audio playback failed', err);
      }
    }, delay * 1000);
  }

  public hover() {
    this.playTone(150, 'triangle', 0.05, 0.08);
  }

  public click() {
    this.playTone(600, 'sine', 0.08, 0.12);
  }

  public logActionPositive() {
    this.playTone(523.25, 'sine', 0.1, 0.1); // C5
    this.playTone(659.25, 'sine', 0.15, 0.1, 0.08); // E5
  }

  public logActionNegative() {
    this.playTone(220, 'sawtooth', 0.12, 0.08); // A3
    this.playTone(196, 'sawtooth', 0.2, 0.08, 0.08); // G3
  }

  public onboardingComplete() {
    const tones = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    tones.forEach((f, i) => {
      this.playTone(f, 'sine', 0.15, 0.1, i * 0.1);
    });
  }

  public boot() {
    this.playTone(100, 'triangle', 0.3, 0.08);
    this.playTone(200, 'triangle', 0.3, 0.08, 0.1);
    this.playTone(400, 'triangle', 0.4, 0.1, 0.2);
  }
}

export const sounds = new SoundManager();
