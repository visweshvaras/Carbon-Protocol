import React from 'react';
import { render, screen, act } from '@testing-library/react';
import DashboardLandscape from '../components/DashboardLandscape';

describe('DashboardLandscape Component', () => {
  test('renders the landscape container and svg image description', () => {
    render(<DashboardLandscape score={80} />);
    const landscapeRole = screen.getByRole('img', { name: /dynamic landscape environment depicting ecosystem health/i });
    expect(landscapeRole).toBeInTheDocument();
  });

  test('configures healthy styles when score is high', () => {
    const { container } = render(<DashboardLandscape score={85} />);
    const svgRects = container.querySelectorAll('rect');
    expect(svgRects.length).toBeGreaterThan(0);
  });

  test('triggers metro train animation callback', () => {
    jest.useFakeTimers();
    const handleComplete = jest.fn();
    const { rerender } = render(
      <DashboardLandscape score={70} triggerMetroTrain={false} onMetroAnimationComplete={handleComplete} />
    );

    expect(handleComplete).not.toHaveBeenCalled();

    // Trigger the metro train animation
    rerender(
      <DashboardLandscape score={70} triggerMetroTrain={true} onMetroAnimationComplete={handleComplete} />
    );

    // Fast-forward time to complete animation (3500ms)
    act(() => {
      jest.advanceTimersByTime(3500);
    });

    expect(handleComplete).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
