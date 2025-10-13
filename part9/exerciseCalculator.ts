interface Result {
    days: number,
    trainingDays: number,
    target: number,
    average: number,
    isTargetReached: boolean,
    rating: 1 | 2 | 3,
    explanation: string
}


const calculateExercises = (dailyExerciseHours: number[], targetAmount: number) => {
    const totalExerciseHours = dailyExerciseHours.reduce((prev, curr) => curr + prev);

    const average = totalExerciseHours / dailyExerciseHours.length;

    const rating = average >= targetAmount ? 3 : totalExerciseHours >= targetAmount / 2 ? 2 : 1;

    const ratingExplanations = {
        1: '< 50% of target reached',
        2: '< 100% but >= 50% of target reached',
        3: 'target reached'
    }

    console.log({
        days: dailyExerciseHours.length,
        trainingDays: dailyExerciseHours.filter(h => h !== 0).length,
        target: targetAmount,
        average: totalExerciseHours / dailyExerciseHours.length,
        isTargetReached: average >= targetAmount,
        rating: rating,
        explanation: ratingExplanations[rating]
    });
}

try {
  //const { height, weight } = parseArguments(process.argv);
  calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}