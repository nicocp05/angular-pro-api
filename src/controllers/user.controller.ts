import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user';
import bcrypt from 'bcryptjs';
import { generatedJWT } from '../helper/jwt';



export const getUsers = async ( req: Request, res: Response ) => {
    
    const offset: number = Number(req.query.offset) || 0;

    const [ users, total ] = await Promise.all([
        UserModel
        .find({}, 'name email role google status img')
        .skip( offset )
        .limit( 5 ),
        UserModel.countDocuments()
    ]);


    res.json({
        ok: true,
        users,
        uid: req.params.uid,
        total
    });

}

export const postUser = async ( req: Request, res: Response ) => {

    const { email, password } = req.body;

    
    try {

        const emailFounded: User | any = await UserModel.findOne({email});


        if(emailFounded) {
            return res.status(400).json({
                ok: false,
                msg: 'Email exists'
            });
        }

        const user: HydratedDocument<User> = new UserModel( req.body );
    
        const salt: string = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        
        await user.save();

        const token: any = await generatedJWT( user.id );
        
        res.json({
            ok: true,
            msg: 'User posted',
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }

    

}

export const putUser = async ( req: Request, res: Response ) => {

    const uid: string = req.params.id;



    try {

        const userFounded: User | any = await UserModel.findById({_id: uid});

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

        const userUpdated: User | any = await UserModel
            .findByIdAndUpdate( uid, fields, { new: true });

        res.json({
            ok: true,
            userUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }

}

export const deleteUser = async ( req: Request, res: Response ) => {

    const uid: string = req.params.id;

    try {

        const userFounded: User | any = await UserModel.findById({_id: uid});

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

        await UserModel.findByIdAndUpdate( uid, userDeleted, { new: true });

        res.json({
            ok: true,
            userDeleted
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        }); 
    }



}