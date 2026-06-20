import { sounds } from '../lib/sounds';

describe('SoundManager unit tests', () => {
  beforeEach(() => {
    // Reset mute state to true for clean tests
    if (sounds.getMutedState() === false) {
      sounds.toggleMute();
    }
  });

  test('should default to muted', () => {
    expect(sounds.getMutedState()).toBe(true);
  });

  test('should toggle mute state', () => {
    const isMutedAfterToggle = sounds.toggleMute();
    expect(isMutedAfterToggle).toBe(false);
    expect(sounds.getMutedState()).toBe(false);

    const isMutedAfterSecondToggle = sounds.toggleMute();
    expect(isMutedAfterSecondToggle).toBe(true);
    expect(sounds.getMutedState()).toBe(true);
  });

  test('should execute tones and sound actions without throwing errors', () => {
    // Mock the window.AudioContext since it might not be fully simulated in jsdom
    const mockAudioContext = jest.fn().mockImplementation(() => ({
      state: 'suspended',
      resume: jest.fn().mockResolvedValue(undefined),
      currentTime: 0,
      createOscillator: jest.fn().mockReturnValue({
        type: 'sine',
        frequency: { setValueAtTime: jest.fn() },
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
      }),
      createGain: jest.fn().mockReturnValue({
        gain: {
          setValueAtTime: jest.fn(),
          exponentialRampToValueAtTime: jest.fn(),
        },
        connect: jest.fn(),
      }),
      destination: {},
    }));

    Object.defineProperty(window, 'AudioContext', {
      writable: true,
      value: mockAudioContext,
    });

    expect(() => {
      sounds.hover();
      sounds.click();
      sounds.logActionPositive();
      sounds.logActionNegative();
      sounds.onboardingComplete();
      sounds.boot();
    }).not.toThrow();
  });
});
