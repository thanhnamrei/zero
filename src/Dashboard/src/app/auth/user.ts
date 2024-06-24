import { Role } from "./auth.enum";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: Role | string;
    dateOfBirth: Date | null | string;
    userStatus: boolean;
}


export class User implements IUser {
    constructor(
        public _id = '',
        public email = '',
        public name = '',
        public role = Role.None,
        public dateOfBirth: Date | null = null,
        public userStatus = false
    ) {}


    static build(user: IUser) {
        if(!user) {
            return new User();
        }

        return new User(
            user._id,
            user.name,
            user.email,
            user.role as Role,
            typeof user.dateOfBirth === 'string'
                ? new Date(user.dateOfBirth)
                : user.dateOfBirth,
            user.userStatus
        );
    }
}