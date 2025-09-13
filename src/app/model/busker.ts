import { UserRole } from "./user-roles";

export class Busker {
    public email: String;
    public roles: UserRole[];
    public id: String;


    constructor(
        email: String, 
        roles: UserRole[],        
        id?: String

    ) {
            this.email = email;
            this.roles = roles;
            this.id = id;

            
    }
}