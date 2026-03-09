import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addDays } from "date-fns";

export interface UserWord {
  wordId: string;
  box: number; // 0 to 6
  nextReviewDate: string | null; // ISO string
  lastTestedDate: string | null;
}

export interface UserStats {
  points: number;
  timeSpent: number; // in seconds
  wordsLearnt: number;
  wordsRevised: number;
  groupsLearnt: number;
  wordsFinished: number;
}

interface StoreState {
  userWords: Record<string, UserWord>;
  stats: UserStats;
  updateWord: (
    wordId: string,
    isCorrect: boolean,
    mode: "test" | "learn" | "revise" | "practice",
  ) => void;
  addPoints: (points: number) => void;
  addTime: (seconds: number) => void;
  resetProgress: () => void;
}

const getNextReviewDate = (box: number): string | null => {
  const now = new Date();
  switch (box) {
    case 1:
      return now.toISOString(); // Box 1 is always due immediately
    case 2:
      return addDays(now, 1).toISOString();
    case 3:
      return addDays(now, 3).toISOString();
    case 4:
      return addDays(now, 7).toISOString();
    case 5:
      return addDays(now, 12).toISOString();
    case 6:
      return null; // Mastered
    default:
      return null;
  }
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      userWords: {},
      stats: {
        points: 0,
        timeSpent: 0,
        wordsLearnt: 0,
        wordsRevised: 0,
        groupsLearnt: 0,
        wordsFinished: 0,
      },
      addPoints: (points) => {
        set((state) => ({
          stats: { ...state.stats, points: state.stats.points + points },
        }));
      },
      addTime: (seconds) => {
        set((state) => ({
          stats: { ...state.stats, timeSpent: state.stats.timeSpent + seconds },
        }));
      },
      updateWord: (wordId, isCorrect, mode) => {
        set((state) => {
          const currentWord = state.userWords[wordId] || {
            wordId,
            box: 0,
            nextReviewDate: null,
            lastTestedDate: null,
          };
          let newBox = currentWord.box;
          const now = new Date().toISOString();
          let effectiveMode = mode;

          if (effectiveMode === "test") {
            newBox = isCorrect ? 4 : 1;
          } else if (effectiveMode === "learn") {
            newBox = isCorrect ? 2 : 1;
          } else if (effectiveMode === "revise") {
            const isDue = !currentWord.nextReviewDate || new Date(currentWord.nextReviewDate) <= new Date();
            if (isDue) {
              if (isCorrect) {
                newBox = Math.min(newBox + 1, 6);
              } else {
                newBox = 1;
              }
            } else {
              effectiveMode = "practice";
            }
          } else if (effectiveMode === "practice") {
            // Do not change box
          }

          const nextReviewDate =
            effectiveMode === "practice"
              ? currentWord.nextReviewDate
              : getNextReviewDate(newBox);

          const updatedWord: UserWord = {
            ...currentWord,
            box: newBox,
            nextReviewDate,
            lastTestedDate: now,
          };

          const newStats = { ...state.stats };

          if (effectiveMode !== "practice") {
            if (currentWord.box === 0 && newBox > 0) {
              newStats.wordsLearnt++;
            }
            if (currentWord.box > 0 && newBox > currentWord.box) {
              newStats.wordsRevised++;
            }
            if (currentWord.box < 6 && newBox === 6) {
              newStats.wordsFinished++;
            }
          }

          return {
            userWords: {
              ...state.userWords,
              [wordId]: updatedWord,
            },
            stats: newStats,
          };
        });
      },
      resetProgress: () => {
        set({
          userWords: {},
          stats: {
            points: 0,
            timeSpent: 0,
            wordsLearnt: 0,
            wordsRevised: 0,
            groupsLearnt: 0,
            wordsFinished: 0,
          },
        });
      },
    }),
    {
      name: "vocab-storage",
    },
  ),
);
