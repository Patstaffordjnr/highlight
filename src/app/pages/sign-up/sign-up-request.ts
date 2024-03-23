import { User } from "src/app/model/user";
import { UserRole } from "src/app/model/user-role";

export class SignUpRequest {
    public email: String;
    public roles: UserRole[];
    public password: String;
    
    constructor(
        email: String, 
        roles: UserRole[],
        password: String) {
            this.email = email;
            this.roles = roles;
            this.password = password;
    }
}