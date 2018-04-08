export interface Rented{
    giver:string;
    receiver:string;
    bookid:string;
    date:Date;
    durationCommited:string; // generally a week
    paid:boolean;
    price:string;
}
