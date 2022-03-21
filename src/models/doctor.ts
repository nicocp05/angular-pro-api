import { Schema, model } from 'mongoose';
import { Doctor } from '../interfaces/doctor.interface';

const DoctorSchema: Schema<Doctor> = new Schema({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    status: {
        type: Boolean,
        default: true
    }

});

DoctorSchema.method('toJSON' , function() {
    const { __v, ...object } = this.toObject();
    return object;
});

export const DoctorModel = model<Doctor>('Doctor', DoctorSchema);