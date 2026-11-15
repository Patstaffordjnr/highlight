export class LoginRequest {
    public email: String;
    public password: String;
    public rememberMe: boolean;

    constructor(
        email: String,
        password: String,
        rememberMe: boolean = false) {
            this.email = email;
            this.password = password;
            this.rememberMe = rememberMe;
    }
}
