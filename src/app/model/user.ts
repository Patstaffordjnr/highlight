import { UserRole } from "./user-roles";

export class User {
    public id: String;
    public email: String;
    public roles: UserRole[];
    constructor(
        email: String, 
        roles: UserRole[],        
        id?: String) {
            this.email = email;
            this.roles = roles;
            this.id = id;
    }
}