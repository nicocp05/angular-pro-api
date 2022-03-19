import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignIn, postAuth } from '../controllers/auth.controller';
import { validateFields } from '../middlewares/validate-fields';

const router: Router = Router();

router.post('/', [
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields
], postAuth);

router.post('/google', [
    check('token', 'Token google is required').not().isEmpty(),
    validateFields
], googleSignIn);




export default router;