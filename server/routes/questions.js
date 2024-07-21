const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Route to handle form submission
router.post('/submit', async (req, res) => {
    const { question, options, answer, quizId, imageSource } = req.body;
    console.log("Hello")
    const newQuestion = new Question({
        question,
        options,
        answer,
        quizId,
        imageSource,
    });

    try {
        await newQuestion.save();
        res.status(201).json({ message: 'Form data added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding form data', error });
    }
});

router.delete('/:quizId/:id', async (req, res) => {
    try {
        const { quizId, id } = req.params;
        await Question.findOneAndDelete({ _id: id, quizId: quizId });
        res.status(200).send({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting question', error: err });
    }
});

router.put('/:quizId/:id', async (req, res) => {
    try {
        const { quizId, id } = req.params;
        const updatedQuiz = await Question.findOneAndUpdate(
            { _id: id, quizId: quizId },
            req.body,
            { new: true }
        );
        res.status(200).json(updatedQuiz);
    } catch (err) {
        res.status(500).send({ message: 'Error updating quiz', error: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes', error });
    }
});

module.exports = router;
