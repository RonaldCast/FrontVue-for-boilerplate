export default class  PagedFilterAndSortedRequest{
    maxResultCount:number;
    skipCount:number;
    sorting:string;
    where:string;
    constructor(){
        this.maxResultCount = 0;
        this.skipCount = 0;
        this.sorting = "";
        this.where = "";
    }
}