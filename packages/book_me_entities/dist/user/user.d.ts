import type { UserDTO } from "./user.schema";
import { Person } from "../person/person";
/** User domain object extending Person with authentication and contact fields */
export declare class User extends Person {
    readonly email: string;
    readonly password: string;
    readonly phoneNumber?: string;
    readonly userType: string;
    readonly deleted: boolean;
    readonly active: boolean;
    private constructor();
    static fromDTO(dto: UserDTO): User;
    /** Check if user is available for login */
    get isAvailable(): boolean;
    /** Get user's display name with email */
    get displayName(): string;
}
