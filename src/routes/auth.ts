import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignIn, postAuth, renewToken } from '../controllers/auth.controller';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

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

router.get('/renew', [
    validateJWT
], renewToken);



export default router;