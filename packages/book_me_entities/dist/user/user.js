"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const person_1 = require("../person/person");
/** User domain object extending Person with authentication and contact fields */
class User extends person_1.Person {
    constructor(dto) {
        super(dto);
        this.email = dto.email;
        this.password = dto.password;
        this.phoneNumber = dto.phoneNumber;
        this.userType = dto.userType;
        this.deleted = dto.deleted;
        this.active = dto.active;
    }
    static fromDTO(dto) {
        return new User(dto);
    }
    /** Check if user is available for login */
    get isAvailable() {
        return this.active && !this.deleted;
    }
    /** Get user's display name with email */
    get displayName() {
        return `${this.fullName} (${this.email})`;
    }
}
exports.User = User;
