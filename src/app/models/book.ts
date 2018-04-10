import { LangType } from './langType';
export interface Book{
    id?: string;
    title?:string;
    author?:string;
    cover?:string;
    pages?:string;
    origPrice?:string;
    rentPrice?:string;
    lang?:LangType;
    rating?:string;
    genre?:string; // TODO - array of genre/tags
    age?:string; // suitable for age ranges
};
