import fs from 'fs';
import { DoctorModel } from "../models/doctor"
import { HospitalModel } from "../models/hospital"
import { UserModel } from "../models/user"


const deleteImageFile = ( pathOld: string ): void => {
    if( fs.existsSync( pathOld ) ) {
        fs.unlinkSync( pathOld );
    }
}

export const updateImage = async ( table: string, id: string, nameFile: string ): Promise<boolean | undefined> => {

    let pathOld: string;

    switch ( table ) {
        case 'doctors':
            const doctor = await DoctorModel.findById(id)
            if( !doctor ) {
                return false;
            }
        
            pathOld = `./src/uploads/doctors/${ doctor.img }`;
            
            deleteImageFile( pathOld );

            doctor.img = nameFile;
            await doctor.save();
            return true;

        case 'users':

            const user = await UserModel.findById(id)
            if( !user ) {
                return false;
            }
        
            pathOld = `./src/uploads/users/${ user.img }`;
            
            deleteImageFile( pathOld );

            user.img = nameFile;
            await user.save();
            return true;

        case 'hospitals':

            const hospital = await HospitalModel.findById(id)
            if( !hospital ) {
                return false;
            }
        
            pathOld = `./src/uploads/hospitals/${ hospital.img }`;
            
            deleteImageFile( pathOld );

            hospital.img = nameFile;
            await hospital.save();
            return true;

        default:
            break;
    }

}