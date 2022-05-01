export default interface PageFilterUser {
    keyword:string;
    isActive:boolean | null;
    skipCount: number;
    maxResultCount: number;
}