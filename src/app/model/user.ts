import { UserRole } from "./user-role";

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