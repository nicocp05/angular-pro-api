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

export const putDoctor = async ( req: Request, res: Response ) => {

    const id = req.params.id;
    const uid = req.params.uid;

    try {

        const doctor = await DoctorModel.findById(id);
        if(!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor not founded'
            });
        }

        const changesDoctor = {
            ...req.body,
            user: uid
        };

        const doctorUpdated = await DoctorModel.findByIdAndUpdate(id, changesDoctor, { new: true });

        res.json({
            ok: true,
            msg: 'Doctor updated',
            doctorUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }

}

export const deleteDoctor = async ( req: Request, res: Response ) => {

    const id = req.params.id;

    try {

        const doctor = await DoctorModel.findById(id);
        if(!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor not founded'
            });
        }

        const doctorDeleted = await DoctorModel.findByIdAndUpdate(id, { status: false }, { new: true });

        res.json({
            ok: true,
            msg: 'Doctor deleted',
            doctorDeleted
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }

}