interface Result {
    days: number,
    trainingDays: number,
    target: number,
    average: number,
    isTargetReached: boolean,
    rating: 1 | 2 | 3,
    explanation: string
}

interface ExerciseCalculatorInput {
    dailyExerciseHours: number[],
    targetHours: number
}

const parseArguments = (args: string[]): ExerciseCalculatorInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (args.slice(2).find(arg => isNaN(Number(arg)))) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    dailyExerciseHours: args.slice(3).map(arg => Number(arg)),
    targetHours: Number(args[2])
  };
};

const calculateExercises = (dailyExerciseHours: number[], targetHours: number) => {
    const totalExerciseHours = dailyExerciseHours.reduce((prev, curr) => curr + prev);

    const average = totalExerciseHours / dailyExerciseHours.length;

    const rating = average >= targetHours ? 3 : totalExerciseHours >= targetHours / 2 ? 2 : 1;

    const ratingExplanations = {
        1: '< 50% of target reached',
        2: '< 100% but >= 50% of target reached',
        3: 'target reached'
    };

    const result: Result = {
        days: dailyExerciseHours.length,
        trainingDays: dailyExerciseHours.filter(h => h !== 0).length,
        target: targetHours,
        average: totalExerciseHours / dailyExerciseHours.length,
        isTargetReached: average >= targetHours,
        rating: rating,
        explanation: ratingExplanations[rating]
    };

    console.log(result);
};

try {
  const { dailyExerciseHours, targetHours } = parseArguments(process.argv);
  calculateExercises(dailyExerciseHours, targetHours);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default {};