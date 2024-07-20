import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

// Validation rules for user
export const userValidationRules = [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];


export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
  };




// Validation rules for state
export const stateValidationRules = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('status').not().isEmpty().withMessage('Status is required')
];

// Error handling middleware
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
