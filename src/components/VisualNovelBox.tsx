'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface QuestionOption {
  text: string;
  points: number;
}

interface Question {
  id: number;
  speaker: string;
  expression: 'neutral' | 'happy' | 'concerned' | 'sad';
  text: string;
  options: QuestionOption[];
}

interface VisualNovelBoxProps {
  questions: Question[];
  onComplete: (score: number, answers: Record<string, string>) => void;
}

export default function VisualNovelBox({ questions, onComplete }: VisualNovelBoxProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [accumulatedPoints, setAccumulatedPoints] = useState(0);

  const currentQuestion = questions[currentIdx];

  // Typewriter effect
  useEffect(() => {
    if (!currentQuestion) return;
    
    setTypedText('');
    setIsTypingDone(false);
    setSelectedOptionIdx(null);
    
    let index = 0;
    const fullText = currentQuestion.text;
    
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 20); // 20ms per character

    return () => clearInterval(interval);
  }, [currentIdx, currentQuestion]);

  if (!currentQuestion) return null;

  const handleOptionClick = (optionIdx: number) => {
    sounds.click();
    setSelectedOptionIdx(optionIdx);
  };

  const handleNext = () => {
    if (selectedOptionIdx === null) return;

    sounds.click();
    const chosenOption = currentQuestion.options[selectedOptionIdx];
    const newAnswers = {
      ...answers,
      [`q${currentQuestion.id}`]: chosenOption.text
    };

    setAnswers(newAnswers);
    const newPoints = accumulatedPoints + chosenOption.points;
    setAccumulatedPoints(newPoints);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      sounds.onboardingComplete();
      onComplete(newPoints, newAnswers);
    }
  };

  const renderAvatar = (expression: 'neutral' | 'happy' | 'concerned' | 'sad') => {
    return (
      <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 border-4 border-black bg-sky-200 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)]">
        <path d="M 15 80 C 10 50 15 25 50 20 C 85 25 90 50 85 80 Z" fill="#1e3a8a" />
        <circle cx="50" cy="55" r="25" fill="#fbcfe8" stroke="#000000" strokeWidth="2.5" />
        <circle cx="24" cy="55" r="4.5" fill="#fbcfe8" stroke="#000000" strokeWidth="2.5" />
        <circle cx="76" cy="55" r="4.5" fill="#fbcfe8" stroke="#000000" strokeWidth="2.5" />

        {expression === 'happy' && (
          <>
            <path d="M 37 53 Q 41 48 45 53" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 55 53 Q 59 48 63 53" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 35 45 Q 40 40 45 44" stroke="#000000" strokeWidth="2" fill="none" />
            <path d="M 55 44 Q 60 40 65 45" stroke="#000000" strokeWidth="2" fill="none" />
          </>
        )}
        {expression === 'concerned' && (
          <>
            <ellipse cx="40" cy="53" rx="3.5" ry="4" fill="#000000" />
            <ellipse cx="60" cy="53" rx="3.5" ry="4" fill="#000000" />
            <circle cx="41.5" cy="51.5" r="1" fill="#ffffff" />
            <circle cx="61.5" cy="51.5" r="1" fill="#ffffff" />
            <path d="M 34 46 L 44 49" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 66 46 L 56 49" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
        {expression === 'sad' && (
          <>
            <path d="M 36 51 Q 40 55 44 51" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 56 51 Q 60 55 64 51" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 33 48 Q 39 50 44 46" stroke="#000000" strokeWidth="2" fill="none" />
            <path d="M 67 48 Q 61 50 56 46" stroke="#000000" strokeWidth="2" fill="none" />
            <path d="M 37 57 Q 38 63 36 64 Q 34 64 35 59 Z" fill="#38bdf8" />
          </>
        )}
        {expression === 'neutral' && (
          <>
            <ellipse cx="40" cy="52" rx="4" ry="5.5" fill="#000000" />
            <ellipse cx="60" cy="52" rx="4" ry="5.5" fill="#000000" />
            <circle cx="38.5" cy="50" r="1.5" fill="#ffffff" />
            <circle cx="58.5" cy="50" r="1.5" fill="#ffffff" />
            <circle cx="41.5" cy="54" r="0.8" fill="#ffffff" />
            <circle cx="61.5" cy="54" r="0.8" fill="#ffffff" />
            <path d="M 34 45 Q 40 42 45 46" stroke="#000000" strokeWidth="2" fill="none" />
            <path d="M 55 46 Q 60 42 66 45" stroke="#000000" strokeWidth="2" fill="none" />
          </>
        )}

        <ellipse cx="33" cy="59" rx="3.5" ry="1.5" fill="#ec4899" opacity="0.6" />
        <ellipse cx="67" cy="59" rx="3.5" ry="1.5" fill="#ec4899" opacity="0.6" />

        {expression === 'happy' && (
          <path d="M 45 61 Q 50 68 55 61 Z" fill="#ef4444" stroke="#000000" strokeWidth="2" />
        )}
        {expression === 'concerned' && (
          <path d="M 46 62 Q 50 64 54 62" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {expression === 'sad' && (
          <path d="M 46 64 Q 50 60 54 64" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {expression === 'neutral' && (
          <path d="M 46 61 Q 50 64 54 61" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        <path d="M 23 40 Q 35 30 50 38 Q 65 30 77 40 L 79 48 L 73 45 L 68 38 L 50 44 L 32 38 L 27 45 L 21 48 Z" fill="#1e3b8b" stroke="#000000" strokeWidth="2" />
        <path d="M 22 35 C 22 15 78 15 78 35 Z" fill="#10b981" stroke="#000000" strokeWidth="2.5" />
        <ellipse cx="50" cy="18" rx="8" ry="4" fill="#047857" stroke="#000000" strokeWidth="2" />
        <path d="M 50 14 C 47 8 50 3 53 6 C 56 9 53 14 50 14 Z" fill="#4ade80" stroke="#000000" strokeWidth="1.5" />
        
        <path d="M 38 78 L 50 88 L 62 78 Z" fill="#ffffff" stroke="#000000" strokeWidth="2" />
        <path d="M 32 80 L 38 78 L 42 85 Z" fill="#f43f5e" stroke="#000000" strokeWidth="2" />
        <path d="M 68 80 L 62 78 L 58 85 Z" fill="#f43f5e" stroke="#000000" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 font-sans select-none">
      <div className="flex flex-col md:flex-row gap-6 items-start bg-slate-900 border-4 border-black p-5 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white">
        
        <div className="flex flex-col items-center gap-2 self-center md:self-start">
          <div role="img" aria-label={`${currentQuestion.speaker} character avatar, displaying ${currentQuestion.expression} expression`}>
            {renderAvatar(currentQuestion.expression)}
          </div>
          <span className="font-mono text-xs font-bold bg-emerald-600 text-white px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">
            {currentQuestion.speaker}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-between min-h-[120px] w-full">
          <div>
            <div className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>{`>> CLIMATE_COGNITION_LINK`}</span>
              <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-800 rounded">
                QUESTION {currentIdx + 1} OF {questions.length}
              </span>
            </div>
            
            <p className="text-sm md:text-base leading-relaxed font-semibold font-mono text-zinc-100 min-h-[4rem]">
              {typedText}
              {!isTypingDone && <span className="animate-pulse font-bold text-emerald-400 ml-0.5">|</span>}
            </p>
          </div>

          {isTypingDone && selectedOptionIdx === null && (
            <div className="text-[11px] font-mono text-emerald-400/80 animate-pulse mt-2 flex items-center gap-1">
              <span>PLEASE CHOOSE A RESPONSE OPTION BELOW</span>
              <ChevronRight className="w-3.5 h-3.5 animate-bounce" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOptionIdx === idx;
          return (
            <button
              key={idx}
              disabled={!isTypingDone}
              onMouseEnter={() => sounds.hover()}
              onClick={() => handleOptionClick(idx)}
              className={`text-left p-4 border-4 border-black rounded-lg font-mono font-bold text-sm transition-all duration-150 flex items-center gap-3 relative
                ${!isTypingDone ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                ${isSelected 
                  ? 'bg-amber-400 text-black translate-x-1 translate-y-1 shadow-none' 
                  : 'bg-zinc-800 text-white hover:bg-zinc-700 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none'
                }
              `}
            >
              <span className={`text-lg transition-opacity duration-150 ${isSelected ? 'opacity-100 text-red-600' : 'opacity-0'}`}>
                ►
              </span>
              <span className="flex-1 leading-tight">{option.text}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end mt-2">
        <button
          onClick={handleNext}
          disabled={selectedOptionIdx === null}
          onMouseEnter={() => selectedOptionIdx !== null && sounds.hover()}
          className={`px-8 py-3.5 font-mono font-bold text-base border-4 border-black rounded-lg transition-all duration-150 flex items-center gap-2
            ${selectedOptionIdx === null
              ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed opacity-50 shadow-none'
              : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none'
            }
          `}
        >
          CONFIRM DECISION
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
