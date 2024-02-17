import { User } from "src/app/model/user";
import { UserRole } from "src/app/model/user-role";

export class SignUpRequest extends User {
    public password: String;
    
    constructor(
        id: String, 
        email: String, 
        roles: UserRole[],
        password: String) {
            super(id, email, roles)
            this.password = password;
    }
}