import React from 'react';
import { StudentProfile } from '../types';
import { MiniGame } from './MiniGame';
import confetti from 'canvas-confetti';

interface RecyclingGameProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onTriggerBadgeAction?: (actionId: string, value?: any) => void;
}

export const RecyclingGame: React.FC<RecyclingGameProps> = ({
  student,
  setStudent,
  onTriggerBadgeAction
}) => {
  const handleArcadeComplete = (earnedXP: number) => {
    if (earnedXP > 0) {
      setStudent((prev) => {
        const newXP = prev.xp + earnedXP;
        const newLevel = Math.floor(newXP / 400) + 1;
        return {
          ...prev,
          xp: newXP,
          level: Math.max(prev.level, newLevel),
          itemsRecycled: prev.itemsRecycled + Math.floor(earnedXP / 10)
        };
      });
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-2">
      <MiniGame onComplete={handleArcadeComplete} onTriggerBadgeAction={onTriggerBadgeAction} />
    </div>
  );
};
