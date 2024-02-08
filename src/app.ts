import mongoose from 'mongoose';
import express from 'express';
import console from 'console';
import cardsRoutes from './routes/cards';
import usersRoutes from './routes/users';

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mydb');

app.use('/cards', cardsRoutes);
app.use('/users', usersRoutes);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
