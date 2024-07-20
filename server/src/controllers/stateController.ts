import { Request, Response } from 'express';
import State from '../models/State';

// Create state

//TODO: req of type should be changes
export const createState = async (req: any, res: Response) => {
    const { name, description, status } = req.body;
    const createdBy = req.user.id;

    try {
        const state = new State({ name, description, status, createdBy });
        await state.save();
        res.status(201).json(state);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get all states
export const getStates = async (req: Request, res: Response) => {
    try {
        const states = await State.find();
        res.json(states);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Update state
export const updateState = async (req: Request, res: Response) => {
    const { name, description, status } = req.body;
    const updatedAt = Date.now();

    try {
        const state = await State.findByIdAndUpdate(
            req.params.id,
            { name, description, status, updatedAt },
            { new: true }
        );
        if (!state) {
            return res.status(404).json({ msg: 'State not found' });
        }
        res.json(state);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Delete state
export const deleteState = async (req: Request, res: Response) => {
    try {
        const state = await State.findByIdAndDelete(req.params.id);
        if (!state) {
            return res.status(404).json({ msg: 'State not found' });
        }
        res.json({ msg: 'State removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
