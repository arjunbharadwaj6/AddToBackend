const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

// Route to handle form submission
router.post('/submit', async (req, res) => {
    const { image, heading, description, grade, quizId, price, category } = req.body;

    const newQuiz = new Quiz({
        image,
        heading,
        description,
        grade,
        quizId,
        price,
        category,
    });

    try {
        await newQuiz.save();
        res.status(201).json({ message: 'Form data added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding form data', error });
    }
});

router.delete('/:quizId/:id', async (req, res) => {
    try {
        const { quizId, id } = req.params;
        await Quiz.findOneAndDelete({ _id: id, quizId: quizId });
        res.status(200).send({ message: 'Quiz deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting question', error: err });
    }
});

router.put('/:quizId/:id', async (req, res) => {
    try {
        const { quizId, id } = req.params;
        const updatedQuiz = await Quiz.findOneAndUpdate(
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
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes', error });
    }
});

module.exports = router;
