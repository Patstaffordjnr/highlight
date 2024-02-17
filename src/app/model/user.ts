import { USER_ROLE } from "./user-role";

export class User {
    public id: String;
    public email: String;
    public roles: USER_ROLE[];
    constructor(
        id: String, 
        email: String, 
        roles: USER_ROLE[]) {
            this.id = id;
            this.email = email;
            this.roles = roles;
    }
}