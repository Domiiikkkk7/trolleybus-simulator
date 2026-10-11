// Správa zvukových efektů

class AudioManager {
  constructor() {
    this.sounds = new Map();
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.masterVolume = 0.8;
    this.playing = new Map();
  }
  
  loadSound(id, filePath) {
    const audio = new Audio(filePath);
    audio.preload = 'auto';
    this.sounds.set(id, audio);
  }
  
  playSound(id, volume = 1.0, loop = false) {
    const sound = this.sounds.get(id);
    
    if (!sound) {
      console.warn(`Sound ${id} not found`);
      return null;
    }
    
    // Zastavit předchozí přehrávání
    if (this.playing.has(id)) {
      const prev = this.playing.get(id);
      prev.pause();
      prev.currentTime = 0;
    }
    
    const clone = sound.cloneNode();
    clone.volume = volume * this.masterVolume;
    clone.loop = loop;
    clone.play();
    
    this.playing.set(id, clone);
    
    clone.addEventListener('ended', () => {
      this.playing.delete(id);
    });
    
    return clone;
  }
  
  stopSound(id) {
    const sound = this.playing.get(id);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      this.playing.delete(id);
    }
  }
  
  setVolume(id, volume) {
    const sound = this.playing.get(id);
    if (sound) {
      sound.volume = volume * this.masterVolume;
    }
  }
  
  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    for (const sound of this.playing.values()) {
      sound.volume = sound.volume; // update všech aktivních zvuků
    }
  }
  
  // Dynamické zvuky - založeno na fyzice vozidla
  playEngineSound(vehicleSpeed, throttle) {
    const volume = (throttle / 100) * 0.8;
    const pitch = 0.8 + (vehicleSpeed / 100) * 0.6; // simplifikované
    
    this.setVolume('engine-running', volume);
  }
  
  playBrakeSound(brakeForce) {
    const volume = (brakeForce / 100) * 0.9;
    this.setVolume('braking', volume);
  }
  
  playDoorSound(type) {
    if (type === 'open') {
      this.playSound('door-open', 0.7);
    } else if (type === 'close') {
      this.playSound('door-close', 0.7);
    }
  }
}

module.exports = AudioManager;
