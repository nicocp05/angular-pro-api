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

export const putHospital = ( req: Request, res: Response ) => {



}

export const deleteHospital = ( req: Request, res: Response ) => {



}