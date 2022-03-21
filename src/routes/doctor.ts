import { Router } from 'express';
import { check } from 'express-validator';
import { deleteDoctor, getDoctor, postDoctor, putDoctor } from '../controllers/doctor.controller';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const router: Router = Router();

router.get('/', getDoctor);

router.post('/', [

    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('hospital', 'Hospital ID must be valid').isMongoId(),
    validateFields
    
], postDoctor);

router.put('/:id', [
    
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields

], putDoctor);

router.put('/delete/:id', [
    validateJWT
], deleteDoctor);



export default router;