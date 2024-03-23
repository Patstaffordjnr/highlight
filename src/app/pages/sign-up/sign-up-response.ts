import { User } from "src/app/model/user";
import { UserRole } from "src/app/model/user-role";

export class SignUpResponse{
    public token: String;
    public email: String;
    public roles: UserRole[];
    public password: String;
    
    constructor(
        email: String, 
        roles: UserRole[],
        token: String,
        password: String,
        id?: String) {
            this.email = email;
            this.roles = roles;
            this.token = token;
            this.password = password;
    }
}
