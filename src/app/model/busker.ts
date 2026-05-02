import { UserRole } from "./user-roles";

export class Busker {
    public email: String;
    public roles: UserRole[];
    public id: String;
    public createdAt?: number;
    public updatedAt?: number;
    public bio?: string;
    public displayName?: string;
    constructor(
        email: String,
        roles: UserRole[],
        id?: String,
        createdAt?: number,
        updatedAt?: number,
        bio?: string,
        displayName?: string
    ) {
            this.email = email;
            this.roles = roles;
            this.id = id;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.bio = bio;
            this.displayName = displayName;
    }
}