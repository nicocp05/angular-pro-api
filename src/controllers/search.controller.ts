import { Request, Response } from "express";
import { DoctorModel } from "../models/doctor";
import { HospitalModel } from "../models/hospital";
import { UserModel } from "../models/user";


export const getSearch = async ( req: Request, res: Response ) => {

    const search: string = req.params.search;
    const regex = new RegExp( search, 'i' );

    try {

    const [ user, hospital, doctor ] = await Promise.all([
        UserModel.find({ name: regex }),
        HospitalModel.find({ name: regex }),
        DoctorModel.find({ name: regex })
    ]);

        res.json({
            ok: true,
            user,
            hospital, 
            doctor
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }

}

export const getByCollection = async ( req: Request, res: Response ) => {

    const search: string = req.params.search;
    const table: string = req.params.table;

    const regex = new RegExp( search, 'i' );

    let data: any[] = [];

    switch ( table ) {
        case 'doctors':
            data = await DoctorModel
                .find({ name: regex })
                .populate('user', 'name img')
                .populate('hospital', 'name img');
            break;
        
        case 'hospitals':
            data = await HospitalModel
                .find({ name: regex })
                .populate('user', 'name img');
            break;

        case 'users':
            data = await UserModel.find({ name: regex });
            break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'The table must be users / doctors / hospitals'
            });
            break;
    }

    try {
     
        res.json({
            ok: true,
            results: data
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }

}