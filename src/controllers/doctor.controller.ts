import { Request, Response } from "express";
import { DoctorModel } from "../models/doctor";
import { HydratedDocument } from 'mongoose';
import { Doctor } from "../interfaces/doctor.interface";



export const getDoctor = async ( req: Request, res: Response ) => {

    const doctors: Doctor[] = await DoctorModel
        .find()
        .populate('user', 'name img')
        .populate('hospital', 'name img');

    try {
        
        res.json({
            ok: true,
            doctors
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }

}

export const postDoctor = async ( req: Request, res: Response ) => {

    const uid: string = req.params.uid;

    const doctor: HydratedDocument<Doctor> = new DoctorModel({
        ...req.body,
        user: uid
    });
    
    try {

        const doctorPosted: HydratedDocument<Doctor> = await doctor.save();

        res.json({
            ok: true,
            doctorPosted
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }


}

export const putDoctor = ( req: Request, res: Response ) => {



}

export const deleteDoctor = ( req: Request, res: Response ) => {



}