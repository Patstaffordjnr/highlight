import { User } from "src/app/model/user";
import { UserRole } from "src/app/model/user-role";

export class SignUpResponse extends User {
    public token: String;
    
    constructor(
        email: String, 
        roles: UserRole[],
        token: String,
        id?: String) {
            super(email, roles, id)
            this.token = token;
    }
}