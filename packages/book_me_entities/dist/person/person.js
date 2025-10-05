"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
/** Domain object — use factory to construct (validated) */
class Person {
    constructor(dto) {
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
        this.birthDate = dto.birthDate;
    }
    static fromDTO(dto) {
        return new Person(dto);
    }
    get fullName() { return `${this.firstName} ${this.lastName}`; }
}
exports.Person = Person;
