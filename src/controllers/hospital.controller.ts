import { Request, Response } from "express";
import { HydratedDocument } from 'mongoose';
import { Hospital } from "../interfaces/hospital.interface";
import { HospitalModel } from "../models/hospital";




export const getHospitals = async ( req: Request, res: Response ) => {

    const hospital: Hospital[] = await HospitalModel
        .find()
        .populate('user', 'name img');

    try {

        res.json({
            ok: true,
            hospital
        });

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }


}

export const postHospital = async ( req: Request, res: Response ) => {

    const uid: string = req.params.uid;
    
    const hospital: HydratedDocument<Hospital> = new HospitalModel({ 
        ...req.body,
        user: uid
    });

    try {
        
        const hospitalPosted: Hospital = await hospital.save();

        res.json({
            ok: true,
            msg: 'Hospital created',
            hospitalPosted
        });

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }


}

export const putHospital = async ( req: Request, res: Response ) => {

    try {

        const id: string = req.params.id;
        const uid: string = req.params.uid;

        const hospital = await HospitalModel.findById(id);

        if(!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not founded'
            });
        }

        const changesHospital = {
            ...req.body,
            user: uid
        }

        const hospitalUpdated = await HospitalModel.findByIdAndUpdate( id, changesHospital, { new: true } );


        res.json({
            ok: true,
            msg: 'Hospital updated',
            hospitalUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        }); 
    }

}

export const deleteHospital = async ( req: Request, res: Response ) => {

    try {

        const id: string = req.params.id;
    
        const hospital = await HospitalModel.findById(id);
    
        if(!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not founded'
            });
        }
    
        const hospitalDeleted = await HospitalModel.findByIdAndUpdate( id, { status: false });

        res.json({
            ok: true,
            msg: 'Hospital deleted',
            hospitalDeleted
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });  
    }

}