import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user';


export const getUsers = ( req: Request, res: Response ) => {
    res.send( 'Hola' );
}

export const postUsers = async ( req: Request, res: Response ) => {

    const { email, password, name } = req.body;

    const user: HydratedDocument<User> = new UserModel( req.body );
    
    await user.save();

    res.json({
        ok: true,
        msg: 'User posted',
        user: user
    });

}
