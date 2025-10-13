import express from 'express';

import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_, res) => {
    res.send("Hello Full Stack!")
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
    })
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});