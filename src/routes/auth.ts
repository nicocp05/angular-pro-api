import { Router } from 'express';
import { check } from 'express-validator';
import { postAuth } from '../controllers/auth.controller';
import { validateFields } from '../middlewares/validate-fields';

const router: Router = Router();

router.post('/', [
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields
], postAuth);




export default router;