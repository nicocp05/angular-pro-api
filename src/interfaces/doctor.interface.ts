import { Hospital } from "./hospital.interface";
import { User } from "./user.interface";

export interface Doctor {

    name: string;
    img: string;
    user: User;
    hospital: Hospital;

}