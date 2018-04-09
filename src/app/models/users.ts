export interface Users{
    name?:string;
    shortname?:string;
    email?:string;
    mobile?:string;
    pin?:string;
    address?:string;
    picture?:string;
    likedBooks?:string; // todo - change to array
    totalEarning?:string;
    following?:string; // todo - array of other users
    blocked?:string;
}
