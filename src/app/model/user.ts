import { UserRole } from "./user-role";

export class User {
    public id: String;
    public email: String;
    public roles: UserRole[];
    constructor(
        id: String, 
        email: String, 
        roles: UserRole[]) {
            this.id = id;
            this.email = email;
            this.roles = roles;
    }
}