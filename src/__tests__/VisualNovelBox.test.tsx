import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import VisualNovelBox from '../components/VisualNovelBox';

const mockQuestions = [
  {
    id: 1,
    speaker: 'Eco-Chan',
    expression: 'neutral' as const,
    text: 'What is your primary commute method?',
    options: [
      { text: 'Drive solo in a gas car', points: 10 },
      { text: 'Public transit or electric car', points: 20 },
    ],
  },
  {
    id: 2,
    speaker: 'Eco-Chan',
    expression: 'happy' as const,
    text: 'How often do you recycle?',
    options: [
      { text: 'Never', points: 5 },
      { text: 'Always', points: 15 },
    ],
  },
];

describe('VisualNovelBox Component', () => {
  test('renders and progresses through questions, calling onComplete on finish', () => {
    jest.useFakeTimers();
    const handleComplete = jest.fn();

    render(<VisualNovelBox questions={mockQuestions} onComplete={handleComplete} />);

    // Tick timers step-by-step, letting React commit each character update
    for (let i = 0; i < 40; i++) {
      act(() => {
        jest.advanceTimersByTime(20);
      });
    }

    // Check first question renders
    expect(screen.getByText(/What is your primary commute method\?/)).toBeInTheDocument();
    
    // Attempt to click Next (CONFIRM DECISION) without choosing an option (should not proceed)
    const confirmButton = screen.getByRole('button', { name: /confirm decision/i });
    fireEvent.click(confirmButton);
    expect(screen.getByText(/What is your primary commute method\?/)).toBeInTheDocument();

    // Select first option
    const option1 = screen.getByText('Drive solo in a gas car');
    fireEvent.click(option1);

    // Click CONFIRM DECISION to progress to the second question
    fireEvent.click(confirmButton);

    // Tick timers step-by-step for the second question
    for (let i = 0; i < 45; i++) {
      act(() => {
        jest.advanceTimersByTime(20);
      });
    }

    // Check second question renders
    expect(screen.getByText(/How often do you recycle\?/)).toBeInTheDocument();

    // Select second option
    const option2 = screen.getByText('Always');
    fireEvent.click(option2);

    // Click CONFIRM DECISION to complete the survey
    fireEvent.click(confirmButton);

    expect(handleComplete).toHaveBeenCalledTimes(1);
    expect(handleComplete).toHaveBeenCalledWith(25, {
      q1: 'Drive solo in a gas car',
      q2: 'Always',
    });

    jest.useRealTimers();
  });
});
