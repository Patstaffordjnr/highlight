import { User } from "src/app/model/user";
import { UserRole } from "src/app/model/user-role";

export class SignUpRequest extends User {
    public password: String;
    
    constructor(
        email: String, 
        roles: UserRole[],
        password: String,
        id?: String) {
            super(email, roles, id)
            this.password = password;
    }
}