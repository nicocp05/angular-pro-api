import { Router } from 'express';
import { getByCollection, getSearch } from '../controllers/search.controller';
import { validateJWT } from '../middlewares/validate-jwt';

const router: Router = Router();

router.get('/:search', validateJWT, getSearch);

router.get('/collection/:table/:search', validateJWT, getByCollection);

export default router;