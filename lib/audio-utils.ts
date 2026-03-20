/**
 * Audio utility functions for IELTS app
 * Generates alert sounds without external file dependencies
 */

export function playAlertSound(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create oscillator for alert tone
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Alert tone settings: 800Hz beep
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      // Fade in, hold, fade out pattern
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.3);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
      
      // Play the tone 3 times with gaps
      for (let i = 1; i < 3; i++) {
        const startTime = audioContext.currentTime + 0.5 + i * 0.5;
        
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.value = 800;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.1);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.3);
        gain.gain.linearRampToValueAtTime(0, startTime + 0.4);
        
        osc.start(startTime);
        osc.stop(startTime + 0.4);
      }
      
      setTimeout(resolve, 2000);
    } catch (error) {
      console.warn('Could not play alert sound:', error);
      resolve();
    }
  });
}

export function playCheckmarkSound(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Two-tone success sound
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // First tone (lower)
      osc1.frequency.value = 523.25; // C5
      osc1.type = 'sine';
      
      // Second tone (higher)
      osc2.frequency.value = 659.25; // E5
      osc2.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
      
      osc1.start(audioContext.currentTime);
      osc1.stop(audioContext.currentTime + 0.15);
      
      osc2.start(audioContext.currentTime + 0.15);
      osc2.stop(audioContext.currentTime + 0.3);
      
      setTimeout(resolve, 400);
    } catch (error) {
      console.warn('Could not play checkmark sound:', error);
      resolve();
    }
  });
}
