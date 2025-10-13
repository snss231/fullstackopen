import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if (Number.isNaN(weight) || Number.isNaN(height)) {
        res.status(400).send({
            error: "malformatted parameters"
        });
        return;
    }

    res.send({
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (req, res) => {
    const dailyExercises = req.body['daily_exercises'] as number[];
    const target = req.body.target as number;

    if (!dailyExercises || !target) {
        res.status(400).send({
            error: "parameters missing"
        });
        return;
    }

    if (Number.isNaN(Number(target)) || dailyExercises.find((e: number) => Number.isNaN(e))) {
        res.status(400).send({
            error: "malformatted parameters"
        });
        return;
    }

    res.json(calculateExercises(dailyExercises, Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});