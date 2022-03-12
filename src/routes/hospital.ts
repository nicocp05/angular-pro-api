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
    
], putHospital);

router.put('/delete/:id', deleteHospital);



export default router;