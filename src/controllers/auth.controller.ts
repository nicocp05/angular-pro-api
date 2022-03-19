import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import bcrypt from 'bcryptjs';
import { generatedJWT } from '../helper/jwt';
import { googleVerify } from '../helper/google-verify';
import { User } from '../interfaces/user.interface';

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

export const googleSignIn = async ( req: Request, res: Response ) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const user = await UserModel.findOne({ email });
        let newUser;

        if( !user ) {
            newUser = new UserModel({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            newUser = user;
            newUser.google = true;
            newUser.password = '@@@';
        }

        await newUser.save();

        const token = await generatedJWT( newUser.id );


        res.json({
            ok: true,
            msg: 'Google Sign In',
            name, email, picture,
            token
        });  

        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        });
    }

      


}