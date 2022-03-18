import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { getUploads, putUploads } from '../controllers/uploads.controller';
import { validateJWT } from '../middlewares/validate-jwt';

const router: Router = Router();

router.use( fileUpload() );

router.get('/:table/:img', validateJWT, getUploads);
router.put('/:table/:id', validateJWT, putUploads);

export default router;