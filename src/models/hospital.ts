import { Schema, model } from 'mongoose';
import { Hospital } from '../interfaces/hospital.interface';

const HospitalSchema: Schema<Hospital> = new Schema({

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
    status: {
        type: Boolean,
        default: true
    }

});

HospitalSchema.method('toJSON' , function() {
    const { __v, ...object } = this.toObject();
    return object;
});

export const HospitalModel = model<Hospital>('Hospital', HospitalSchema);