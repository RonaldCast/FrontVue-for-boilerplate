import Entity from './entity'

export default class Tenant extends Entity<number>{
    tenancyName:string;
    name:string;
    isActive:boolean;
    adminEmailAddress:string;
    connectionString:string;    

    constructor(){
        super()
        this.tenancyName ="";
        this.name = "";
        this.isActive = false;
        this.adminEmailAddress = "";
        this.connectionString = "";    
    }
    
}