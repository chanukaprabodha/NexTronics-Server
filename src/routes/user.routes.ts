import { Router } from 'express';
import {getUserById, registerUser} from '../controllers/user.controller';

const router = Router();

router.post('/register', registerUser);
router.get('/:userId',getUserById);

export default router;