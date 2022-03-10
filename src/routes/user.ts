import { Router } from 'express';
import { deleteUser, getUsers, postUser, putUser } from '../controllers/user.controller';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const router: Router = Router();

router.get('/', validateJWT, getUsers);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields
], postUser);

router.put('/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('role', 'Role is required').not().isEmpty(),
    validateFields
], putUser);

router.put('/delete/:id', validateJWT, deleteUser);

export default router;