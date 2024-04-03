const express = require('express');
const router = express.Router();
const People = require('../model/people.model');


router.post('/add', async (req, res) => {
    try {
        const { username, avatar, address, state } = req.body;
        const newPerson = new People({ username, avatar, address, state });
        await newPerson.save();
        res.status(201).json(newPerson);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add person', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const people = await People.find();
        res.json(people);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve people', error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const person = await People.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve person', error: error.message });
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const { username, avatar, address, state } = req.body;
        const updatedPerson = await People.findByIdAndUpdate(req.params.id, { username, avatar, address, state }, { new: true });
        if (!updatedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(updatedPerson);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update person', error: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPerson = await People.findByIdAndDelete(req.params.id);
        if (!deletedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json({ message: 'Person deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete person', error: error.message });
    }
});

module.exports = router;
