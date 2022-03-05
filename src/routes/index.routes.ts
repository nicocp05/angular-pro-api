import express, { Request, Response } from 'express';

const router = express();

router.get('/', ( req: Request, res: Response ) => {
    res.send( 'Hola' );
});

export default router;