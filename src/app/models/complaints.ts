import { ComplaintType } from './compliantType';
export interface Complaints{
    id?:string;
    userID?:string;
    compliantType?: ComplaintType;
    remarks?:string;
}

