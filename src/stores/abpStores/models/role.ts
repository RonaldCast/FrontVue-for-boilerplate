import Entity from './entity'

export default class Role extends Entity<number>{
    name: string;
    displayName: string;
    normalizedName: string;
    description: string;
    grantedPermissions: string[]
    constructor() {
        super()
        this.name = "";
        this.displayName = "";
        this.normalizedName = "";
        this.description = "";
        this.grantedPermissions = []
    }
}