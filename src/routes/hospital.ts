import { Router } from 'express';
import { check } from 'express-validator';
import { deleteHospital, getHospitals, postHospital, putHospital } from '../controllers/hospital.controller';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const router: Router = Router();

router.get('/', getHospitals);

router.post('/', [
    
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields

], postHospital);

router.put('/:id', [

    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
    
], putHospital);

router.put('/delete/:id', [

    validateJWT,

], deleteHospital);



export default router;