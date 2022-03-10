import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import bcrypt from 'bcryptjs';
import { generatedJWT } from '../helper/jwt';

export const postAuth = async ( req: Request, res: Response ) => {
    
    const { email, password } = req.body;

   try {

        const userFounded = await UserModel.findOne({email});

        if( !userFounded ) {
            return res.status(404).json({
                ok: false,
                msg: 'Password not valid'
            });
        }        
        
        const validPassword = bcrypt.compareSync( password, userFounded.password.toString());

        if( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Password not valid'
            });
        }

        const token = await generatedJWT( userFounded.id );
        

        res.json({
            ok: true,
            token
        });
       
   } catch (error) {
    res.status(500).json({
        ok: false,
        msg: 'Error login user'
    });
   }

}

