import { UserRole } from "./user-roles";

export class User {
    public id: String;
    public email: String;
    public roles: UserRole[];
    public createdAt?: number;
    public updatedAt?: number;
    public displayName?: string;
    public bio?: string;
    public verified?: boolean;
    constructor(
        email: String,
        roles: UserRole[],
        id?: String,
        createdAt?: number,
        updatedAt?: number,
        displayName?: string,
        bio?: string,
        verified?: boolean) {
            this.email = email;
            this.roles = roles;
            this.id = id;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.displayName = displayName;
            this.bio = bio;
            this.verified = verified;
    }
}