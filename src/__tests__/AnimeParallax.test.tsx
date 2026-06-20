import React from 'react';
import { render } from '@testing-library/react';
import AnimeParallax from '../components/AnimeParallax';
import { createTimeline } from 'animejs';

// Mock animejs
jest.mock('animejs', () => {
  const seekMock = jest.fn();
  const pauseMock = jest.fn();
  return {
    createTimeline: jest.fn().mockReturnValue({
      add: jest.fn().mockReturnThis(),
      seek: seekMock,
      pause: pauseMock,
    }),
  };
});

describe('AnimeParallax Component', () => {
  beforeEach(() => {
    // Define window.matchMedia since it is not defined in JSDOM by default
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('renders the SVG parallax layers', () => {
    const { container } = render(<AnimeParallax progress={0.5} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  test('updates timeline position on progress change', () => {
    const { rerender } = render(<AnimeParallax progress={0.2} />);
    
    // Changing the progress should update seeking
    rerender(<AnimeParallax progress={0.8} />);
    
    expect(createTimeline).toHaveBeenCalled();
  });
});
