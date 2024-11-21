const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/forum', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

// Модель темы
const Topic = mongoose.model('Topic', new mongoose.Schema({
    username: String,
    title: String,
    content: String,
    comments: [String],
    status: String
}));

// Создание темы
app.post('/api/topics', async (req, res) => {
    const { username, title, content } = req.body;
    const newTopic = new Topic({
        username,
        title,
        content,
        comments: [],
        status: ''
    });
    await newTopic.save();
    res.status(201).send(newTopic);
});

// Получение всех тем
app.get('/api/topics', async (req, res) => {
    const topics = await Topic.find();
    res.status(200).send(topics);
});

// Запуск сервера
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
