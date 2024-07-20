import express from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { stateValidationRules, validateRequest } from '../middlewares/validationMiddleware';
import { createState, getStates, updateState, deleteState } from '../controllers/stateController';

const router = express.Router();

router.post(
    '/',
    isAuthenticated,
    stateValidationRules,
    validateRequest,
    createState
);

router.get(
    '/',
    isAuthenticated, 
    getStates
);

router.put(
    '/:id',
    isAuthenticated,
    stateValidationRules,
    validateRequest,
    updateState
);


router.delete(
    '/:id', 
    isAuthenticated, 
    deleteState
);

export default router;


















// import express from 'express';
// import { check, validationResult } from 'express-validator';
// import State from '../models/State';
// import { isAuthenticated } from '../middlewares/auth';

// const router = express.Router();

// router.post(
//     '/',
//     isAuthenticated,
//     [
//         check('name').not().isEmpty().withMessage('Name is required'),
//         check('description').not().isEmpty().withMessage('Description is required'),
//         check('status').not().isEmpty().withMessage('Status is required'),
//     ],
//     async (req: express.Request, res: express.Response) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         interface StateRequestBody {
//             name: string;
//             description: string;
//             status: string;
//         }

//         const { name, description, status }: StateRequestBody = req.body;
//         const createdBy: string = req.user.id;

//         try {
//             interface StateData {
//                 name: string;
//                 description: string;
//                 status: string;
//                 createdBy: string;
//             }

//             const state: StateData = new State({
//                 name,
//                 description,
//                 status,
//                 createdBy,
//             });
//             await state.save();
//             res.status(201).json(state);
//         } catch (err) {
//             res.status(500).send('Server error');
//         }
//     }
// );

// router.get('/', async (req, res) => {
//     try {
//         const states = await State.find();
//         res.json(states);
//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// });

// router.put(
//     '/:id',
//     isAuthenticated,
//     [
//         check('name').not().isEmpty().withMessage('Name is required'),
//         check('description').not().isEmpty().withMessage('Description is required'),
//         check('status').not().isEmpty().withMessage('Status is required'),
//     ],
//     async (req: express.Request, res: express.Response) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { name, description, status } = req.body;
//         const updatedAt = Date.now();

//         try {
//             const state = await State.findByIdAndUpdate(
//                 req.params.id,
//                 { name, description, status, updatedAt },
//                 { new: true }
//             );
//             if (!state) {
//                 return res.status(404).json({ msg: 'State not found' });
//             }
//             res.json(state);
//         } catch (err) {
//             res.status(500).send('Server error');
//         }
//     }
// );

// router.delete('/:id', isAuthenticated, async (req, res) => {
//     try {
//         const state = await State.findByIdAndDelete(req.params.id);
//         if (!state) {
//             return res.status(404).json({ msg: 'State not found' });
//         }
//         res.json({ msg: 'State removed' });
//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// });

// export default router;
