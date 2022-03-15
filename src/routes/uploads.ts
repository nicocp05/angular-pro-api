import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { putUploads } from '../controllers/uploads.controller';
import { validateJWT } from '../middlewares/validate-jwt';

const router: Router = Router();

router.use( fileUpload() );

router.put('/:table/:id', validateJWT, putUploads);

export default router;