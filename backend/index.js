import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import heroRouter from './routers/heroRoute.js';

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/heroes', heroRouter);

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://SuperHero:SuperHero@superheroes.ruqly1o.mongodb.net/?retryWrites=true&w=majority')
      .then(() => {
        console.log('DB ok')
      })
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

export default app;
