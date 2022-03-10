import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user';
import bcrypt from 'bcryptjs';
import { generatedJWT } from '../helper/jwt';



export const getUsers = async ( req: Request, res: Response ) => {
    
    const users: User[] = await UserModel.find({}, 'name email role google status');
    

    res.json({
        ok: true,
        users,
        uid: req.params.uid
    });

}

export const postUser = async ( req: Request, res: Response ) => {

    const { email, password } = req.body;

    

    try {

        const emailFounded = await UserModel.findOne({email});

        if(emailFounded) {
            return res.status(400).json({
                ok: false,
                msg: 'Email exists'
            });
        }

        const user: HydratedDocument<User> = new UserModel( req.body );
    
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        
        await user.save();

        const token = await generatedJWT( user.id );
        
        res.json({
            ok: true,
            msg: 'User posted',
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }

    

}

export const putUser = async ( req: Request, res: Response ) => {

    const uid = req.params.id;



    try {

        const userFounded = await UserModel.findById({_id: uid});

        if(!userFounded) {
            return res.status(404).json({
                ok: false,
                msg: 'User not founded'
            });
        }

        const { email, password, google, ...fields } = req.body;

        if( userFounded.email !== email ) {
            
            const emailExists = await UserModel.findOne({ email: email });
            if( emailExists ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is a user with that email'
                });
            }
        }

        fields.email = email;

        const userUpdated = await UserModel.findByIdAndUpdate( uid, fields, { new: true });

        res.json({
            ok: true,
            userUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error updating user'
        });
    }

}

export const deleteUser = async ( req: Request, res: Response ) => {

    const uid = req.params.id;

    try {

        const userFounded: any = await UserModel.findById({_id: uid});

        if(!userFounded) {
            return res.status(404).json({
                ok: false,
                msg: 'User not founded'
            });
        }

        const userDeleted = {
            ...userFounded,
            _doc: {
                ...userFounded._doc,
                status: false
            }
        }

        console.log(userFounded);
        

        await UserModel.findByIdAndUpdate( uid, userDeleted, { new: true });

        res.json({
            ok: true,
            userDeleted
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error deleting user'
        }); 
    }



}