export const calculateNextReview = (difficulty: number, correct: boolean) => {
  let newDifficulty = difficulty;

  if (correct) newDifficulty = Math.min(5, difficulty + 0.5);
  else newDifficulty = Math.max(1, difficulty - 0.5);

  const intervals = [1, 3, 7, 14, 30]; // days in milliseconds
  const index = Math.floor(newDifficulty) - 1;
  const interval = intervals[Math.min(index, intervals.length - 1)] * 24 * 60 * 60 * 1000;

  return { newDifficulty, interval };
};
