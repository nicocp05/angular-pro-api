import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {

    const token: string | any = req.header('x-token');

    if( !token ) {
        res.status(401).json({
            ok: false,
            msg: "There isn't token in the request"
        });
    }

    try {

        const secretKey: any = process.env.JWT_SECRET;
        
        const { uid }: any = jwt.verify( token, secretKey );

        res.setHeader('uid', uid);

        req.params.uid = uid
        
        next();    

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token invalid'
        });
    }

}
