import Entity from './entity'
export default class User extends Entity<number>{
    password:string;
    constructor(){
        super();
      this.password = "";
    }
}